import { notFound } from "next/navigation";
import CityServiceLandingEs from "../../CityServiceLandingEs";
import {
  getCityServiceDataEs,
  cityServiceStaticParamsEs,
} from "@/lib/city-service-pages-es";

export function generateStaticParams() {
  return cityServiceStaticParamsEs;
}

export async function generateMetadata({ params }) {
  const { ciudad, servicio } = await params;
  const data = getCityServiceDataEs(ciudad, servicio);
  if (!data) return { title: "Área de Servicio" };

  const { city, service } = data;
  const title = `${service.name} en ${city.name}, TX`;
  const description = `Pixel & Panel ofrece ${service.name.toLowerCase()} para negocios en ${city.name}, TX. Servimos el sureste de Texas — solicita una cotización o empieza con un chequeo gratis de visibilidad.`;
  const pageUrl = `https://pixelnpanel.com/es/area-de-servicio/${city.slug}/${service.slug}`;
  const enUrl = `https://pixelnpanel.com/service-area/${city.enSlug}/${service.enSlug}`;

  return {
    title,
    description,
    alternates: {
      canonical: pageUrl,
      languages: {
        "en-US": enUrl,
        "es-US": pageUrl,
      },
    },
    openGraph: {
      title: `${title} | Pixel & Panel`,
      description,
      url: pageUrl,
      siteName: "Pixel & Panel",
      locale: "es_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Pixel & Panel`,
      description,
    },
  };
}

export default async function CityServicePageEs({ params }) {
  const { ciudad, servicio } = await params;
  const data = getCityServiceDataEs(ciudad, servicio);
  if (!data) notFound();

  return <CityServiceLandingEs city={data.city} service={data.service} />;
}
