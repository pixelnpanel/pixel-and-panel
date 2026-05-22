import CityLanding from "../CityLanding";

const city = {
  name: "Port Arthur",
  h1: "Custom Signs, Print & Websites in Port Arthur, TX",
  intro:
    "Pixel & Panel helps Port Arthur businesses stand out with custom signs, print materials, websites, local SEO, and QR-powered marketing.",
  body:
    "Port Arthur has a strong mix of service businesses, contractors, restaurants, shops, and event organizers. We help those businesses look professional in person and become easier to find online.",
  services: [
    "Signs and printed materials for service vehicles, storefronts, events, and customer-facing spaces.",
    "Mobile-first websites that make your business look professional and generate inquiries.",
    "Local SEO and Google Business Profile support for Port Arthur search visibility.",
  ],
  featuredLinks: [
    { label: "Vehicle Graphics", href: "/signage/vehicle-graphics", description: "Professional graphics for trucks, vans, trailers, and fleets." },
    { label: "Metal Signs", href: "/signage/metal-signs", description: "Durable signs for properties, parking, safety, and facilities." },
    { label: "Storefront Signs", href: "/signage/storefront-signs", description: "Business signs that make your location easier to find." },
    { label: "Vinyl Banners", href: "/signage/vinyl-banners", description: "Banners for events, job sites, storefronts, and promotions." },
    { label: "Local SEO", href: "/digital/local-seo", description: "Improve online visibility for Port Arthur customer searches." },
    { label: "Website Development", href: "/digital/web-development", description: "Service business websites built around calls and quote requests." },
    { label: "QR Code Campaigns", href: "/digital/qr-code-campaigns", description: "Track scans from signs, print materials, and job site promotions." },
  ],
  reasons: [
    "Port Arthur contractor and service businesses often need vehicle graphics, metal signs, storefront signs, and banners that look professional in the field.",
    "Local SEO and websites help nearby customers understand services before they call or request a quote.",
    "QR paths can connect signs and print materials to quote forms, service pages, or contact details.",
  ],
  faqs: [
    ["What Port Arthur services are best for contractors?", "Vehicle graphics, metal signs, storefront signs, banners, websites, and local SEO are common fits for contractor and service business visibility."],
    ["Can Pixel & Panel help with job site visibility?", "Yes. Banners, yard signs, vehicle graphics, and QR-linked pages can help make job sites and service vehicles easier to recognize."],
    ["Do you guarantee Google rankings?", "No. Pixel & Panel improves local visibility foundations, but does not promise guaranteed rankings."],
  ],
};

export const metadata = {
  title: "Signs, Print & Websites in Port Arthur, TX",
  description:
    "Pixel & Panel helps Port Arthur, TX businesses with signs, print materials, websites, local SEO, Google Profile support, and QR marketing.",
  alternates: {
    canonical: "/service-area/port-arthur-tx",
    languages: {
      "en-US": "https://pixelnpanel.com/service-area/port-arthur-tx",
      "es-US": "https://pixelnpanel.com/es/area-de-servicio/port-arthur-tx",
    },
  },
  openGraph: {
    title: "Signs, Print & Websites in Port Arthur, TX | Pixel & Panel",
    description:
      "Pixel & Panel helps Port Arthur, TX businesses with signs, print materials, websites, local SEO, Google Profile support, and QR marketing.",
    url: "https://pixelnpanel.com/service-area/port-arthur-tx",
    siteName: "Pixel & Panel",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Signs, Print & Websites in Port Arthur, TX | Pixel & Panel",
    description:
      "Pixel & Panel helps Port Arthur, TX businesses with signs, print materials, websites, local SEO, Google Profile support, and QR marketing.",
  },
};

export default function PortArthurServiceAreaPage() {
  return <CityLanding city={city} />;
}
