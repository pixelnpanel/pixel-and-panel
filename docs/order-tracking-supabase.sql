-- Pixel & Panel order tracking MVP
-- Run this in Supabase SQL editor before adding SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.

create extension if not exists pgcrypto;

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique,
  company_name text,
  customer_name text not null,
  customer_email text,
  customer_phone text,
  project_name text not null,
  product_name text,
  product_service text,
  quantity integer not null default 1,
  unit_rate numeric(12,2),
  order_date date not null default current_date,
  payment_status text not null default 'Not invoiced',
  proof_status text not null default 'Not ready',
  delivery_method text,
  status text not null default 'quote_received',
  next_action text,
  due_date date,
  public_note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.orders add column if not exists product_name text;
alter table public.orders add column if not exists company_name text;
alter table public.orders add column if not exists quantity integer not null default 1;
alter table public.orders add column if not exists unit_rate numeric(12,2);
alter table public.orders add column if not exists order_date date not null default current_date;
alter table public.orders add column if not exists payment_status text not null default 'Not invoiced';
alter table public.orders add column if not exists proof_status text not null default 'Not ready';
alter table public.orders add column if not exists delivery_method text;
alter table public.orders alter column customer_name drop not null;

create table if not exists public.order_updates (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  status text not null,
  title text not null,
  body text not null,
  is_customer_visible boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.order_files (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  label text not null,
  file_url text not null,
  file_type text,
  is_customer_visible boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists orders_order_number_idx on public.orders(order_number);
create index if not exists order_updates_order_id_idx on public.order_updates(order_id);
create index if not exists order_files_order_id_idx on public.order_files(order_id);
create unique index if not exists order_updates_seed_unique_idx
  on public.order_updates(order_id, status, title);

alter table public.orders enable row level security;
alter table public.order_updates enable row level security;
alter table public.order_files enable row level security;

-- Browser users do not query Supabase directly. The Next.js API uses service role server-side.
-- Keep RLS locked unless you later build direct Supabase client access.
grant usage on schema public to service_role;
grant all privileges on table public.orders to service_role;
grant all privileges on table public.order_updates to service_role;
grant all privileges on table public.order_files to service_role;

insert into public.orders (
  order_number,
  company_name,
  customer_name,
  customer_email,
  customer_phone,
  project_name,
  product_name,
  product_service,
  quantity,
  unit_rate,
  order_date,
  payment_status,
  proof_status,
  delivery_method,
  status,
  next_action,
  due_date,
  public_note
) values (
  'PNP-1007',
  'Maria''s Boutique',
  'Maria G.',
  'customer@example.com',
  '(409) 225-2012',
  'Storefront sign and window graphics',
  'Storefront sign + window graphics package',
  'Storefront Signs',
  3,
  450,
  current_date,
  'Invoice sent',
  'Waiting for approval',
  'Install scheduled after approval',
  'proof_ready',
  'Review the design proof and send approval or changes.',
  current_date + interval '8 days',
  'Your first proof is ready for review. Production starts after approval.'
) on conflict (order_number) do nothing;

insert into public.order_updates (order_id, status, title, body, created_at)
select id, 'quote_received', 'Quote received', 'Project details were received and reviewed.', now() - interval '1 day'
from public.orders where order_number = 'PNP-1007'
on conflict do nothing;

insert into public.order_updates (order_id, status, title, body, created_at)
select id, 'proof_ready', 'Proof ready', 'Design proof is ready. Please review before production.', now()
from public.orders where order_number = 'PNP-1007'
on conflict do nothing;
