import test from "node:test";
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { deliverLead } from "../lib/lead-delivery.js";

function request() {
  return new Request("http://localhost/api/quote", {
    headers: { "Idempotency-Key": randomUUID() },
  });
}

test("concurrent and later retries reuse the same reference and delivery", async () => {
  let sent = 0;
  const req = request();
  const send = async () => { sent += 1; };
  const run = () => deliverLead("quote", req, ["example"], send, Buffer.from("artwork"));
  const [first, second] = await Promise.all([run(), run()]);
  assert.match(first, /^PNP-[A-F0-9]{12}$/);
  assert.equal(second, first);
  assert.equal(await run(), first);
  assert.equal(sent, 1);
});

test("a failed delivery can be retried and changed options get a separate reference", async () => {
  const req = request();
  const send = async () => {};
  await assert.rejects(deliverLead("quote", req, ["10"], async () => { throw Error("SMTP failure"); }));
  const original = await deliverLead("quote", req, ["10"], send);
  assert.notEqual(await deliverLead("quote", req, ["12"], send), original);
});
