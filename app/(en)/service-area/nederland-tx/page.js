import CityLanding from "../CityLanding";
import { withDefaultSocialImage } from "@/lib/seo";

const city = {
  name: "Nederland",
  h1: "Custom Signs, Modern Websites, and Local Marketing in Nederland, TX",
  intro:
    "We help Nederland small businesses, shops, and trade contractors look professional with durable exterior signs, custom banners, mobile-ready website development, and optimized Google Business Profiles.",
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
  faqs: [
    ["What should a Nederland small business start with?", "Many start with a small business website, business cards, flyers, yard signs, menus, or banners depending on how customers find them."],
    ["Can menus and flyers use QR codes?", "Yes. QR codes can send customers to menus, specials, quote forms, event details, or contact pages."],
    ["Do you only work with larger businesses?", "No. Pixel & Panel can help small Nederland businesses choose practical visibility pieces without starting with a large project."],
  ],
};

export const metadata = withDefaultSocialImage({
  title: {
    absolute: "Custom Signs, Banners & Web Design in Nederland, TX",
  },
  description:
    "Outdoor signs, custom banners, and vehicle graphics for Nederland, TX businesses — plus professional websites and Google Business Profile support.",
  alternates: {
    canonical: "/service-area/nederland-tx",
    languages: {
      "en-US": "https://www.pixelnpanel.com/service-area/nederland-tx",
      "es-US": "https://www.pixelnpanel.com/es/area-de-servicio/nederland-tx",
    },
  },
  openGraph: {
    title: "Custom Signs, Banners & Web Design in Nederland, TX",
    description:
      "Outdoor signs, custom banners, and vehicle graphics for Nederland, TX businesses — plus professional websites and Google Business Profile support.",
    url: "https://www.pixelnpanel.com/service-area/nederland-tx",
    siteName: "Pixel & Panel",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Signs, Banners & Web Design in Nederland, TX",
    description:
      "Outdoor signs, custom banners, and vehicle graphics for Nederland, TX businesses — plus professional websites and Google Business Profile support.",
  },
});

export default function NederlandServiceAreaPage() {
  return <CityLanding city={city} />;
}
