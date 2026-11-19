import assert from "node:assert/strict";
import test from "node:test";
import { leadSuccessCopy, postLeadRequest } from "../lib/lead-request.js";

test("only an accepted lead can reach the website acknowledgment", async (t) => {
  const fetch = t.mock.method(globalThis, "fetch", async () => Response.json({ ok: true }));
  await assert.rejects(postLeadRequest("/api/quote", {}, "test-attempt"), { unconfirmed: true });
  fetch.mock.mockImplementation(async () => Response.json({ ok: true, accepted: true, reference: "PNP-0123456789AB", message: "Old server copy" }));
  assert.deepEqual(await postLeadRequest("/api/quote", {}, "test-attempt"), { reference: "PNP-0123456789AB" });
  fetch.mock.mockImplementation(async () => Response.json({ ok: true, accepted: true, reference: "PNP-01R2" }));
  assert.deepEqual(await postLeadRequest("/api/quote", {}, "test-attempt"), { reference: "PNP-01R2" });
});

test("website acknowledgments describe a personal response in both languages", () => {
  assert.equal(leadSuccessCopy("English").title, "Your request has been received!");
  assert.equal(leadSuccessCopy("Spanish").title, "¡Hemos recibido tu solicitud!");
  assert.match(leadSuccessCopy("English").text, /personally review your request/);
  assert.match(leadSuccessCopy("Spanish").text, /Revisaremos personalmente tu solicitud/);
});
