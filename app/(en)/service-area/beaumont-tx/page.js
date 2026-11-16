import CityLanding from "../CityLanding";
import { withDefaultSocialImage } from "@/lib/seo";

const city = {
  name: "Beaumont",
  h1: "Custom Signs for Beaumont Businesses",
  intro:
    "Pixel & Panel makes storefront signs, custom banners, window graphics, and truck lettering for businesses in Beaumont, TX. Tell us where your sign will go and when you need it. We’ll help you choose a size, material, and finish.",
  body:
    "Beaumont contractors, stores, restaurants, and service companies compete across Google searches, storefront traffic, and word-of-mouth referrals. Your offline branding and digital footprint should reinforce each other so customers can find you, trust you, and contact you.",
  services: [
    "Custom signage and print materials for storefronts, job sites, events, and promotions.",
    "Fast, mobile-friendly websites built for local search and quote requests.",
    "Local SEO and Google Business Profile support for stronger Beaumont visibility.",
  ],
  featuredLinks: [
    { label: "Storefront Signs", href: "/service-area/beaumont-tx/storefront-signs", type: "signage", description: "Building signs and dimensional letters for storefronts, offices, and commercial spaces." },
    { label: "Custom Banners in Beaumont", href: "/service-area/beaumont-tx/vinyl-banners", type: "signage", description: "Vinyl banners for grand openings, events, fences, and promotions." },
    { label: "Window Graphics & Vinyl Decals", href: "/signage/vinyl-decals-and-window-graphics", description: "Compare lettering, clear decals, and one-way vinyl for storefront glass." },
    { label: "Truck Lettering & Wraps", href: "/service-area/beaumont-tx/vehicle-graphics", type: "signage", description: "Lettering, wraps, and graphics for work trucks, vans, and fleets." },
    { label: "Web Development", href: "/service-area/beaumont-tx/web-development", type: "digital", description: "Fast websites built for Beaumont search, calls, and quote requests." },
    { label: "Local SEO", href: "/digital/local-seo", description: "Improve the way Beaumont customers find your business online." },
    { label: "Signs & Print Catalog", href: "/signage", description: "Browse banners, stands, flags, rigid signs, and more." },
    { label: "Car & Vehicle Magnets", href: "/signage/rigid-and-metal-signs/car-and-vehicle-magnets", description: "Turn work vehicles into clear, professional brand assets." },
    { label: "Google Business Profile", href: "/digital/google-business-profile", description: "Clean up the profile many Beaumont customers see before calling." },
  ],
  reasons: [
    "Beaumont businesses need both strong search visibility and clear storefront or vehicle branding.",
    "Website development and local SEO help customers understand services before they call or request a quote.",
    "Storefront signs, banners, yard signs, and vehicle graphics make the same brand easier to recognize around town.",
  ],
  crossMarket: {
    text: "Pixel & Panel also serves the Greater Houston area with custom banners, yard signs, and real estate signs.",
    label: "Explore Houston signs & printing",
    href: "/houston",
  },
  faqs: [
    ["What Beaumont services are most common?", "Website development, local SEO, storefront signs, banners, and vehicle graphics are strong starting points for many Beaumont businesses."],
    ["Can Pixel & Panel help if my Beaumont business already has a website?", "Yes. Pixel & Panel can review the site, Google profile, signage, and quote flow to find practical improvements."],
    ["Can signs and online marketing work together?", "Yes. Banners, storefront signs, and vehicle graphics can point customers to useful website pages, quote forms, or QR campaigns."],
  ],
};

const title = "Custom Signs in Beaumont, TX | Pixel & Panel";
const description = "Need a sign shop serving Beaumont, TX? Get a quote for custom storefront signs, vinyl banners, window graphics, truck lettering, and print from Pixel & Panel.";

export const metadata = withDefaultSocialImage({
  title: {
    absolute: title,
  },
  description,
  alternates: {
    canonical: "/service-area/beaumont-tx",
    languages: {
      "en-US": "https://www.pixelnpanel.com/service-area/beaumont-tx",
      "x-default": "https://www.pixelnpanel.com/service-area/beaumont-tx",
      "es-US": "https://www.pixelnpanel.com/es/area-de-servicio/beaumont-tx",
    },
  },
  openGraph: {
    title,
    description,
    url: "https://www.pixelnpanel.com/service-area/beaumont-tx",
    siteName: "Pixel & Panel",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
});

export default function BeaumontServiceAreaPage() {
  return <CityLanding city={city} />;
}
