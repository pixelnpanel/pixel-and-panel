import PortfolioClientEs from "./PortfolioClientEs";

export const metadata = {
  title: {
    absolute: "Portafolio de Sitios y Letreros | Pixel & Panel",
  },
  description:
    "Explora ejemplos de sitios web, letreros, impresos, campañas QR y branding para negocios del sureste de Texas.",
  alternates: {
    canonical: "https://pixelnpanel.com/es/portafolio",
    languages: {
      "en-US": "https://pixelnpanel.com/portfolio",
      "es-US": "https://pixelnpanel.com/es/portafolio",
    },
  },
};

export default function SpanishPortfolioPage() {
  return <PortfolioClientEs />;
}
