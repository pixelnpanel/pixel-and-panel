import CityLanding from "../CityLanding";

const city = {
  name: "Nederland",
  h1: "Custom Signs, Print & Websites in Nederland, TX",
  intro:
    "Pixel & Panel helps Nederland businesses improve local visibility with signs, print materials, websites, local SEO, and QR-powered marketing.",
  body:
    "Nederland businesses rely on local reputation, repeat customers, and being easy to find when someone is ready to call, visit, or request a quote. We help connect your real-world brand with the online presence customers expect.",
  services: [
    "Yard signs, banners, vehicle graphics, storefront signs, and printed marketing pieces.",
    "Professional websites that explain your services clearly and make contact easy.",
    "Local SEO and Google Business Profile improvements for Nederland search visibility.",
  ],
  featuredLinks: [
    { label: "Business Cards", href: "/signage/business-cards", description: "Clean cards for referrals, local networking, and follow-up." },
    { label: "Flyers", href: "/signage/flyers", description: "Simple print pieces for offers, events, and service promotion." },
    { label: "Yard Signs", href: "/signage/yard-signs", description: "Affordable signs for neighborhoods, job sites, and events." },
    { label: "Vinyl Banners", href: "/signage/vinyl-banners", description: "Flexible banners for promotions and local announcements." },
    { label: "Menus", href: "/signage/menus", description: "Printed menus for restaurants, food trucks, catering, and events." },
    { label: "Website Development", href: "/digital/web-development", description: "Mobile-friendly websites that make your business easier to contact." },
  ],
};

export const metadata = {
  title: "Custom Signs, Print & Websites in Nederland, TX",
  description:
    "Pixel & Panel serves Nederland, TX businesses with custom signs, print materials, websites, local SEO, Google Business Profile optimization, and QR-powered marketing.",
  alternates: {
    canonical: "/service-area/nederland-tx",
  },
};

export default function NederlandServiceAreaPage() {
  return <CityLanding city={city} />;
}
