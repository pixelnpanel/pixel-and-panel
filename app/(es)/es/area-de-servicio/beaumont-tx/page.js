import CityLandingEs from "../CityLandingEs";
import { getServiceAreaEs } from "@/lib/service-areas-es";

const city = getServiceAreaEs("beaumont-tx");

export const metadata = {
  title: {
    absolute: "Web, Letreros y SEO en Beaumont, TX | Pixel & Panel",
  },
  description:
    "Pixel & Panel ayuda a negocios en Beaumont, TX con sitios web, letreros, impresión, SEO local, Perfil de Google y campañas con códigos QR.",
  alternates: {
    canonical: "https://www.pixelnpanel.com/es/area-de-servicio/beaumont-tx",
    languages: {
      "en-US": "https://www.pixelnpanel.com/service-area/beaumont-tx",
      "es-US": "https://www.pixelnpanel.com/es/area-de-servicio/beaumont-tx",
    },
  },
  openGraph: {
    title: "Web, Letreros y SEO en Beaumont, TX | Pixel & Panel",
    description:
      "Pixel & Panel ayuda a negocios en Beaumont, TX con sitios web, letreros, impresión, SEO local, Perfil de Google y campañas con códigos QR.",
    url: "https://www.pixelnpanel.com/es/area-de-servicio/beaumont-tx",
    siteName: "Pixel & Panel",
    locale: "es_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Web, Letreros y SEO en Beaumont, TX | Pixel & Panel",
    description:
      "Pixel & Panel ayuda a negocios en Beaumont, TX con sitios web, letreros, impresión, SEO local, Perfil de Google y campañas con códigos QR.",
  },
};

export default function BeaumontServiceAreaSpanishPage() {
  return <CityLandingEs city={city} />;
}
