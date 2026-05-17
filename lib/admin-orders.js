import {
  DEMO_ORDER,
  isSupabaseConfigured,
  mapOrder,
  normalizeEmail,
  normalizeOrderNumber,
  normalizePhone,
  statusLabels,
  supabaseFetch,
} from "@/lib/order-tracking";

function normalizeDate(value) {
  const trimmed = String(value || "").trim();
  return trimmed || null;
}

function normalizeOptional(value) {
  return String(value || "").trim() || null;
}

function normalizeQuantity(value) {
  const parsed = Number.parseInt(String(value || "1"), 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
}

function orderPayload(input) {
  return {
    order_number: normalizeOrderNumber(input.orderNumber),
    customer_name: String(input.customerName || "").trim(),
    customer_email: normalizeEmail(input.customerEmail) || null,
    customer_phone: normalizePhone(input.customerPhone) || null,
    project_name: String(input.projectName || "").trim(),
    product_name: normalizeOptional(input.productName) || String(input.projectName || "").trim(),
    product_service: normalizeOptional(input.productService),
    quantity: normalizeQuantity(input.quantity),
    unit_rate: Number(input.unitRate || 0) || null,
    order_date: normalizeDate(input.orderDate) || new Date().toISOString().slice(0, 10),
    payment_status: normalizeOptional(input.paymentStatus) || "Not invoiced",
    proof_status: normalizeOptional(input.proofStatus) || "Not ready",
    delivery_method: normalizeOptional(input.deliveryMethod),
    status: input.status || "quote_received",
    next_action: normalizeOptional(input.nextAction),
    due_date: normalizeDate(input.dueDate),
    public_note: normalizeOptional(input.publicNote),
  };
}

function updatePayload(input) {
  const payload = {};
  const allowed = {
    customerName: "customer_name",
    customerEmail: "customer_email",
    customerPhone: "customer_phone",
    projectName: "project_name",
    productName: "product_name",
    productService: "product_service",
    quantity: "quantity",
    unitRate: "unit_rate",
    orderDate: "order_date",
    paymentStatus: "payment_status",
    proofStatus: "proof_status",
    deliveryMethod: "delivery_method",
    status: "status",
    nextAction: "next_action",
    dueDate: "due_date",
    publicNote: "public_note",
  };

  for (const [clientKey, dbKey] of Object.entries(allowed)) {
    if (Object.hasOwn(input, clientKey)) {
      if (clientKey === "customerEmail") payload[dbKey] = normalizeEmail(input[clientKey]) || null;
      else if (clientKey === "customerPhone") payload[dbKey] = normalizePhone(input[clientKey]) || null;
      else if (clientKey === "dueDate" || clientKey === "orderDate") payload[dbKey] = normalizeDate(input[clientKey]);
      else if (clientKey === "quantity") payload[dbKey] = normalizeQuantity(input[clientKey]);
      else if (clientKey === "unitRate") payload[dbKey] = Number(input[clientKey] || 0) || null;
      else payload[dbKey] = normalizeOptional(input[clientKey]);
    }
  }

  payload.updated_at = new Date().toISOString();
  return payload;
}

function validateBaseOrder(input) {
  const missing = [];
  if (!normalizeOrderNumber(input.orderNumber)) missing.push("order number");
  if (!String(input.customerName || "").trim()) missing.push("customer name");
  if (!String(input.projectName || "").trim()) missing.push("project name");
  if (!normalizeEmail(input.customerEmail) && !normalizePhone(input.customerPhone)) {
    missing.push("email or phone");
  }
  if (!statusLabels[input.status || "quote_received"]) missing.push("valid status");

  return missing;
}

async function getUpdatesAndFiles(orderIds) {
  if (orderIds.length === 0) return { updatesByOrder: new Map(), filesByOrder: new Map() };

  const idList = orderIds.map((id) => `"${id}"`).join(",");
  const [updates, files] = await Promise.all([
    supabaseFetch(`order_updates?select=*&order_id=in.(${idList})&order=created_at.asc`),
    supabaseFetch(`order_files?select=*&order_id=in.(${idList})&order=created_at.asc`),
  ]);

  const updatesByOrder = new Map();
  const filesByOrder = new Map();

  for (const update of updates || []) {
    const list = updatesByOrder.get(update.order_id) || [];
    list.push(update);
    updatesByOrder.set(update.order_id, list);
  }

  for (const file of files || []) {
    const list = filesByOrder.get(file.order_id) || [];
    list.push(file);
    filesByOrder.set(file.order_id, list);
  }

  return { updatesByOrder, filesByOrder };
}

export async function listAdminOrders() {
  if (!isSupabaseConfigured()) {
    return { configured: false, orders: [DEMO_ORDER] };
  }

  const orders = await supabaseFetch("orders?select=*&order=updated_at.desc&limit=50");
  const { updatesByOrder, filesByOrder } = await getUpdatesAndFiles(
    (orders || []).map((order) => order.id),
  );

  return {
    configured: true,
    orders: (orders || []).map((order) =>
      mapOrder(order, updatesByOrder.get(order.id) || [], filesByOrder.get(order.id) || []),
    ),
  };
}

export async function createAdminOrder(input) {
  const missing = validateBaseOrder(input);
  if (missing.length > 0) {
    return { ok: false, status: 400, error: `Missing ${missing.join(", ")}.` };
  }

  if (!isSupabaseConfigured()) {
    return { ok: false, status: 503, error: "Supabase is not configured yet." };
  }

  const created = await supabaseFetch("orders?select=*", {
    method: "POST",
    headers: { Prefer: "return=representation" },
    body: orderPayload(input),
  });
  const order = created?.[0];

  if (order) {
    await supabaseFetch("order_updates", {
      method: "POST",
      body: {
        order_id: order.id,
        status: order.status,
        title: statusLabels[order.status] || "Order created",
        body: input.updateBody || "Order was created in Pixel & Panel tracking.",
        is_customer_visible: true,
      },
    });
  }

  return { ok: true, orderNumber: order?.order_number };
}

export async function updateAdminOrder(orderNumber, input) {
  const normalizedOrderNumber = normalizeOrderNumber(orderNumber);
  if (!normalizedOrderNumber) {
    return { ok: false, status: 400, error: "Order number is required." };
  }

  if (!isSupabaseConfigured()) {
    return { ok: false, status: 503, error: "Supabase is not configured yet." };
  }

  if (input.status && !statusLabels[input.status]) {
    return { ok: false, status: 400, error: "Valid status is required." };
  }

  const updated = await supabaseFetch(
    `orders?order_number=eq.${encodeURIComponent(normalizedOrderNumber)}&select=*`,
    {
      method: "PATCH",
      headers: { Prefer: "return=representation" },
      body: updatePayload(input),
    },
  );
  const order = updated?.[0];

  if (!order) {
    return { ok: false, status: 404, error: "Order not found." };
  }

  if (input.updateBody || input.status) {
    await supabaseFetch("order_updates", {
      method: "POST",
      body: {
        order_id: order.id,
        status: order.status,
        title: input.updateTitle || statusLabels[order.status] || "Order updated",
        body: input.updateBody || `Status changed to ${statusLabels[order.status] || order.status}.`,
        is_customer_visible: input.isCustomerVisible !== false,
      },
    });
  }

  return { ok: true, orderNumber: order.order_number };
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
  if (!normalizedOrderNumber) return null;
  if (!isSupabaseConfigured()) return null;

  const orders = await supabaseFetch(
    `orders?select=*&order_number=eq.${encodeURIComponent(normalizedOrderNumber)}&limit=1`,
  );

  return orders?.[0] || null;
}
