import CityLanding from "../CityLanding";

const city = {
  name: "Beaumont",
  h1: "Helping Beaumont Businesses Get Found Online and Stand Out on the Street",
  intro:
    "Pixel & Panel delivers mobile websites, local SEO frameworks, commercial signs, and print materials built to capture more customer calls for companies across Beaumont, TX.",
  body:
    "Beaumont contractors, stores, restaurants, and service companies compete across Google searches, storefront traffic, and word-of-mouth referrals. Your offline branding and digital footprint should reinforce each other so customers can find you, trust you, and contact you.",
  services: [
    "Custom signage and print materials for storefronts, job sites, events, and promotions.",
    "Fast, mobile-friendly websites built for local search and quote requests.",
    "Local SEO and Google Business Profile support for stronger Beaumont visibility.",
  ],
  featuredLinks: [
    { label: "Web Development", href: "/service-area/beaumont-tx/web-development", description: "Fast websites built for Beaumont search, calls, and quote requests." },
    { label: "Local SEO", href: "/digital/local-seo", description: "Improve the way Beaumont customers find your business online." },
    { label: "Storefront Signs", href: "/signage/storefront-signs", description: "Make your location easier to find and trust." },
    { label: "Vinyl Banners", href: "/service-area/beaumont-tx/vinyl-banners", description: "Durable Beaumont banners for storefronts, events, fences, and promotions." },
    { label: "Vehicle Graphics", href: "/signage/vehicle-graphics", description: "Turn work vehicles into clear, professional brand assets." },
    { label: "Google Business Profile", href: "/digital/google-business-profile", description: "Clean up the profile many Beaumont customers see before calling." },
  ],
  reasons: [
    "Beaumont businesses need both strong search visibility and clear storefront or vehicle branding.",
    "Website development and local SEO help customers understand services before they call or request a quote.",
    "Storefront signs, banners, yard signs, and vehicle graphics make the same brand easier to recognize around town.",
  ],
  faqs: [
    ["What Beaumont services are most common?", "Website development, local SEO, storefront signs, banners, and vehicle graphics are strong starting points for many Beaumont businesses."],
    ["Can Pixel & Panel help if my Beaumont business already has a website?", "Yes. Pixel & Panel can review the site, Google profile, signage, and quote flow to find practical improvements."],
    ["Can signs and online marketing work together?", "Yes. Banners, storefront signs, and vehicle graphics can point customers to useful website pages, quote forms, or QR campaigns."],
  ],
};

export const metadata = {
  title: {
    absolute: "Web Design, Custom Signs & Local SEO in Beaumont, TX",
  },
  description:
    "Pixel & Panel helps Beaumont, TX businesses look professional and rank high on Google with custom websites, storefront signs, local SEO, and print.",
  alternates: {
    canonical: "/service-area/beaumont-tx",
    languages: {
      "en-US": "https://www.pixelnpanel.com/service-area/beaumont-tx",
      "es-US": "https://www.pixelnpanel.com/es/area-de-servicio/beaumont-tx",
    },
  },
  openGraph: {
    title: "Web Design, Custom Signs & Local SEO in Beaumont, TX",
    description:
      "Pixel & Panel helps Beaumont, TX businesses look professional and rank high on Google with custom websites, storefront signs, local SEO, and print.",
    url: "https://www.pixelnpanel.com/service-area/beaumont-tx",
    siteName: "Pixel & Panel",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Design, Custom Signs & Local SEO in Beaumont, TX",
    description:
      "Pixel & Panel helps Beaumont, TX businesses look professional and rank high on Google with custom websites, storefront signs, local SEO, and print.",
  },
};

export default function BeaumontServiceAreaPage() {
  return <CityLanding city={city} />;
}
