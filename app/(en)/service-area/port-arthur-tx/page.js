import CityLanding from "../CityLanding";
import { withDefaultSocialImage } from "@/lib/seo";

const city = {
  name: "Port Arthur",
  h1: "Commercial Signs, Fleet Graphics, and Websites in Port Arthur, TX",
  intro:
    "We deliver industrial building signage, heavy vinyl site banners, durable work vehicle graphics, small business website design, and targeted local SEO for companies operating in Port Arthur, TX.",
  body:
    "Port Arthur industrial teams, marine contractors, auto shops, restaurants, and service businesses need branding that performs in demanding real-world conditions and remains easy to verify online.",
  services: [
    "Signs and printed materials for service vehicles, storefronts, events, and customer-facing spaces.",
    "Mobile-first websites that make your business look professional and generate inquiries.",
    "Local SEO and Google Business Profile support for Port Arthur search visibility.",
  ],
  featuredLinks: [
    { label: "Car & Vehicle Magnets", href: "/signage/rigid-and-metal-signs/car-and-vehicle-magnets", description: "Professional magnets for trucks, vans, trailers, and fleets." },
    { label: "Metal Signs", href: "/signage/rigid-and-metal-signs", description: "Durable signs for properties, parking, safety, and facilities." },
    { label: "Signs & Print Catalog", href: "/signage", description: "Browse banners, stands, flags, rigid signs, and more." },
    { label: "Vinyl Banners", href: "/signage/banners", description: "Banners for events, job sites, storefronts, and promotions." },
    { label: "Local SEO", href: "/digital/local-seo", description: "Improve online visibility for Port Arthur customer searches." },
    { label: "Website Development", href: "/digital/web-development", description: "Service business websites built around calls and quote requests." },
    { label: "QR Code Campaigns", href: "/digital/qr-code-campaigns", description: "Track scans from signs, print materials, and job site promotions." },
  ],
  reasons: [
    "Port Arthur contractor and service businesses often need vehicle graphics, metal signs, storefront signs, and banners that look professional in the field.",
    "Local SEO and websites help nearby customers understand services before they call or request a quote.",
    "QR paths can connect signs and print materials to quote forms, service pages, or contact details.",
  ],
  crossMarket: {
    text: "Pixel & Panel also serves the Greater Houston area with custom banners, yard signs, and real estate signs.",
    label: "Explore Houston signs & printing",
    href: "/houston",
  },
  faqs: [
    ["What Port Arthur services are best for contractors?", "Vehicle graphics, metal signs, storefront signs, banners, websites, and local SEO are common fits for contractor and service business visibility."],
    ["Can Pixel & Panel help with job site visibility?", "Yes. Banners, yard signs, vehicle graphics, and QR-linked pages can help make job sites and service vehicles easier to recognize."],
    ["Do you guarantee Google rankings?", "No. Pixel & Panel improves local visibility foundations, but does not promise guaranteed rankings."],
  ],
};

export const metadata = withDefaultSocialImage({
  title: {
    absolute: "Commercial Signs, Fleet Graphics & Web Design in Port Arthur, TX",
  },
  description:
    "Industrial building signage, site banners, and fleet vehicle graphics for Port Arthur, TX businesses — plus high-converting websites and local SEO support.",
  alternates: {
    canonical: "/service-area/port-arthur-tx",
    languages: {
      "en-US": "https://www.pixelnpanel.com/service-area/port-arthur-tx",
      "x-default": "https://www.pixelnpanel.com/service-area/port-arthur-tx",
      "es-US": "https://www.pixelnpanel.com/es/area-de-servicio/port-arthur-tx",
    },
  },
  openGraph: {
    title: "Commercial Signs, Fleet Graphics & Web Design in Port Arthur, TX",
    description:
      "Industrial building signage, site banners, and fleet vehicle graphics for Port Arthur, TX businesses — plus high-converting websites and local SEO support.",
    url: "https://www.pixelnpanel.com/service-area/port-arthur-tx",
    siteName: "Pixel & Panel",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Commercial Signs, Fleet Graphics & Web Design in Port Arthur, TX",
    description:
      "Industrial building signage, site banners, and fleet vehicle graphics for Port Arthur, TX businesses — plus high-converting websites and local SEO support.",
  },
});

export default function PortArthurServiceAreaPage() {
  return <CityLanding city={city} />;
}
