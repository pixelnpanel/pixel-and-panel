import Image from "next/image";
import Link from "next/link";
import HoustonServicePage from "@/components/houston/HoustonServicePage";
import SignageMaterialGuide from "@/components/signage/SignageMaterialGuide";
import { houstonServices } from "@/content/houston";
import { resolveReviewImage } from "@/lib/review-images";
import { GOOGLE_REVIEWS, reviews } from "@/lib/reviews";
import { withDefaultSocialImage } from "@/lib/seo";

const service = houstonServices["event-banners"];
const PATH = "/houston/event-banners";

const EVENT_BANNER_PRODUCTS = [
  {
    heading: "Outdoor entrances and directions",
    description: "Start with a 6 × 2 ft vinyl banner for directions at close range. Consider 8 × 4 ft for an entrance that needs to be seen from farther away.",
    href: "/signage/banners/13oz-vinyl-banner",
    label: "See outdoor vinyl banners",
  },
  {
    heading: "Indoor sponsor and registration banners",
    description: "9 oz printed polyester fabric has a soft, low-glare finish for indoor displays. Measure your display space and check how the venue allows banners to be hung.",
    href: "/signage/banners/9oz-fabric-banner",
    label: "See fabric banners",
  },
  {
    heading: "Photo backdrops",
    description: "Start with an 8 × 8 ft step-and-repeat for group photos. Allow room for the stand, guests, and camera, and repeat sponsor logos at different heights.",
    href: "/signage/banner-stands/step-and-repeat-backdrop",
    label: "See step-and-repeat backdrops",
  },
];

export const metadata = withDefaultSocialImage({
  title: { absolute: service.metaTitle },
  description: service.metaDescription,
  alternates: {
    canonical: PATH,
    languages: {
      "en-US": `https://www.pixelnpanel.com${PATH}`,
      "x-default": `https://www.pixelnpanel.com${PATH}`,
      "es-US": `https://www.pixelnpanel.com${service.esPath}`,
    },
  },
  openGraph: {
    title: service.metaTitle,
    description: service.metaDescription,
    url: `https://www.pixelnpanel.com${PATH}`,
    siteName: "Pixel & Panel",
    locale: "en_US",
    type: "website",
  },
});

export default function HoustonEventBannersRoute() {
  const bannerReview = reviews.find((review) => review.slug === "viviana-alvarado");
  const bannerImage = resolveReviewImage(bannerReview?.slug);

  return (
    <HoustonServicePage service={service} path={PATH} locale="en">
      <SignageMaterialGuide
        heading="Choose a Banner Size and Material for Your Event"
        intro="Start with where people will see the banner and how it will be mounted. These sizes are starting points for common event setups."
        products={EVENT_BANNER_PRODUCTS}
      />
      {bannerImage && (
        <section className="px-6 py-12 md:py-16" aria-labelledby="event-banner-project">
          <div className="mx-auto grid max-w-5xl items-center gap-8 md:grid-cols-2">
            <Image
              src={bannerImage}
              alt="Aquavita retractable banner design with Spanish text and a blue water graphic"
              width={1402}
              height={1122}
              sizes="(max-width: 767px) 100vw, 496px"
              className="h-auto w-full rounded-2xl"
            />
            <div>
              <h2 id="event-banner-project">Aquavita Retractable Banner Design</h2>
              <p className="mt-4 leading-7 text-slate-600">
                This artwork shows how a freestanding banner can present a business name, services, and contact details in a narrow space. A retractable stand is an option for registration desks and exhibit booths.
              </p>
              <figure className="my-5 border-l-2 border-[#F59E0B] pl-4">
                <blockquote className="text-slate-700" lang="es">&ldquo;{bannerReview.quote}&rdquo;</blockquote>
                <figcaption className="mt-2 text-sm text-slate-600">
                  {bannerReview.name} · <a href={GOOGLE_REVIEWS.profileUrl} className="underline underline-offset-4">Google review</a>
                </figcaption>
              </figure>
              <Link href="/signage/banner-stands/standard-retractable" className="text-sm font-semibold text-[#0369A1] underline underline-offset-4">
                See retractable banner stands
              </Link>
            </div>
          </div>
        </section>
      )}
    </HoustonServicePage>
  );
}
