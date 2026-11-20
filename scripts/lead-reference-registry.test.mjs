import assert from "node:assert/strict";
import { createHash, randomUUID } from "node:crypto";
import test from "node:test";
import { deliverLead } from "../lib/lead-delivery.js";
import { deliverRegisteredLead, randomShortReference } from "../lib/lead-reference-registry.js";
import { isLeadReference } from "../lib/business-reference.js";

const key = "a".repeat(64);

test("random short references fit the full uppercase base-36 format", () => {
  for (let index = 0; index < 512; index += 1) {
    assert.match(randomShortReference(), /^PNP-[A-Z0-9]{4}$/);
  }
  for (const valid of ["PNP-0000", "PNP-01R2", "PNP-128A14BFC5FE"]) {
    assert.equal(isLeadReference(valid), true);
  }
  for (const invalid of ["PNP-6", "PNP-7g5L", "PNP-7G5L ", "PNP-O-01", "PNP-ñ123"]) {
    assert.equal(isLeadReference(invalid), false);
  }
});

test("a database collision rerolls, and an accepted retry sends no additional email", async (t) => {
  const responses = [
    { state: "collision" },
    { state: "claimed", reference: "PNP-01R2" },
    true,
    { state: "accepted", reference: "PNP-01R2" },
  ];
  const rpc = t.mock.fn(async () => ({ data: responses.shift() }));
  const send = t.mock.fn(async () => {});
  const candidates = ["PNP-0000", "PNP-01R2", "PNP-ZZZZ"];
  const deliver = () => deliverRegisteredLead({ rpc }, "quote", key, send, () => candidates.shift());
  assert.equal(await deliver(), "PNP-01R2");
  assert.equal(await deliver(), "PNP-01R2");
  assert.equal(send.mock.callCount(), 1);
  assert.deepEqual(send.mock.calls[0].arguments, ["PNP-01R2"]);
  assert.equal(rpc.mock.calls[0].arguments[1].p_candidate, "PNP-0000");
  assert.equal(rpc.mock.calls[1].arguments[1].p_candidate, "PNP-01R2");
  assert.deepEqual(rpc.mock.calls[2].arguments, ["finish_pnp_lead_reference", {
    p_delivery_key: key,
    p_claim: rpc.mock.calls[1].arguments[1].p_claim,
    p_accepted: true,
  }]);
});

test("a rejected internal email releases its lease and preserves its original error", async (t) => {
  const error = new Error("SMTP failed");
  const rpc = t.mock.fn((name) => ({
    // PostgREST RPC builders implement then() without Promise's catch().
    then: (resolve) => resolve(name === "claim_pnp_lead_reference"
      ? { data: { state: "claimed", reference: "PNP-01R2" } }
      : { data: true }),
  }));
  await assert.rejects(deliverRegisteredLead({ rpc }, "contact", key, async () => { throw error; }), error);
  assert.equal(rpc.mock.calls[1].arguments[0], "finish_pnp_lead_reference");
  assert.equal(rpc.mock.calls[1].arguments[1].p_accepted, false);
});

test("a registry outage fails closed, and an unconfirmed SMTP receipt keeps the lease", async (t) => {
  const send = t.mock.fn(async () => {});
  await assert.rejects(deliverRegisteredLead({ rpc: async () => ({ error: {} }) }, "visibility", key, send), {
    code: "REGISTRY_CLAIM",
  });
  assert.equal(send.mock.callCount(), 0);

  const rpc = t.mock.fn(async (name) => name === "claim_pnp_lead_reference"
    ? { data: { state: "claimed", reference: "PNP-01R2" } }
    : { error: {} });
  await assert.rejects(deliverRegisteredLead({ rpc }, "visibility", key, send), { code: "REGISTRY_ACCEPT" });
  assert.equal(send.mock.callCount(), 1);
  assert.equal(rpc.mock.callCount(), 2);
  assert.equal(rpc.mock.calls[1].arguments[1].p_accepted, true);
});

test("the registry receives an opaque retry digest that includes form fields and artwork", async (t) => {
  const attempt = randomUUID();
  const request = new Request("http://localhost/api/quote", { headers: { "Idempotency-Key": attempt } });
  const fields = [{ email: "qa@example.test" }];
  const artwork = Buffer.from("synthetic artwork");
  const deliveryKey = createHash("sha256").update(JSON.stringify(["quote", attempt, fields])).update(artwork).digest("hex");
  const rpc = t.mock.fn(async () => ({ data: { state: "accepted", reference: "PNP-01R2" } }));
  const send = t.mock.fn(async () => {});
  assert.equal(await deliverLead("quote", request, fields, send, artwork, { rpc }), "PNP-01R2");
  assert.equal(rpc.mock.calls[0].arguments[1].p_delivery_key, deliveryKey);
  assert.doesNotMatch(JSON.stringify(rpc.mock.calls[0].arguments), /qa@example.test|synthetic artwork/);
  assert.equal(send.mock.callCount(), 0);
});
