import { notFound } from "next/navigation";
import CityServiceLanding from "../../CityServiceLanding";
import {
  getCityServiceData,
  cityServiceStaticParams,
} from "@/lib/city-service-pages";
import { getSpanishCityServicePath } from "@/lib/city-service-pages-es";
import { buildCityServiceMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return cityServiceStaticParams;
}

export async function generateMetadata({ params }) {
  const { city: citySlug, service: serviceSlug } = await params;
  const data = getCityServiceData(citySlug, serviceSlug);
  if (!data) return { title: "Service Area" };

  const { city, service } = data;
  const pagePath = `/service-area/${city.slug}/${serviceSlug}`;
  const esPath = getSpanishCityServicePath(city.slug, serviceSlug);

  return buildCityServiceMetadata({
    city,
    service,
    path: pagePath,
    alternatePath: esPath,
    locale: "en-US",
  });
}

export default async function CityServicePage({ params }) {
  const { city: citySlug, service: serviceSlug } = await params;
  const data = getCityServiceData(citySlug, serviceSlug);
  if (!data) notFound();

  return <CityServiceLanding city={data.city} service={data.service} />;
}
