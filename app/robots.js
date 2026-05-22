export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: "https://www.pixelnpanel.com/sitemap.xml",
    host: "https://www.pixelnpanel.com",
  };
}
