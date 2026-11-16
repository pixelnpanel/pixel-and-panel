import CityLanding from "../CityLanding";
import { withDefaultSocialImage } from "@/lib/seo";

const city = {
  name: "Nederland",
  h1: "Custom Signs and Printing Shipped to Nederland, TX",
  areaLabel: "Shipping to Southeast Texas",
  intro:
    "We ship custom signs, banners, and printed materials to Nederland businesses. Physical orders are shipping only. We also provide website design and Google Business Profile support remotely.",
  body:
    "Nederland businesses rely on local reputation, repeat customers, and being easy to verify online. When a customer spots your work truck, flyer, or sign, they often search Google to check your hours, photos, reviews, and services.",
  services: [
    "Yard signs, banners, vehicle graphics, storefront signs, and printed marketing pieces.",
    "Professional websites that explain your services clearly and make contact easy.",
    "Local SEO and Google Business Profile improvements for Nederland search visibility.",
  ],
  featuredLinks: [
    { label: "Small Business Websites", href: "/digital/web-development", description: "Mobile-friendly websites that make your Nederland business easier to contact." },
    { label: "Business Cards", href: "/service-area/nederland-tx/business-cards", description: "Clean cards for Nederland referrals, local networking, and follow-up." },
    { label: "Signs & Print Catalog", href: "/signage", description: "Browse banners, stands, flags, rigid signs, and more." },
    { label: "Yard Signs", href: "/signage/rigid-and-metal-signs/coroplast-yard-signs", description: "Affordable signs for neighborhoods, job sites, and events." },
    { label: "Feather Flags", href: "/signage/flags", description: "Tall flags that pull drive-by traffic to your storefront." },
    { label: "Vinyl Banners", href: "/signage/banners", description: "Flexible banners for promotions and local announcements." },
    { label: "QR Code Campaigns", href: "/digital/qr-code-campaigns", description: "Connect menus, flyers, cards, and banners to useful online actions." },
    { label: "Google Business Profile", href: "/digital/google-business-profile", description: "Make business details clearer when nearby customers search." },
  ],
  reasons: [
    "Nederland small businesses often need practical pieces first: a clear website, cards, flyers, menus, yard signs, and banners.",
    "Print materials work better when customers have a simple online next step after they scan or visit.",
    "Pixel & Panel keeps recommendations focused on what helps customers call, visit, request a quote, or place an order.",
  ],
  crossMarket: {
    text: "Pixel & Panel also serves the Greater Houston area with custom banners, yard signs, and real estate signs.",
    label: "Explore Houston signs & printing",
    href: "/houston",
  },
  faqs: [
    ["How do I receive my sign or print order in Nederland?", "We ship your order to your Nederland address. If your sign needs installation, arrange it with a local installer."],
    ["What should a Nederland small business start with?", "Many start with a small business website, business cards, flyers, yard signs, menus, or banners depending on how customers find them."],
    ["Can menus and flyers use QR codes?", "Yes. QR codes can send customers to menus, specials, quote forms, event details, or contact pages."],
    ["Do you only work with larger businesses?", "No. Pixel & Panel can help small Nederland businesses choose practical visibility pieces without starting with a large project."],
  ],
};

const title = "Custom Signs and Banners Shipped to Nederland, TX";
const description = "Order custom signs, vinyl banners, and business cards shipped to Nederland, TX. Website design and Google Business Profile support are available remotely.";

export const metadata = withDefaultSocialImage({
  title: {
    absolute: title,
  },
  description,
  alternates: {
    canonical: "/service-area/nederland-tx",
    languages: {
      "en-US": "https://www.pixelnpanel.com/service-area/nederland-tx",
      "x-default": "https://www.pixelnpanel.com/service-area/nederland-tx",
      "es-US": "https://www.pixelnpanel.com/es/area-de-servicio/nederland-tx",
    },
  },
  openGraph: {
    title,
    description,
    url: "https://www.pixelnpanel.com/service-area/nederland-tx",
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

export default function NederlandServiceAreaPage() {
  return <CityLanding city={city} />;
}
