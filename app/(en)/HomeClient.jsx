import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import HomeHeroVisual from "./HomeHeroVisual";

export default function HomeClient() {
  return (
    <div className="bg-[#FAF8F4] text-[#1C1917]">
      <section className="relative overflow-hidden bg-[#0369A1] pt-24 text-white md:pt-28" aria-labelledby="homepage-hero-title">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#1C1917_0%,#0369A1_58%,#0EA5E9_100%)]" />
        <div className="absolute inset-0 opacity-18 [background-image:linear-gradient(rgba(255,255,255,.09)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.09)_1px,transparent_1px)] [background-size:44px_44px]" />
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#FAF8F4] to-transparent" />

        <div className="container-px relative grid items-center gap-10 pb-20 md:pb-24 lg:grid-cols-[1.02fr_0.98fr]">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur">
              <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#F59E0B] opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#F59E0B]" />
              </span>
              Serving Southeast Texas
            </div>

            <h1 id="homepage-hero-title" className="font-heading text-[clamp(2.05rem,4.4vw,3.55rem)] font-extrabold leading-[1.08] tracking-normal text-white">
              Website Design, Signs &amp; Print{" "}
              <span className="mt-2 block text-[#F59E0B]">
                for Southeast Texas Businesses
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-white md:text-lg">
              Pixel &amp; Panel helps local businesses in Southeast Texas show up on Google, stand out with professional signs and print, and make it easy for customers to call or reach out.
            </p>

            <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap lg:flex-nowrap">
              <Link href="/quote-request" className="btn-amber w-full justify-center whitespace-nowrap px-5 sm:w-auto">
                Request a Quote <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link href="/digital" className="btn-ghost w-full justify-center whitespace-nowrap px-5 sm:w-auto">
                Digital Services
              </Link>
              <Link href="/signage" className="btn-ghost w-full justify-center whitespace-nowrap px-5 sm:w-auto">
                Signage &amp; Print
              </Link>
            </div>

            <div className="mt-9 grid gap-3 text-sm text-white sm:grid-cols-3">
              {["Your Vision. Made Visible.", "Websites, signs, and print — all working together", "Quote-first process"].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#F59E0B]" aria-hidden="true" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <HomeHeroVisual />
        </div>
      </section>
    </div>
  );
}
