import "../globals.css";
import { inter, montserrat } from "../fonts";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import LocalBusinessJsonLd from "@/components/seo/LocalBusinessJsonLd";
import WhatsAppWidget from "@/components/ui/WhatsAppWidget";

export const viewport = {
  themeColor: "#0C1E3C",
};

export const metadata = {
  metadataBase: new URL("https://pixelnpanel.com"),
  title: {
    default: "Website Design, Signs & Print in Beaumont, Nederland & Port Arthur | Pixel & Panel",
    template: "%s | Pixel & Panel",
  },
  description:
    "Pixel & Panel helps businesses in Beaumont, Nederland, and Port Arthur, TX with custom signs, print materials, websites, local SEO, and QR-powered marketing.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Website Design, Signs & Print in Beaumont, Nederland & Port Arthur | Pixel & Panel",
    description:
      "Custom signs, print materials, websites, local SEO, and QR-powered marketing for businesses in Beaumont, Nederland, and Port Arthur, TX.",
    url: "/",
    siteName: "Pixel & Panel",
    locale: "en_US",
    type: "website",
    images: [{ url: "https://pixelnpanel.com/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function EnglishRootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${montserrat.variable} ${inter.variable}`}>
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
      </head>
      <body>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-[#F59E0B] focus:px-4 focus:py-2 focus:font-bold focus:text-[#1C1917]">
          Skip to main content
        </a>
        <GoogleAnalytics />
        <LocalBusinessJsonLd />
        <Navbar />
        <main id="main-content">
          {children}
        </main>
        <Footer />
        <WhatsAppWidget />
      </body>
    </html>
  );
}
