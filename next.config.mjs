const oldServiceAreaRedirects = [
  // The flat /signage/<product> catalog was replaced by the data-driven
  // /signage/<category>/<product> catalog, so these now point at the hub.
  { service: "car-magnets", destination: "/signage" },
  { service: "vehicle-wraps", destination: "/signage" },
  // Keep city intent: this used to dump every city's /website-design URL on
  // the generic service hub, discarding the city signal even though a
  // /service-area/<city>/web-development page exists for all three cities.
  { service: "website-design", destination: "/service-area/:city/web-development" },
].map(({ service, destination }) => ({
  source: `/service-area/:city(beaumont-tx|nederland-tx|port-arthur-tx)/${service}`,
  destination,
  statusCode: 301,
}));

// 301s from the old flat /signage/<product> URLs to the new catalog. Banner and
// stand products map to their new category; everything else (categories no longer
// in the launch sheet) falls back to the /signage hub so no link equity is lost.
const oldSignageProductRedirects = (() => {
  const toBanners = ["vinyl-banners", "mesh-banners", "backlit-banners", "fabric-banners"];
  const toStands = ["retractable-banners", "step-and-repeat-backdrops"];
  // Old flat URLs whose intent a live category now serves exactly — send them
  // there instead of the generic hub so the city/product intent survives.
  const toDecals = [
    "vehicle-graphics", "vehicle-lettering", "partial-vehicle-wraps", "window-graphics",
    "perforated-window-graphics", "frosted-privacy-film",
  ];
  const toLetters = ["channel-letters"];
  const toCanvas = ["posters"];
  // NOTE: never list a slug here that exists as a live sheet category
  // (e.g. event-tents, real-estate-signs, dimensional-letters) — the redirect
  // would shadow the page. Check `CATEGORY_ORDER` in lib/signage/data.js before
  // adding to any list below.
  const toHub = [
    "yard-signs", "car-magnets",
    "storefront-signs", "metal-signs", "coroplast-signs",
    "a-frame-signs", "business-cards", "flyers", "menus",
    "table-covers", "acrylic-signs",
    "brochures", "postcards", "monument-signs", "pylon-signs",
    "ada-signs", "lobby-signs",
  ];
  return [
    ...toBanners.map((slug) => [slug, "/signage/banners"]),
    ...toStands.map((slug) => [slug, "/signage/banner-stands"]),
    ...toDecals.map((slug) => [slug, "/signage/vinyl-decals-and-window-graphics"]),
    ...toLetters.map((slug) => [slug, "/signage/dimensional-letters"]),
    ...toCanvas.map((slug) => [slug, "/signage/canvas-and-poster-prints"]),
    ...toHub.map((slug) => [slug, "/signage"]),
  ].map(([slug, destination]) => ({
    source: `/signage/${slug}`,
    destination,
    statusCode: 301,
  }));
})();

if (process.env.VERCEL === "1" && process.env.VERCEL_PREVIEW_COMMENTS_ENABLED === "1") {
  // Vercel CLI 54's Next adapter can crash before build when toolbar injection
  // receives an undefined projectDir. The toolbar is not needed for production.
  process.env.VERCEL_PREVIEW_COMMENTS_ENABLED = "0";
}

// Vercel Analytics + Speed Insights serve both their script and their beacon
// from this origin (/_vercel/insights/*, /_vercel/speed-insights/*) in
// production, so `'self'` already covers them. Only the dev build reaches out
// to Vercel's CDN for the debug script, so keep the prod policy tight.
const vercelInsights = process.env.NODE_ENV === "development" ? "https://va.vercel-scripts.com" : "";

const scriptSrc = [
  "'self'",
  "'unsafe-inline'",
  process.env.NODE_ENV === "development" ? "'unsafe-eval'" : "",
  "https://www.googletagmanager.com",
  "https://www.google-analytics.com",
  vercelInsights,
].filter(Boolean).join(" ");

const connectSrc = [
  "'self'",
  "https://www.google-analytics.com",
  "https://analytics.google.com",
  "https://*.supabase.co",
  vercelInsights,
].filter(Boolean).join(" ");

const contentSecurityPolicyReportOnly = [
  "default-src 'self'",
  `script-src ${scriptSrc}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://www.google-analytics.com https://www.googletagmanager.com",
  "font-src 'self' data:",
  `connect-src ${connectSrc}`,
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    globalNotFound: true,
  },

  images: {
    formats: ["image/avif", "image/webp"],
  },

  async redirects() {
    return [
      ...oldServiceAreaRedirects,
      ...oldSignageProductRedirects,
      {
        source: "/digital/qr-campaigns",
        destination: "/digital/qr-code-campaigns",
        statusCode: 301,
      },
      {
        source: "/terms",
        destination: "/terms-and-conditions",
        statusCode: 301,
      },
      {
        source: "/terms-of-service",
        destination: "/terms-and-conditions",
        statusCode: 301,
      },
      {
        source: "/refund-policy",
        destination: "/refund-reprint-policy",
        statusCode: 301,
      },
    ];
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          { key: "Content-Security-Policy-Report-Only", value: contentSecurityPolicyReportOnly },
        ],
      },
    ];
  },
};

export default nextConfig;
