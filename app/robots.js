export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // NOTE: /_next/image intentionally NOT disallowed — pages serve sign
        // photos through it, and blocking it kept them out of Google Images.
        disallow: ["/api/"],
      },
    ],
    sitemap: "https://www.pixelnpanel.com/sitemap.xml",
    host: "https://www.pixelnpanel.com",
  };
}
