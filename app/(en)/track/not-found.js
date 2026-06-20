import Link from "next/link";
import { createOrderTrackingMetadata } from "@/lib/order-tracking-metadata";

export const metadata = createOrderTrackingMetadata();

export default function TrackOrderNotFound() {
  return (
    <section className="min-h-[70vh] bg-[#FAF8F4] px-6 py-24 text-[#1C1917] md:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <p className="section-label text-[#0369A1]">Order tracking</p>
        <h1 className="mt-4 text-[#1C1917]">Order tracking link not found</h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
          This tracking link may be incorrect or expired. Use your order number and contact email to check your latest status.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/track-order" className="btn-amber justify-center">
            Track order
          </Link>
          <Link href="/contact" className="btn-outline justify-center">
            Contact Pixel & Panel
          </Link>
        </div>
      </div>
    </section>
  );
}
