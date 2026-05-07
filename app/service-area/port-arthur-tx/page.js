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
};

export const metadata = {
  title: "Custom Signs, Print & Websites in Port Arthur, TX",
  description:
    "Pixel & Panel serves Port Arthur, TX businesses with custom signs, print materials, websites, local SEO, Google Business Profile optimization, and QR-powered marketing.",
  alternates: {
    canonical: "/service-area/port-arthur-tx",
  },
};

export default function PortArthurServiceAreaPage() {
  return <CityLanding city={city} />;
}
