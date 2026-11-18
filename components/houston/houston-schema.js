import { absoluteUrl, BUSINESS_SCHEMA_REF, DEFAULT_OG_IMAGE_URL } from "@/lib/seo";

export const HOUSTON_AREA_SERVED = [
  {
    "@type": "City",
    name: "Houston",
    address: { "@type": "PostalAddress", addressRegion: "TX", addressCountry: "US" },
  },
  { "@type": "AdministrativeArea", name: "Greater Houston" },
];

// Houston is a shipping destination for the same organization.
export function houstonBusinessJsonLd(locale = "en") {
  const isEs = locale === "es";
  const pageUrl = absoluteUrl(isEs ? "/es/houston" : "/houston");

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
