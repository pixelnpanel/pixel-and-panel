import PricingClient from "./PricingClient";

export const metadata = {
  title: "Pricing",
  description:
    "View Pixel & Panel website, local SEO, and digital marketing package pricing. Signage and print projects are quoted based on size, quantity, material, and timeline.",
  alternates: {
    canonical: "/pricing",
  },
  openGraph: {
    title: "Pricing | Pixel & Panel",
    description:
      "Transparent website and digital marketing pricing with custom quotes for signage and print projects.",
    url: "/pricing",
  },
};

export default function PricingPage() {
  return <PricingClient />;
}
