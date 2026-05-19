import { isAdminAuthorized, unauthorizedResponse } from "@/lib/admin-auth";
import { createAdminOrder, listAdminOrders } from "@/lib/admin-orders";

export const runtime = "nodejs";

function jsonResponse(body, status = 200) {
  return Response.json(body, { status });
}

export async function GET(request) {
  if (!isAdminAuthorized(request)) return unauthorizedResponse();

  try {
    const data = await listAdminOrders();
    return jsonResponse({ ok: true, ...data });
  } catch (error) {
    console.error("Unable to list admin orders.", error);
    return jsonResponse({ ok: false, error: "Unable to load orders." }, 500);
  }
}

export async function POST(request) {
  if (!isAdminAuthorized(request)) return unauthorizedResponse();

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ ok: false, error: "Invalid request body." }, 400);
  }

  try {
    const result = await createAdminOrder(body || {});
    if (!result.ok) {
      return jsonResponse({ ok: false, error: result.error }, result.status || 400);
    }
    return jsonResponse(result, 201);
  } catch (error) {
    console.error("Unable to create admin order.", error);
    return jsonResponse({ ok: false, error: error.message || "Unable to create order." }, 500);
  }
}
