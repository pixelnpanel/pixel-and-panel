import { BUSINESS_SCHEMA_REF, DEFAULT_OG_IMAGE_URL, DEFAULT_SITE_DESCRIPTION, SITE_URL } from "@/lib/seo";

export default function OrganizationJsonLd({ language = "en-US" }) {
  const isSpanish = language.startsWith("es");
  const jsonLd = {
    ...BUSINESS_SCHEMA_REF,
    slogan: "Your Vision. Made Visible.",
    // `image` must be a raster file — Google's structured data image
    // requirements accept JPG, PNG and GIF only, so the SVG wordmark that used
    // to sit here was discarded and the schema effectively shipped imageless on
    // every page. The wordmark still gets represented, as `logo`.
    image: DEFAULT_OG_IMAGE_URL,
    logo: `${SITE_URL}/logo/icon-wordmark.svg`,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-409-225-2012",
      email: "hello@pixelnpanel.com",
      contactType: "customer service",
      availableLanguage: ["English", "Spanish"],
      url: `${SITE_URL}${isSpanish ? "/es/contacto" : "/contact"}`,
    },
    description: isSpanish
      ? "Pixel & Panel diseña y envía letreros, banners, rotulación vehicular e impresos a todo Estados Unidos. También creamos sitios web para negocios."
      : DEFAULT_SITE_DESCRIPTION,
    sameAs: [
      "https://maps.app.goo.gl/ssAtkxp8XqtEuJ7T9",
      "https://www.facebook.com/pixelnpanel",
      "https://www.instagram.com/pixelnpanel/",
      "https://www.youtube.com/@pixelnpanel",
      "https://www.pinterest.com/pixelnpanel",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            jsonLd,
            {
              "@type": "WebSite",
              "@id": `${SITE_URL}/#website`,
              url: `${SITE_URL}/`,
              name: "Pixel & Panel",
              alternateName: "Pixel & Panel LLC",
              inLanguage: ["en-US", "es-US"],
              publisher: { "@id": BUSINESS_SCHEMA_REF["@id"] },
            },
          ],
        }).replace(/</g, "\\u003c"),
      }}
    />
  );
}
