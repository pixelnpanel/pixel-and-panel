import PortfolioClient from "./PortfolioClient";

export const metadata = {
  title: "Portfolio | Pixel & Panel — Websites, Signs & Branding Work",
  description:
    "Explore Pixel & Panel portfolio examples for websites, signs, print materials, QR campaigns, and branding concepts for Southeast Texas businesses.",
  alternates: {
    canonical: "https://pixelnpanel.com/portfolio",
    languages: {
      "en-US": "https://pixelnpanel.com/portfolio",
      "es-US": "https://pixelnpanel.com/es/portafolio",
    },
  },
};

export default function PortfolioPage() {
  return <PortfolioClient />;
}
