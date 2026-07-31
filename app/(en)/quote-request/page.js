import QuoteRequestClient from "./QuoteRequestClient";
import { Suspense } from "react";
import { withDefaultSocialImage } from "@/lib/seo";

export const metadata = withDefaultSocialImage({
  metadataBase: new URL("https://www.pixelnpanel.com"),
  title: "Request a Quote",
  description:
    "Request a free quote from Pixel & Panel for signage, print, websites, local SEO, QR campaigns, and branding services.",
  alternates: {
    canonical: "/quote-request",
    languages: {
      "en-US": "/quote-request",
      "x-default": "/quote-request",
      "es-US": "/es/solicitar-cotizacion",
    },
  },
  openGraph: {
    title: "Request a Quote | Pixel & Panel",
    description:
      "Tell Pixel & Panel what you need and get a free quote for signage, print, websites, local SEO, and QR-powered marketing.",
    url: "/quote-request",
  },
});

// Server-rendered Suspense fallback. QuoteRequestClient uses useSearchParams,
// which bails the whole subtree out of SSR — with fallback={null} crawlers got
// a page with no H1 and almost no content. This fallback mirrors the client
// hero (same background and copy) so search engines index a real headline and
// the swap after hydration is visually seamless.
function QuoteRequestFallback() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#0369A1] bg-[radial-gradient(circle_at_80%_20%,rgba(14,165,233,0.65),transparent_32%),linear-gradient(135deg,#06213f_0%,#0369A1_48%,#0EA5E9_100%)] text-white">
      <section className="pnp-mobile-quote-hero relative overflow-hidden px-6 py-24 sm:py-28 lg:px-8">
        <div className="absolute inset-0 opacity-20">
          <div className="h-full w-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.22)_1px,transparent_1px)] [background-size:28px_28px]" />
        </div>
        <div className="relative mx-auto max-w-6xl">
          <p className="mb-5 section-label">Free Quote</p>
          <h1 className="pnp-mobile-form-title max-w-[342px] break-words text-[1.85rem] leading-tight md:max-w-xl md:text-[clamp(2rem,4vw,3rem)]" style={{ color: "white" }}>
            Tell Us About <span className="text-[#F59E0B]">Your Business.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-white/80">
            Fill in the form and we will get back to you within 1 business day with a
            custom quote — no pressure, no obligation. Signs, banners, vehicle graphics,
            print, websites, and Google visibility for Southeast Texas businesses.
          </p>
          <p className="mt-4 max-w-xl text-sm font-semibold text-white/70">
            ★ 5.0 on Google · Locally owned Texas LLC · Files proofed before print
          </p>
        </div>
      </section>
    </div>
  );
}

export default function QuoteRequestPage() {
  return (
    <Suspense fallback={<QuoteRequestFallback />}>
      <QuoteRequestClient />
    </Suspense>
  );
}
