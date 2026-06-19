import crypto from "crypto";
import {
  isSupabaseConfigured,
  mapOrder,
  normalizeEmail,
  normalizeOrderNumber,
  normalizePhone,
  normalizeTrackingToken,
  supabaseFetch,
} from "@/lib/order-tracking";
import {
  normalizeOrderStatus,
  normalizePaymentStatus,
  normalizeProductStatus,
  normalizeProofStatus,
} from "@/lib/order-status";

function normalizeDate(value) {
  const trimmed = String(value || "").trim();
  return trimmed || null;
}

function normalizeOptional(value) {
  return String(value || "").trim() || null;
}

function normalizeQuantity(value) {
  if (value === "" || value === null || value === undefined) return null;
  const parsed = Number.parseInt(String(value), 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
}

function normalizeNumeric(value) {
  if (value === "" || value === null || value === undefined) return null;
  const parsed = Number(String(value).replace(/,/g, ""));
  return Number.isFinite(parsed) ? parsed : null;
}

function generateTrackingToken() {
  return `o_${crypto.randomBytes(10).toString("base64url").toLowerCase()}`;
}

function baseOrderPayload(input, existingTrackingToken = "") {
  return {
    order_number: normalizeOrderNumber(input.orderNumber),
    tracking_token: normalizeTrackingToken(input.trackingToken) || existingTrackingToken || generateTrackingToken(),
    company: normalizeOptional(input.company),
    customer_name: normalizeOptional(input.customerName),
    customer_email: normalizeEmail(input.customerEmail) || null,
    customer_phone: normalizePhone(input.customerPhone) || null,
    project_name: normalizeOptional(input.projectName),
    product_name: normalizeOptional(input.productName),
    service: normalizeOptional(input.service),
    quantity: normalizeQuantity(input.quantity),
    unit_price: normalizeNumeric(input.unitPrice),
    invoice_number: normalizeOptional(input.invoiceNumber),
    invoice_total: normalizeNumeric(input.invoiceTotal),
    payment_status: normalizePaymentStatus(input.paymentStatus),
    payment_method: normalizeOptional(input.paymentMethod),
    payment_reference: normalizeOptional(input.paymentReference),
    tax_collected: normalizeNumeric(input.taxCollected),
    shipping_charged: normalizeNumeric(input.shippingCharged),
    stripe_fee: normalizeNumeric(input.stripeFee),
    order_status: normalizeOrderStatus(input.orderStatus),
    proof_status: normalizeProofStatus(input.proofStatus),
    product_status: normalizeProductStatus(input.productStatus),
    order_date: normalizeDate(input.orderDate),
    target_date: normalizeDate(input.targetDate),
    public_note: normalizeOptional(input.publicNote),
    first_timeline_note: normalizeOptional(input.firstTimelineNote),
    internal_note: normalizeOptional(input.internalNote),
    vendor_name: normalizeOptional(input.vendorName),
    vendor_order_number: normalizeOptional(input.vendorOrderNumber),
    vendor_cost: normalizeNumeric(input.vendorCost),
    tracking_number: normalizeOptional(input.trackingNumber),
    proof_file_url: normalizeOptional(input.proofFileUrl),
    invoice_url: normalizeOptional(input.invoiceUrl),
    design_file_url: normalizeOptional(input.designFileUrl),
  };
}

function updatePayload(input, existingTrackingToken = "") {
  const payload = baseOrderPayload(input, existingTrackingToken);
  payload.updated_at = new Date().toISOString();
  return payload;
}

function validateOrder(input) {
  const missing = [];
  if (!normalizeOrderNumber(input.orderNumber)) missing.push("order number");
  return missing;
}

function idListFilter(orderIds) {
  return orderIds.map((id) => `"${id}"`).join(",");
}

async function getTimelineEventsForOrderIds(orderIds) {
  if (orderIds.length === 0) return new Map();

  const events = await supabaseFetch(
    `order_timeline_events?select=*&order_id=in.(${idListFilter(orderIds)})&order=created_at.asc`,
  );
  const eventsByOrder = new Map();

  for (const event of events || []) {
    const list = eventsByOrder.get(event.order_id) || [];
    list.push(event);
    eventsByOrder.set(event.order_id, list);
  }

  return eventsByOrder;
}

async function createInitialTimelineEvent(order, input) {
  const firstNote = normalizeOptional(input.firstTimelineNote);
  if (!order?.id || !firstNote) return;

  await supabaseFetch("order_timeline_events", {
    method: "POST",
    body: {
      order_id: order.id,
      title: "Order received",
      description: firstNote,
      is_customer_visible: true,
    },
  });
}

export async function listAdminOrders() {
  if (!isSupabaseConfigured()) {
    return { configured: false, orders: [] };
  }

  const orders = await supabaseFetch("orders?select=*&order=updated_at.desc&limit=100");
  const eventsByOrder = await getTimelineEventsForOrderIds((orders || []).map((order) => order.id));

  return {
    configured: true,
    orders: (orders || []).map((order) => mapOrder(order, eventsByOrder.get(order.id) || [])),
  };
}

export async function createAdminOrder(input) {
  const missing = validateOrder(input);
  if (missing.length > 0) {
    return { ok: false, status: 400, error: `Missing ${missing.join(", ")}.` };
  }

  if (!isSupabaseConfigured()) {
    return { ok: false, status: 503, error: "Supabase is not configured yet." };
  }

  const created = await supabaseFetch("orders?select=*", {
    method: "POST",
    headers: { Prefer: "return=representation" },
    body: baseOrderPayload(input),
  });
  const order = created?.[0];

  if (order) {
    await createInitialTimelineEvent(order, input);
  }

  return {
    ok: true,
    orderNumber: order?.order_number,
    trackingToken: order?.tracking_token,
  };
}

export async function updateAdminOrder(orderNumber, input) {
  const normalizedOrderNumber = normalizeOrderNumber(orderNumber);
  if (!normalizedOrderNumber) {
    return { ok: false, status: 400, error: "Order number is required." };
  }

  if (!isSupabaseConfigured()) {
    return { ok: false, status: 503, error: "Supabase is not configured yet." };
  }

  const nextOrderNumber = normalizeOrderNumber(input.orderNumber);
  if (!nextOrderNumber) {
    return { ok: false, status: 400, error: "Order number is required." };
  }

  const existing = await getAdminOrderRecord(normalizedOrderNumber);
  if (!existing) {
    return { ok: false, status: 404, error: "Order not found." };
  }

  const updated = await supabaseFetch(
    `orders?order_number=eq.${encodeURIComponent(normalizedOrderNumber)}&select=*`,
    {
      method: "PATCH",
      headers: { Prefer: "return=representation" },
      body: updatePayload(input, existing.tracking_token),
    },
  );
  const order = updated?.[0];

  if (!order) {
    return { ok: false, status: 404, error: "Order not found." };
  }

  return {
    ok: true,
    orderNumber: order.order_number,
    trackingToken: order.tracking_token,
  };
}

export async function deleteAdminOrder(orderNumber) {
  const normalizedOrderNumber = normalizeOrderNumber(orderNumber);
  if (!normalizedOrderNumber) {
    return { ok: false, status: 400, error: "Order number is required." };
  }

  if (!isSupabaseConfigured()) {
    return { ok: false, status: 503, error: "Supabase is not configured yet." };
  }

  const deleted = await supabaseFetch(
    `orders?order_number=eq.${encodeURIComponent(normalizedOrderNumber)}&select=order_number`,
    {
      method: "DELETE",
      headers: { Prefer: "return=representation" },
    },
  );

  if (!deleted?.[0]) {
    return { ok: false, status: 404, error: "Order not found." };
  }

  return { ok: true, orderNumber: deleted[0].order_number };
}

export async function getAdminOrderRecord(orderNumber) {
  const normalizedOrderNumber = normalizeOrderNumber(orderNumber);
  if (!normalizedOrderNumber || !isSupabaseConfigured()) return null;

  const orders = await supabaseFetch(
    `orders?select=*&order_number=eq.${encodeURIComponent(normalizedOrderNumber)}&limit=1`,
  );

  return orders?.[0] || null;
}

export async function addAdminTimelineEvent(orderNumber, input) {
  const order = await getAdminOrderRecord(orderNumber);
  if (!order) {
    return { ok: false, status: 404, error: "Order not found." };
  }

  const title = normalizeOptional(input.title);
  if (!title) {
    return { ok: false, status: 400, error: "Timeline title is required." };
  }

  const created = await supabaseFetch("order_timeline_events?select=*", {
    method: "POST",
    headers: { Prefer: "return=representation" },
    body: {
      order_id: order.id,
      title,
      description: normalizeOptional(input.description),
      is_customer_visible: input.isCustomerVisible !== false,
    },
  });

  await supabaseFetch(`orders?id=eq.${encodeURIComponent(order.id)}`, {
    method: "PATCH",
    body: { updated_at: new Date().toISOString() },
  });

  return {
    ok: true,
    event: created?.[0] || null,
    orderNumber: order.order_number,
  };
}
