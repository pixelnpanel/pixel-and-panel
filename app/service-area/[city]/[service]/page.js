import { notFound } from "next/navigation";
import CityServiceLanding from "../../CityServiceLanding";
import {
  getCityServiceData,
  cityServiceStaticParams,
} from "@/lib/city-service-pages";

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

  return {
    title,
    description,
    alternates: {
      canonical: `/service-area/${city.slug}/${serviceSlug}`,
    },
    openGraph: {
      title: `${title} | Pixel & Panel`,
      description,
      url: `https://pixelnpanel.com/service-area/${city.slug}/${serviceSlug}`,
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
