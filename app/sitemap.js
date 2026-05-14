import { signageProducts } from "@/lib/signage-products";
import { digitalServices } from "@/lib/digital-services";
import { learningCenterPosts } from "@/lib/learning-center-posts";
import { cityServiceStaticParams, cityServiceCities } from "@/lib/city-service-pages";

const BASE = "https://pixelnpanel.com";

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
  // Spanish
  { url: "/es", priority: 0.7, changeFrequency: "weekly" },
  { url: "/es/servicios-digitales", priority: 0.7, changeFrequency: "weekly" },
  { url: "/es/letreros", priority: 0.7, changeFrequency: "weekly" },
  { url: "/es/precios", priority: 0.6, changeFrequency: "weekly" },
  { url: "/es/portafolio", priority: 0.6, changeFrequency: "weekly" },
  { url: "/es/contacto", priority: 0.6, changeFrequency: "monthly" },
  { url: "/es/solicitar-cotizacion", priority: 0.6, changeFrequency: "monthly" },
  { url: "/es/chequeo-gratis-de-visibilidad", priority: 0.6, changeFrequency: "monthly" },
  { url: "/es/area-de-servicio/beaumont-tx", priority: 0.7, changeFrequency: "monthly" },
  { url: "/es/area-de-servicio/nederland-tx", priority: 0.7, changeFrequency: "monthly" },
  { url: "/es/area-de-servicio/port-arthur-tx", priority: 0.7, changeFrequency: "monthly" },
];

export default function sitemap() {
  const signageUrls = signageProducts.map((p) => ({
    url: `${BASE}/signage/${p.slug}`,
    priority: 0.8,
    changeFrequency: "monthly",
  }));

  const digitalUrls = digitalServices.map((s) => ({
    url: `${BASE}/digital/${s.slug}`,
    priority: 0.8,
    changeFrequency: "monthly",
  }));

  const learningUrls = learningCenterPosts.map((post) => ({
    url: `${BASE}/learning-center/${post.slug}`,
    priority: 0.6,
    changeFrequency: "monthly",
  }));

  const cityServiceUrls = cityServiceStaticParams.map(({ city, service }) => ({
    url: `${BASE}/service-area/${city}/${service}`,
    priority: 0.85,
    changeFrequency: "monthly",
  }));

  return [
    ...staticPages.map(({ url, ...rest }) => ({ url: `${BASE}${url}`, ...rest })),
    ...signageUrls,
    ...digitalUrls,
    ...learningUrls,
    ...cityServiceUrls,
  ];
}
