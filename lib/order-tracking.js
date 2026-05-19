export const DEMO_ORDER = {
  orderNumber: "PNP-1007",
  projectName: "Storefront sign and window graphics",
  companyName: "Maria's Boutique",
  customerName: "Maria G.",
  customerEmail: "customer@example.com",
  customerPhone: "(409) 800-6139",
  productName: "Storefront sign + window graphics package",
  productService: "Storefront Signs",
  quantity: 3,
  unitRate: 450,
  orderDate: "2026-05-15",
  paymentStatus: "Invoice sent",
  proofStatus: "Waiting for approval",
  deliveryMethod: "Install scheduled after approval",
  status: "proof_ready",
  statusLabel: "Proof ready",
  nextAction: "Review the design proof and send approval or changes.",
  dueDate: "2026-05-24",
  publicNote:
    "Your first proof is ready for review. Production starts after approval.",
  updates: [
    {
      title: "Quote received",
      body: "Project details were received and reviewed.",
      status: "quote_received",
      createdAt: "2026-05-15T15:00:00.000Z",
    },
    {
      title: "Proof ready",
      body: "Design proof is ready. Please review before production.",
      status: "proof_ready",
      createdAt: "2026-05-16T10:30:00.000Z",
    },
  ],
  files: [
    {
      label: "Design proof",
      fileUrl: "/quote-request",
      fileType: "proof-link",
    },
  ],
};

const statusLabels = {
  quote_received: "Quote received",
  review_in_progress: "Review in progress",
  proof_ready: "Proof ready",
  awaiting_approval: "Awaiting approval",
  in_production: "In production",
  install_scheduled: "Install scheduled",
  completed: "Completed",
};

function requiredEnv() {
  return {
    url: process.env.SUPABASE_URL,
    serviceKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  };
}

export function isSupabaseConfigured() {
  const { url, serviceKey } = requiredEnv();
  return Boolean(url && serviceKey);
}

function normalizeText(value) {
  return String(value || "").trim();
}

export function normalizeOrderNumber(value) {
  return normalizeText(value).toUpperCase();
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

export function mapOrder(order, updates = [], files = []) {
  const status = order.status || "review_in_progress";
  const companyName = order.company_name || order.companyName || "";
  const customerName = order.customer_name || order.customerName || "";

  return {
    orderNumber: order.order_number || order.orderNumber,
    projectName: order.project_name || order.projectName || "Pixel & Panel project",
    companyName,
    customerName: companyName && customerName === companyName ? "" : customerName,
    customerEmail: order.customer_email || order.customerEmail || "",
    customerPhone: order.customer_phone || order.customerPhone || "",
    productName: order.product_name || order.productName || order.project_name || order.projectName || "Project",
    productService: order.product_service || order.productService || "Project",
    quantity: order.quantity || order.quantity === 0 ? order.quantity : 1,
    unitRate: order.unit_rate || order.unitRate || null,
    orderDate: order.order_date || order.orderDate || null,
    paymentStatus: order.payment_status || order.paymentStatus || "Not available",
    proofStatus: order.proof_status || order.proofStatus || "Not available",
    deliveryMethod: order.delivery_method || order.deliveryMethod || "",
    status,
    statusLabel: statusLabels[status] || status,
    nextAction: order.next_action || order.nextAction || "",
    dueDate: order.due_date || order.dueDate || null,
    publicNote: order.public_note || order.publicNote || "",
    updates: updates.map((update) => ({
      title: update.title,
      body: update.body,
      status: update.status,
      createdAt: update.created_at || update.createdAt,
    })),
    files: files.map((file) => ({
      label: file.label,
      fileUrl: file.file_url || file.fileUrl,
      fileType: file.file_type || file.fileType,
    })),
  };
}

function buildSupabaseErrorMessage(status, text) {
  if (!text) return `Supabase request failed with ${status}.`;

  try {
    const parsed = JSON.parse(text);
    return parsed.message || parsed.error || `Supabase request failed with ${status}.`;
  } catch {
    return text;
  }
}

export async function supabaseFetch(path, options = {}) {
  const { url, serviceKey } = requiredEnv();

  if (!url || !serviceKey) {
    throw new Error("Supabase order tracking is not configured.");
  }

  const response = await fetch(`${url.replace(/\/$/, "")}/rest/v1/${path}`, {
    method: options.method || "GET",
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...(options.headers || {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
    cache: "no-store",
  });

  const text = await response.text();

  if (!response.ok) {
    const error = new Error(buildSupabaseErrorMessage(response.status, text));
    error.status = response.status;
    error.responseText = text;
    throw error;
  }

  if (!text) return null;

  return JSON.parse(text);
}

async function findSupabaseOrder(orderNumber, contact) {
  const encodedOrder = encodeURIComponent(orderNumber);
  const orders = await supabaseFetch(
    `orders?select=*&order_number=eq.${encodedOrder}&limit=1`,
  );

  const order = orders?.[0];
  if (!order || !contactMatches(order, contact)) return null;

  const encodedId = encodeURIComponent(order.id);
  const [updates, files] = await Promise.all([
    supabaseFetch(
      `order_updates?select=*&order_id=eq.${encodedId}&is_customer_visible=eq.true&order=created_at.asc`,
    ),
    supabaseFetch(
      `order_files?select=*&order_id=eq.${encodedId}&is_customer_visible=eq.true&order=created_at.asc`,
    ),
  ]);

  return mapOrder(order, updates, files);
}

function findDemoOrder(orderNumber, contact) {
  const demoContactMatches =
    normalizeEmail(contact) === "customer@example.com" ||
    normalizePhone(contact) === "4098006139";

  if (orderNumber !== DEMO_ORDER.orderNumber || !demoContactMatches) return null;

  return DEMO_ORDER;
}

export async function findOrderForCustomer({ orderNumber, contact }) {
  const normalizedOrderNumber = normalizeOrderNumber(orderNumber);

  if (!normalizedOrderNumber || !normalizeText(contact)) return null;

  const { url, serviceKey } = requiredEnv();
  if (url && serviceKey) {
    return findSupabaseOrder(normalizedOrderNumber, contact);
  }

  return findDemoOrder(normalizedOrderNumber, contact);
}

export { statusLabels };
