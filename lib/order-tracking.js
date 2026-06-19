import {
  normalizeOrderStatus,
  normalizePaymentStatus,
  normalizeProductStatus,
  normalizeProofStatus,
  orderStatusLabels,
  paymentStatusLabels,
  productStatusLabels,
  proofStatusLabels,
} from "@/lib/order-status";
import { getSupabaseAdminClient, isSupabaseAdminConfigured } from "@/lib/supabase/admin";

export function isSupabaseConfigured() {
  return isSupabaseAdminConfigured();
}

function normalizeText(value) {
  return String(value || "").trim();
}

export function normalizeOrderNumber(value) {
  return normalizeText(value).toUpperCase();
}

export function normalizeTrackingToken(value) {
  return normalizeText(value);
}

export function normalizeEmail(value) {
  return normalizeText(value).toLowerCase();
}

export function normalizePhone(value) {
  return normalizeText(value).replace(/\D/g, "");
}

function contactMatches(order, contact) {
  const submittedEmail = normalizeEmail(contact);
  const submittedPhone = normalizePhone(contact);
  const orderEmail = normalizeEmail(order.customer_email || order.customerEmail);
  const orderPhone = normalizePhone(order.customer_phone || order.customerPhone);

  return (
    (submittedEmail && orderEmail && submittedEmail === orderEmail) ||
    (submittedPhone && orderPhone && submittedPhone === orderPhone)
  );
}

function pick(...values) {
  return values.find((value) => value !== undefined && value !== null && value !== "") ?? "";
}

function toNumberOrNull(value) {
  if (value === null || value === undefined || value === "") return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function mapTimelineEvent(event) {
  return {
    id: event.id,
    title: event.title || "Order update",
    description: event.description || event.body || "",
    body: event.description || event.body || "",
    isCustomerVisible: event.is_customer_visible !== false,
    createdAt: event.created_at || event.createdAt || null,
  };
}

export function mapOrder(order, timelineEvents = []) {
  const orderStatus = normalizeOrderStatus(pick(order.order_status, order.orderStatus, order.status));
  const paymentStatus = normalizePaymentStatus(pick(order.payment_status, order.paymentStatus));
  const proofStatus = normalizeProofStatus(pick(order.proof_status, order.proofStatus));
  const productStatus = normalizeProductStatus(
    pick(order.product_status, order.productStatus, order.delivery_method, order.deliveryMethod),
  );
  const company = pick(order.company, order.company_name, order.companyName);
  const customerName = pick(order.customer_name, order.customerName);
  const service = pick(order.service, order.product_service, order.productService);
  const targetDate = pick(order.target_date, order.targetDate, order.due_date, order.dueDate) || null;
  const unitPrice = toNumberOrNull(pick(order.unit_price, order.unitPrice, order.unit_rate, order.unitRate));
  const events = (timelineEvents || []).map(mapTimelineEvent);

  return {
    id: order.id || "",
    orderNumber: pick(order.order_number, order.orderNumber),
    trackingToken: pick(order.tracking_token, order.trackingToken),
    company,
    companyName: company,
    customerName: company && customerName === company ? "" : customerName,
    customerEmail: pick(order.customer_email, order.customerEmail),
    customerPhone: pick(order.customer_phone, order.customerPhone),
    projectName: pick(order.project_name, order.projectName) || "Pixel & Panel project",
    productName: pick(order.product_name, order.productName) || "Project",
    service,
    productService: service,
    quantity: order.quantity || order.quantity === 0 ? order.quantity : "",
    unitPrice,
    unitRate: unitPrice,
    invoiceNumber: pick(order.invoice_number, order.invoiceNumber),
    invoiceTotal: toNumberOrNull(pick(order.invoice_total, order.invoiceTotal)),
    paymentStatus,
    paymentStatusLabel: paymentStatusLabels[paymentStatus] || paymentStatus,
    paymentMethod: pick(order.payment_method, order.paymentMethod),
    paymentReference: pick(order.payment_reference, order.paymentReference),
    taxCollected: toNumberOrNull(pick(order.tax_collected, order.taxCollected)),
    shippingCharged: toNumberOrNull(pick(order.shipping_charged, order.shippingCharged)),
    stripeFee: toNumberOrNull(pick(order.stripe_fee, order.stripeFee)),
    orderStatus,
    status: orderStatus,
    orderStatusLabel: orderStatusLabels[orderStatus] || orderStatus,
    statusLabel: orderStatusLabels[orderStatus] || orderStatus,
    proofStatus,
    proofStatusLabel: proofStatusLabels[proofStatus] || proofStatus,
    productStatus,
    productStatusLabel: productStatusLabels[productStatus] || productStatus,
    deliveryMethod: productStatusLabels[productStatus] || productStatus,
    orderDate: pick(order.order_date, order.orderDate) || null,
    targetDate,
    dueDate: targetDate,
    publicNote: pick(order.public_note, order.publicNote),
    firstTimelineNote: pick(order.first_timeline_note, order.firstTimelineNote),
    internalNote: pick(order.internal_note, order.internalNote),
    vendorName: pick(order.vendor_name, order.vendorName),
    vendorOrderNumber: pick(order.vendor_order_number, order.vendorOrderNumber),
    vendorCost: toNumberOrNull(pick(order.vendor_cost, order.vendorCost)),
    trackingNumber: pick(order.tracking_number, order.trackingNumber),
    proofFileUrl: pick(order.proof_file_url, order.proofFileUrl),
    invoiceUrl: pick(order.invoice_url, order.invoiceUrl),
    designFileUrl: pick(order.design_file_url, order.designFileUrl),
    createdAt: pick(order.created_at, order.createdAt),
    updatedAt: pick(order.updated_at, order.updatedAt),
    timelineEvents: events,
    updates: events.map((event) => ({
      title: event.title,
      body: event.description,
      createdAt: event.createdAt,
    })),
    files: [],
  };
}

export function throwSupabaseError(error, fallbackMessage = "Supabase request failed.") {
  if (!error) return;
  throw new Error(error.message || fallbackMessage);
}

export function toCustomerOrder(order) {
  if (!order) return null;

  return {
    orderNumber: order.orderNumber,
    projectName: order.projectName,
    productName: order.productName,
    service: order.service,
    quantity: order.quantity,
    orderDate: order.orderDate,
    targetDate: order.targetDate,
    paymentStatus: order.paymentStatus,
    paymentStatusLabel: order.paymentStatusLabel,
    orderStatus: order.orderStatus,
    orderStatusLabel: order.orderStatusLabel,
    proofStatus: order.proofStatus,
    proofStatusLabel: order.proofStatusLabel,
    productStatus: order.productStatus,
    productStatusLabel: order.productStatusLabel,
    publicNote: order.publicNote,
    firstTimelineNote: order.firstTimelineNote,
    trackingNumber: order.trackingNumber,
    timelineEvents: (order.timelineEvents || [])
      .filter((event) => event.isCustomerVisible)
      .map((event) => ({
        title: event.title,
        description: event.description,
        createdAt: event.createdAt,
        isCustomerVisible: true,
      })),
  };
}

async function getTimelineEvents(orderId, customerVisibleOnly = false) {
  if (!orderId) return [];

  const supabase = getSupabaseAdminClient();
  let query = supabase
    .from("order_timeline_events")
    .select("*")
    .eq("order_id", orderId)
    .order("created_at", { ascending: true });

  if (customerVisibleOnly) {
    query = query.eq("is_customer_visible", true);
  }

  const { data, error } = await query;
  throwSupabaseError(error, "Unable to load order timeline.");
  return data || [];
}

export async function findOrderByTrackingToken(trackingToken) {
  const normalizedToken = normalizeTrackingToken(trackingToken);
  if (!normalizedToken || !isSupabaseConfigured()) return null;

  const supabase = getSupabaseAdminClient();
  const { data: order, error } = await supabase
    .from("orders")
    .select(
      "id, order_number, tracking_token, project_name, product_name, service, quantity, order_date, target_date, payment_status, order_status, proof_status, product_status, public_note, first_timeline_note, tracking_number",
    )
    .eq("tracking_token", normalizedToken)
    .maybeSingle();

  throwSupabaseError(error, "Unable to load order.");
  if (!order) return null;

  const timelineEvents = await getTimelineEvents(order.id, true);
  return toCustomerOrder(mapOrder(order, timelineEvents || []));
}

async function findSupabaseOrder(orderNumber, contact) {
  const supabase = getSupabaseAdminClient();
  const { data: order, error } = await supabase
    .from("orders")
    .select(
      "id, order_number, tracking_token, customer_email, customer_phone, project_name, product_name, service, quantity, order_date, target_date, payment_status, order_status, proof_status, product_status, public_note, first_timeline_note, tracking_number",
    )
    .eq("order_number", orderNumber)
    .maybeSingle();

  throwSupabaseError(error, "Unable to load order.");
  if (!order || !contactMatches(order, contact)) return null;

  const timelineEvents = await getTimelineEvents(order.id, true);
  return toCustomerOrder(mapOrder(order, timelineEvents || []));
}

export async function findOrderForCustomer({ orderNumber, contact }) {
  const normalizedOrderNumber = normalizeOrderNumber(orderNumber);

  if (!normalizedOrderNumber || !normalizeText(contact) || !isSupabaseConfigured()) return null;

  return findSupabaseOrder(normalizedOrderNumber, contact);
}
