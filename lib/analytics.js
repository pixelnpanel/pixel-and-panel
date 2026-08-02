import { EXTENDED_CATALOG_URL } from "./sign-catalog";
import { event as metaEvent } from "./fpixel";

// The single place the site sends conversion events from.
//
// GA4 (G-JF7FQTJRHJ) is loaded by components/analytics/GoogleAnalytics.jsx.
// The GTM container carries the Meta and Pinterest tags but no GA4 tag, so
// that component is the only thing putting GA4 on the page — see the note in
// it before touching either.
//
// Nothing in this file loads a script; it only queues commands. gtag.js reads
// the shared `dataLayer` and treats an Arguments object as a gtag command (a
// plain array is read as a dataLayer *message* instead), so gtag() has to
// forward `arguments` verbatim and cannot be an arrow function. Queueing also
// means an event fired before gtag.js finishes loading is replayed once it
// does, so these are safe to call at any time.
function gtag() {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(arguments);
}

/** Send a GA4 event. Params follow GA4's recommended-parameter naming. */
export function trackEvent(name, params = {}) {
  gtag("event", name, params);
}

// Every form that produces a lead, in one table so adding a form is one entry
// and both platforms stay in sync. Meta's event name is intentionally the
// standard "Lead" for all three — Meta optimizes ad delivery against its own
// standard events, so a custom name there would be worth less than the extra
// detail is worth on the GA4 side.
const LEAD_FORMS = {
  quote: { ga: "quote_request_submitted", metaContent: "Quote Request" },
  contact: { ga: "contact_form_submitted", metaContent: "Contact Form" },
  visibility: { ga: "visibility_check_submitted", metaContent: "Free Visibility Check" },
};

/**
 * Fire a lead conversion on GA4 and Meta from one call.
 * `form` is a key of LEAD_FORMS; `label` is the product/service when known.
 */
export function trackLead(form, { label = "", language = "English" } = {}) {
  const preset = LEAD_FORMS[form];
  if (!preset) return;

  trackEvent(preset.ga, {
    event_category: "Lead",
    event_label: label || preset.metaContent,
    language,
    value: 1,
  });
  metaEvent("Lead", { content_name: preset.metaContent, currency: "USD" });
}

const CONTACT_CHANNELS = {
  phone: { ga: "phone_click", metaContent: "Phone Call" },
  whatsapp: { ga: "whatsapp_click", metaContent: "WhatsApp" },
};

/**
 * Fire a click-to-contact conversion. Called from ContactClickTracker's
 * delegated listener, so it covers links rendered anywhere — including ones
 * built at runtime, like the product calculator's prefilled WhatsApp message.
 */
export function trackContactClick(channel, { sourcePath = "" } = {}) {
  const preset = CONTACT_CHANNELS[channel];
  if (!preset) return;

  trackEvent(preset.ga, {
    event_category: "Contact",
    event_label: preset.metaContent,
    page_path: sourcePath,
  });
  metaEvent("Contact", { content_name: preset.metaContent });
}

export function trackExtendedCatalogClick(sourceLocation) {
  trackEvent("extended_catalog_click", {
    source_location: sourceLocation,
    outbound_url: EXTENDED_CATALOG_URL,
    transport_type: "beacon",
  });
}
