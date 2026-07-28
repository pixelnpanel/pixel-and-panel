import HoustonHubPage from "@/components/houston/HoustonHubPage";
import { houstonHub, houstonServices } from "@/content/houston";
import { withDefaultSocialImage } from "@/lib/seo";

const PAGE_URL = "https://www.pixelnpanel.com/houston";

export const metadata = withDefaultSocialImage({
  title: { absolute: houstonHub.metaTitle },
  description: houstonHub.metaDescription,
  alternates: {
    canonical: "/houston",
    languages: {
      "en-US": PAGE_URL,
      "es-US": "https://www.pixelnpanel.com/es/houston",
    },
  },
  openGraph: {
    title: houstonHub.metaTitle,
    description: houstonHub.metaDescription,
    url: PAGE_URL,
    siteName: "Pixel & Panel",
    locale: "en_US",
    type: "website",
  },
});

// Signage leads and digital renders as a secondary group — this is a sign shop
// that also builds websites, and the hub's H1 reflects that ordering.
const toCard = ([slug, service]) => ({
  name: service.h1,
  href: `/houston/${slug}`,
  description: service.metaDescription,
});

const entries = Object.entries(houstonServices);
const services = entries.filter(([, s]) => s.type !== "digital").map(toCard);
const digitalServices = entries.filter(([, s]) => s.type === "digital").map(toCard);

export default function HoustonHubRoute() {
  return (
    <HoustonHubPage
      content={houstonHub}
      services={services}
      digitalServices={digitalServices}
      locale="en"
    />
  );
}
