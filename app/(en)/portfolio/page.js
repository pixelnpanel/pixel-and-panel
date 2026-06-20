import PortfolioClient from "./PortfolioClient";
import { withDefaultSocialImage } from "@/lib/seo";

export const metadata = withDefaultSocialImage({
  title: {
    absolute: "Portfolio | Pixel & Panel — Websites, Signs & Branding Work",
  },
  description:
    "Explore Pixel & Panel portfolio examples for websites, signs, print materials, QR campaigns, and branding concepts for Southeast Texas businesses.",
  alternates: {
    canonical: "https://www.pixelnpanel.com/portfolio",
    languages: {
      "en-US": "https://www.pixelnpanel.com/portfolio",
      "es-US": "https://www.pixelnpanel.com/es/portafolio",
    },
  },
});

export default function PortfolioPage() {
  return <PortfolioClient />;
}
