import "server-only";

import { shortReferencesEnabled } from "./business-reference.js";
import { deliverLead } from "./lead-delivery.js";
import { getSupabaseAdminClient } from "./supabase/admin";

export function deliverWebsiteLead(form, request, fields, send, attachment) {
  if (!shortReferencesEnabled()) return deliverLead(form, request, fields, send, attachment);

  const supabase = getSupabaseAdminClient();
  return deliverLead(form, request, fields, send, attachment, {
    rpc: (name, params) => supabase.rpc(name, params).abortSignal(AbortSignal.timeout(5000)),
  });
}
