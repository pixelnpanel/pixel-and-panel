import { DEFAULT_OG_IMAGE_URL, SITE_URL } from "@/lib/seo";

export default function LocalBusinessJsonLd({ language = "en-US" }) {
  const isSpanish = language.startsWith("es");
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": "https://www.pixelnpanel.com/#localbusiness",
    name: "Pixel & Panel",
    legalName: "Pixel & Panel LLC",
    url: "https://www.pixelnpanel.com",
    email: "hello@pixelnpanel.com",
    telephone: "+1-409-225-2012",
    slogan: "Your Vision. Made Visible.",
    priceRange: "$$",
    // `image` must be a raster file — Google's structured data image
    // requirements accept JPG, PNG and GIF only, so the SVG wordmark that used
    // to sit here was discarded and the schema effectively shipped imageless on
    // every page. The wordmark still gets represented, as `logo`.
    image: DEFAULT_OG_IMAGE_URL,
    logo: `${SITE_URL}/logo/icon-wordmark.svg`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Beaumont",
      addressRegion: "TX",
      postalCode: "77705",
      addressCountry: "US",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-409-225-2012",
      email: "hello@pixelnpanel.com",
      contactType: "customer service",
      availableLanguage: ["English", "Spanish"],
      url: `${SITE_URL}${isSpanish ? "/es/contacto" : "/contact"}`,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday", "Sunday"],
        opens: "12:00",
        closes: "16:00",
      },
    ],
    areaServed: [
      {
        "@type": "City",
        name: "Beaumont",
        address: {
          "@type": "PostalAddress",
          addressRegion: "TX",
          addressCountry: "US",
        },
      },
      {
        "@type": "City",
        name: "Nederland",
        address: {
          "@type": "PostalAddress",
          addressRegion: "TX",
          addressCountry: "US",
        },
      },
      {
        "@type": "City",
        name: "Port Arthur",
        address: {
          "@type": "PostalAddress",
          addressRegion: "TX",
          addressCountry: "US",
        },
      },
      {
        "@type": "AdministrativeArea",
        name: "Southeast Texas",
      },
      {
        "@type": "City",
        name: "Houston",
        address: {
          "@type": "PostalAddress",
          addressRegion: "TX",
          addressCountry: "US",
        },
      },
    ],
    description: isSpanish
      ? "Pixel & Panel ayuda a negocios del sureste de Texas y Houston a conseguir visibilidad con letreros, impresos, sitios web, presencia en Google y códigos QR que conectan sus materiales con consultas y cotizaciones."
      : "Pixel & Panel helps businesses across Southeast Texas and Houston get noticed with signs, print, websites, Google visibility, and QR codes that connect printed materials to calls and quote requests.",
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
              publisher: { "@id": `${SITE_URL}/#localbusiness` },
            },
          ],
        }).replace(/</g, "\\u003c"),
      }}
    />
  );
}
