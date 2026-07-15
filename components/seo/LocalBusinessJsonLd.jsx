export default function LocalBusinessJsonLd() {
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
    image: "https://www.pixelnpanel.com/logo/icon-wordmark.svg",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Beaumont",
      addressRegion: "TX",
      postalCode: "77705",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 30.0802,
      longitude: -94.1266,
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
    description:
      "Pixel & Panel helps Southeast Texas businesses get found online, get noticed in the real world, and turn attention into quote requests through websites, signs, print marketing, local SEO, Google Business Profile optimization, and QR code campaigns.",
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
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}
