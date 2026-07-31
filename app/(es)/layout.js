import "../globals.css";
import { Suspense } from "react";
import { GoogleTagManager } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { inter, montserrat } from "../fonts";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MetaPixel from "@/components/analytics/MetaPixel";
import ContactClickTracker from "@/components/analytics/ContactClickTracker";
import LocalBusinessJsonLd from "@/components/seo/LocalBusinessJsonLd";
import WhatsAppWidget from "@/components/ui/WhatsAppWidget";
import FloatingQuoteButton from "@/components/ui/FloatingQuoteButton";
import { DEFAULT_OG_IMAGE } from "@/lib/seo";

export const viewport = {
  themeColor: "#0C1E3C",
};

export const metadata = {
  metadataBase: new URL("https://www.pixelnpanel.com"),
  title: {
    default: "Diseño Web, Letreros e Impresión en Beaumont, Nederland y Port Arthur | Pixel & Panel",
    template: "%s | Pixel & Panel",
  },
  description:
    "Pixel & Panel ayuda a negocios en Beaumont, Nederland y Port Arthur, TX con letreros personalizados, impresión, sitios web, SEO local y marketing con códigos QR.",
  alternates: {
    canonical: "https://www.pixelnpanel.com/es",
  },
  openGraph: {
    title: "Diseño Web, Letreros e Impresión en Beaumont, Nederland y Port Arthur | Pixel & Panel",
    description:
      "Letreros personalizados, impresión, sitios web, SEO local y marketing con códigos QR para negocios en Beaumont, Nederland y Port Arthur, TX.",
    url: "https://www.pixelnpanel.com/es",
    siteName: "Pixel & Panel",
    locale: "es_US",
    type: "website",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Diseño Web, Letreros e Impresión en Beaumont, Nederland y Port Arthur | Pixel & Panel",
    description:
      "Pixel & Panel ayuda a negocios en Beaumont, Nederland y Port Arthur, TX con letreros personalizados, impresión, sitios web, SEO local y marketing con códigos QR.",
    images: [DEFAULT_OG_IMAGE],
  },
  other: {
    "facebook-domain-verification": "xrurc3oj4fr9szyqqy555vpi7ruom1",
  },
};

export default function SpanishRootLayout({ children }) {
  return (
    <html lang="es-US" data-scroll-behavior="smooth" className={`${montserrat.variable} ${inter.variable}`}>
      <GoogleTagManager gtmId="GTM-W5NHMVJF" />
      <body>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-[#F59E0B] focus:px-4 focus:py-2 focus:font-bold focus:text-[#1C1917]">
          Saltar al contenido principal
        </a>
        {/* GA4 loads from the GTM container only — see lib/analytics.js. */}
        <Suspense fallback={null}>
          <MetaPixel />
        </Suspense>
        <ContactClickTracker />
        <Analytics />
        <SpeedInsights />
        <LocalBusinessJsonLd />
        <Navbar />
        <main id="main-content" className="pnp-site-shell">
          {children}
        </main>
        <Footer language="es" />
        <WhatsAppWidget />
        <FloatingQuoteButton />
      </body>
    </html>
  );
}
