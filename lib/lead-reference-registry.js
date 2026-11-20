import { randomInt, randomUUID } from "node:crypto";
import { setTimeout as wait } from "node:timers/promises";
import { isShortReference } from "./business-reference.js";

const CLAIM_RPC = "claim_pnp_lead_reference";
const FINISH_RPC = "finish_pnp_lead_reference";

export function randomShortReference() {
  const suffix = randomInt(36 ** 4).toString(36).toUpperCase().padStart(4, "0");
  return `PNP-${suffix}`;
}

function registryError(code) {
  return Object.assign(new Error("Lead reference could not be confirmed."), { code });
}

export async function deliverRegisteredLead(supabase, form, deliveryKey, send, candidate = randomShortReference) {
  const claim = randomUUID();
  const identity = { p_delivery_key: deliveryKey, p_claim: claim };
  const retryUntil = Date.now() + 15_000;
  let collisions = 0;

  while (collisions < 16 && Date.now() < retryUntil) {
    const { data, error } = await supabase.rpc(CLAIM_RPC, {
      ...identity,
      p_lead_kind: form,
      p_candidate: candidate(),
    });
    if (error || !data) throw registryError("REGISTRY_CLAIM");
    if (data.state === "collision") {
      collisions += 1;
      continue;
    }
    if (!isShortReference(data.reference)) throw registryError("REGISTRY_REFERENCE");
    if (data.state === "accepted") return data.reference;
    if (data.state === "busy") {
      await wait(500);
      continue;
    }
    if (data.state !== "claimed") throw registryError("REGISTRY_STATE");

    try {
      await send(data.reference);
    } catch (deliveryError) {
      try {
        await supabase.rpc(FINISH_RPC, { ...identity, p_accepted: false });
      } catch {
        // The lease expires if it could not be released. Preserve the SMTP error.
      }
      throw deliveryError;
    }

    const finished = await supabase.rpc(FINISH_RPC, { ...identity, p_accepted: true });
    if (finished.error || finished.data !== true) throw registryError("REGISTRY_ACCEPT");
    return data.reference;
  }

  throw registryError("REGISTRY_RETRY");
}
