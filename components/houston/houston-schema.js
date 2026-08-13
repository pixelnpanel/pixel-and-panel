import { absoluteUrl, BUSINESS_SCHEMA_REF, DEFAULT_OG_IMAGE_URL } from "@/lib/seo";
import { HOUSTON_STREET_ADDRESS, HOUSTON_PHONE } from "@/content/houston";

export const HOUSTON_AREA_SERVED = [
  {
    "@type": "City",
    name: "Houston",
    address: { "@type": "PostalAddress", addressRegion: "TX", addressCountry: "US" },
  },
  { "@type": "AdministrativeArea", name: "Greater Houston" },
];

// Schema for the Houston hub, which is a service area and NOT a second shop.
//
// This used to emit a `LocalBusiness` with the PostalAddress omitted while
// HOUSTON_STREET_ADDRESS is null (see content/houston.js). Not fabricating an
// address was right; the `LocalBusiness` type around it was not. `address` is
// required on LocalBusiness, so the node was invalid — and because it carried
// the same name and phone as the real Beaumont business at a different @id, it
// declared a second, addressless Pixel & Panel for Google to disambiguate
// against the real one.
//
// Without an address the honest type is `Service`: the Beaumont business
// (referenced by @id through BUSINESS_SCHEMA_REF) is the provider, and Houston
// is areaServed. If HOUSTON_STREET_ADDRESS ever becomes a real address, that
// genuinely is a second location and the LocalBusiness branch below applies.
export function houstonBusinessJsonLd(locale = "en") {
  const isEs = locale === "es";
  const pageUrl = absoluteUrl(isEs ? "/es/houston" : "/houston");

  if (HOUSTON_STREET_ADDRESS) {
    return {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": `${absoluteUrl("/houston")}#localbusiness`,
      name: "Pixel & Panel",
      legalName: "Pixel & Panel LLC",
      url: pageUrl,
      email: "hello@pixelnpanel.com",
      telephone: HOUSTON_PHONE,
      // Raster, not the SVG wordmark: Google's structured data image
      // requirements accept JPG, PNG and GIF only.
      image: DEFAULT_OG_IMAGE_URL,
      priceRange: "$$",
      address: { "@type": "PostalAddress", ...HOUSTON_STREET_ADDRESS },
      areaServed: HOUSTON_AREA_SERVED,
    };
  }

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absoluteUrl("/houston")}#service`,
    name: isEs
      ? "Letreros, Banners e Impresión en Houston, TX"
      : "Custom Signs, Banners & Print in Houston, TX",
    description: isEs
      ? "Letreros comerciales, banners, gráficos vehiculares e impresión para negocios de Houston y el área metropolitana, con envío a todo el país."
      : "Custom signs, banners, vehicle graphics, and print for businesses across Houston and Greater Houston, shipped nationwide.",
    url: pageUrl,
    serviceType: isEs ? "Letreros e impresión" : "Signs and print",
    inLanguage: isEs ? "es-US" : "en-US",
    image: DEFAULT_OG_IMAGE_URL,
    provider: BUSINESS_SCHEMA_REF,
    areaServed: HOUSTON_AREA_SERVED,
  };
}

export function faqPageJsonLd(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
}
