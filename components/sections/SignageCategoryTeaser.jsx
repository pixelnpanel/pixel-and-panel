// Homepage "Shop Signs by Category" teaser — pulls the SAME live catalog the
// /signage hub uses, so a visitor sees tangible products + real "from" pricing
// high on the page. Server component (no client JS): just links + images.
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Box } from "lucide-react";

const TEASER_LIMIT = 6;

// Homepage-only featured categories, ranked by market demand (most-searched /
// most-purchased custom sign + print products that match our catalog). This is
// independent of the /signage hub order so we can merchandise the front page
// without reshuffling the full catalog. Any slug missing from the live catalog
// is skipped; if fewer than 6 resolve, we backfill from catalog order.
const FEATURED_SLUGS = [
  "banners", // custom vinyl banners — #1 custom sign product
  "rigid-and-metal-signs", // coroplast yard + metal signs — highest volume
  "banner-stands", // retractable stands — top trade-show display
  "flags", // feather flags — top outdoor advertising flag
  "table-covers-and-throws", // event / trade-show staple
  "real-estate-signs", // open house / yard sign demand — local search volume
];

// Resolve the featured 6 in demand order, backfilling from catalog order so the
// grid always fills even if a featured category is unpublished in the sheet.
function pickFeatured(categories) {
  const bySlug = new Map(categories.map((c) => [c.slug, c]));
  const picked = [];
  const seen = new Set();
  for (const slug of FEATURED_SLUGS) {
    const category = bySlug.get(slug);
    if (category) {
      picked.push(category);
      seen.add(slug);
    }
  }
  for (const category of categories) {
    if (picked.length >= TEASER_LIMIT) break;
    if (!seen.has(category.slug)) picked.push(category);
  }
  return picked.slice(0, TEASER_LIMIT);
}

function formatFromPrice(products = []) {
  const prices = products
    .filter((p) => p.isLive && Number.isFinite(p.lowestPrice))
    .map((p) => p.lowestPrice);
  if (!prices.length) return null;
  const min = Math.min(...prices);
  return `From $${Math.round(min).toLocaleString("en-US")}`;
}

function coverFor(category) {
  if (category.image) return { src: category.image, alt: `Custom ${category.name} — Pixel & Panel` };
  const withPhoto = (category.products || []).find((p) => p.image);
  if (withPhoto) return { src: withPhoto.image, alt: withPhoto.alt || category.name };
  return null;
}

export default function SignageCategoryTeaser({ categories = [] }) {
  if (!categories.length) return null;

  const tiles = pickFeatured(categories).map((category) => ({
    slug: category.slug,
    name: category.name,
    tagline: category.tagline,
    productCount: category.productCount,
    cover: coverFor(category),
    fromPrice: formatFromPrice(category.products),
  }));

  return (
    <section className="section-base bg-white" aria-labelledby="shop-signs-heading">
      <div className="container-px">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-heading text-xs font-bold uppercase tracking-[0.16em] text-[#F59E0B]">
            Signs &amp; Print
          </p>
          <h2 id="shop-signs-heading" className="mt-4 text-[#1C1917]">
            Shop Signs by Category
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-600 md:text-lg">
            Durable, professional signage and print — designed, printed, and shipped nationwide.
            Instant pricing on popular products, or a fast free quote for anything custom.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tiles.map((tile) => (
            <Link
              key={tile.slug}
              href={`/signage/${tile.slug}`}
              className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:border-[#F59E0B]/45 hover:shadow-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-[#0EA5E9]/30"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#FAF8F4] p-3">
                {tile.cover ? (
                  <Image
                    src={tile.cover.src}
                    alt={tile.cover.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
                    className="object-contain object-center transition duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-[#0369A1]">
                    <Box className="h-8 w-8" />
                  </div>
                )}
                {tile.fromPrice ? (
                  <span className="absolute left-3 top-3 rounded-full bg-[#F59E0B] px-2.5 py-1 font-heading text-[11px] font-bold text-[#1C1917] shadow-sm">
                    {tile.fromPrice}
                  </span>
                ) : (
                  <span className="absolute left-3 top-3 rounded-full border border-slate-200 bg-white/95 px-2.5 py-1 font-heading text-[11px] font-bold text-slate-600 shadow-sm">
                    Custom quote
                  </span>
                )}
              </div>
              <div className="flex flex-1 flex-col border-t border-slate-100 p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-[#1C1917] transition group-hover:text-[#0369A1]">{tile.name}</h3>
                  <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-slate-300 transition group-hover:translate-x-1 group-hover:text-[#F59E0B]" />
                </div>
                {tile.tagline && (
                  <p className="mt-2 text-sm leading-6 text-slate-600 line-clamp-2">{tile.tagline}</p>
                )}
                <span className="mt-auto pt-4 font-heading text-xs font-bold uppercase tracking-wide text-slate-400">
                  {tile.productCount} {tile.productCount === 1 ? "product" : "products"}
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/signage" className="btn-amber">
            Shop All Signs &amp; Print <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
