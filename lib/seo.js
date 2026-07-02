export const SITE_URL = "https://www.pixelnpanel.com";
export const DEFAULT_SITE_TITLE = "Web Design, Signs & Local SEO in Beaumont TX | Pixel & Panel";
export const DEFAULT_SITE_DESCRIPTION =
  "Pixel & Panel helps businesses get seen online and in the real world through websites, signs, print, Google visibility, and QR-powered marketing.";
export const DEFAULT_OG_IMAGE_URL = `${SITE_URL}/og/default-og.png`;
export const DEFAULT_OG_IMAGE = {
  url: DEFAULT_OG_IMAGE_URL,
  width: 1200,
  height: 630,
  alt: DEFAULT_SITE_TITLE,
};

function metadataTitleToText(title) {
  if (!title) return undefined;
  if (typeof title === "string") return title;
  if (typeof title.absolute === "string") return title.absolute;
  if (typeof title.default === "string") return title.default;
  return undefined;
}

export function withDefaultSocialImage(metadata) {
  const fallbackTitle = metadataTitleToText(metadata.title);
  const fallbackDescription = metadata.description;
  const openGraph = {
    ...(fallbackTitle ? { title: fallbackTitle } : {}),
    ...(fallbackDescription ? { description: fallbackDescription } : {}),
    ...metadata.openGraph,
    images: metadata.openGraph?.images ?? [DEFAULT_OG_IMAGE],
  };

  return {
    ...metadata,
    metadataBase: new URL(SITE_URL),
    openGraph,
    twitter: {
      ...(openGraph.title ? { title: openGraph.title } : {}),
      ...(openGraph.description ? { description: openGraph.description } : {}),
      ...metadata.twitter,
      card: "summary_large_image",
      images: metadata.twitter?.images ?? [DEFAULT_OG_IMAGE],
    },
  };
}

export const BUSINESS_SCHEMA_REF = {
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#localbusiness`,
  name: "Pixel & Panel",
  legalName: "Pixel & Panel LLC",
  url: SITE_URL,
  telephone: "+1-409-225-2012",
  email: "hello@pixelnpanel.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Beaumont",
    addressRegion: "TX",
    postalCode: "77705",
    addressCountry: "US",
  },
  areaServed: [
    { "@type": "City", name: "Beaumont", address: { "@type": "PostalAddress", addressRegion: "TX", addressCountry: "US" } },
    { "@type": "City", name: "Nederland", address: { "@type": "PostalAddress", addressRegion: "TX", addressCountry: "US" } },
    { "@type": "City", name: "Port Arthur", address: { "@type": "PostalAddress", addressRegion: "TX", addressCountry: "US" } },
  ],
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
  const serviceName = isSpanish
    ? service.name
        .replace("Rotulación de Vehículos", "Rotulación Vehicular")
        .replace("Letreros para Negocios", "Letreros Comerciales")
    : service.name
        .replace("Truck Lettering & Wraps", "Truck Lettering")
        .replace("Website Design & SEO", "Website Design")
        .replace("Google Business Profile", "Google Profile");
  const seoOverride = service.seo?.[city.slug] || service.seo?.default;
  const title = seoOverride?.title || (isSpanish
    ? `${serviceName} en ${city.name}, TX`
    : `${serviceName} in ${city.name}, TX`);
  const category = service.type === "signage"
    ? isSpanish
      ? "letreros e impresión"
      : "signs and print"
    : isSpanish
      ? "servicios digitales"
      : "digital visibility";
  const description = seoOverride?.description || (isSpanish
    ? `¿Necesitas ${serviceName.toLowerCase()} en ${city.name}, TX? Pixel & Panel crea ${category} claros para ayudar a que tu negocio sea encontrado.`
    : `Need ${serviceName} in ${city.name}, TX? Pixel & Panel builds local ${category} that helps your business get found. Request a quote.`);
  const brandedTitle = title.includes("Pixel & Panel")
    ? title
    : `${title} | Pixel & Panel`;

  return {
    title: seoOverride?.title ? { absolute: title } : title,
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
      title: brandedTitle,
      description,
      url: pageUrl,
      siteName: "Pixel & Panel",
      locale: isSpanish ? "es_US" : "en_US",
      type: "website",
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: brandedTitle,
      description,
      images: [DEFAULT_OG_IMAGE],
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
