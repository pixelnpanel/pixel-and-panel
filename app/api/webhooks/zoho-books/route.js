import { updateAdminOrder } from "@/lib/admin-orders";

export const runtime = "nodejs";

function jsonResponse(body, status = 200) {
  return Response.json(body, { status });
}

function isAuthorized(request) {
  const expected = process.env.ZOHO_WEBHOOK_SECRET;
  if (!expected) return false;

  const url = new URL(request.url);
  const querySecret = url.searchParams.get("secret");
  const headerSecret = request.headers.get("x-zoho-webhook-secret");

  return querySecret === expected || headerSecret === expected;
}

function extractReference(payload) {
  return (
    payload.reference_number ||
    payload.salesorder?.reference_number ||
    payload.estimate?.reference_number ||
    payload.invoice?.reference_number ||
    payload.data?.reference_number ||
    payload.data?.salesorder?.reference_number ||
    payload.data?.estimate?.reference_number ||
    payload.data?.invoice?.reference_number ||
    ""
  );
}

function extractStatus(payload) {
  return (
    payload.status ||
    payload.salesorder?.status ||
    payload.estimate?.status ||
    payload.invoice?.status ||
    payload.data?.status ||
    payload.data?.salesorder?.status ||
    payload.data?.estimate?.status ||
    payload.data?.invoice?.status ||
    ""
  );
}

function paymentLabel(status) {
  if (!status) return "";
  const normalized = String(status).toLowerCase();
  if (normalized.includes("paid")) return "Paid";
  if (normalized.includes("overdue")) return "Overdue";
  if (normalized.includes("sent")) return "Invoice sent";
  if (normalized.includes("draft")) return "Draft";
  return status;
}

export async function POST(request) {
  if (!isAuthorized(request)) {
    return jsonResponse({ ok: false, error: "Webhook secret is required." }, 401);
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return jsonResponse({ ok: false, error: "Invalid webhook payload." }, 400);
  }

  const orderNumber = extractReference(payload);
  if (!orderNumber) {
    return jsonResponse({ ok: true, ignored: true, reason: "Missing reference number." });
  }

  const status = extractStatus(payload);
  const result = await updateAdminOrder(orderNumber, {
    paymentStatus: paymentLabel(status) || undefined,
    publicNote: status ? `Zoho Books status updated: ${status}` : undefined,
    updateTitle: "Zoho Books updated",
    updateBody: status
      ? `Accounting status changed to ${status}.`
      : "Zoho Books sent an update.",
  });

  if (!result.ok) {
    return jsonResponse({ ok: false, error: result.error }, result.status || 400);
  }

  return jsonResponse({ ok: true });
}
