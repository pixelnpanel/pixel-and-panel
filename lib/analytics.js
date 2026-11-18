import { analyticsEvent, analyticsPackageId, analyticsPath, analyticsReferrer, CONTACT_CHANNELS, FORM_IDS } from "./analytics-privacy.js";

let relay = null;
const pending = [];

export function attachAnalyticsRelay(frame, origin) {
  relay = (message) => frame.postMessage(message, origin);
  for (const message of pending.splice(0)) relay(message);
}

function send(type, payload) {
  if (typeof window === "undefined") return;
  const path = analyticsPath(window.location.pathname);
  if (!path) return;
  const message = { type, path, ...payload };
  if (relay) relay(message);
  else if (pending.length < 50) pending.push(message);
}

export function trackPageView() {
  send("page", { referrer: analyticsReferrer(document.referrer) });
}

export function trackEvent(name, values = {}) {
  if (typeof window === "undefined") return;
  const path = analyticsPath(window.location.pathname);
  if (!path) return;
  const params = analyticsEvent(name, values, path);
  if (params) send("event", { name, params });
}

export function trackLead(form, { language, packageName } = {}) {
  if (!FORM_IDS.includes(form)) return;
  send("lead", {
    form,
    language: language === "Spanish" ? "Spanish" : "English",
    packageId: analyticsPackageId(packageName),
  });
}

export function trackContactClick(channel) {
  if (CONTACT_CHANNELS.includes(channel)) send("contact", { channel });
}

export function trackProductView() {
  send("product");
}

export function trackExtendedCatalogClick(sourceLocation) {
  trackEvent("extended_catalog_click", { source_location: sourceLocation });
}
