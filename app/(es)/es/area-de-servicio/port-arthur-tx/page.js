import CityLandingEs from "../CityLandingEs";
import { getServiceAreaEs } from "@/lib/service-areas-es";
import { withDefaultSocialImage } from "@/lib/seo";

const city = getServiceAreaEs("port-arthur-tx");

export const metadata = withDefaultSocialImage({
  title: {
    absolute: "Letreros, Web y SEO en Port Arthur, TX | Pixel & Panel",
  },
  description:
    "Pixel & Panel ayuda a negocios en Port Arthur, TX con gráficos para vehículos, letreros, sitios web, SEO local, impresión y campañas con códigos QR.",
  alternates: {
    canonical: "https://www.pixelnpanel.com/es/area-de-servicio/port-arthur-tx",
    languages: {
      "en-US": "https://www.pixelnpanel.com/service-area/port-arthur-tx",
      "x-default": "https://www.pixelnpanel.com/service-area/port-arthur-tx",
      "es-US": "https://www.pixelnpanel.com/es/area-de-servicio/port-arthur-tx",
    },
  },
  openGraph: {
    title: "Letreros, Web y SEO en Port Arthur, TX | Pixel & Panel",
    description:
      "Pixel & Panel ayuda a negocios en Port Arthur, TX con gráficos para vehículos, letreros, sitios web, SEO local, impresión y campañas con códigos QR.",
    url: "https://www.pixelnpanel.com/es/area-de-servicio/port-arthur-tx",
    siteName: "Pixel & Panel",
    locale: "es_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Letreros, Web y SEO en Port Arthur, TX | Pixel & Panel",
    description:
      "Pixel & Panel ayuda a negocios en Port Arthur, TX con gráficos para vehículos, letreros, sitios web, SEO local, impresión y campañas con códigos QR.",
  },
});

export default function PortArthurServiceAreaSpanishPage() {
  return <CityLandingEs city={city} />;
}
