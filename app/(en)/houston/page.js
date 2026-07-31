import HoustonHubPage from "@/components/houston/HoustonHubPage";
import { houstonHub, houstonServices } from "@/content/houston";
import { cityServiceCities, getAvailableCityServiceEntries } from "@/lib/city-service-pages";
import { withDefaultSocialImage } from "@/lib/seo";

const PAGE_URL = "https://www.pixelnpanel.com/houston";

export const metadata = withDefaultSocialImage({
  title: { absolute: houstonHub.metaTitle },
  description: houstonHub.metaDescription,
  alternates: {
    canonical: "/houston",
    languages: {
      "en-US": PAGE_URL,
      "x-default": PAGE_URL,
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

// The generated /service-area/houston-tx/* pages are folded into the same two
// groups. Without this they would be reachable only from the sitemap, and a
// page with no internal link pointing at it is one Google has little reason to
// crawl often or rank — the hub is the only place that can vouch for them.
const houstonCity = cityServiceCities["houston-tx"];
const generated = getAvailableCityServiceEntries("houston-tx").map(([slug, service]) => ({
  name: service.name,
  href: `/service-area/houston-tx/${slug}`,
  description: service.intro(houstonCity),
  type: service.type,
}));

const entries = Object.entries(houstonServices);
const services = [
  ...entries.filter(([, s]) => s.type !== "digital").map(toCard),
  ...generated.filter((s) => s.type !== "digital"),
];
const digitalServices = [
  ...entries.filter(([, s]) => s.type === "digital").map(toCard),
  ...generated.filter((s) => s.type === "digital"),
];

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
