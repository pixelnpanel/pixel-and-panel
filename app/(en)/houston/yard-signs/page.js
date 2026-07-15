import HoustonServicePage from "@/components/houston/HoustonServicePage";
import { houstonServices } from "@/content/houston";
import { withDefaultSocialImage } from "@/lib/seo";

const service = houstonServices["yard-signs"];
const PATH = "/houston/yard-signs";

export const metadata = withDefaultSocialImage({
  title: { absolute: service.metaTitle },
  description: service.metaDescription,
  alternates: {
    canonical: PATH,
    languages: {
      "en-US": `https://www.pixelnpanel.com${PATH}`,
      "es-US": `https://www.pixelnpanel.com${service.esPath}`,
    },
  },
  openGraph: {
    title: service.metaTitle,
    description: service.metaDescription,
    url: `https://www.pixelnpanel.com${PATH}`,
    siteName: "Pixel & Panel",
    locale: "en_US",
    type: "website",
  },
});

export default function HoustonYardSignsRoute() {
  return <HoustonServicePage service={service} path={PATH} locale="en" />;
}
