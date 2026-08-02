import "../globals.css";
import { Suspense } from "react";
import { GoogleTagManager } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { inter, montserrat } from "../fonts";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import MetaPixel from "@/components/analytics/MetaPixel";
import ContactClickTracker from "@/components/analytics/ContactClickTracker";
import LocalBusinessJsonLd from "@/components/seo/LocalBusinessJsonLd";
import WhatsAppWidget from "@/components/ui/WhatsAppWidget";
import FloatingQuoteButton from "@/components/ui/FloatingQuoteButton";
import { DEFAULT_OG_IMAGE, DEFAULT_SITE_DESCRIPTION, DEFAULT_SITE_TITLE } from "@/lib/seo";

export const viewport = {
  themeColor: "#0C1E3C",
};

export const metadata = {
  metadataBase: new URL("https://www.pixelnpanel.com"),
  title: {
    default: DEFAULT_SITE_TITLE,
    template: "%s | Pixel & Panel",
  },
  description: DEFAULT_SITE_DESCRIPTION,
  alternates: {
    canonical: "https://www.pixelnpanel.com/",
  },
  openGraph: {
    title: DEFAULT_SITE_TITLE,
    description: DEFAULT_SITE_DESCRIPTION,
    url: "https://www.pixelnpanel.com/",
    siteName: "Pixel & Panel",
    locale: "en_US",
    type: "website",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_SITE_TITLE,
    description: DEFAULT_SITE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
  other: {
    "facebook-domain-verification": "xrurc3oj4fr9szyqqy555vpi7ruom1",
  },
};

export default function EnglishRootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${montserrat.variable} ${inter.variable}`}>
      <GoogleTagManager gtmId="GTM-W5NHMVJF" />
      <body>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-[#F59E0B] focus:px-4 focus:py-2 focus:font-bold focus:text-[#1C1917]">
          Skip to main content
        </a>
        <GoogleAnalytics />
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
        <Footer />
        <WhatsAppWidget />
        <FloatingQuoteButton />
      </body>
    </html>
  );
}
