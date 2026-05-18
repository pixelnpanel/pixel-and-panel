import ContactClient from "./ContactClient";

export const metadata = {
  title: "Contact",
  description:
    "Contact Pixel & Panel for websites, local SEO, signs, print materials, and QR-powered marketing in Beaumont, Nederland, and Port Arthur, TX.",
  alternates: {
    canonical: "/contact",
    languages: {
      "en-US": "/contact",
      "es-US": "/es/contacto",
    },
  },
  openGraph: {
    title: "Contact | Pixel & Panel",
    description:
      "Talk with Pixel & Panel about signage, print, websites, local SEO, and local marketing support for your business.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
