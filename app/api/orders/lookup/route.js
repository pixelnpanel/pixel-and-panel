import { findOrderForCustomer } from "@/lib/order-tracking";
import { getClientIp, rateLimit, rateLimitResponse } from "@/lib/rate-limit";

export const runtime = "nodejs";

function jsonResponse(body, status = 200) {
  return Response.json(body, { status });
}

export async function POST(request) {
  const ip = getClientIp(request);
  const limiter = rateLimit({
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
          error:
            "No matching order found. Check the order number and email or phone, or contact Pixel & Panel.",
        },
        404,
      );
    }

    return jsonResponse({ ok: true, order });
  } catch (error) {
    console.error("Unable to look up order.", error);
    return jsonResponse(
      { ok: false, error: "Unable to check order status right now." },
      500,
    );
  }
}
