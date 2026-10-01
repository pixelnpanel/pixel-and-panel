import { getCategories } from "@/lib/signage/data";
import { signageProductsEs } from "@/lib/signage-products-es";
import { digitalServices } from "@/lib/digital-services";
import { digitalServicesEs } from "@/lib/digital-services-es";
import { learningCenterPosts } from "@/lib/learning-center-posts";
import { learningCenterPostsEs } from "@/lib/learning-center-posts-es";
import { cityServiceStaticParams } from "@/lib/city-service-pages";
import { cityServiceStaticParamsEs } from "@/lib/city-service-pages-es";
import { ROUTE_ALTERNATES } from "@/lib/i18n";
import { enPathForEsProduct, esPathForEnCatalog } from "@/lib/signage/es-en-pairs";
import { withResolvedImageEs } from "@/lib/signage/es-images";

const BASE = "https://www.pixelnpanel.com";

function alternatePaths(url) {
  const pathname = new URL(url).pathname.replace(/\/$/, "") || "/";
  const mapped = ROUTE_ALTERNATES[pathname];
  // Navigation can offer a related page when no translated equivalent exists.
  // Those fallback destinations must not be advertised as SEO alternates.
  const navigationOnly = new Set([
    "/service-area/nederland-tx/business-cards",
    "/houston/web-design",
    "/houston/local-seo",
  ]);
  if (mapped && !navigationOnly.has(mapped.en)) return mapped;
  if (pathname.startsWith("/signage/")) {
    const es = esPathForEnCatalog(pathname);
    return es ? { en: pathname, es } : null;
  }
  if (pathname.startsWith("/es/letreros/")) {
    const en = enPathForEsProduct(pathname.slice("/es/letreros/".length));
    return en ? { en, es: pathname } : null;
  }
  return null;
}

// Real content-change dates (git author dates), grouped by content area.
// Google uses <lastmod> to prioritize which pages to recrawl, so these MUST
// stay honest: bump only the entry whose content actually changed. Setting
// every date to "today" on each deploy trains Google to ignore <lastmod>
// entirely — the opposite of what we want. When you meaningfully edit a
// content area, update its date here (YYYY-MM-DD).
const LASTMOD = {
  houston: "2026-07-31",     // content/houston.js, content/houston-es.js
  digital: "2026-07-28",     // lib/digital-services.js (+ /digital hub)
  cityService: "2026-07-31", // lib/city-service-pages.js (/service-area/*)
  core: "2026-10-01",        // homepage, contact/quote/visibility improvements
  portfolio: "2026-07-10",
  learning: "2026-07-02",    // lib/learning-center-posts.js
};

// Resolve the honest lastModified for a URL (relative or absolute — matching
// is substring-based). Order matters: check the most specific segment first
// so e.g. /es/houston/... resolves to houston, not to its language prefix.
function lastmodFor(url) {
  if (url.includes("/houston")) return LASTMOD.houston;
  if (url.includes("/service-area") || url.includes("/area-de-servicio")) return LASTMOD.cityService;
  if (url.includes("/digital") || url.includes("/servicios-digitales")) return LASTMOD.digital;
  if (url.includes("/learning-center") || url.includes("/centro-de-aprendizaje")) return LASTMOD.learning;
  if (url.includes("/portfolio") || url.includes("/portafolio")) return LASTMOD.portfolio;
  // The live catalog has no reliable modification timestamp. Omit lastmod
  // rather than claim that new sheet copy/images still date from July.
  if (url.includes("/signage") || url.includes("/letreros")) return undefined;
  return LASTMOD.core;
}

const staticPages = [
  { url: "/", priority: 1.0, changeFrequency: "weekly" },
  { url: "/digital", priority: 0.9, changeFrequency: "weekly" },
  { url: "/signage", priority: 0.9, changeFrequency: "weekly" },
  { url: "/pricing", priority: 0.8, changeFrequency: "weekly" },
  { url: "/portfolio", priority: 0.8, changeFrequency: "weekly" },
  { url: "/contact", priority: 0.7, changeFrequency: "monthly" },
  { url: "/quote-request", priority: 0.8, changeFrequency: "monthly" },
  { url: "/free-visibility-check", priority: 0.8, changeFrequency: "monthly" },
  { url: "/learning-center", priority: 0.7, changeFrequency: "weekly" },
  // Service area hubs
  { url: "/service-area/beaumont-tx", priority: 0.9, changeFrequency: "monthly" },
  { url: "/service-area/nederland-tx", priority: 0.9, changeFrequency: "monthly" },
  { url: "/service-area/port-arthur-tx", priority: 0.9, changeFrequency: "monthly" },
  // Houston market (additive — see content/houston.js)
  { url: "/houston", priority: 0.9, changeFrequency: "weekly" },
  { url: "/houston/banners", priority: 0.85, changeFrequency: "monthly" },
  { url: "/houston/event-banners", priority: 0.85, changeFrequency: "monthly" },
  { url: "/houston/yard-signs", priority: 0.85, changeFrequency: "monthly" },
  { url: "/houston/real-estate-signs", priority: 0.85, changeFrequency: "monthly" },
  { url: "/houston/web-design", priority: 0.8, changeFrequency: "monthly" },
  { url: "/houston/local-seo", priority: 0.8, changeFrequency: "monthly" },
  // Spanish
  { url: "/es", priority: 0.7, changeFrequency: "weekly" },
  { url: "/es/servicios-digitales", priority: 0.7, changeFrequency: "weekly" },
  { url: "/es/letreros", priority: 0.7, changeFrequency: "weekly" },
  { url: "/es/precios", priority: 0.6, changeFrequency: "weekly" },
  { url: "/es/portafolio", priority: 0.6, changeFrequency: "weekly" },
  { url: "/es/contacto", priority: 0.6, changeFrequency: "monthly" },
  { url: "/es/solicitar-cotizacion", priority: 0.6, changeFrequency: "monthly" },
  { url: "/es/chequeo-gratis-de-visibilidad", priority: 0.6, changeFrequency: "monthly" },
  { url: "/es/centro-de-aprendizaje", priority: 0.6, changeFrequency: "weekly" },
  { url: "/es/area-de-servicio/beaumont-tx", priority: 0.7, changeFrequency: "monthly" },
  { url: "/es/area-de-servicio/nederland-tx", priority: 0.7, changeFrequency: "monthly" },
  { url: "/es/area-de-servicio/port-arthur-tx", priority: 0.7, changeFrequency: "monthly" },
  { url: "/es/houston", priority: 0.7, changeFrequency: "weekly" },
  { url: "/es/houston/banners", priority: 0.65, changeFrequency: "monthly" },
  { url: "/es/houston/banners-para-eventos", priority: 0.65, changeFrequency: "monthly" },
  { url: "/es/houston/letreros-para-jardin", priority: 0.65, changeFrequency: "monthly" },
  { url: "/es/houston/letreros-inmobiliarios", priority: 0.65, changeFrequency: "monthly" },
];

// Image sitemap support: absolute raw-file URLs (NOT /_next/image) so
// Googlebot-Image can index sign/print photos for Google Images traffic.
const absImage = (src) => {
  if (!src) return null;
  if (src.startsWith("http")) return src;
  if (src.startsWith("/")) return `${BASE}${src}`;
  return null;
};

const uniqueImages = (sources) => {
  const urls = [...new Set(sources.map(absImage).filter(Boolean))];
  return urls.length ? urls : undefined;
};

export default async function sitemap() {
  // EN signage catalog (data-driven): hub + category + product pages from CSV.
  const signageCategories = await getCategories();
  const signageUrls = [
    ...signageCategories.map((c) => ({
      url: `${BASE}/signage/${c.slug}`,
      priority: 0.85,
      changeFrequency: "weekly",
      images: uniqueImages([c.image, ...c.products.map((p) => p.image)]),
    })),
    ...signageCategories.flatMap((c) =>
      c.products.map((p) => ({
        url: `${BASE}/signage/${c.slug}/${p.slug}`,
        priority: 0.8,
        changeFrequency: "monthly",
        images: uniqueImages([p.image]),
      }))
    ),
  ];

  // Category cover art shown on the homepage teaser/hero and the /signage hub.
  const categoryCoverImages = uniqueImages(
    signageCategories.map((c) => c.image || c.products.find((p) => p.image)?.image)
  );

  const digitalUrls = digitalServices.map((s) => ({
    url: `${BASE}/digital/${s.slug}`,
    priority: 0.8,
    changeFrequency: "monthly",
  }));

  const signageUrlsEs = signageProductsEs.map((p) => ({
    url: `${BASE}/es/letreros/${p.slug}`,
    priority: 0.7,
    changeFrequency: "monthly",
    images: uniqueImages([withResolvedImageEs(p).image]),
  }));

  const digitalUrlsEs = digitalServicesEs.map((s) => ({
    url: `${BASE}/es/servicios-digitales/${s.slug}`,
    priority: 0.7,
    changeFrequency: "monthly",
  }));

  const learningUrls = learningCenterPosts.map((post) => ({
    url: `${BASE}/learning-center/${post.slug}`,
    priority: 0.6,
    changeFrequency: "monthly",
    lastModified: post.updatedDate || post.publishDate,
  }));

  const learningUrlsEs = learningCenterPostsEs.map((post) => ({
    url: `${BASE}/es/centro-de-aprendizaje/${post.slug}`,
    priority: 0.55,
    changeFrequency: "monthly",
    lastModified: post.updatedDate || post.publishDate,
  }));

  const cityServiceUrls = cityServiceStaticParams.map(({ city, service }) => ({
    url: `${BASE}/service-area/${city}/${service}`,
    priority: 0.85,
    changeFrequency: "monthly",
  }));

  const cityServiceUrlsEs = cityServiceStaticParamsEs.map(({ ciudad, servicio }) => ({
    url: `${BASE}/es/area-de-servicio/${ciudad}/${servicio}`,
    priority: 0.75,
    changeFrequency: "monthly",
  }));

  const entries = [
    ...staticPages.map(({ url, ...rest }) => ({
      url: `${BASE}${url}`,
      ...rest,
      // Surface real sign photos on the pages that display them.
      ...((url === "/" || url === "/signage") && categoryCoverImages
        ? { images: categoryCoverImages }
        : {}),
    })),
    ...signageUrls,
    ...digitalUrls,
    ...signageUrlsEs,
    ...digitalUrlsEs,
    ...learningUrls,
    ...learningUrlsEs,
    ...cityServiceUrls,
    ...cityServiceUrlsEs,
  ];

  const sitemapPaths = new Set(entries.map((entry) => new URL(entry.url).pathname.replace(/\/$/, "") || "/"));

  // Attach an honest <lastmod> to every entry from its content area's real
  // change date. Kept as a final pass so each URL source above stays focused
  // on its own url/priority/images and never has to repeat a date literal.
  return entries.map((entry) => {
    const pair = alternatePaths(entry.url);
    const hasReciprocalSitemapPair = pair && sitemapPaths.has(pair.en) && sitemapPaths.has(pair.es);
    return {
      lastModified: lastmodFor(entry.url),
      ...entry,
      ...(hasReciprocalSitemapPair
        ? {
            alternates: {
              languages: {
                "en-US": `${BASE}${pair.en}`,
                "es-US": `${BASE}${pair.es}`,
                "x-default": `${BASE}${pair.en}`,
              },
            },
          }
        : {}),
    };
  });
}
