const oldServiceAreaRedirects = [
  // The flat /signage/<product> catalog was replaced by the data-driven
  // /signage/<category>/<product> catalog, so these now point at the hub.
  { service: "car-magnets", destination: "/signage" },
  { service: "vehicle-wraps", destination: "/signage" },
  { service: "website-design", destination: "/digital/web-development" },
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
  // NOTE: never list a slug here that exists as a live sheet category
  // (e.g. event-tents, real-estate-signs) — the redirect would shadow the page.
  const toHub = [
    "yard-signs", "vehicle-graphics", "car-magnets",
    "window-graphics", "storefront-signs", "metal-signs", "coroplast-signs",
    "a-frame-signs", "business-cards", "flyers", "posters", "menus",
    "table-covers", "vehicle-lettering", "partial-vehicle-wraps",
    "perforated-window-graphics", "frosted-privacy-film", "acrylic-signs",
    "brochures", "postcards", "channel-letters", "monument-signs", "pylon-signs",
    "ada-signs", "lobby-signs", "dimensional-letters",
  ];
  return [
    ...toBanners.map((slug) => [slug, "/signage/banners"]),
    ...toStands.map((slug) => [slug, "/signage/banner-stands"]),
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

const scriptSrc = [
  "'self'",
  "'unsafe-inline'",
  process.env.NODE_ENV === "development" ? "'unsafe-eval'" : "",
  "https://www.googletagmanager.com",
  "https://www.google-analytics.com",
].filter(Boolean).join(" ");

const contentSecurityPolicyReportOnly = [
  "default-src 'self'",
  `script-src ${scriptSrc}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://www.google-analytics.com https://www.googletagmanager.com",
  "font-src 'self' data:",
  "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://*.supabase.co",
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
