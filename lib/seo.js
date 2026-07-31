export const SITE_URL = "https://www.pixelnpanel.com";
export const DEFAULT_SITE_TITLE = "Custom Signs, Banners & Print in Beaumont TX | Pixel & Panel";
export const DEFAULT_SITE_DESCRIPTION =
  "Pixel & Panel is a one-stop sign shop in Beaumont, TX — custom signs, banners, vehicle graphics, and print for local businesses. We also build websites and Google visibility to match.";
// JPEG, not PNG: the card is a photographic composite over a gradient, which
// PNG stores badly — it was 512 KB, fetched by every social and chat crawler
// that ever previews a link to this site. Same pixels at 120 KB.
export const DEFAULT_OG_IMAGE_URL = `${SITE_URL}/og/default-og.jpg`;
export const DEFAULT_OG_IMAGE = {
  url: DEFAULT_OG_IMAGE_URL,
  width: 1200,
  height: 630,
  alt: DEFAULT_SITE_TITLE,
};

// Both root layouts apply a `%s | Pixel & Panel` title template. That suffix is
// 16 characters, and it was pushing 130 of 204 English titles past the ~60
// characters Google will render — every one of them fit underneath once the
// suffix came off. A truncated "…| Pixel & Pa…" costs more CTR than a missing
// brand does, so long titles opt out of the template instead of being cut.
const BRAND_SUFFIX = " | Pixel & Panel";
const TITLE_LIMIT = 60;

/**
 * Return a Metadata `title`: a plain string when the templated version still
 * fits, or `{ absolute }` (which bypasses the template) when it would not.
 */
export function titleWithinLimit(title) {
  if (!title) return title;
  return title.length + BRAND_SUFFIX.length > TITLE_LIMIT ? { absolute: title } : title;
}

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
    // These shortenings exist to keep generated titles under ~60 characters.
    // Only shorten to a phrase people actually search: "truck lettering" and
    // "website design" are real queries. "Google Profile" was NOT — it is not
    // a term anyone types, and it replaced the exact phrase these pages need
    // to match ("google business profile optimization <city> tx"), so it is
    // gone. Do not add a shortening unless the shorter form is itself a query.
    : service.name
        .replace("Truck Lettering & Wraps", "Truck Lettering")
        .replace("Website Design & SEO", "Website Design");
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
    // A hand-written seo override always wins verbatim; generated titles fall
    // through to the length check so they never get truncated in the SERP.
    title: seoOverride?.title ? { absolute: title } : titleWithinLimit(title),
    description,
    alternates: {
      canonical: pageUrl,
      // x-default is what a searcher gets when neither language matches theirs.
      // It always points at the English URL, which is what the site defaults to.
      ...(alternateUrl
        ? {
            languages: isSpanish
              ? {
                  "en-US": alternateUrl,
                  "es-US": pageUrl,
                  "x-default": alternateUrl,
                }
              : {
                  "en-US": pageUrl,
                  "es-US": alternateUrl,
                  "x-default": pageUrl,
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
