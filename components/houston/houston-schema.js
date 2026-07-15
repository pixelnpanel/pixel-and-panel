import { absoluteUrl } from "@/lib/seo";
import { HOUSTON_STREET_ADDRESS, HOUSTON_PHONE } from "@/content/houston";

export const HOUSTON_AREA_SERVED = [
  {
    "@type": "City",
    name: "Houston",
    address: { "@type": "PostalAddress", addressRegion: "TX", addressCountry: "US" },
  },
  { "@type": "AdministrativeArea", name: "Greater Houston" },
];

// LocalBusiness schema for the Houston hub. While HOUSTON_STREET_ADDRESS is
// null (see content/houston.js) the PostalAddress block is omitted entirely —
// the service area is expressed through areaServed instead.
export function houstonLocalBusinessJsonLd(locale = "en") {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${absoluteUrl("/houston")}#localbusiness`,
    name: "Pixel & Panel",
    legalName: "Pixel & Panel LLC",
    url: absoluteUrl(locale === "es" ? "/es/houston" : "/houston"),
    email: "hello@pixelnpanel.com",
    telephone: HOUSTON_PHONE,
    image: "https://www.pixelnpanel.com/logo/icon-wordmark.svg",
    priceRange: "$$",
    ...(HOUSTON_STREET_ADDRESS
      ? { address: { "@type": "PostalAddress", ...HOUSTON_STREET_ADDRESS } }
      : {}),
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
