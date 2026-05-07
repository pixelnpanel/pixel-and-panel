import CityLanding from "../CityLanding";

const city = {
  name: "Beaumont",
  h1: "Custom Signs, Print & Websites in Beaumont, TX",
  intro:
    "Pixel & Panel helps Beaumont businesses get seen with professional signs, print materials, websites, local SEO, and QR-powered marketing.",
  body:
    "Beaumont businesses compete across busy local searches, service calls, storefront traffic, and word-of-mouth referrals. A clear online presence and strong physical branding make it easier for customers to find you, trust you, and contact you.",
  services: [
    "Custom signage and print materials for storefronts, job sites, events, and promotions.",
    "Fast, mobile-friendly websites built for local search and quote requests.",
    "Local SEO and Google Business Profile support for stronger Beaumont visibility.",
  ],
};

export const metadata = {
  title: "Custom Signs, Print & Websites in Beaumont, TX",
  description:
    "Pixel & Panel serves Beaumont, TX businesses with custom signs, print materials, websites, local SEO, Google Business Profile optimization, and QR-powered marketing.",
  alternates: {
    canonical: "/service-area/beaumont-tx",
  },
};

export default function BeaumontServiceAreaPage() {
  return <CityLanding city={city} />;
}
