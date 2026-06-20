import PortfolioClientEs from "./PortfolioClientEs";
import { withDefaultSocialImage } from "@/lib/seo";

export const metadata = withDefaultSocialImage({
  title: {
    absolute: "Portafolio de Sitios y Letreros | Pixel & Panel",
  },
  description:
    "Explora ejemplos de sitios web, letreros, impresos, campañas QR y branding para negocios del sureste de Texas.",
  alternates: {
    canonical: "https://www.pixelnpanel.com/es/portafolio",
    languages: {
      "en-US": "https://www.pixelnpanel.com/portfolio",
      "es-US": "https://www.pixelnpanel.com/es/portafolio",
    },
  },
});

export default function SpanishPortfolioPage() {
  return <PortfolioClientEs />;
}
