const oldServiceAreaRedirects = [
  { service: "car-magnets", destination: "/signage/car-magnets" },
  { service: "vehicle-wraps", destination: "/signage/vehicle-graphics" },
  { service: "website-design", destination: "/digital/web-development" },
  { service: "metal-signs", destination: "/signage/metal-signs" },
].map(({ service, destination }) => ({
  source: `/service-area/:city(beaumont-tx|nederland-tx|port-arthur-tx)/${service}`,
  destination,
  statusCode: 301,
}));

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

  images: {
    formats: ["image/avif", "image/webp"],
  },

  async redirects() {
    return [
      ...oldServiceAreaRedirects,
      {
        source: "/digital/qr-campaigns",
        destination: "/digital/qr-code-campaigns",
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
