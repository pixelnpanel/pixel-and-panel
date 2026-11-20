const SHORT_REFERENCE = /^PNP-[A-Z0-9]{4}$/;
const LEGACY_REFERENCE = /^PNP-[A-F0-9]{12}$/;

export function isShortReference(value) {
  return typeof value === "string" && SHORT_REFERENCE.test(value);
}

export function isLeadReference(value) {
  return isShortReference(value) || (typeof value === "string" && LEGACY_REFERENCE.test(value));
}

export function shortReferencesEnabled() {
  return process.env.PNP_SHORT_REFERENCES_ENABLED === "1";
}
