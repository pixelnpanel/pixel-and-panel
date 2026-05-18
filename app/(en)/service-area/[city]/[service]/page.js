import { notFound } from "next/navigation";
import CityServiceLanding from "../../CityServiceLanding";
import {
  getCityServiceData,
  cityServiceStaticParams,
} from "@/lib/city-service-pages";
import { getSpanishCityServicePath } from "@/lib/city-service-pages-es";

export function generateStaticParams() {
  return cityServiceStaticParams;
}

export async function generateMetadata({ params }) {
  const { city: citySlug, service: serviceSlug } = await params;
  const data = getCityServiceData(citySlug, serviceSlug);
  if (!data) return { title: "Service Area" };

  const { city, service } = data;
  const title = `${service.name} in ${city.name}, TX`;
  const description = `Pixel & Panel provides ${service.name.toLowerCase()} for businesses in ${city.name}, TX. Serving ${city.region} — request a quote or start with a free visibility check.`;
  const pagePath = `/service-area/${city.slug}/${serviceSlug}`;
  const pageUrl = `https://pixelnpanel.com${pagePath}`;
  const esPath = getSpanishCityServicePath(city.slug, serviceSlug);
  const esUrl = esPath ? `https://pixelnpanel.com${esPath}` : null;

  return {
    title,
    description,
    alternates: {
      canonical: pageUrl,
      ...(esUrl
        ? {
            languages: {
              "en-US": pageUrl,
              "es-US": esUrl,
            },
          }
        : {}),
    },
    openGraph: {
      title: `${title} | Pixel & Panel`,
      description,
      url: pageUrl,
      siteName: "Pixel & Panel",
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Pixel & Panel`,
      description,
    },
  };
}

export default async function CityServicePage({ params }) {
  const { city: citySlug, service: serviceSlug } = await params;
  const data = getCityServiceData(citySlug, serviceSlug);
  if (!data) notFound();

  return <CityServiceLanding city={data.city} service={data.service} />;
}
