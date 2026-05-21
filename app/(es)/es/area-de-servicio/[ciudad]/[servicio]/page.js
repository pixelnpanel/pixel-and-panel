import { notFound } from "next/navigation";
import CityServiceLandingEs from "../../CityServiceLandingEs";
import {
  getCityServiceDataEs,
  cityServiceStaticParamsEs,
} from "@/lib/city-service-pages-es";
import { buildCityServiceMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return cityServiceStaticParamsEs;
}

export async function generateMetadata({ params }) {
  const { ciudad, servicio } = await params;
  const data = getCityServiceDataEs(ciudad, servicio);
  if (!data) return { title: "Área de Servicio" };

  const { city, service } = data;
  const pagePath = `/es/area-de-servicio/${city.slug}/${service.slug}`;
  const enPath = `/service-area/${city.enSlug}/${service.enSlug}`;

  return buildCityServiceMetadata({
    city,
    service,
    path: pagePath,
    alternatePath: enPath,
    locale: "es-US",
  });
}

export default async function CityServicePageEs({ params }) {
  const { ciudad, servicio } = await params;
  const data = getCityServiceDataEs(ciudad, servicio);
  if (!data) notFound();

  return <CityServiceLandingEs city={data.city} service={data.service} />;
}
