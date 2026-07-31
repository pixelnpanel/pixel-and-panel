import DigitalClient from "./DigitalClient";
import { withDefaultSocialImage } from "@/lib/seo";

export const metadata = withDefaultSocialImage({
  metadataBase: new URL("https://www.pixelnpanel.com"),
  title: {
    absolute: "Local Web Design, SEO & Google Profile | Pixel & Panel",
  },
  description:
    "Fast websites, local SEO, Google Profile setup, QR campaigns, and lead tools for small businesses in Beaumont and Southeast Texas.",
  alternates: {
    canonical: "/digital",
    languages: {
      "en-US": "/digital",
      "x-default": "/digital",
      "es-US": "/es/servicios-digitales",
    },
  },
  openGraph: {
    title: "Local Web Design, SEO & Google Profile | Pixel & Panel",
    description:
      "Fast websites, local SEO, Google Profile setup, QR campaigns, and lead tools for small businesses in Beaumont and Southeast Texas.",
    url: "/digital",
  },
});

const ORG_ID = "https://www.pixelnpanel.com/#organization";
const AREA_SERVED = ["Beaumont, TX", "Nederland, TX", "Port Arthur, TX"];

const SERVICE_SCHEMA = [
  {
    name: "Website Development",
    description:
      "Fast, mobile-first websites for Beaumont and Southeast Texas businesses, built around local search and quote requests.",
    url: "https://www.pixelnpanel.com/digital/web-development",
    price: "299",
  },
  {
    name: "Local SEO & Google Visibility",
    description:
      "Local SEO and Google Business Profile optimization that helps nearby customers find your services on Google and Google Maps.",
    url: "https://www.pixelnpanel.com/digital/local-seo",
    price: "199",
  },
  {
    name: "Lead Follow-Up & CRM Automation",
    description:
      "Simple lead follow-up and CRM automation that organizes inquiries from forms, phone paths, and QR campaigns in one place.",
    url: "https://www.pixelnpanel.com/digital/crm-automation",
    price: "999",
  },
  {
    name: "QR Code Campaigns",
    description:
      "QR code campaigns that connect signs, flyers, menus, and business cards to trackable digital actions.",
    url: "https://www.pixelnpanel.com/digital/qr-code-campaigns",
    price: "149",
  },
];

const FAQ_SCHEMA = [
  ["How much does a website cost?", "Websites start at $299 for a clean one-page site and $499 for a multi-page starter. Local business packages that include Google Business Profile setup and lead capture start at $799. Full package details are on our pricing page."],
  ["Do I need a website if I already have a Google profile?", "Yes. A Google profile helps customers find you, but your website is where they confirm your services, see your work, request a quote, and decide whether to call. Profiles and websites work together — one does not replace the other."],
  ["Will my website work on phones?", "Yes. Mobile layout is the starting point, not an afterthought. Most local customers search, compare, and call from their phones, so we design the mobile experience first and scale up to desktop from there."],
  ["How long does local SEO take?", "Foundational fixes — page structure, service copy, and Google profile alignment — can start improving visibility within 4–8 weeks. Competitive ranking improvements typically take 3–6 months of consistent signals. SEO is a long game, but the value compounds over time."],
  ["Can you guarantee Google rankings?", "No. We set up a strong SEO foundation and make your business easier to find, but no honest provider can guarantee exact Google rankings. Anyone who promises a #1 spot is a warning sign."],
  ["Can my signs and QR codes connect to my website?", "Yes. QR codes on signs, flyers, business cards, and vehicle graphics can send people straight to a quote form, service page, menu, or offer — connecting your print and signage to trackable digital actions."],
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": ORG_ID,
      name: "Pixel & Panel",
      url: "https://www.pixelnpanel.com",
      telephone: "+1-409-225-2012",
      email: "hello@pixelnpanel.com",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.pixelnpanel.com" },
        { "@type": "ListItem", position: 2, name: "Digital Services", item: "https://www.pixelnpanel.com/digital" },
      ],
    },
    {
      "@type": "CollectionPage",
      url: "https://www.pixelnpanel.com/digital",
      name: "Digital Services",
      mainEntity: {
        "@type": "ItemList",
        itemListElement: SERVICE_SCHEMA.map((service, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: service.name,
          url: service.url,
        })),
      },
    },
    ...SERVICE_SCHEMA.map((service) => ({
      "@type": "Service",
      name: service.name,
      description: service.description,
      url: service.url,
      provider: { "@id": ORG_ID },
      areaServed: AREA_SERVED,
      offers: {
        "@type": "Offer",
        priceCurrency: "USD",
        price: service.price,
      },
    })),
    {
      "@type": "FAQPage",
      mainEntity: FAQ_SCHEMA.map(([question, answer]) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    },
  ],
};

export default function DigitalPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <DigitalClient />
    </>
  );
}
