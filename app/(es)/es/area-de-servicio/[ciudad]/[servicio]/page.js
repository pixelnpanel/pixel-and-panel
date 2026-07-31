import { notFound } from "next/navigation";
import CityServiceLandingEs from "../../CityServiceLandingEs";
import {
  getCityServiceDataEs,
  cityServiceStaticParamsEs,
} from "@/lib/city-service-pages-es";
import { getEnglishCityServicePath } from "@/lib/city-service-pages";
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
  // null when the English side has no page for this pair — see
  // getEnglishCityServicePath. Never point hreflang at a URL that isn't built.
  const enPath = getEnglishCityServicePath(city.enSlug, service.enSlug);

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
