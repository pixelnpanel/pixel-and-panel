import DigitalClient from "./DigitalClient";

export const metadata = {
  metadataBase: new URL("https://www.pixelnpanel.com"),
  title: {
    absolute: "Local Web Design, SEO & Google Profile | Pixel & Panel",
  },
  description:
    "Fast websites, local SEO, Google Profile setup, QR campaigns, and lead tools for small businesses in Beaumont and Southeast Texas.",
  alternates: {
    canonical: "/digital",
    languages: {
      "en-US": "/digital",
      "es-US": "/es/servicios-digitales",
    },
  },
  openGraph: {
    title: "Local Web Design, SEO & Google Profile | Pixel & Panel",
    description:
      "Fast websites, local SEO, Google Profile setup, QR campaigns, and lead tools for small businesses in Beaumont and Southeast Texas.",
    url: "/digital",
  },
};

export default function DigitalPage() {
  return <DigitalClient />;
}
