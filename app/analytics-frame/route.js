import { analyticsRelayOrigin } from "@/lib/analytics-privacy";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-JF7FQTJRHJ";
const META_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID || "";
const GTM_ID = "GTM-W5NHMVJF";

export function GET(request) {
  const url = new URL(request.url);
  if (request.headers.has("host")) url.host = request.headers.get("host");
  const parent = analyticsRelayOrigin(url);
  if (!parent) return new Response(null, { status: 404 });
  const config = JSON.stringify({
    parent,
    ga: /^G-[A-Z0-9]+$/.test(GA_ID) ? GA_ID : "",
    meta: /^\d+$/.test(META_ID) ? META_ID : "",
    gtm: GTM_ID,
  });
  return new Response(`<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Site analytics</title></head><body>
<script>window.pixelPanelAnalytics = ${config};</script>
<script src="/analytics-relay.js"></script></body></html>`, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "X-Robots-Tag": "noindex, nofollow",
      "Cache-Control": "no-store",
    },
  });
}
