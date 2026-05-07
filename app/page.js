import HomeClient from "@/app/HomeClient";

const homepageFaq = [
  {
    question: "Do you only work in Beaumont, Nederland, and Port Arthur?",
    answer:
      "Those are the primary service areas we are focused on right now. Pixel & Panel helps local businesses in Beaumont, Nederland, and Port Arthur, TX with websites, signs, print, and QR-powered marketing.",
  },
  {
    question: "Can you help with both signs and websites?",
    answer:
      "Yes. Pixel & Panel is built to connect physical visibility with digital visibility, so a business can get help with websites, local SEO, Google Business Profile, signs, print materials, and QR campaigns in one place.",
  },
  {
    question: "Do you offer quote requests online?",
    answer:
      "Yes. You can request a free quote online and include the product or service you are interested in, along with details like size, quantity, timing, and business goals.",
  },
  {
    question: "Can QR codes be added to signs and print materials?",
    answer:
      "Yes. QR codes can be added to banners, yard signs, menus, flyers, business cards, window graphics, and other printed materials to help connect offline attention with online action.",
  },
  {
    question: "Do you work with new businesses?",
    answer:
      "Yes. Pixel & Panel can help new businesses with starter websites, local search setup, business cards, storefront signs, banners, menus, and other launch materials.",
  },
];

export const metadata = {
  title: {
    absolute: "Websites, Signs & Print in Beaumont, Nederland & Port Arthur | Pixel & Panel",
  },
  description:
    "Pixel & Panel helps businesses in Beaumont, Nederland, and Port Arthur, TX with custom signs, print materials, websites, local SEO, and QR-powered marketing.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Websites, Signs & Print in Beaumont, Nederland & Port Arthur | Pixel & Panel",
    description:
      "Pixel & Panel helps businesses in Beaumont, Nederland, and Port Arthur, TX with custom signs, print materials, websites, local SEO, and QR-powered marketing.",
    url: "/",
    type: "website",
  },
};

function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function HomePage() {
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
      <HomeClient faqs={homepageFaq} />
    </>
  );
}
