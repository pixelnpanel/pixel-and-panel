-- Adapt the legacy order schema without rewriting order, invoice, or file values.
set local lock_timeout = '5s';
set local statement_timeout = '30s';

alter table public.orders
  add column if not exists tracking_token text not null
    default ('o_' || replace(gen_random_uuid()::text, '-', '')),
  add column if not exists company text,
  add column if not exists service text,
  add column if not exists unit_price numeric,
  add column if not exists invoice_number text,
  add column if not exists invoice_total numeric,
  add column if not exists payment_method text,
  add column if not exists payment_reference text,
  add column if not exists tax_collected numeric,
  add column if not exists shipping_charged numeric,
  add column if not exists stripe_fee numeric,
  add column if not exists order_status text,
  add column if not exists product_status text,
  add column if not exists target_date date,
  add column if not exists first_timeline_note text,
  add column if not exists internal_note text,
  add column if not exists vendor_name text,
  add column if not exists vendor_order_number text,
  add column if not exists vendor_cost numeric,
  add column if not exists tracking_number text,
  add column if not exists proof_file_url text,
  add column if not exists invoice_url text,
  add column if not exists design_file_url text,
  alter column project_name drop not null,
  alter column quantity drop not null,
  alter column order_date drop not null;

create unique index if not exists orders_tracking_token_key on public.orders (tracking_token);

create table if not exists public.order_timeline_events (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders (id) on delete cascade,
  title text not null,
  description text,
  is_customer_visible boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists order_timeline_events_order_id_idx
  on public.order_timeline_events (order_id);

alter table public.order_timeline_events enable row level security;
revoke all on public.order_timeline_events from public, anon, authenticated;
grant select, insert, update, delete on public.order_timeline_events to service_role;

insert into public.order_timeline_events
  (id, order_id, title, description, is_customer_visible, created_at)
select id, order_id, title, body, is_customer_visible, created_at
from public.order_updates
on conflict (id) do nothing;
