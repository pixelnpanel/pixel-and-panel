import DigitalClientEs from "./DigitalClientEs";

export const metadata = {
  title: {
    absolute: "Servicios Digitales | Pixel & Panel — Sitios Web, SEO Local y Códigos QR",
  },
  description:
    "Servicios digitales para negocios del sureste de Texas: sitios web, SEO local, perfil de Google, automatización CRM y campañas con códigos QR.",
  alternates: {
    canonical: "https://pixelnpanel.com/es/servicios-digitales",
    languages: {
      "en-US": "https://pixelnpanel.com/digital",
      "es-US": "https://pixelnpanel.com/es/servicios-digitales",
    },
  },
  openGraph: {
    title: "Servicios Digitales | Pixel & Panel",
    description:
      "Sitios web, SEO local, Perfil de Google, automatización CRM y campañas con códigos QR para negocios locales.",
    url: "https://pixelnpanel.com/es/servicios-digitales",
    locale: "es_US",
  },
};

export default function SpanishDigitalServicesPage() {
  return <DigitalClientEs />;
}
