import "../globals.css";
import { Montserrat, Inter } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import LocalBusinessJsonLd from "@/components/seo/LocalBusinessJsonLd";
import WhatsAppWidget from "@/components/ui/WhatsAppWidget";

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

export const viewport = {
  themeColor: "#0C1E3C",
};

export const metadata = {
  metadataBase: new URL("https://pixelnpanel.com"),
  title: {
    default: "Diseño Web, Letreros e Impresión en Beaumont, Nederland y Port Arthur | Pixel & Panel",
    template: "%s | Pixel & Panel",
  },
  description:
    "Pixel & Panel ayuda a negocios en Beaumont, Nederland y Port Arthur, TX con letreros personalizados, impresión, sitios web, SEO local y marketing con códigos QR.",
  alternates: {
    canonical: "/es",
  },
  openGraph: {
    title: "Diseño Web, Letreros e Impresión en Beaumont, Nederland y Port Arthur | Pixel & Panel",
    description:
      "Letreros personalizados, impresión, sitios web, SEO local y marketing con códigos QR para negocios en Beaumont, Nederland y Port Arthur, TX.",
    url: "/es",
    siteName: "Pixel & Panel",
    locale: "es_US",
    type: "website",
    images: [{ url: "https://pixelnpanel.com/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function SpanishRootLayout({ children }) {
  return (
    <html lang="es-US" data-scroll-behavior="smooth" className={`${montserrat.variable} ${inter.variable}`}>
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
      </head>
      <body>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-[#F59E0B] focus:px-4 focus:py-2 focus:font-bold focus:text-[#1C1917]">
          Saltar al contenido principal
        </a>
        <GoogleAnalytics />
        <LocalBusinessJsonLd />
        <Navbar />
        <main id="main-content">
          {children}
        </main>
        <Footer language="es" />
        <WhatsAppWidget />
      </body>
    </html>
  );
}
