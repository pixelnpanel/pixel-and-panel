const PRIVATE_PATH = /^\/(?:admin|api|track|track-order|es\/rastrear-pedido|analytics-frame)(?:\/|$)/i;
const PUBLIC_PATH = /^\/(?:[a-z0-9-]+(?:\/[a-z0-9-]+){0,3})?$/i;

export function analyticsRelayOrigin(url) {
  const parsed = new URL(url);
  if (parsed.origin === "https://www.pixelnpanel.com") return "https://www.pixelandpanel.com";
  if (parsed.origin === "https://www.pixelandpanel.com") return "https://www.pixelnpanel.com";
  if (parsed.protocol === "http:" && parsed.hostname === "127.0.0.1") return `http://localhost:${parsed.port}`;
  if (parsed.protocol === "http:" && parsed.hostname === "localhost") return `http://127.0.0.1:${parsed.port}`;
  return null;
}

export function analyticsPath(pathname) {
  if (!PUBLIC_PATH.test(pathname) || PRIVATE_PATH.test(pathname)) return null;
  return pathname;
}

export function analyticsUrl(value, origin) {
  try {
    const url = new URL(value, origin);
    const path = analyticsPath(url.pathname);
    return path && url.origin === origin ? origin + path : null;
  } catch {
    return null;
  }
}

export function analyticsReferrer(value) {
  try {
    const url = new URL(value);
    return ["https:", "http:"].includes(url.protocol) ? `${url.origin}/` : "";
  } catch {
    return "";
  }
}

const VALUES = {
  language: ["English", "Spanish"],
  request_type: ["general", "product", "package", "signage"],
  option_field: ["size", "custom_width", "custom_height", "print_option", "quantity"],
  error_type: ["invalid_email", "submission_failed"],
  source_location: ["product_footer", "product_calculator", "mobile_product_bar", "signage_page"],
};

const EVENT_FIELDS = {
  quote_start: ["item_id", "category_id", "source_location", "language"],
  calculator_interaction: ["item_id", "category_id", "option_field"],
  quote_form_step_view: ["step_number", "total_steps", "language", "request_type"],
  quote_form_start: ["language", "request_type"],
  quote_form_error: ["error_type", "step_number", "language"],
  extended_catalog_click: ["source_location"],
};

export const FORM_IDS = ["quote", "contact", "visibility"];
export const CONTACT_CHANNELS = ["phone", "whatsapp"];
const PACKAGE_IDS = new Map([
  ["Launch Page", "launch-page"],
  ["Página de lanzamiento", "launch-page"],
  ["Starter Web Presence", "starter-web-presence"],
  ["Presencia web inicial", "starter-web-presence"],
  ["Local Business Website", "local-business-website"],
  ["Sitio web para negocio local", "local-business-website"],
  ["Website + Visibility Setup", "website-visibility-setup"],
  ["Sitio web + configuración de visibilidad", "website-visibility-setup"],
]);

export function analyticsPackageId(packageName) {
  return PACKAGE_IDS.get(packageName);
}

export function analyticsEvent(name, values, pathname) {
  if (!Object.hasOwn(EVENT_FIELDS, name)) return null;
  const fields = EVENT_FIELDS[name];
  const params = {};
  // Catalog IDs come from the rendered route, never from input or query params.
  const segments = pathname.split("/");
  const enProduct = segments.length === 4 && segments[1] === "signage";
  const esProduct = segments.length === 4 && segments[1] === "es" && segments[2] === "letreros";
  for (const key of fields) {
    const value = values[key];
    if (VALUES[key]?.includes(value)) params[key] = value;
    if (["step_number", "total_steps"].includes(key) && [1, 2, 3].includes(value)) params[key] = value;
    if (key === "item_id" && (enProduct || esProduct)) params[key] = segments[3];
    if (key === "category_id" && enProduct) params[key] = segments[2];
  }
  return params;
}
