import { EXTENDED_CATALOG_URL } from "./sign-catalog";

export function trackExtendedCatalogClick(sourceLocation) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;

  window.gtag("event", "extended_catalog_click", {
    source_location: sourceLocation,
    outbound_url: EXTENDED_CATALOG_URL,
    transport_type: "beacon",
  });
}
