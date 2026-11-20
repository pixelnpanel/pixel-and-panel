-- Apply once after the existing order-tracking schema. See pnp-reference-rollout.md.
begin;

alter table public.orders add column inquiry_reference text;

create table public.pnp_reference_registry (
  reference text primary key check (reference ~ '^PNP-[A-Z0-9]{4}$'),
  inquiry_id uuid not null unique default gen_random_uuid(),
  delivery_key text unique check (delivery_key ~ '^[a-f0-9]{64}$'),
  lead_kind text check (lead_kind in ('quote', 'contact', 'visibility')),
  accepted_at timestamptz,
  claim_token uuid,
  claim_until timestamptz,
  -- Keep the original owner even if an order is renumbered or deleted.
  order_id uuid,
  check ((delivery_key is null) = (lead_kind is null)),
  check ((claim_token is null) = (claim_until is null))
);

alter table public.pnp_reference_registry enable row level security;
revoke all on public.pnp_reference_registry from public, anon, authenticated, service_role;

alter table public.orders
  add constraint orders_inquiry_reference_fkey foreign key (inquiry_reference)
  references public.pnp_reference_registry (reference);

create unique index orders_inquiry_reference_key
  on public.orders (inquiry_reference) where inquiry_reference is not null;

-- Reserve issued short order numbers without changing their stored values.
-- A normalization conflict intentionally aborts the migration.
insert into public.pnp_reference_registry (reference, order_id)
select upper(btrim(order_number)), id
from public.orders
where upper(btrim(order_number)) ~ '^PNP-[A-Z0-9]{4}$';

create function public.claim_pnp_lead_reference(
  p_delivery_key text, p_lead_kind text, p_candidate text, p_claim uuid
) returns jsonb
language plpgsql security definer set search_path = ''
as $$
declare
  entry public.pnp_reference_registry%rowtype;
begin
  if p_delivery_key is null or p_delivery_key !~ '^[a-f0-9]{64}$'
    or p_lead_kind is null or p_lead_kind not in ('quote', 'contact', 'visibility')
    or p_candidate is null or p_candidate !~ '^PNP-[A-Z0-9]{4}$' or p_claim is null then
    raise exception 'Invalid inquiry reference request' using errcode = '22023';
  end if;

  insert into public.pnp_reference_registry (reference, delivery_key, lead_kind)
  values (p_candidate, p_delivery_key, p_lead_kind)
  on conflict do nothing;

  select * into entry from public.pnp_reference_registry
  where delivery_key = p_delivery_key for update;

  if not found then
    return jsonb_build_object('state', 'collision');
  elsif entry.accepted_at is not null then
    return jsonb_build_object('state', 'accepted', 'reference', entry.reference);
  elsif entry.claim_until > clock_timestamp() and entry.claim_token <> p_claim then
    return jsonb_build_object('state', 'busy', 'reference', entry.reference);
  end if;

  update public.pnp_reference_registry
  set claim_token = p_claim, claim_until = clock_timestamp() + interval '2 minutes'
  where reference = entry.reference;
  return jsonb_build_object('state', 'claimed', 'reference', entry.reference);
end;
$$;

create function public.finish_pnp_lead_reference(p_delivery_key text, p_claim uuid, p_accepted boolean)
returns boolean
language plpgsql security definer set search_path = ''
as $$
begin
  update public.pnp_reference_registry
  set accepted_at = case when p_accepted then clock_timestamp() else null end,
      claim_token = null, claim_until = null
  where delivery_key = p_delivery_key and claim_token = p_claim and accepted_at is null;
  return found;
end;
$$;

create function public.reserve_pnp_order_reference()
returns trigger
language plpgsql security definer set search_path = ''
as $$
declare
  order_code text := upper(btrim(new.order_number));
  code text;
  entry public.pnp_reference_registry%rowtype;
begin
  if tg_op = 'UPDATE' and old.inquiry_reference is not null
    and new.inquiry_reference is distinct from old.inquiry_reference then
    raise exception 'An existing inquiry link cannot be changed' using errcode = 'PNP02';
  end if;

  if order_code !~ '^PNP-[A-Z0-9]{4}$' then
    order_code := null;
  end if;

  -- Lock references in a consistent order when an order uses separate codes.
  for code in
    select distinct candidate from unnest(array[order_code, new.inquiry_reference]) candidate
    where candidate is not null order by candidate
  loop
    if code is distinct from new.inquiry_reference then
      insert into public.pnp_reference_registry (reference, order_id)
      values (code, new.id) on conflict do nothing;
    end if;

    select * into entry from public.pnp_reference_registry
    where reference = code for update;

    if code = new.inquiry_reference and (not found or entry.accepted_at is null) then
      raise exception 'The inquiry reference has not been accepted' using errcode = 'PNP02';
    end if;

    if (entry.order_id is not null and entry.order_id <> new.id)
      or (entry.delivery_key is not null and code is distinct from new.inquiry_reference) then
      raise exception 'This reference belongs to another inquiry or order' using errcode = 'PNP01';
    end if;

    update public.pnp_reference_registry set order_id = new.id
    where reference = code and order_id is null;
  end loop;
  return new;
end;
$$;

create trigger orders_reserve_pnp_reference
before insert or update of order_number, inquiry_reference on public.orders
for each row execute function public.reserve_pnp_order_reference();

revoke all on function public.claim_pnp_lead_reference(text, text, text, uuid) from public, anon, authenticated;
revoke all on function public.finish_pnp_lead_reference(text, uuid, boolean) from public, anon, authenticated;
revoke all on function public.reserve_pnp_order_reference() from public, anon, authenticated, service_role;
grant execute on function public.claim_pnp_lead_reference(text, text, text, uuid) to service_role;
grant execute on function public.finish_pnp_lead_reference(text, uuid, boolean) to service_role;

commit;
