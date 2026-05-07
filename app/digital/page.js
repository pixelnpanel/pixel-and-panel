import DigitalClient from "./DigitalClient";

export const metadata = {
  title: "Digital Services",
  description:
    "Websites, local SEO, Google Business Profile optimization, CRM automation, and QR code campaigns for businesses in Beaumont, Nederland, and Port Arthur, TX.",
  alternates: {
    canonical: "/digital",
  },
  openGraph: {
    title: "Digital Services | Pixel & Panel",
    description:
      "Digital services that help local businesses get found online, turn visitors into leads, and connect print campaigns to measurable results.",
    url: "/digital",
  },
};

export default function DigitalPage() {
  return <DigitalClient />;
}
