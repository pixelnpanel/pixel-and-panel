import "server-only";

import { createClient } from "@supabase/supabase-js";

let adminClient = null;

// supabase-js ships no request timeout, so it inherits undici's — long enough
// that an unreachable project (deleted, paused, DNS gone) left the order
// tracking page hanging for ~7 seconds before it could show anything at all,
// with the serverless function billed and occupied for every second of it.
//
// A healthy query here returns in well under 300 ms. Five seconds is far past
// any legitimate slow case and still fast enough that a customer gets a real
// answer instead of a spinner.
const REQUEST_TIMEOUT_MS = 5000;

function fetchWithTimeout(input, init = {}) {
  // Respect a caller's own signal if one is ever passed; otherwise impose ours.
  return fetch(input, { ...init, signal: init.signal ?? AbortSignal.timeout(REQUEST_TIMEOUT_MS) });
}

function getSupabaseUrl() {
  return process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
}

export function isSupabaseAdminConfigured() {
  return Boolean(getSupabaseUrl() && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

export function getSupabaseAdminClient() {
  if (adminClient) return adminClient;

  const supabaseUrl = getSupabaseUrl();
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Supabase admin client is not configured.");
  }

  adminClient = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
    global: {
      fetch: fetchWithTimeout,
    },
  });

  return adminClient;
}
