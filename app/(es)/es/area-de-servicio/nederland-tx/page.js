import CityLandingEs from "../CityLandingEs";
import { getServiceAreaEs } from "@/lib/service-areas-es";
import { withDefaultSocialImage } from "@/lib/seo";

const city = getServiceAreaEs("nederland-tx");

export const metadata = withDefaultSocialImage({
  title: {
    absolute: "Web, Letreros e Impresión en Nederland, TX | Pixel & Panel",
  },
  description:
    "Pixel & Panel ayuda a negocios en Nederland, TX con sitios web, tarjetas, volantes, banners, letreros, SEO local y códigos QR.",
  alternates: {
    canonical: "https://www.pixelnpanel.com/es/area-de-servicio/nederland-tx",
    languages: {
      "en-US": "https://www.pixelnpanel.com/service-area/nederland-tx",
      "es-US": "https://www.pixelnpanel.com/es/area-de-servicio/nederland-tx",
    },
  },
  openGraph: {
    title: "Web, Letreros e Impresión en Nederland, TX | Pixel & Panel",
    description:
      "Pixel & Panel ayuda a negocios en Nederland, TX con sitios web, tarjetas, volantes, banners, letreros, SEO local y códigos QR.",
    url: "https://www.pixelnpanel.com/es/area-de-servicio/nederland-tx",
    siteName: "Pixel & Panel",
    locale: "es_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Web, Letreros e Impresión en Nederland, TX | Pixel & Panel",
    description:
      "Pixel & Panel ayuda a negocios en Nederland, TX con sitios web, tarjetas, volantes, banners, letreros, SEO local y códigos QR.",
  },
});

export default function NederlandServiceAreaSpanishPage() {
  return <CityLandingEs city={city} />;
}
