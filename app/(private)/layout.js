import "../globals.css";
import { inter, montserrat } from "../fonts";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Tracking links contain bearer-like access tokens. Keep this root layout free
// of marketing analytics and prevent referrer leakage when a customer follows
// an external link from their private order page.
export const metadata = {
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};

export default function PrivateRootLayout({ children }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${inter.variable}`}>
      <body>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-[#F59E0B] focus:px-4 focus:py-2 focus:font-bold focus:text-[#1C1917]">
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content" className="pnp-site-shell">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
