import Link from "next/link";

export const metadata = {
  // `absolute` because the (en) layout appends " | Pixel & Panel" to every
  // child title — a plain string here rendered as "… | Pixel & Panel | Pixel & Panel".
  title: { absolute: "Page Not Found | Pixel & Panel" },
  description: "The page you requested could not be found.",
  // Metadata is shallowly merged parent-to-child, so without this the layout's
  // `alternates.canonical` survives and every 404 in this segment claims to be
  // the homepage. A canonical is also a contradictory signal next to the
  // `noindex` Next.js sets on not-found pages.
  alternates: { canonical: null },
};

export default function NotFound() {
  return (
    <section className="min-h-[70vh] bg-[#FAF8F4] px-6 py-24 text-[#1C1917] md:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <p className="section-label text-[#0369A1]">404</p>
        <h1 className="mt-4 text-[#1C1917]">Page not found</h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
          This page may have moved, or the link may be incorrect. Start from the homepage or request a quote and we can point you in the right direction.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className="btn-outline justify-center">
            Back to Home
          </Link>
          <Link href="/quote-request" className="btn-amber justify-center">
            Request a Quote
          </Link>
        </div>
      </div>
    </section>
  );
}
