import { isAdminAuthorized, unauthorizedResponse } from "@/lib/admin-auth";
import { addAdminTimelineEvent } from "@/lib/admin-orders";

export const runtime = "nodejs";

function jsonResponse(body, status = 200) {
  return Response.json(body, { status });
}

export async function POST(request, { params }) {
  if (!isAdminAuthorized(request)) return unauthorizedResponse();

  const { orderNumber } = await params;
  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ ok: false, error: "Invalid request body." }, 400);
  }

  try {
    const result = await addAdminTimelineEvent(orderNumber, body || {});
    if (!result.ok) {
      return jsonResponse({ ok: false, error: result.error }, result.status || 400);
    }
    return jsonResponse(result, 201);
  } catch (error) {
    console.error("Unable to add order timeline event.", error);
    return jsonResponse(
      { ok: false, error: error.message || "Unable to add timeline update." },
      500,
    );
  }
}
