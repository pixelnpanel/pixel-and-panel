import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: {
    default: "Pixel & Panel | Digital & Signage Brand",
    template: "%s | Pixel & Panel",
  },
  description:
    "Pixel & Panel helps local businesses get noticed with custom signage, print, websites, local SEO, and QR-powered campaigns.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}