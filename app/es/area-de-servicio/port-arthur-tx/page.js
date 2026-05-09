import CityLandingEs from "../CityLandingEs";
import { getServiceAreaEs } from "@/lib/service-areas-es";

const city = getServiceAreaEs("port-arthur-tx");

export const metadata = {
  title: {
    absolute: "Letreros, Sitios Web y SEO Local en Port Arthur, TX | Pixel & Panel",
  },
  description:
    "Pixel & Panel ayuda a negocios en Port Arthur, TX con gráficos para vehículos, letreros, sitios web, SEO local, impresión y campañas con códigos QR.",
  alternates: {
    canonical: "https://pixelnpanel.com/es/area-de-servicio/port-arthur-tx",
    languages: {
      "en-US": "https://pixelnpanel.com/service-area/port-arthur-tx",
      "es-US": "https://pixelnpanel.com/es/area-de-servicio/port-arthur-tx",
    },
  },
  openGraph: {
    title: "Letreros, Sitios Web y SEO Local en Port Arthur, TX | Pixel & Panel",
    description:
      "Pixel & Panel ayuda a negocios en Port Arthur, TX con gráficos para vehículos, letreros, sitios web, SEO local, impresión y campañas con códigos QR.",
    url: "https://pixelnpanel.com/es/area-de-servicio/port-arthur-tx",
    locale: "es_US",
  },
};

export default function PortArthurServiceAreaSpanishPage() {
  return <CityLandingEs city={city} />;
}
