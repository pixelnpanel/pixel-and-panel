import HomeClient from "@/app/HomeClient";

const homepageFaq = [
  {
    question: "What does Pixel & Panel do?",
    answer:
      "Pixel & Panel helps local businesses get found online, get noticed in the real world, and turn attention into quote requests, calls, and customers through websites, local SEO, Google Business Profile support, signs, print materials, QR campaigns, and lead capture forms.",
  },
  {
    question: "Do you work outside Beaumont, Nederland, and Port Arthur?",
    answer:
      "Yes. Pixel & Panel works with businesses across Southeast Texas. Beaumont, Nederland, and Port Arthur are the current primary SEO service areas, but nearby businesses can still request a quote.",
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
  title: {
    absolute: "Pixel & Panel | Websites, Signs & QR Campaigns in Southeast Texas",
  },
  description:
    "Pixel & Panel helps Southeast Texas businesses get found with websites, signs, QR campaigns, local SEO, and lead capture systems.",
  alternates: {
    canonical: new URL("https://pixelnpanel.com/"),
    languages: {
      "en-US": "https://pixelnpanel.com/",
      "es-US": "https://pixelnpanel.com/es",
    },
  },
  openGraph: {
    title: "Pixel & Panel | Websites, Signs & QR Campaigns in Southeast Texas",
    description:
      "Pixel & Panel helps Southeast Texas businesses get found with websites, signs, QR campaigns, local SEO, and lead capture systems.",
    url: "https://pixelnpanel.com/",
    type: "website",
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

export default function HomePage() {
  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Pixel & Panel",
    url: "https://pixelnpanel.com",
    email: "hello@pixelnpanel.com",
    telephone: "(409) 800-6139",
    slogan: "Your Vision. Made Visible.",
    areaServed: [
      { "@type": "Place", name: "Southeast Texas" },
      { "@type": "City", name: "Beaumont, TX" },
      { "@type": "City", name: "Nederland, TX" },
      { "@type": "City", name: "Port Arthur, TX" },
    ],
    knowsAbout: [
      "Website development",
      "Local SEO",
      "Google Business Profile optimization",
      "QR code campaigns",
      "Lead capture forms",
      "Custom signs",
      "Print marketing materials",
    ],
  };

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
      <JsonLd data={businessSchema} />
      <JsonLd data={faqSchema} />
      <HomeClient faqs={homepageFaq} />
    </>
  );
}
