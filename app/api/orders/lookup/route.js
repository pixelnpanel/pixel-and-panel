import { findOrderForCustomer } from "@/lib/order-tracking";
import { getClientIp, rateLimit, rateLimitResponse } from "@/lib/rate-limit";

export const runtime = "nodejs";

const GENERIC_LOOKUP_ERROR =
  "We couldn’t find an order with those details. Please check your order number and contact information, or contact Pixel & Panel for help.";

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

  try {
    const order = await findOrderForCustomer({ orderNumber, contact });

    if (!order) {
      return jsonResponse(
        {
          ok: false,
          error: GENERIC_LOOKUP_ERROR,
        },
        404,
      );
    }

    if (!order.trackingToken) {
      return jsonResponse(
        {
          ok: false,
          error: GENERIC_LOOKUP_ERROR,
        },
        404,
      );
    }

    const trackingUrl = `/track/${encodeURIComponent(order.trackingToken)}`;

    return jsonResponse({
      ok: true,
      trackingToken: order.trackingToken,
      trackingUrl,
    });
  } catch (error) {
    console.error("Unable to look up order.", error);
    return jsonResponse(
      { ok: false, error: "Unable to check order status right now." },
      500,
    );
  }
}
