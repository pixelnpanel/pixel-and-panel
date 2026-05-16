import { isAdminAuthorized, unauthorizedResponse } from "@/lib/admin-auth";
import {
  getAdminOrderRecord,
  updateAdminOrderZohoRefs,
} from "@/lib/admin-orders";
import { syncOrderToZohoBooks } from "@/lib/zoho-books";

export const runtime = "nodejs";

function jsonResponse(body, status = 200) {
  return Response.json(body, { status });
}

export async function POST(request, { params }) {
  if (!isAdminAuthorized(request)) return unauthorizedResponse();

  const { orderNumber } = await params;
  let body = {};
  try {
    body = await request.json();
  } catch {}

  try {
    const order = await getAdminOrderRecord(orderNumber);
    if (!order) {
      return jsonResponse(
        { ok: false, error: "Order not found or Supabase is not configured." },
        404,
      );
    }

    const result = await syncOrderToZohoBooks(order, body.mode || "estimate");
    if (!result.ok) {
      return jsonResponse({ ok: false, error: result.error }, result.status || 400);
    }

    await updateAdminOrderZohoRefs(orderNumber, result);
    return jsonResponse(result);
  } catch (error) {
    console.error("Unable to sync order to Zoho Books.", error);
    return jsonResponse(
      { ok: false, error: error.message || "Unable to sync Zoho Books." },
      500,
    );
  }
}
