import { notFound } from "next/navigation";
import CityServiceLanding from "../../CityServiceLanding";
import SignageMaterialGuide from "@/components/signage/SignageMaterialGuide";
import {
  getCityServiceData,
  cityServiceStaticParams,
} from "@/lib/city-service-pages";
import { getSpanishCityServicePath } from "@/lib/city-service-pages-es";
import { buildCityServiceMetadata } from "@/lib/seo";

const BEAUMONT_BANNER_PRODUCTS = [
  {
    heading: "13 oz vinyl for everyday use",
    description: "Single-sided vinyl with hems and grommets for storefronts and promotions. Start at 4 × 2 ft for close viewing or 8 × 4 ft for a larger display.",
    href: "/signage/banners/13oz-vinyl-banner",
    label: "See 13 oz vinyl banners",
  },
  {
    heading: "Mesh for exposed fences",
    description: "Perforations in the 10 oz mesh let air pass through. Choose it for a fence or job site where the banner will be exposed to wind.",
    href: "/signage/banners/mesh-banner",
    label: "See mesh banners",
  },
  {
    heading: "18 oz vinyl for two-sided messages",
    description: "The opaque blockout layer keeps artwork from showing through. Use double-sided print when people need to read the banner from both directions.",
    href: "/signage/banners/18oz-blockout-banner",
    label: "See 18 oz blockout banners",
  },
];

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

  return (
    <CityServiceLanding city={data.city} service={data.service}>
      {citySlug === "beaumont-tx" && serviceSlug === "vinyl-banners" && (
        <SignageMaterialGuide
          heading="Pick a Banner Material and Size"
          intro="Measure the spot where the banner will hang. Then choose the material based on wind exposure, viewing distance, and whether people approach from one side or both."
          products={BEAUMONT_BANNER_PRODUCTS}
        />
      )}
    </CityServiceLanding>
  );
}
