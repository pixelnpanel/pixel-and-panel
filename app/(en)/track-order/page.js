import TrackOrderClient from "./TrackOrderClient";

export const metadata = {
  title: "Track Your Order",
  description:
    "Track a Pixel & Panel signage, print, website, or marketing project with your order number and contact email.",
  alternates: {
    canonical: "https://pixelnpanel.com/track-order",
    languages: {
      "en-US": "https://pixelnpanel.com/track-order",
      "es-US": "https://pixelnpanel.com/es/rastrear-pedido",
    },
  },
  openGraph: {
    title: "Track Your Order | Pixel & Panel",
    description:
      "Check the latest status for your Pixel & Panel project, proof, production, install, or completion step.",
    url: "https://pixelnpanel.com/track-order",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function TrackOrderPage() {
  return <TrackOrderClient />;
}
