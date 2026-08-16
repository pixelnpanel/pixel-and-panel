import {
  TRACKING_FOUND,
  TRACKING_UNAVAILABLE,
  lookupOrderForCustomer,
} from "@/lib/order-tracking";
import { getClientIp, rateLimit, rateLimitResponse } from "@/lib/rate-limit";

export const runtime = "nodejs";

const GENERIC_LOOKUP_ERROR =
  "We couldn’t find an order with those details. Please check your order number and contact information, or contact Pixel & Panel for help.";

const UNAVAILABLE_ERROR =
  "Order status is temporarily unavailable — this isn’t a problem with your order. Please try again in a few minutes, or call (409) 225-2012 and we’ll look it up for you.";

function jsonResponse(body, status = 200) {
  return Response.json(body, { status });
}

export async function POST(request) {
  const ip = getClientIp(request);
  const limiter = await rateLimit({
    key: `order-lookup:${ip}`,
    limit: 8,
    windowMs: 10 * 60 * 1000,
  });

  if (!limiter.success) {
    return rateLimitResponse(limiter.resetTime);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ ok: false, error: "Invalid request body." }, 400);
  }

  const orderNumber = String(body?.orderNumber || "").trim();
  const contact = String(body?.contact || "").trim();

  if (!orderNumber || !contact) {
    return jsonResponse(
      { ok: false, error: "Order number and email or phone are required." },
      400,
    );
  }

  const result = await lookupOrderForCustomer({ orderNumber, contact });

  // 503, not 500: the request was valid and the caller should retry. Sending a
  // 500 here made an infrastructure outage look like a bug in the submission,
  // and the copy blamed the customer's order number for it.
  if (result.status === TRACKING_UNAVAILABLE) {
    return Response.json(
      { ok: false, error: UNAVAILABLE_ERROR },
      { status: 503, headers: { "Retry-After": "300" } },
    );
  }

  if (result.status !== TRACKING_FOUND) {
    return jsonResponse({ ok: false, error: GENERIC_LOOKUP_ERROR }, 404);
  }

  const { trackingToken } = result.order;

  return jsonResponse({
    ok: true,
    trackingToken,
    trackingUrl: `/track/${encodeURIComponent(trackingToken)}`,
  });
}
