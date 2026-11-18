import test from "node:test";
import assert from "node:assert/strict";
import { analyticsEvent, analyticsReferrer, analyticsUrl } from "../lib/analytics-privacy.js";

const origin = "https://www.pixelnpanel.com";

test("analytics URLs strip query and hash data and exclude private routes", () => {
  assert.equal(analyticsUrl("/quote-request?email=person@example.test#private", origin), origin + "/quote-request");
  assert.equal(analyticsUrl("/admin/orders?test=1", origin), null);
  assert.equal(analyticsUrl("/track/test-token", origin), null);
  assert.equal(analyticsUrl("https://elsewhere.example/quote-request", origin), null);
  assert.equal(analyticsReferrer("https://elsewhere.example/user?email=person@example.test"), "https://elsewhere.example/");
});

test("analytics accepts only controlled event fields and catalog route identifiers", () => {
  const input = {
    option_field: "quantity",
    item_id: "person@example.test",
    category_id: "fake",
    message: "an arbitrary message",
  };
  assert.deepEqual(analyticsEvent("calculator_interaction", input, "/signage/rigid-and-metal-signs/coroplast-yard-signs"), {
    item_id: "coroplast-yard-signs",
    category_id: "rigid-and-metal-signs",
    option_field: "quantity",
  });
  assert.deepEqual(analyticsEvent("quote_form_start", { request_type: "email@example.test" }, "/quote-request"), {});
  assert.equal(analyticsEvent("generate_lead", input, "/quote-request"), null);
});
