export default function LocalBusinessJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": "https://pixelnpanel.com/#localbusiness",
    name: "Pixel & Panel",
    url: "https://pixelnpanel.com",
    email: "hello@pixelnpanel.com",
    telephone: "+1-409-800-6139",
    slogan: "Your Vision. Made Visible.",
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
    ],
    description:
      "Pixel & Panel helps Southeast Texas businesses get found online, get noticed in the real world, and turn attention into quote requests through websites, signs, print marketing, local SEO, Google Business Profile optimization, and QR code campaigns.",
    sameAs: [],
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
