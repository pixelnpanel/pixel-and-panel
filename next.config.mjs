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
  // business-cards, flyers, brochures and postcards were removed from this list
  // when the SinaLite print catalog landed: each is now a live sheet category,
  // and leaving the redirect in place would shadow its page (see the NOTE above).
  const toHub = [
    "yard-signs", "car-magnets",
    "storefront-signs", "metal-signs", "coroplast-signs",
    "a-frame-signs", "menus",
    "table-covers", "acrylic-signs",
    "monument-signs", "pylon-signs",
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

// The SinaLite print catalog first shipped as 17 categories, eight of them
// holding a single product — a category page with one product is only a worse
// copy of that product's page. Consolidated to 7 while the URLs were still days
// old and barely indexed, which is the cheapest this change will ever be.
const printCategoryMerges = {
  flyers: "flyers-brochures-and-booklets",
  brochures: "flyers-brochures-and-booklets",
  booklets: "flyers-brochures-and-booklets",
  "presentation-folders": "flyers-brochures-and-booklets",
  bookmarks: "flyers-brochures-and-booklets",
  postcards: "postcards-and-direct-mail",
  "door-hangers": "postcards-and-direct-mail",
  "greeting-cards-and-invitations": "cards-invitations-and-event-print",
  "tickets-and-calendars": "cards-invitations-and-event-print",
  "table-tents-and-tear-cards": "cards-invitations-and-event-print",
  "letterhead-and-envelopes": "stationery-and-business-forms",
  notepads: "stationery-and-business-forms",
  "ncr-forms": "stationery-and-business-forms",
  "labels-and-stickers": "labels-stickers-and-packaging",
  "packaging-and-boxes": "labels-stickers-and-packaging",
};

const printMergeRedirects = [
  // Tear cards were the one product to split away from its old category-mate,
  // so it has to match before the wildcard below sweeps the rest of
  // table-tents-and-tear-cards to the event-print category. Order matters here.
  {
    source: "/signage/table-tents-and-tear-cards/tear-cards",
    destination: "/signage/postcards-and-direct-mail/tear-cards",
    statusCode: 301,
  },
  // The :product wildcard carries every product URL across with its category,
  // so no individual product redirect has to be maintained by hand.
  ...Object.entries(printCategoryMerges).flatMap(([from, to]) => [
    { source: `/signage/${from}`, destination: `/signage/${to}`, statusCode: 301 },
    { source: `/signage/${from}/:product`, destination: `/signage/${to}/:product`, statusCode: 301 },
  ]),
];

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

// ── Content Security Policy ──────────────────────────────────────────────────
//
// This was sent as Content-Security-Policy-Report-Only with no report-uri and
// no report-to, so nothing was ever blocked and nothing was ever reported — a
// header on every response buying nothing. It had also fallen behind the tags
// actually running: Meta and Pinterest were both absent, and the Pinterest
// iframe had no frame-src to fall back on at all. It is now accurate and
// enforced.
//
// The origin list below is not guesswork. It is every origin the live site
// requests, read off the browser's resource timings on the homepage and the
// quote page after letting the tag manager settle.
//
// ⚠ READ THIS BEFORE ADDING A TAG IN GOOGLE TAG MANAGER.
// The policy is enforced, so a tag whose origin is not listed here will be
// silently blocked — the tag simply will not fire. Adding a new vendor in GTM
// (Google Ads, TikTok, LinkedIn, a chat widget…) means adding its origins to
// the matching directives here and deploying. Violations are visible in the
// browser console as "Refused to load …", which is where to look first if a
// newly added tag reports no data.
//
// 'unsafe-inline' in script-src is unavoidable while GTM and Next's own
// bootstrap inline their scripts, and it does weaken the anti-XSS value. The
// rest still earns its place: an injected <script src> from an unlisted host
// is blocked, base-uri stops a base tag hijacking every relative URL, and
// form-action stops an injected form posting to somewhere else.
const GOOGLE = ["https://www.googletagmanager.com", "https://www.google-analytics.com"];
const GOOGLE_BEACONS = ["https://analytics.google.com", "https://stats.g.doubleclick.net"];
const META = ["https://connect.facebook.net", "https://www.facebook.com"];
const PINTEREST = ["https://s.pinimg.com", "https://ct.pinterest.com"];

const directive = (...parts) => parts.flat().filter(Boolean).join(" ");

const contentSecurityPolicy = [
  directive("default-src 'self'"),
  directive(
    "script-src 'self' 'unsafe-inline'",
    process.env.NODE_ENV === "development" ? "'unsafe-eval'" : "",
    GOOGLE, META, PINTEREST, vercelInsights,
  ),
  directive("style-src 'self' 'unsafe-inline'"),
  // Tag vendors deliver tracking pixels as images, including Meta's 1x1
  // <noscript> pixel on every page.
  directive("img-src 'self' data: blob:", GOOGLE, GOOGLE_BEACONS, META, PINTEREST),
  directive("font-src 'self' data:"),
  directive(
    "connect-src 'self'",
    GOOGLE, GOOGLE_BEACONS, PINTEREST,
    "https://*.supabase.co",
    vercelInsights,
  ),
  // Pinterest's conversion tag mounts an iframe. Without this it falls through
  // to default-src 'self' and is blocked.
  directive("frame-src", PINTEREST, META),
  directive("frame-ancestors 'none'"),
  directive("base-uri 'self'"),
  directive("form-action 'self'"),
  directive("object-src 'none'"),
  directive("upgrade-insecure-requests"),
].join("; ");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    globalNotFound: true,
  },

  images: {
    formats: ["image/avif", "image/webp"],
    // Optimized variants are keyed by source path + width + quality, and the
    // source files never change in place (a new photo gets a new filename), so
    // there is nothing to invalidate. Without this the default TTL sends
    // browsers back to revalidate constantly.
    minimumCacheTTL: 31536000,
  },

  async redirects() {
    return [
      ...oldServiceAreaRedirects,
      ...oldSignageProductRedirects,
      ...printMergeRedirects,
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
          { key: "Content-Security-Policy", value: contentSecurityPolicy },
        ],
      },
      {
        // Everything Next.js fingerprints (/_next/static) already ships as
        // immutable, but files served straight out of /public inherit a
        // revalidate-every-time default — so every repeat visit re-checked
        // every sign photo, and the /signage hub alone renders 26 of them.
        //
        // These are safe to pin: a replacement image is a new filename (see
        // the image-prompts docs), never an edit in place. If one ever is
        // edited in place, rename it rather than shortening this.
        source: "/:dir(images|logo|og|reviews)/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
