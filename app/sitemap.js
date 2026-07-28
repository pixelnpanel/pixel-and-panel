import { getCategories } from "@/lib/signage/data";
import { signageProductsEs } from "@/lib/signage-products-es";
import { digitalServices } from "@/lib/digital-services";
import { digitalServicesEs } from "@/lib/digital-services-es";
import { learningCenterPosts } from "@/lib/learning-center-posts";
import { learningCenterPostsEs } from "@/lib/learning-center-posts-es";
import { cityServiceStaticParams, cityServiceCities } from "@/lib/city-service-pages";
import { cityServiceStaticParamsEs } from "@/lib/city-service-pages-es";

const BASE = "https://www.pixelnpanel.com";

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
  }));

  const learningUrlsEs = learningCenterPostsEs.map((post) => ({
    url: `${BASE}/es/centro-de-aprendizaje/${post.slug}`,
    priority: 0.55,
    changeFrequency: "monthly",
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

  return [
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
}
