export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: "https://pixelnpanel.com/sitemap.xml",
    host: "https://pixelnpanel.com",
  };
}
