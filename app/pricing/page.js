import PricingClient from "./PricingClient";

export const metadata = {
  title: {
    absolute:
      "Pricing | Pixel & Panel — Starter Websites, Signs & Visibility Packages",
  },
  description:
    "Simple starter pricing for Southeast Texas businesses. Pixel & Panel offers affordable website, visibility, QR campaign, and signage quote options for local businesses.",
  alternates: {
    canonical: "https://pixelnpanel.com/pricing",
    languages: {
      "en-US": "https://pixelnpanel.com/pricing",
      "es-US": "https://pixelnpanel.com/es/precios",
    },
  },
  openGraph: {
    title: "Pricing | Pixel & Panel — Starter Websites, Signs & Visibility Packages",
    description:
      "Simple starter pricing for Southeast Texas businesses, including websites, visibility setup, QR campaigns, and quote-based signage projects.",
    url: "https://pixelnpanel.com/pricing",
  },
};

const pricingFaqs = [
  { q: "Are these one-time prices?", a: "Website packages are starting prices for one-time builds. Larger projects, extra pages, special integrations, or rushed timelines may increase the quote." },
  { q: "Do I own my website?", a: "Yes. You own your website content and design once the project is paid in full. Hosting, domain, email, and third-party tools may be billed separately by those providers." },
  { q: "Is hosting included?", a: "Hosting is not included in the one-time website price unless specifically quoted. Pixel & Panel can recommend simple hosting options and help connect your domain." },
  { q: "Is professional email included?", a: "Professional email setup guidance is included. If a paid email platform is needed, the client pays that provider directly." },
  { q: "Can I start small and upgrade later?", a: "Yes. Many businesses start with a Launch Page or Starter Web Presence and add more pages, QR campaigns, SEO setup, or signage later." },
  { q: "Do you offer signs and print too?", a: "Yes. Pixel & Panel offers signage and print quote options including banners, yard signs, vehicle graphics, storefront signs, business cards, flyers, menus, and more." },
  { q: "Do you guarantee Google rankings?", a: "No. Pixel & Panel sets up the SEO foundation and helps your business become easier to find, but no ethical provider can guarantee exact Google rankings." },
  { q: "Can I get discounted portfolio pricing?", a: "Possibly. Pixel & Panel is currently accepting selected founding client projects at discounted rates in exchange for honest feedback and portfolio permission." },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: pricingFaqs.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c") }}
      />
      <PricingClient />
    </>
  );
}
