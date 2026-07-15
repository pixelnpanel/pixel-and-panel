import HoustonServicePage from "@/components/houston/HoustonServicePage";
import { houstonServicesEs } from "@/content/houston-es";
import { withDefaultSocialImage } from "@/lib/seo";

const service = houstonServicesEs["letreros-para-jardin"];
const PATH = "/es/houston/letreros-para-jardin";

export const metadata = withDefaultSocialImage({
  title: { absolute: service.metaTitle },
  description: service.metaDescription,
  alternates: {
    canonical: PATH,
    languages: {
      "en-US": `https://www.pixelnpanel.com${service.enPath}`,
      "es-US": `https://www.pixelnpanel.com${PATH}`,
    },
  },
  openGraph: {
    title: service.metaTitle,
    description: service.metaDescription,
    url: `https://www.pixelnpanel.com${PATH}`,
    siteName: "Pixel & Panel",
    locale: "es_US",
    type: "website",
  },
});

export default function HoustonYardSignsRouteEs() {
  return <HoustonServicePage service={service} path={PATH} locale="es" />;
}
