import HomeSections from "../../(en)/HomeSections";
import { DEFAULT_OG_IMAGE } from "@/lib/seo";
import { getCategories } from "@/lib/signage/data";

const spanishHomepageFaq = [
  {
    question: "¿Qué hace Pixel & Panel?",
    answer:
      "Pixel & Panel ayuda a negocios locales a ser encontrados en internet, verse profesionales en la calle y convertir la atención en llamadas, solicitudes de cotización y clientes con sitios web, SEO local, Perfil de Google, letreros, impresión, QR y formularios.",
  },
  {
    question: "¿Qué áreas atienden?",
    answer:
      "Los letreros e impresos elegibles se envían a todo Estados Unidos, incluyendo Beaumont, Port Arthur, Nederland y el área metropolitana de Houston. Las cotizaciones y la aprobación del arte se hacen en línea. Si tu letrero requiere instalación, coordina con un instalador local.",
  },
  {
    question: "¿Pueden ayudar con sitios web y letreros al mismo tiempo?",
    answer:
      "Sí. Podemos conectar tu sitio web, búsqueda local, letreros, materiales impresos y códigos QR para que tu visibilidad digital y física trabajen juntas.",
  },
  {
    question: "¿Se pueden agregar códigos QR a letreros e impresos?",
    answer:
      "Sí. Los códigos QR pueden ir en banners, letreros de jardín, menús, volantes, tarjetas, gráficos de ventanas, rotulación vehicular y otros materiales cuando la distancia y ubicación lo permiten.",
  },
  {
    question: "¿Cómo solicito una cotización?",
    answer:
      "Usa el formulario de cotización y comparte qué necesitas, tu fecha ideal y los detalles que ya tengas. Pixel & Panel revisará la solicitud y recomendará el siguiente paso.",
  },
];

export const metadata = {
  metadataBase: new URL("https://www.pixelnpanel.com"),
  title: {
    absolute: "Letreros, Banners e Impresión en Beaumont TX | Pixel & Panel",
  },
  description:
    "Pixel & Panel es un taller de letreros en Beaumont, TX — letreros, banners, rotulación vehicular e impresión para negocios locales. También creamos sitios web y visibilidad en Google.",
  alternates: {
    canonical: "https://www.pixelnpanel.com/es",
    languages: {
      "en-US": "https://www.pixelnpanel.com/",
      "x-default": "https://www.pixelnpanel.com/",
      "es-US": "https://www.pixelnpanel.com/es",
    },
  },
  openGraph: {
    title: "Letreros, Banners e Impresión en Beaumont TX | Pixel & Panel",
    description:
      "Pixel & Panel es un taller de letreros en Beaumont, TX — letreros, banners, rotulación vehicular e impresión para negocios locales. También creamos sitios web y visibilidad en Google.",
    url: "https://www.pixelnpanel.com/es",
    siteName: "Pixel & Panel",
    locale: "es_US",
    type: "website",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Letreros, Banners e Impresión en Beaumont TX | Pixel & Panel",
    description:
      "Pixel & Panel es un taller de letreros en Beaumont, TX — letreros, banners, rotulación vehicular e impresión para negocios locales. También creamos sitios web y visibilidad en Google.",
    images: [DEFAULT_OG_IMAGE],
  },
};

function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export default async function SpanishHomePage() {
  const categories = await getCategories();

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: spanishHomepageFaq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <JsonLd data={faqSchema} />
      <HomeSections faqs={spanishHomepageFaq} categories={categories} locale="es" />
    </>
  );
}
