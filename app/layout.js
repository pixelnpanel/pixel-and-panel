import "./globals.css";
import { Montserrat, Inter } from "next/font/google";
import { ViewTransition } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import LocalBusinessJsonLd from "@/components/seo/LocalBusinessJsonLd";

// Loaded at framework level — no render-blocking, no FOUT
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://pixelnpanel.com"),
  title: {
    default: "Websites, Signs & Print in Beaumont, Nederland & Port Arthur | Pixel & Panel",
    template: "%s | Pixel & Panel",
  },
  description:
    "Pixel & Panel helps businesses in Beaumont, Nederland, and Port Arthur, TX with custom signs, print materials, websites, local SEO, and QR-powered marketing.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Websites, Signs & Print in Beaumont, Nederland & Port Arthur | Pixel & Panel",
    description:
      "Custom signs, print materials, websites, local SEO, and QR-powered marketing for businesses in Beaumont, Nederland, and Port Arthur, TX.",
    url: "/",
    siteName: "Pixel & Panel",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${inter.variable}`}>
      <body>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-[#F59E0B] focus:px-4 focus:py-2 focus:font-bold focus:text-[#1C1917]">
          Skip to main content
        </a>
        <GoogleAnalytics />
        <LocalBusinessJsonLd />
        <Navbar />
        <main id="main-content">
          <ViewTransition>{children}</ViewTransition>
        </main>
        <Footer />
      </body>
    </html>
  );
}
