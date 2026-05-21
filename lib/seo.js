export const SITE_URL = "https://pixelnpanel.com";

export const BUSINESS_SCHEMA_REF = {
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#localbusiness`,
  name: "Pixel & Panel",
  url: SITE_URL,
  telephone: "+1-409-800-6139",
  email: "hello@pixelnpanel.com",
};

export const SERVICE_AREA_CITIES_SCHEMA = [
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
];

export function absoluteUrl(path = "/") {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function citySchema(city) {
  return {
    "@type": "City",
    name: city.name,
    address: {
      "@type": "PostalAddress",
      addressRegion: "TX",
      addressCountry: "US",
    },
  };
}

export function buildCityServiceMetadata({
  city,
  service,
  path,
  alternatePath,
  locale = "en",
}) {
  const isSpanish = locale.startsWith("es");
  const pageUrl = absoluteUrl(path);
  const alternateUrl = alternatePath ? absoluteUrl(alternatePath) : null;
  const title = isSpanish
    ? `${service.name} en ${city.name}, TX`
    : `${service.name} in ${city.name}, TX`;
  const category = service.type === "signage"
    ? isSpanish
      ? "letreros e impresión"
      : "signs and print"
    : isSpanish
      ? "servicios digitales"
      : "digital visibility";
  const description = isSpanish
    ? `¿Necesitas ${service.name.toLowerCase()} en ${city.name}, TX? Pixel & Panel crea ${category} claros para ayudar a que tu negocio sea encontrado.`
    : `Need ${service.name} in ${city.name}, TX? Pixel & Panel builds local ${category} that helps your business get found. Request a free quote.`;

  return {
    title,
    description,
    alternates: {
      canonical: pageUrl,
      ...(alternateUrl
        ? {
            languages: isSpanish
              ? {
                  "en-US": alternateUrl,
                  "es-US": pageUrl,
                }
              : {
                  "en-US": pageUrl,
                  "es-US": alternateUrl,
                },
          }
        : {}),
    },
    openGraph: {
      title: `${title} | Pixel & Panel`,
      description,
      url: pageUrl,
      siteName: "Pixel & Panel",
      locale: isSpanish ? "es_US" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Pixel & Panel`,
      description,
    },
  };
}

export function createServiceJsonLd({
  name,
  description,
  url,
  serviceType,
  category,
  areaServed = SERVICE_AREA_CITIES_SCHEMA,
  inLanguage = "en-US",
  schemaType = "Service",
  offerUrl,
  quoteActionName,
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": schemaType,
    name,
    description,
    url: absoluteUrl(url),
    serviceType,
    category,
    inLanguage,
    provider: BUSINESS_SCHEMA_REF,
    areaServed,
  };

  if (offerUrl) {
    jsonLd.potentialAction = {
      "@type": "QuoteAction",
      name: quoteActionName || (inLanguage.startsWith("es") ? "Solicitar cotización" : "Request a quote"),
      target: absoluteUrl(offerUrl),
    };
  }

  return jsonLd;
}
