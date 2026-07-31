import HoustonServicePage from "@/components/houston/HoustonServicePage";
import { houstonServices } from "@/content/houston";
import { withDefaultSocialImage } from "@/lib/seo";

const service = houstonServices.banners;
const PATH = "/houston/banners";

export const metadata = withDefaultSocialImage({
  title: { absolute: service.metaTitle },
  description: service.metaDescription,
  alternates: {
    canonical: PATH,
    languages: {
      "en-US": `https://www.pixelnpanel.com${PATH}`,
      "x-default": `https://www.pixelnpanel.com${PATH}`,
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

export default function HoustonBannersRoute() {
  return <HoustonServicePage service={service} path={PATH} locale="en" />;
}
