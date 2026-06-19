import { createClient } from "@supabase/supabase-js";

let browserClient = null;

export function getSupabaseBrowserClient() {
  if (browserClient) return browserClient;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !publishableKey) {
    throw new Error("Supabase browser client is not configured.");
  }

  browserClient = createClient(supabaseUrl, publishableKey);
  return browserClient;
}
