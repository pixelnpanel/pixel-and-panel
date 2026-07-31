import HomeClient from "./HomeClient";
import HomeSections from "./HomeSections";
import SpanishSuggestionBanner from "@/components/language/SpanishSuggestionBanner";
import { getCategories } from "@/lib/signage/data";
import { DEFAULT_OG_IMAGE, DEFAULT_SITE_DESCRIPTION, DEFAULT_SITE_TITLE } from "@/lib/seo";

const homepageFaq = [
  {
    question: "What does Pixel & Panel do?",
    answer:
      "Pixel & Panel helps local businesses get found online, get noticed in the real world, and turn attention into quote requests, calls, and customers through websites, local SEO, Google Business Profile support, signs, print materials, QR campaigns, and lead capture forms.",
  },
  {
    question: "What areas do you serve?",
    answer:
      "Pixel & Panel serves the Greater Houston area and Southeast Texas. Houston, Beaumont, Port Arthur, and Nederland are the primary service areas, along with Houston suburbs including Katy, Cypress, Sugar Land, The Woodlands, Pearland, and Spring. Signs and print ship nationwide, and nearby businesses outside these areas can still request a quote.",
  },
  {
    question: "Can you help with both websites and signs?",
    answer:
      "Yes. Pixel & Panel can help with websites, local search, signs, print materials, and QR codes so your online and real-world visibility work together.",
  },
  {
    question: "Can QR codes be added to signs and print materials?",
    answer:
      "Yes. QR codes can be added to banners, yard signs, menus, flyers, business cards, window graphics, vehicle graphics, and other printed materials when the viewing distance and placement make sense.",
  },
  {
    question: "How do I request a quote?",
    answer:
      "Use the quote request form and share what you need, your timing, and any project details you already know. Pixel & Panel will review the request and recommend the right next step.",
  },
];

export const metadata = {
  metadataBase: new URL("https://www.pixelnpanel.com"),
  title: {
    absolute: DEFAULT_SITE_TITLE,
  },
  description: DEFAULT_SITE_DESCRIPTION,
  alternates: {
    canonical: new URL("https://www.pixelnpanel.com/"),
    languages: {
      "en-US": "https://www.pixelnpanel.com/",
      "x-default": "https://www.pixelnpanel.com/",
      "es-US": "https://www.pixelnpanel.com/es",
    },
  },
  openGraph: {
    title: DEFAULT_SITE_TITLE,
    description: DEFAULT_SITE_DESCRIPTION,
    url: "https://www.pixelnpanel.com/",
    siteName: "Pixel & Panel",
    locale: "en_US",
    type: "website",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_SITE_TITLE,
    description: DEFAULT_SITE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
};

function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

const heroImagesFrom = (categories) =>
  categories
    .map((c) => ({
      src: c.image || (c.products || []).find((p) => p.image)?.image || null,
      alt: `Custom ${c.name} by Pixel & Panel`,
      label: c.name,
    }))
    .filter((tile) => tile.src)
    .slice(0, 4);

export default async function HomePage() {
  const categories = await getCategories();
  const heroImages = heroImagesFrom(categories);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: homepageFaq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <JsonLd data={faqSchema} />
      <HomeClient heroImages={heroImages} />
      <HomeSections faqs={homepageFaq} categories={categories} />
      <SpanishSuggestionBanner />
    </>
  );
}
