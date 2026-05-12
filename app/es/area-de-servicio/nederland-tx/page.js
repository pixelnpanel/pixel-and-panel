import CityLandingEs from "../CityLandingEs";
import { getServiceAreaEs } from "@/lib/service-areas-es";

const city = getServiceAreaEs("nederland-tx");

export const metadata = {
  title: {
    absolute: "Sitios Web, Letreros e Impresión en Nederland, TX | Pixel & Panel",
  },
  description:
    "Pixel & Panel ayuda a negocios en Nederland, TX con sitios web, tarjetas, volantes, banners, letreros, SEO local y códigos QR.",
  alternates: {
    canonical: "https://pixelnpanel.com/es/area-de-servicio/nederland-tx",
    languages: {
      "en-US": "https://pixelnpanel.com/service-area/nederland-tx",
      "es-US": "https://pixelnpanel.com/es/area-de-servicio/nederland-tx",
    },
  },
  openGraph: {
    title: "Sitios Web, Letreros e Impresión en Nederland, TX | Pixel & Panel",
    description:
      "Pixel & Panel ayuda a negocios en Nederland, TX con sitios web, tarjetas, volantes, banners, letreros, SEO local y códigos QR.",
    url: "https://pixelnpanel.com/es/area-de-servicio/nederland-tx",
    siteName: "Pixel & Panel",
    locale: "es_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sitios Web, Letreros e Impresión en Nederland, TX | Pixel & Panel",
    description:
      "Pixel & Panel ayuda a negocios en Nederland, TX con sitios web, tarjetas, volantes, banners, letreros, SEO local y códigos QR.",
  },
};

export default function NederlandServiceAreaSpanishPage() {
  return <CityLandingEs city={city} />;
}
