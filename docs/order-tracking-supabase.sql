-- Pixel & Panel manual order tracking
-- Run this in Supabase SQL editor before adding SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.

create extension if not exists pgcrypto;

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text unique not null,
  tracking_token text unique not null,
  company text,
  customer_name text,
  customer_email text,
  customer_phone text,
  project_name text,
  product_name text,
  service text,
  quantity integer,
  unit_price numeric,
  invoice_number text,
  invoice_total numeric,
  payment_status text,
  payment_method text,
  payment_reference text,
  tax_collected numeric,
  shipping_charged numeric,
  stripe_fee numeric,
  order_status text,
  proof_status text,
  product_status text,
  order_date date,
  target_date date,
  public_note text,
  first_timeline_note text,
  internal_note text,
  vendor_name text,
  vendor_order_number text,
  vendor_cost numeric,
  tracking_number text,
  proof_file_url text,
  invoice_url text,
  design_file_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.orders add column if not exists tracking_token text;
alter table public.orders add column if not exists company text;
alter table public.orders add column if not exists customer_name text;
alter table public.orders add column if not exists customer_email text;
alter table public.orders add column if not exists customer_phone text;
alter table public.orders add column if not exists project_name text;
alter table public.orders add column if not exists product_name text;
alter table public.orders add column if not exists service text;
alter table public.orders add column if not exists quantity integer;
alter table public.orders add column if not exists unit_price numeric;
alter table public.orders add column if not exists invoice_number text;
alter table public.orders add column if not exists invoice_total numeric;
alter table public.orders add column if not exists payment_status text;
alter table public.orders add column if not exists payment_method text;
alter table public.orders add column if not exists payment_reference text;
alter table public.orders add column if not exists tax_collected numeric;
alter table public.orders add column if not exists shipping_charged numeric;
alter table public.orders add column if not exists stripe_fee numeric;
alter table public.orders add column if not exists order_status text;
alter table public.orders add column if not exists proof_status text;
alter table public.orders add column if not exists product_status text;
alter table public.orders add column if not exists order_date date;
alter table public.orders add column if not exists target_date date;
alter table public.orders add column if not exists public_note text;
alter table public.orders add column if not exists first_timeline_note text;
alter table public.orders add column if not exists internal_note text;
alter table public.orders add column if not exists vendor_name text;
alter table public.orders add column if not exists vendor_order_number text;
alter table public.orders add column if not exists vendor_cost numeric;
alter table public.orders add column if not exists tracking_number text;
alter table public.orders add column if not exists proof_file_url text;
alter table public.orders add column if not exists invoice_url text;
alter table public.orders add column if not exists design_file_url text;
alter table public.orders add column if not exists created_at timestamptz default now();
alter table public.orders add column if not exists updated_at timestamptz default now();

alter table public.orders alter column customer_name drop not null;
alter table public.orders alter column project_name drop not null;
alter table public.orders alter column quantity drop not null;
alter table public.orders alter column order_date drop not null;
alter table public.orders alter column payment_status drop not null;
alter table public.orders alter column proof_status drop not null;

do $$
begin
  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'orders' and column_name = 'company_name'
  ) then
    update public.orders set company = coalesce(nullif(company, ''), company_name);
  end if;

  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'orders' and column_name = 'product_service'
  ) then
    update public.orders set service = coalesce(nullif(service, ''), product_service);
  end if;

  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'orders' and column_name = 'unit_rate'
  ) then
    update public.orders set unit_price = coalesce(unit_price, unit_rate);
  end if;

  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'orders' and column_name = 'due_date'
  ) then
    update public.orders set target_date = coalesce(target_date, due_date);
  end if;

  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'orders' and column_name = 'status'
  ) then
    update public.orders
    set order_status = coalesce(
      nullif(order_status, ''),
      case status
        when 'in_production' then 'in_production'
        when 'install_scheduled' then 'in_production'
        when 'completed' then 'completed'
        when 'awaiting_approval' then 'waiting_on_customer'
        when 'proof_ready' then 'waiting_on_customer'
        else 'new'
      end
    );
  end if;

  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'orders' and column_name = 'delivery_method'
  ) then
    update public.orders
    set product_status = coalesce(
      nullif(product_status, ''),
      case lower(coalesce(delivery_method, ''))
        when 'shipped' then 'shipped'
        when 'completed' then 'delivered'
        when 'out for delivery' then 'shipped'
        when 'in installation' then 'finishing'
        when 'ready for customer pickup' then 'finishing'
        else 'not_scheduled'
      end
    );
  end if;
end $$;

update public.orders
set payment_status = case lower(coalesce(payment_status, ''))
  when 'paid in full' then 'paid_in_full'
  when 'deposit paid' then 'deposit_paid'
  when 'refunded' then 'refunded'
  else coalesce(nullif(payment_status, ''), 'unpaid')
end
where payment_status is null
  or payment_status not in ('unpaid', 'deposit_paid', 'paid_in_full', 'refunded');

update public.orders
set proof_status = case lower(coalesce(proof_status, ''))
  when 'approved' then 'approved'
  when 'proof sent' then 'sent'
  when 'waiting for approval' then 'sent'
  when 'changes requested' then 'revision_requested'
  else coalesce(nullif(proof_status, ''), 'not_sent')
end
where proof_status is null
  or proof_status not in ('not_sent', 'sent', 'approved', 'revision_requested');

update public.orders set order_status = coalesce(nullif(order_status, ''), 'new');
update public.orders set product_status = coalesce(nullif(product_status, ''), 'not_scheduled');
update public.orders set quantity = coalesce(quantity, 1);
update public.orders set tracking_token = 'o_' || replace(gen_random_uuid()::text, '-', '')
where tracking_token is null or tracking_token = '';

alter table public.orders alter column tracking_token set not null;

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conrelid = 'public.orders'::regclass and conname = 'orders_tracking_token_key'
  ) then
    alter table public.orders add constraint orders_tracking_token_key unique (tracking_token);
  end if;
end $$;

create table if not exists public.order_timeline_events (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references public.orders(id) on delete cascade,
  title text not null,
  description text,
  is_customer_visible boolean default true,
  created_at timestamptz default now()
);

create index if not exists orders_order_number_idx on public.orders(order_number);
create index if not exists orders_tracking_token_idx on public.orders(tracking_token);
create index if not exists order_timeline_events_order_id_idx on public.order_timeline_events(order_id);
create unique index if not exists order_timeline_events_seed_unique_idx
  on public.order_timeline_events(order_id, title, description);

alter table public.orders enable row level security;
alter table public.order_timeline_events enable row level security;

-- Browser users do not query Supabase directly. The Next.js API uses service role server-side.
-- Keep RLS locked unless you later build direct Supabase client access.
grant usage on schema public to service_role;
grant all privileges on table public.orders to service_role;
grant all privileges on table public.order_timeline_events to service_role;

insert into public.orders (
  order_number,
  tracking_token,
  company,
  customer_name,
  project_name,
  product_name,
  service,
  quantity,
  unit_price,
  invoice_number,
  invoice_total,
  payment_status,
  payment_method,
  order_status,
  proof_status,
  product_status,
  order_date,
  target_date,
  public_note,
  first_timeline_note
) values (
  'PNP-0245',
  'o_8f3x92private',
  'RoGo',
  'Rolando Gonzalez',
  'Outdoor Sign',
  'Coroplast Signs',
  'Design & Printing',
  10,
  5.99,
  'INV-0245',
  81.08,
  'paid_in_full',
  'Stripe',
  'in_production',
  'approved',
  'not_scheduled',
  '2026-06-19',
  '2026-06-25',
  'Your payment has been received and your artwork has been approved. Your yard signs are now moving into production.',
  'Order received, payment confirmed, and artwork approved on June 19, 2026.'
) on conflict (order_number) do update set
  company = excluded.company,
  customer_name = excluded.customer_name,
  project_name = excluded.project_name,
  product_name = excluded.product_name,
  service = excluded.service,
  quantity = excluded.quantity,
  unit_price = excluded.unit_price,
  invoice_number = excluded.invoice_number,
  invoice_total = excluded.invoice_total,
  payment_status = excluded.payment_status,
  payment_method = excluded.payment_method,
  order_status = excluded.order_status,
  proof_status = excluded.proof_status,
  product_status = excluded.product_status,
  order_date = excluded.order_date,
  target_date = excluded.target_date,
  public_note = excluded.public_note,
  first_timeline_note = excluded.first_timeline_note,
  updated_at = now();

insert into public.order_timeline_events (order_id, title, description, is_customer_visible, created_at)
select
  id,
  'Order received',
  'Order received, payment confirmed, and artwork approved on June 19, 2026.',
  true,
  '2026-06-19 12:00:00-05'::timestamptz
from public.orders
where order_number = 'PNP-0245'
on conflict do nothing;
