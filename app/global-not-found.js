import "./globals.css";
import { inter, montserrat } from "./fonts";
import Link from "next/link";

export const metadata = {
  title: "Page Not Found | Pixel & Panel",
  description: "The page you requested could not be found.",
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className={`${montserrat.variable} ${inter.variable}`}>
      <body className="bg-[#FAF8F4] text-[#1C1917]">
        <main className="min-h-screen px-6 py-20 md:py-28">
          <section className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center text-center">
            <p className="section-label text-[#0369A1]">404</p>
            <h1 className="mt-4 text-[#1C1917]">Page not found</h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
              This page may have moved, or the link may be incorrect. Esta página pudo haber cambiado de ubicación, o el enlace puede ser incorrecto.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/" className="btn-outline justify-center">
                Back to Home
              </Link>
              <Link href="/quote-request" className="btn-amber justify-center">
                Request a Quote
              </Link>
            </div>
          </section>
        </main>
      </body>
    </html>
  );
}
