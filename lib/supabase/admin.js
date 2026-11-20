import "server-only";

import { createClient } from "@supabase/supabase-js";
import { getSupabaseServerConfig } from "./server-config.js";

let adminClient = null;

export function isSupabaseAdminConfigured() {
  const { url, serviceKey } = getSupabaseServerConfig();
  return Boolean(url && serviceKey);
}

export function getSupabaseAdminClient() {
  if (adminClient) return adminClient;

  const { url, serviceKey } = getSupabaseServerConfig();

  if (!url || !serviceKey) {
    throw new Error("Supabase admin client is not configured.");
  }

  adminClient = createClient(url, serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  return adminClient;
}
