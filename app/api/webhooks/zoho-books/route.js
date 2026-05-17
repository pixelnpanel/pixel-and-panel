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

function normalizeKey(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function collectCustomFields(value, fields = {}) {
  if (!value || typeof value !== "object") return fields;

  const customFields = Array.isArray(value.custom_fields) ? value.custom_fields : [];
  for (const field of customFields) {
    const label = field.label || field.name || field.api_name || field.placeholder;
    const fieldValue =
      field.value_formatted ??
      field.value ??
      field.text ??
      field.date ??
      "";
    if (label) fields[normalizeKey(label)] = fieldValue;
  }

  for (const key of ["salesorder", "estimate", "invoice", "data"]) {
    collectCustomFields(value[key], fields);
  }

  return fields;
}

function fieldValue(fields, names) {
  for (const name of names) {
    const value = fields[normalizeKey(name)];
    if (String(value || "").trim()) return String(value).trim();
  }
  return "";
}

function trackingStatus(value) {
  const normalized = normalizeKey(value);
  const statuses = {
    quote_received: "quote_received",
    quote_received_review: "quote_received",
    review_in_progress: "review_in_progress",
    design_review: "review_in_progress",
    proof_ready: "proof_ready",
    awaiting_approval: "awaiting_approval",
    waiting_for_approval: "awaiting_approval",
    in_production: "in_production",
    production: "in_production",
    install_scheduled: "install_scheduled",
    installation_scheduled: "install_scheduled",
    completed: "completed",
    complete: "completed",
  };

  return statuses[normalized] || "";
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

function buildWebsiteUpdate(payload) {
  const status = extractStatus(payload);
  const fields = collectCustomFields(payload);
  const nextStatus = trackingStatus(
    fieldValue(fields, [
      "Website Tracking Status",
      "Tracking Status",
      "Customer Status",
      "Project Status",
    ]),
  );
  const proofStatus = fieldValue(fields, ["Proof Status", "Website Proof Status"]);
  const nextAction = fieldValue(fields, ["Next Action", "Customer Next Action"]);
  const customerNote = fieldValue(fields, ["Customer Note", "Public Note", "Website Customer Note"]);
  const targetDate = fieldValue(fields, ["Target Date", "Due Date", "Install Date"]);
  const deliveryMethod = fieldValue(fields, ["Delivery / Install", "Delivery Method", "Install Method"]);

  const update = {
    paymentStatus: paymentLabel(status) || undefined,
    status: nextStatus || undefined,
    proofStatus: proofStatus || undefined,
    nextAction: nextAction || undefined,
    dueDate: targetDate || undefined,
    deliveryMethod: deliveryMethod || undefined,
    publicNote:
      customerNote ||
      (status ? `Zoho Books status updated: ${status}` : undefined),
    updateTitle: "Zoho Books updated",
    updateBody:
      customerNote ||
      (nextStatus ? `Project status changed to ${nextStatus.replace(/_/g, " ")}.` : "") ||
      (status ? `Accounting status changed to ${status}.` : "") ||
      "Zoho Books sent an update.",
  };

  return Object.fromEntries(
    Object.entries(update).filter(([, value]) => value !== undefined && value !== ""),
  );
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

  const result = await updateAdminOrder(orderNumber, buildWebsiteUpdate(payload));

  if (!result.ok) {
    return jsonResponse({ ok: false, error: result.error }, result.status || 400);
  }

  return jsonResponse({ ok: true });
}
