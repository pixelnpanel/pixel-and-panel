import { isAdminAuthorized, unauthorizedResponse } from "@/lib/admin-auth";
import { updateAdminOrder } from "@/lib/admin-orders";

export const runtime = "nodejs";

function jsonResponse(body, status = 200) {
  return Response.json(body, { status });
}

export async function PATCH(request, { params }) {
  if (!isAdminAuthorized(request)) return unauthorizedResponse();

  const { orderNumber } = await params;
  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ ok: false, error: "Invalid request body." }, 400);
  }

  try {
    const result = await updateAdminOrder(orderNumber, body || {});
    if (!result.ok) {
      return jsonResponse({ ok: false, error: result.error }, result.status || 400);
    }
    return jsonResponse(result);
  } catch (error) {
    console.error("Unable to update admin order.", error);
    return jsonResponse({ ok: false, error: "Unable to update order." }, 500);
  }
}
