import { createHash, randomUUID } from "node:crypto";
import { deliverRegisteredLead } from "./lead-reference-registry.js";

const REQUEST_KEY = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const KEEP_MS = 10 * 60 * 1000;
const MAX_ENTRIES = 500;
const deliveries = new Map();

export async function deliverLead(form, request, fields, send, attachment, registry) {
  const requestedKey = request.headers.get("Idempotency-Key") || "";
  const attempt = REQUEST_KEY.test(requestedKey) ? requestedKey : randomUUID();
  const hash = createHash("sha256").update(JSON.stringify([form, attempt, fields]));
  if (attachment) hash.update(attachment);
  const key = hash.digest("hex");
  if (registry) return deliverRegisteredLead(registry, form, key, send);
  const reference = "PNP-" + key.slice(0, 12).toUpperCase();
  const now = Date.now();
  for (const [id, entry] of deliveries) {
    if (entry.expires <= now) deliveries.delete(id);
  }

  const existing = deliveries.get(key);
  if (existing) {
    await existing.pending;
    return reference;
  }

  // Share work across concurrent retries on this instance. Cache only the
  // digest and completion, and release failed jobs so a retry can proceed.
  const entry = { pending: Promise.resolve().then(() => send(reference)), expires: Infinity };
  if (deliveries.size < MAX_ENTRIES) deliveries.set(key, entry);
  try {
    await entry.pending;
    entry.expires = Date.now() + KEEP_MS;
    return reference;
  } catch (error) {
    deliveries.delete(key);
    throw error;
  }
}

export function logLeadFailure(form, stage, error) {
  const code = /^[A-Z][A-Z0-9_]{1,30}$/.test(error?.code || "") ? error.code : "unknown";
  console.error("Lead delivery failure", { form, stage, code });
}
