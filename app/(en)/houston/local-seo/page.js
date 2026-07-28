import HoustonServicePage from "@/components/houston/HoustonServicePage";
import { houstonServices } from "@/content/houston";
import { withDefaultSocialImage } from "@/lib/seo";

const service = houstonServices["local-seo"];
const PATH = "/houston/local-seo";

export const metadata = withDefaultSocialImage({
  title: { absolute: service.metaTitle },
  description: service.metaDescription,
  alternates: {
    canonical: PATH,
    // No Spanish twin yet — hreflang is omitted rather than pointed at a
    // nonexistent URL. Add the languages block when /es/houston/seo-local ships.
    ...(service.esPath
      ? {
          languages: {
            "en-US": `https://www.pixelnpanel.com${PATH}`,
            "es-US": `https://www.pixelnpanel.com${service.esPath}`,
          },
        }
      : {}),
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

export default function HoustonLocalSeoRoute() {
  return <HoustonServicePage service={service} path={PATH} locale="en" />;
}
