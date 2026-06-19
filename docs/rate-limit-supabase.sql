-- Pixel & Panel persistent API rate limiting
-- Run this in Supabase SQL editor after adding NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.
-- The Next.js API calls public.check_rate_limit through Supabase REST with the service role key.

create table if not exists public.rate_limits (
  key text primary key,
  count integer not null default 0,
  reset_at timestamptz not null,
  updated_at timestamptz not null default now()
);

create index if not exists rate_limits_reset_at_idx on public.rate_limits(reset_at);

alter table public.rate_limits enable row level security;

grant usage on schema public to service_role;
grant all privileges on table public.rate_limits to service_role;

create or replace function public.check_rate_limit(
  p_key text,
  p_limit integer,
  p_window_seconds integer
)
returns table (
  allowed boolean,
  remaining integer,
  reset_at timestamptz
)
language plpgsql
security definer
set search_path = public
as $$
declare
  now_ts timestamptz := now();
  next_reset timestamptz := now() + make_interval(secs => greatest(p_window_seconds, 1));
  current_count integer;
  current_reset timestamptz;
begin
  if p_key is null or length(btrim(p_key)) = 0 then
    raise exception 'rate limit key is required';
  end if;

  if p_limit < 1 then
    raise exception 'rate limit must be at least 1';
  end if;

  insert into public.rate_limits as limits (key, count, reset_at, updated_at)
  values (p_key, 1, next_reset, now_ts)
  on conflict (key) do nothing;

  if found then
    allowed := true;
    remaining := greatest(p_limit - 1, 0);
    reset_at := next_reset;
    return next;
    return;
  end if;

  select limits.count, limits.reset_at
  into current_count, current_reset
  from public.rate_limits as limits
  where limits.key = p_key
  for update;

  if current_reset <= now_ts then
    update public.rate_limits as limits
    set count = 1,
        reset_at = next_reset,
        updated_at = now_ts
    where limits.key = p_key;

    allowed := true;
    remaining := greatest(p_limit - 1, 0);
    reset_at := next_reset;
    return next;
    return;
  end if;

  if current_count >= p_limit then
    update public.rate_limits as limits
    set updated_at = now_ts
    where limits.key = p_key;

    allowed := false;
    remaining := 0;
    reset_at := current_reset;
    return next;
    return;
  end if;

  update public.rate_limits as limits
  set count = current_count + 1,
      updated_at = now_ts
  where limits.key = p_key;

  allowed := true;
  remaining := greatest(p_limit - current_count - 1, 0);
  reset_at := current_reset;
  return next;

  if random() < 0.01 then
    delete from public.rate_limits
    where reset_at < now() - interval '1 day';
  end if;
end;
$$;

revoke all on function public.check_rate_limit(text, integer, integer) from public;
grant execute on function public.check_rate_limit(text, integer, integer) to service_role;
