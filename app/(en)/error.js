"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function ErrorPage({ error, unstable_retry }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="min-h-[70vh] bg-[#FAF8F4] px-6 py-24 text-[#1C1917] md:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <p className="section-label text-[#0369A1]">Something went wrong</p>
        <h1 className="mt-4 text-[#1C1917]">We could not load this page.</h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
          Try loading it again. If it keeps happening, request a quote or contact Pixel & Panel and we will help directly.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button type="button" onClick={() => unstable_retry()} className="btn-amber justify-center">
            Try Again
          </button>
          <Link href="/contact" className="btn-outline justify-center">
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
