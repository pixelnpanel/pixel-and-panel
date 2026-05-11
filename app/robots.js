export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: "https://pixelnpanel.com/sitemap.xml",
    host: "https://pixelnpanel.com",
  };
}
