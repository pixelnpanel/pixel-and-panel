// Meta (Facebook) Pixel helper. Every call is guarded so it no-ops during
// server render or before the base fbevents script has loaded.

export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;

export function pageview() {
  if (typeof window === "undefined" || !window.fbq) return;
  window.fbq("track", "PageView");
}

export function event(name, options = {}) {
  if (typeof window === "undefined" || !window.fbq) return;
  window.fbq("track", name, options);
}
