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
  },
  openGraph: {
    title: "Pricing | Pixel & Panel — Starter Websites, Signs & Visibility Packages",
    description:
      "Simple starter pricing for Southeast Texas businesses, including websites, visibility setup, QR campaigns, and quote-based signage projects.",
    url: "https://pixelnpanel.com/pricing",
  },
};

export default function PricingPage() {
  return <PricingClient />;
}
