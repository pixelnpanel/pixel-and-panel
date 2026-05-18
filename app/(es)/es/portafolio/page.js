import PortfolioClientEs from "./PortfolioClientEs";

export const metadata = {
  title: {
    absolute: "Portafolio | Pixel & Panel — Sitios Web, Letreros y Branding",
  },
  description:
    "Explora ejemplos de Pixel & Panel para sitios web, letreros, materiales impresos, campañas con códigos QR y conceptos de branding para negocios del sureste de Texas.",
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
