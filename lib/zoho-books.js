import { normalizeEmail, normalizePhone } from "@/lib/order-tracking";

const DEFAULT_ACCOUNTS_URL = "https://accounts.zoho.com";
const DEFAULT_BOOKS_API_URL = "https://www.zohoapis.com/books/v3";

function zohoEnv() {
  return {
    clientId: process.env.ZOHO_CLIENT_ID,
    clientSecret: process.env.ZOHO_CLIENT_SECRET,
    refreshToken: process.env.ZOHO_REFRESH_TOKEN,
    organizationId: process.env.ZOHO_ORGANIZATION_ID,
    accountsUrl: process.env.ZOHO_ACCOUNTS_URL || DEFAULT_ACCOUNTS_URL,
    booksApiUrl: process.env.ZOHO_BOOKS_API_URL || DEFAULT_BOOKS_API_URL,
  };
}

export function isZohoConfigured() {
  const env = zohoEnv();
  return Boolean(
    env.clientId &&
      env.clientSecret &&
      env.refreshToken &&
      env.organizationId,
  );
}

function withOrganization(path, organizationId) {
  const separator = path.includes("?") ? "&" : "?";
  return `${path}${separator}organization_id=${encodeURIComponent(organizationId)}`;
}

async function getAccessToken() {
  const env = zohoEnv();
  if (!isZohoConfigured()) {
    throw new Error("Zoho Books is not configured.");
  }

  const params = new URLSearchParams({
    refresh_token: env.refreshToken,
    client_id: env.clientId,
    client_secret: env.clientSecret,
    grant_type: "refresh_token",
  });

  const response = await fetch(`${env.accountsUrl}/oauth/v2/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
    cache: "no-store",
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.access_token) {
    throw new Error(data.error || "Unable to refresh Zoho access token.");
  }

  return data.access_token;
}

async function zohoFetch(path, options = {}) {
  const env = zohoEnv();
  const accessToken = await getAccessToken();
  const response = await fetch(
    `${env.booksApiUrl}/${withOrganization(path, env.organizationId)}`,
    {
      method: options.method || "GET",
      headers: {
        Authorization: `Zoho-oauthtoken ${accessToken}`,
        ...(options.body ? { "Content-Type": "application/json" } : {}),
        ...(options.headers || {}),
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
      cache: "no-store",
    },
  );

  const data = await response.json().catch(() => ({}));
  if (!response.ok || (data.code && data.code !== 0)) {
    throw new Error(data.message || `Zoho Books request failed with ${response.status}.`);
  }

  return data;
}

function firstLastName(name) {
  const parts = String(name || "").trim().split(/\s+/);
  if (parts.length <= 1) return { firstName: parts[0] || "Customer", lastName: "" };
  return {
    firstName: parts.slice(0, -1).join(" "),
    lastName: parts.at(-1),
  };
}

async function createContact(order) {
  const email = normalizeEmail(order.customer_email || order.customerEmail);
  const phone = normalizePhone(order.customer_phone || order.customerPhone);
  const customerName = order.customer_name || order.customerName || "Customer";
  const { firstName, lastName } = firstLastName(customerName);

  const contact = await zohoFetch("contacts", {
    method: "POST",
    body: {
      contact_name: customerName,
      company_name: customerName,
      contact_type: "customer",
      billing_address: {},
      contact_persons: [
        {
          first_name: firstName,
          last_name: lastName,
          email,
          phone,
          mobile: phone,
          is_primary_contact: true,
        },
      ],
    },
  });

  return contact.contact?.contact_id;
}

function buildLineItem(order) {
  const quantity = Number(order.quantity || 1);
  const rate = Number(order.unit_rate || order.unitRate || 0);

  if (!rate || rate < 0) {
    throw new Error("Unit price is required before syncing to Zoho Books.");
  }

  return {
    name: order.product_name || order.productName || order.project_name || order.projectName,
    description: order.project_name || order.projectName || "",
    quantity,
    rate,
  };
}

async function createEstimate(order, contactId) {
  const payload = {
    customer_id: contactId,
    date: order.order_date || order.orderDate || new Date().toISOString().slice(0, 10),
    reference_number: order.order_number || order.orderNumber,
    line_items: [buildLineItem(order)],
    notes: order.public_note || order.publicNote || "",
  };

  const data = await zohoFetch("estimates", {
    method: "POST",
    body: payload,
  });

  return data.estimate;
}

async function createSalesOrder(order, contactId) {
  const payload = {
    customer_id: contactId,
    date: order.order_date || order.orderDate || new Date().toISOString().slice(0, 10),
    reference_number: order.order_number || order.orderNumber,
    line_items: [buildLineItem(order)],
    notes: order.public_note || order.publicNote || "",
  };

  const data = await zohoFetch("salesorders", {
    method: "POST",
    body: payload,
  });

  return data.salesorder;
}

export async function syncOrderToZohoBooks(order, mode = "estimate") {
  if (!isZohoConfigured()) {
    return { ok: false, status: 503, error: "Zoho Books is not configured yet." };
  }

  const contactId =
    order.zoho_contact_id ||
    order.zohoContactId ||
    (await createContact(order));

  if (!contactId) {
    return { ok: false, status: 502, error: "Unable to create Zoho contact." };
  }

  const document =
    mode === "sales_order"
      ? await createSalesOrder(order, contactId)
      : await createEstimate(order, contactId);

  return {
    ok: true,
    mode,
    contactId,
    estimateId: mode === "estimate" ? document?.estimate_id : undefined,
    salesOrderId: mode === "sales_order" ? document?.salesorder_id : undefined,
    documentNumber: document?.estimate_number || document?.salesorder_number,
    documentStatus: document?.status,
    total: document?.total,
  };
}
