import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ArticleCard from "@/components/learning-center/ArticleCard";
import {
  getPostsByCategory,
  learningCenterPosts,
} from "@/lib/learning-center-posts";

export const metadata = {
  title: {
    absolute: "Local Business Marketing Tips | Pixel & Panel",
  },
  description:
    "Helpful guides from Pixel & Panel about websites, signs, QR campaigns, local SEO, and visibility for Southeast Texas businesses.",
  alternates: {
    canonical: "https://www.pixelnpanel.com/learning-center",
    languages: {
      "en-US": "https://www.pixelnpanel.com/learning-center",
      "es-US": "https://www.pixelnpanel.com/es/centro-de-aprendizaje",
    },
  },
};

const featuredSlugs = [
  "website-checklist-for-new-local-businesses",
  "how-to-show-up-on-google-locally",
  "qr-codes-on-signs-and-print",
];

const featuredPosts = featuredSlugs
  .map((slug) => learningCenterPosts.find((post) => post.slug === slug))
  .filter(Boolean);

const signagePosts = getPostsByCategory("Signage & Print");
const websiteAndSeoPosts = [
  ...getPostsByCategory("Websites"),
  ...getPostsByCategory("Local SEO"),
];
const qrPosts = getPostsByCategory("QR Campaigns");

export default function LearningCenterIndexPage() {
  return (
    <main className="bg-[#FAF8F4] text-[#1C1917]">
      <section className="relative overflow-hidden bg-[#0C1E3C] px-6 pt-24 text-white md:pt-28">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#0C1E3C_0%,#0369A1_100%)]" />
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.09)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.09)_1px,transparent_1px)] [background-size:44px_44px]" />
        <div className="relative mx-auto max-w-6xl pb-20 md:pb-24">
          <p className="section-label" style={{ color: "#F59E0B" }}>
            Learning Center
          </p>
          <h1 className="mt-4 text-white">Learning Center</h1>
          <p className="mt-6 max-w-4xl text-lg leading-8 text-white/78">
            Helpful tips for Southeast Texas businesses that want better websites, stronger signs, improved Google visibility, and more quote requests.
          </p>
        </div>
      </section>

      <section className="section-base">
        <div className="container-px">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="section-label text-[#0369A1]">Featured Articles</p>
              <h2 className="text-[#1C1917]">Start Here</h2>
            </div>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {featuredPosts.map((post) => (
              <ArticleCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <p className="section-label text-[#0369A1]">Categories</p>
          <h2 className="text-[#1C1917]">Browse by Topic</h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {[
              "Signage & Print",
              "Websites",
              "Local SEO",
              "Google Business Profile",
              "QR Campaigns",
              "Marketing Tips",
              "Business Visibility",
            ].map((category) => (
              <span
                key={category}
                className="rounded-full border border-slate-200 bg-[#FAF8F4] px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-slate-600"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section-base">
        <div className="container-px">
          <div className="mb-7">
            <p className="section-label text-[#0369A1]">Signage & Print Tips</p>
            <h2 className="text-[#1C1917]">Practical Sign Choices for Local Visibility</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {signagePosts.map((post) => (
              <ArticleCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-7">
            <p className="section-label text-[#0369A1]">Website & Local SEO Tips</p>
            <h2 className="text-[#1C1917]">Build Strong Local Foundations</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {websiteAndSeoPosts.map((post) => (
              <ArticleCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-base">
        <div className="container-px">
          <div className="mb-7">
            <p className="section-label text-[#0369A1]">QR Campaign Ideas</p>
            <h2 className="text-[#1C1917]">Connect Signs and Print to Real Actions</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {qrPosts.map((post) => (
              <ArticleCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-16 pt-8 md:pb-24 md:pt-12">
        <div className="mx-auto max-w-6xl rounded-xl bg-[#1C1917] p-8 text-white shadow-2xl md:p-10">
          <p className="section-label" style={{ color: "#F59E0B" }}>Next Step</p>
          <h2 className="mt-3 text-white">Need a practical visibility game plan?</h2>
          <p className="mt-3 max-w-3xl text-white/75">
            Start with a free visibility check or request a quote when you are ready to move.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link href="/free-visibility-check" className="btn-amber justify-center">
              Get a Free Visibility Check <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/quote-request" className="btn-ghost justify-center">
              Request a Quote
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
