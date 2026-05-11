const canonicalDomainRedirects = [
  {
    source: "/:path*",
    has: [{ type: "host", value: "www.pixelnpanel.com" }],
    destination: "https://pixelnpanel.com/:path*",
    statusCode: 301,
  },
];

const oldServiceAreaRedirects = [
  { service: "car-magnets", destination: "/signage/car-magnets" },
  { service: "local-seo", destination: "/digital/local-seo" },
  { service: "vehicle-wraps", destination: "/signage/vehicle-graphics" },
  { service: "vinyl-banners", destination: "/signage/vinyl-banners" },
  { service: "website-design", destination: "/digital/web-development" },
  { service: "yard-signs", destination: "/signage/yard-signs" },
  { service: "metal-signs", destination: "/signage/metal-signs" },
].map(({ service, destination }) => ({
  source: `/service-area/:city(beaumont-tx|nederland-tx|port-arthur-tx)/${service}`,
  destination,
  statusCode: 301,
}));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    formats: ["image/avif", "image/webp"],
  },

  async redirects() {
    return [
      ...canonicalDomainRedirects,
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
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
