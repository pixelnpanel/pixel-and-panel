import HoustonHubPage from "@/components/houston/HoustonHubPage";
import { houstonHubEs, houstonServicesEs } from "@/content/houston-es";
import { cityServiceStaticParamsEs, getCityServiceDataEs } from "@/lib/city-service-pages-es";
import { withDefaultSocialImage } from "@/lib/seo";

const PAGE_URL = "https://www.pixelnpanel.com/es/houston";

export const metadata = withDefaultSocialImage({
  title: { absolute: houstonHubEs.metaTitle },
  description: houstonHubEs.metaDescription,
  alternates: {
    canonical: "/es/houston",
    languages: {
      "en-US": "https://www.pixelnpanel.com/houston",
      "x-default": "https://www.pixelnpanel.com/houston",
      "es-US": PAGE_URL,
    },
  },
  openGraph: {
    title: houstonHubEs.metaTitle,
    description: houstonHubEs.metaDescription,
    url: PAGE_URL,
    siteName: "Pixel & Panel",
    locale: "es_US",
    type: "website",
  },
});

// Las páginas generadas en /es/area-de-servicio/houston-tx/* se agregan aquí
// mismo. Sin este enlace solo existirían en el sitemap, y una página que nada
// enlaza es una página que Google tiene pocos motivos para rastrear o rankear.
const generadas = cityServiceStaticParamsEs
  .filter(({ ciudad }) => ciudad === "houston-tx")
  .map(({ ciudad, servicio }) => {
    const { city, service } = getCityServiceDataEs(ciudad, servicio);
    return {
      name: service.name,
      href: `/es/area-de-servicio/${ciudad}/${servicio}`,
      description: service.intro(city),
    };
  });

const services = [
  ...Object.entries(houstonServicesEs).map(([slug, service]) => ({
    name: service.h1,
    href: `/es/houston/${slug}`,
    description: service.metaDescription,
  })),
  ...generadas,
];

export default function HoustonHubRouteEs() {
  return <HoustonHubPage content={houstonHubEs} services={services} locale="es" />;
}
