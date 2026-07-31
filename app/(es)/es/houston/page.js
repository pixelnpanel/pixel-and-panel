import HoustonHubPage from "@/components/houston/HoustonHubPage";
import { houstonHubEs, houstonServicesEs } from "@/content/houston-es";
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

const services = Object.entries(houstonServicesEs).map(([slug, service]) => ({
  name: service.h1,
  href: `/es/houston/${slug}`,
  description: service.metaDescription,
}));

export default function HoustonHubRouteEs() {
  return <HoustonHubPage content={houstonHubEs} services={services} locale="es" />;
}
