import {
  BadgeCheck,
  Building2,
  Car,
  ClipboardList,
  CreditCard,
  HelpCircle,
  MapPin,
  Megaphone,
  MonitorSmartphone,
  PanelTop,
  Search,
  ShieldCheck,
  Store,
} from "lucide-react";
import HomeClient from "../../(en)/HomeClient";
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
    question: "¿Trabajan fuera de Beaumont, Nederland y Port Arthur?",
    answer:
      "Sí. Pixel & Panel trabaja con negocios en el sureste de Texas. Beaumont, Nederland y Port Arthur son las áreas principales de SEO local, pero negocios cercanos también pueden solicitar cotización.",
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

const spanishHomeHeroCopy = {
  eyebrow: "Taller de letreros e impresión · Sureste de Texas",
  mobileTitleStart: "Letreros, banners e impresión",
  mobileTitleHighlight: "que hacen que te noten.",
  desktopTitleStart: "Letreros, banners e impresión",
  desktopTitleHighlight: "que hacen que te noten.",
  mobileIntro:
    "Tu taller de letreros en el sureste de Texas — letreros, banners, rotulación vehicular e impresión. ¿También quieres crecer en internet? También creamos tu sitio web y presencia en Google.",
  desktopIntro:
    "Pixel & Panel es el taller de letreros para Beaumont, Nederland y Port Arthur — letreros, banners, rotulación vehicular e impresión que hacen que los negocios locales se noten. Y cuando quieras crecer en internet, también creamos el sitio web y la presencia en Google.",
  startHeading: "¿Qué necesitas?",
  startOptionsLabel: "Elige lo que necesita tu negocio",
  quoteHref: "/es/solicitar-cotizacion",
  mobileQuoteLabel: "Cotizar",
  desktopQuoteLabel: "Solicitar cotización",
  photoRatingLabel: "5.0 en Google",
  checklist: [
    "Tu visión. Hecha visible.",
    "Letreros, banners e impresión — más web y Google",
    "Cotización primero, sin presión",
  ],
};

const spanishHomeStartOptions = [
  {
    title: "Letreros e impresión",
    actionLabel: "Letreros e impresión →",
    description: "Letreros, banners, rotulación vehicular e impresos.",
    href: "/es/letreros",
    label: "Letreros",
    icon: PanelTop,
    accent: "#F59E0B",
  },
  {
    title: "Sitio web / Google",
    actionLabel: "¿También quieres web + Google? →",
    description: "Sitios web y visibilidad en Google a juego.",
    href: "/es/servicios-digitales",
    label: "Digital",
    icon: MonitorSmartphone,
    accent: "#0EA5E9",
  },
  {
    title: "No estoy seguro",
    actionLabel: "¿No sabes? Cotización gratis →",
    description: "Cuéntanos qué necesitas — te guiamos.",
    href: "/es/solicitar-cotizacion",
    label: "Cotización gratis",
    icon: HelpCircle,
    accent: "#10B981",
  },
];

const spanishHomeSections = {
  problem: {
    eyebrow: "El problema",
    title: "Tus competidores aparecen. ¿Tu negocio también?",
    description:
      "Los clientes se mueven rápido entre Google, tu sitio web, tus letreros y tus opciones de contacto. Si esas piezas no trabajan juntas, esos clientes terminan llamando a la competencia.",
  },
  problemCards: [
    {
      title: "Letreros gastados o difíciles de leer",
      description:
        "Un banner desgastado o un letrero anticuado hace que hasta un buen negocio local se vea descuidado. Un letrero limpio y profesional genera confianza antes de que el cliente entre.",
      icon: PanelTop,
    },
    {
      title: "Una camioneta que nadie recuerda",
      description:
        "Un vehículo sin rotulación es una valla móvil desaprovechada. La rotulación e imanes ponen tu nombre frente a todo el pueblo, todos los días.",
      icon: Car,
    },
    {
      title: "Difícil de encontrar cuando ya te buscan",
      description:
        "Tus letreros te hacen notar; luego el cliente te busca en internet. Un sitio web o ficha de Google débil pierde el cliente que tu letrero ya ganó.",
      icon: Search,
    },
  ],
  problemCta: {
    description:
      "¿No sabes dónde está el problema? Empieza con un chequeo gratis de visibilidad en Google antes de pedir una cotización completa.",
    href: "/es/chequeo-gratis-de-visibilidad",
    label: "Revisar mi visibilidad en Google",
  },
  services: {
    eyebrow: "Servicios",
    title: "Elige lo que necesitas ahora o pide una cotización completa",
    description:
      "Elige lo que necesitas ahora, o empieza con una solicitud de cotización y Pixel & Panel recomendará el siguiente paso correcto.",
  },
  serviceSilos: [
    {
      eyebrow: "Letreros e impresión",
      title: "Haz que te noten en el mundo real.",
      description:
        "Letreros, banners, letreros de jardín, rotulación de camionetas, letreros de fachada, tarjetas, volantes, menús y más.",
      href: "/es/letreros",
      cta: "Letreros",
      accent: "#F59E0B",
      icon: PanelTop,
      items: [
        "Letreros para negocios fáciles de leer",
        "Impresos para entregas, eventos y visitas en persona",
        "Diseños que guían al cliente a llamar, escanear o visitar tu sitio",
      ],
    },
    {
      eyebrow: "También disponible",
      title: "¿Quieres más que un letrero? Aparece también en internet.",
      description:
        "Cuando tus letreros ya te hacen notar, podemos crear el sitio web, SEO local, Perfil de Google y campañas con QR que convierten la atención en llamadas.",
      href: "/es/servicios-digitales",
      cta: "Ver servicios digitales",
      accent: "#0EA5E9",
      icon: MonitorSmartphone,
      items: [
        "Páginas que convierten visitas en llamadas y solicitudes",
        "Contenido de servicios y ubicaciones listo para Google",
        "QR que llevan clientes desde tus letreros hasta tu sitio web",
      ],
    },
  ],
  popularServices: {
    eyebrow: "Servicios populares",
    title: "Empieza con los servicios que más piden los negocios locales",
    description:
      "Cada tarjeta lleva a una página real de servicio con detalles para clientes y señales claras para buscadores.",
  },
  popularServicesCards: [
    {
      title: "Banners de Vinilo",
      description: "Banners duraderos para fachadas, eventos, sitios de trabajo y promociones.",
      href: "/es/letreros/banners-de-vinilo",
      icon: Megaphone,
    },
    {
      title: "Letreros para Jardín",
      description: "Letreros para contratistas, eventos, bienes raíces y ofertas locales.",
      href: "/es/letreros/letreros-para-jardin",
      icon: MapPin,
    },
    {
      title: "Gráficos para Vehículos",
      description: "Decals, letras, imanes y gráficos de flotilla para vehículos de trabajo.",
      href: "/es/letreros/graficos-para-vehiculos",
      icon: Car,
    },
    {
      title: "Letreros para Negocios",
      description: "Letreros exteriores e interiores para que los clientes reconozcan tu local.",
      href: "/es/letreros/letreros-para-negocios",
      icon: Store,
    },
    {
      title: "Tarjetas de Presentación",
      description: "Tarjetas limpias para referidos, citas, networking y seguimiento.",
      href: "/es/letreros/tarjetas-de-presentacion",
      icon: CreditCard,
    },
    {
      title: "Diseño Web",
      description: "Sitios rápidos para celular, hechos alrededor de llamadas, cotizaciones y confianza.",
      href: "/es/servicios-digitales/desarrollo-web",
      icon: MonitorSmartphone,
    },
    {
      title: "Aparecer en Google",
      description: "Ayuda para que clientes cercanos encuentren lo que ofreces en tu área.",
      href: "/es/servicios-digitales/seo-local",
      icon: Search,
    },
    {
      title: "Perfil de Google",
      description: "Mejora la ficha que muchos clientes ven antes de llamar, visitar o cotizar.",
      href: "/es/servicios-digitales/perfil-de-google",
      icon: BadgeCheck,
    },
  ],
  serviceArea: {
    eyebrow: "Área de servicio",
    title: "Sirviendo negocios del sureste de Texas",
    description:
      "Pixel & Panel trabaja con negocios en el sureste de Texas, empezando por Beaumont, Nederland, Port Arthur y comunidades cercanas.",
  },
  cityCards: [
    {
      city: "Beaumont",
      label: "Beaumont, TX",
      href: "/es/area-de-servicio/beaumont-tx",
      description:
        "Sitios web, SEO local, letreros e impresión para tiendas, contratistas, equipos de servicio y organizaciones de Beaumont.",
    },
    {
      city: "Nederland",
      label: "Nederland, TX",
      href: "/es/area-de-servicio/nederland-tx",
      description:
        "Herramientas prácticas de visibilidad para negocios de Nederland, desde tarjetas y banners hasta sitios web e impresos.",
    },
    {
      city: "Port Arthur",
      label: "Port Arthur, TX",
      href: "/es/area-de-servicio/port-arthur-tx",
      description:
        "Sitios web, letreros e impresión para negocios de Port Arthur que quieren más llamadas y clientes.",
    },
  ],
  why: {
    eyebrow: "Por qué Pixel & Panel",
    title: "Claro para tus clientes. Práctico para tu negocio local.",
    description:
      "El objetivo es simple: hacer que tu negocio sea más fácil de notar, entender y contactar.",
  },
  reasons: [
    {
      title: "Tu sitio web, letreros e impresión trabajando juntos",
      description:
        "Tu sitio web, letreros y materiales impresos deben guiar al cliente hacia el mismo siguiente paso claro.",
      icon: Building2,
    },
    {
      title: "Hecho para dueños de negocios locales",
      description:
        "El trabajo se adapta a contratistas, tiendas, restaurantes, iglesias, escuelas, clínicas y equipos de servicio.",
      icon: Store,
    },
    {
      title: "Proceso en lenguaje claro",
      description:
        "Recibes recomendaciones directas, opciones útiles y explicaciones simples sin lenguaje técnico innecesario.",
      icon: ClipboardList,
    },
    {
      title: "Cotización primero, sin presión",
      description:
        "Empieza con lo que necesitas. Pixel & Panel recomendará el siguiente paso antes de avanzar con cualquier proyecto.",
      icon: ShieldCheck,
    },
  ],
  faq: {
    eyebrow: "FAQ",
    title: "Preguntas comunes de inicio",
    description: "Respuestas rápidas antes de pedir una cotización.",
  },
  finalCta: {
    eyebrow: "Empezar proyecto",
    title: "¿Listo para que tu negocio sea más fácil de encontrar?",
    description:
      "Empieza con una solicitud de cotización. Cuéntanos qué necesitas y Pixel & Panel recomendará el siguiente paso correcto para tu sitio web, letrero, impresión o visibilidad en Google.",
    href: "/es/solicitar-cotizacion",
    label: "Solicitar cotización",
  },
};

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

const spanishHeroImagesFrom = (categories) =>
  categories
    .map((c) => ({
      src: c.image || (c.products || []).find((p) => p.image)?.image || null,
      alt: "Letreros e impresión personalizados — Pixel & Panel",
    }))
    .filter((tile) => tile.src)
    .slice(0, 4);

export default async function SpanishHomePage() {
  const categories = await getCategories();
  const heroImages = spanishHeroImagesFrom(categories);

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
      <HomeClient copy={spanishHomeHeroCopy} startOptions={spanishHomeStartOptions} heroImages={heroImages} />
      <HomeSections faqs={spanishHomepageFaq} content={spanishHomeSections} />
    </>
  );
}
