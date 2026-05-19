import "../globals.css";
import { Montserrat, Inter } from "next/font/google";
import { ViewTransition } from "react";

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
  title: {
    default: "Pixel & Panel Admin",
    template: "%s | Pixel & Panel Admin",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminRootLayout({ children }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${inter.variable}`}>
      <body>
        <main id="main-content">
          <ViewTransition>{children}</ViewTransition>
        </main>
      </body>
    </html>
  );
}
