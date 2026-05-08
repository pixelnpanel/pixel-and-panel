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
  featuredLinks: [
    { label: "Web Development", href: "/digital/web-development", description: "Fast websites built for local search, calls, and quote requests." },
    { label: "Local SEO", href: "/digital/local-seo", description: "Improve the way Beaumont customers find your business online." },
    { label: "Storefront Signs", href: "/signage/storefront-signs", description: "Make your location easier to find and trust." },
    { label: "Vinyl Banners", href: "/signage/vinyl-banners", description: "Durable banners for storefronts, events, fences, and promotions." },
    { label: "Vehicle Graphics", href: "/signage/vehicle-graphics", description: "Turn work vehicles into clear, professional brand assets." },
    { label: "Google Business Profile", href: "/digital/google-business-profile", description: "Clean up the profile many Beaumont customers see before calling." },
  ],
  reasons: [
    "Beaumont businesses often need both strong search visibility and clear storefront or vehicle branding.",
    "Website development and local SEO help customers understand services before they call or request a quote.",
    "Storefront signs, banners, and vehicle graphics make the same brand easier to recognize around town.",
  ],
  faqs: [
    ["What Beaumont services are most common?", "Website development, local SEO, storefront signs, banners, and vehicle graphics are strong starting points for many Beaumont businesses."],
    ["Can Pixel & Panel help if my Beaumont business already has a website?", "Yes. Pixel & Panel can review the site, Google profile, signage, and quote flow to find practical improvements."],
    ["Can signs and online marketing work together?", "Yes. Banners, storefront signs, and vehicle graphics can point customers to useful website pages, quote forms, or QR campaigns."],
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
