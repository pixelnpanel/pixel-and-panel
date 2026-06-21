import { SIGN_CATALOG_DESTINATION_URL, SIGN_CATALOG_PATH } from "./sign-catalog";

export function trackSignCatalogClick(sourceLocation) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;

  window.gtag("event", "sign_catalog_click", {
    source_location: sourceLocation,
    link_url: SIGN_CATALOG_PATH,
    outbound_url: SIGN_CATALOG_DESTINATION_URL,
    transport_type: "beacon",
  });
}
