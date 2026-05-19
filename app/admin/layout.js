import "../globals.css";
import { inter, montserrat } from "../fonts";
import { ViewTransition } from "react";

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
