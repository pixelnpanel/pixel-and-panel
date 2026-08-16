import Link from "next/link";
import { BRAND } from "@/lib/constants";

// Shown when the order database cannot be reached — never when a token is
// simply wrong. That distinction is the whole point: a customer holding a
// valid link during an outage must not be told their order does not exist.
// Deliberately offers the phone and email as the way through, because those
// still work when the database does not.
export default function TrackingUnavailable() {
  return (
    <section className="min-h-[70vh] bg-[#FAF8F4] px-6 py-24 text-[#1C1917] md:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <p className="section-label text-[#0369A1]">Order tracking</p>
        <h1 className="mt-4 text-[#1C1917]">Order status is temporarily unavailable</h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
          Your tracking link is fine — we just can&rsquo;t reach the order system right now. Your order
          is not affected. Try again in a few minutes, or reach us directly and we&rsquo;ll look it up
          by hand.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a href={BRAND.phoneHref} className="btn-amber justify-center">
            Call {BRAND.phone}
          </a>
          <Link href="/contact" className="btn-outline justify-center">
            Contact Pixel &amp; Panel
          </Link>
        </div>
      </div>
    </section>
  );
}
