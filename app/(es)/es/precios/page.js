import PricingClient from "../../../(en)/pricing/PricingClient";

const websitePackages = [
  {
    name: "Página de lanzamiento",
    price: "Desde $299",
    description:
      "Un sitio de una página para marcas personales, portafolios o negocios que necesitan un punto de inicio limpio en línea.",
    bestFor:
      "Marcas personales, portafolios, páginas sencillas, ofertas específicas y negocios que están empezando.",
    features: [
      "Sitio web de una página",
      "Diseño móvil",
      "Conexión de dominio",
      "Sección básica de contacto",
      "Guía para correo profesional",
      "1 ronda de cambios",
    ],
    cta: "Empezar con página de lanzamiento",
    href: "/es/solicitar-cotizacion?product=P%C3%A1gina%20de%20lanzamiento&category=Servicios%20Digitales",
  },
  {
    name: "Presencia web inicial",
    price: "Desde $499",
    description:
      "Un sitio inicial limpio para pequeños negocios nuevos que necesitan una presencia profesional en línea.",
    bestFor:
      "Negocios nuevos, contratistas, proveedores de servicios independientes y negocios de servicios sencillos.",
    features: [
      "Hasta 5 páginas",
      "Diseño móvil",
      "Formulario de contacto conectado a tu correo",
      "Configuración básica de SEO",
      "Conexión de dominio",
      "Guía para correo profesional",
      "1 ronda de cambios",
    ],
    cta: "Cotizar sitio inicial",
    href: "/es/solicitar-cotizacion?product=Presencia%20web%20inicial&category=Servicios%20Digitales",
  },
  {
    name: "Sitio web para negocio local",
    price: "Desde $799",
    badge: "Más popular",
    tone: "dark",
    description:
      "Un paquete más fuerte para negocios locales que necesitan páginas de servicios, captura de leads y mejor visibilidad en Google.",
    bestFor:
      "Restaurantes, contratistas, talleres, tiendas, negocios de servicios locales y equipos pequeños.",
    features: [
      "Hasta 7 páginas",
      "Página principal personalizada",
      "Páginas de servicios",
      "Formulario de contacto o cotización",
      "Guía para correo profesional",
      "Configuración o limpieza de Perfil de Google",
      "Configuración básica de SEO local",
      "Configuración de Google Analytics",
      "2 rondas de cambios",
    ],
    cta: "Cotizar sitio local",
    href: "/es/solicitar-cotizacion?product=Sitio%20web%20para%20negocio%20local&category=Servicios%20Digitales",
  },
  {
    name: "Sitio web + configuración de visibilidad",
    price: "Desde $999",
    badge: "Mejor valor",
    tone: "value",
    description:
      "Un paquete que conecta tu sitio web, presencia en Google, captura de leads y configuración inicial de campaña QR.",
    bestFor: "Negocios que quieren un sistema inicial completo de visibilidad.",
    features: [
      "Hasta 10 páginas",
      "Diseño y desarrollo del sitio web",
      "Páginas configuradas para aparecer en Google",
      "Optimización de Perfil de Google",
      "Formularios de contacto o cotización",
      "Configuración de campaña con código QR",
      "Configuración básica de seguimiento de visitas",
      "2 rondas de cambios",
    ],
    cta: "Crear mi sistema de visibilidad",
    href: "/es/solicitar-cotizacion?product=Sitio%20web%20%2B%20configuraci%C3%B3n%20de%20visibilidad&category=Servicios%20Digitales",
  },
];

const carePlans = [
  {
    name: "Cuidado Básico",
    price: "Desde $19/mes",
    features: [
      "Revisión mensual del sitio",
      "Prueba del formulario de contacto o cotización",
      "Revisión básica de disponibilidad",
      "Un cambio pequeño de texto al mes",
    ],
  },
  {
    name: "Cuidado Estándar",
    price: "Desde $39/mes",
    features: [
      "Todo lo del Cuidado Básico",
      "Cambios pequeños de contenido o imágenes",
      "Revisión básica de SEO",
      "Revisión mensual de visibilidad en Google/perfil",
    ],
  },
  {
    name: "Cuidado de Crecimiento",
    price: "Desde $49/mes",
    features: [
      "Todo lo del Cuidado Estándar",
      "Prioridad para cambios pequeños",
      "Revisión de enlaces o campañas QR",
      "Sugerencias mensuales de mejora",
    ],
  },
];

const addOns = [
  ["Página web adicional", "desde $75/página"],
  ["Solo página de aterrizaje", "desde $299"],
  ["Configuración de campaña QR", "desde $149"],
  ["Limpieza de Perfil de Google", "desde $199"],
  ["Actualización básica de logo", "desde $149"],
  ["Cuidado del sitio web", "desde $19/mes"],
];

const signageExamples = [
  "Banners de vinilo",
  "Letreros de jardín",
  "Gráficos para vehículos",
  "Letreros de escaparate",
  "Letreros de metal",
  "Tarjetas de presentación",
  "Volantes",
  "Menús",
];

const pricingFaqs = [
  {
    q: "¿Estos precios son de una sola vez?",
    a: "Los paquetes de sitio web son precios iniciales para proyectos de una sola vez. Proyectos más grandes, páginas adicionales, integraciones especiales o tiempos urgentes pueden aumentar la cotización.",
  },
  {
    q: "¿Soy dueño de mi sitio web?",
    a: "Sí. Eres dueño del contenido y diseño del sitio una vez que el proyecto esté pagado por completo. Hosting, dominio, correo y herramientas externas pueden ser cobrados por esos proveedores.",
  },
  {
    q: "¿El hosting está incluido?",
    a: "El hosting no está incluido en el precio único del sitio web a menos que se cotice específicamente. Pixel & Panel puede recomendar opciones sencillas de hosting y ayudar a conectar tu dominio.",
  },
  {
    q: "¿El correo profesional está incluido?",
    a: "La guía para configurar correo profesional está incluida. Si se necesita una plataforma de correo pagada, el cliente paga directamente a ese proveedor.",
  },
  {
    q: "¿Puedo empezar pequeño y mejorar después?",
    a: "Sí. Muchos negocios empiezan con una Página de lanzamiento o Presencia web inicial y después agregan más páginas, campañas QR, SEO o letreros.",
  },
  {
    q: "¿También ofrecen letreros e impresión?",
    a: "Sí. Pixel & Panel ofrece opciones de cotización para banners, letreros de jardín, gráficos para vehículos, letreros de escaparate, tarjetas, volantes, menús y más.",
  },
  {
    q: "¿Garantizan posiciones en Google?",
    a: "No. Pixel & Panel configura la base de SEO y ayuda a que tu negocio sea más fácil de encontrar, pero ningún proveedor ético puede garantizar posiciones exactas en Google.",
  },
  {
    q: "¿Puedo recibir precio con descuento para portafolio?",
    a: "Posiblemente. Pixel & Panel está aceptando proyectos seleccionados de clientes iniciales con descuento a cambio de comentarios honestos y permiso para portafolio.",
  },
];

const spanishCopy = {
  heroLabel: "Precios para clientes iniciales",
  heroTitlePrefix: "Tarifas fijas de diseño web y",
  heroTitleHighlight: "cotizaciones rápidas",
  mobileHeroTitlePrefix: "Precios claros",
  mobileHeroTitleHighlight: "y cotizaciones.",
  mobileHeroCopy:
    "Tarifas fijas para páginas web y cotizaciones rápidas para letreros, lonas e imprenta.",
  heroCopy:
    "Cada dólar invertido en tu empresa debe tener un propósito claro. Ofrecemos precios iniciales transparentes para páginas web y cotizaciones personalizadas para letreros comerciales e impresos.",
  heroNote: "Los precios pueden subir cuando la disponibilidad sea limitada.",
  packageLabel: "Paquetes iniciales de sitio web",
  packageTitle: "Paquetes de páginas web e internet",
  packageCopy:
    "Precios iniciales claros para negocios que necesitan presencia profesional en línea, SEO local y formularios de cotización.",
  packageNoteStart: "¿Quieres ver los servicios detrás de estos paquetes? Revisa la página de",
  packageNoteDigital: "servicios digitales",
  packageNoteMiddle: "empieza con un",
  packageNoteVisibility: "chequeo gratis de visibilidad",
  packageNoteEnd: "si todavía no estás seguro, o solicita una cotización cuando estés listo.",
  digitalHref: "/es/servicios-digitales",
  visibilityHref: "/es/chequeo-gratis-de-visibilidad",
  bestForLabel: "Ideal para",
  careLabel: "Soporte mensual opcional",
  careTitle: "Planes de cuidado del sitio web",
  careCopy:
    "Soporte mensual opcional para cambios pequeños, pruebas de formularios, revisión básica de SEO y para mantener tu sitio funcionando bien.",
  addOnsLabel: "Extras comunes",
  addOnsTitle: "Extras",
  addOnsCopy: "Hay extras sencillos disponibles cuando un paquete inicial necesita algunas piezas más.",
  signageLabel: "Letreros con cotización",
  signageTitle: "Cotizaciones para letreros, banners e impresión",
  signageCopy:
    "Cada proyecto de letreros, lonas, tarjetas, volantes o rotulación vehicular depende de medidas, materiales, cantidad e instalación. Te damos una cotización clara antes de producir.",
  signageCta: "Cotizar letreros",
  signageHref:
    "/es/solicitar-cotizacion?product=Proyecto%20de%20letreros&category=Letreros%20e%20Impresi%C3%B3n",
  foundingLabel: "Disponibilidad limitada",
  foundingTitle: "Programa de clientes iniciales",
  foundingCopy:
    "Pixel & Panel está aceptando un número limitado de negocios del sureste de Texas con precios iniciales mientras construimos nuestro portafolio local. Proyectos seleccionados pueden calificar para descuento a cambio de comentarios honestos, permiso para portafolio y testimonio si quedan satisfechos.",
  foundingCta: "Preguntar por precio de cliente inicial",
  foundingHref:
    "/es/solicitar-cotizacion?product=Programa%20de%20clientes%20iniciales&category=Servicios%20Digitales",
  faqTitle: "Preguntas sobre precios",
  finalTitle: "¿Necesitas ayuda con sitio web, visibilidad o letreros?",
  finalCopyStart:
    "Cuéntanos qué necesitas y recomendaremos una opción inicial práctica para tu presupuesto y tiempo. También puedes comparar las opciones actuales de",
  finalCopySignage: "letreros",
  finalCopyMiddle: "y",
  finalCopyDigital: "servicios digitales",
  finalCopyEnd: ".",
  finalSignageHref: "/es/letreros",
  finalDigitalHref: "/es/servicios-digitales",
  finalQuoteHref: "/es/solicitar-cotizacion",
  finalQuoteCta: "Solicitar cotización",
  finalVisibilityHref: "/es/chequeo-gratis-de-visibilidad",
  finalVisibilityCta: "Chequeo gratis",
};

export const metadata = {
  title: {
    absolute: "Precios Web y Cotizaciones de Letreros | Pixel & Panel",
  },
  description:
    "Tarifas claras para diseño web y cotizaciones rápidas de letreros, lonas e impresos en el sureste de Texas.",
  alternates: {
    canonical: "https://www.pixelnpanel.com/es/precios",
    languages: {
      "en-US": "https://www.pixelnpanel.com/pricing",
      "es-US": "https://www.pixelnpanel.com/es/precios",
    },
  },
  openGraph: {
    title: "Precios Web y Cotizaciones de Letreros | Pixel & Panel",
    description:
      "Tarifas claras para diseño web y cotizaciones rápidas de letreros, lonas e impresos en el sureste de Texas.",
    url: "https://www.pixelnpanel.com/es/precios",
    locale: "es_US",
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

export default function SpanishPricingPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: pricingFaqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  const offersSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Paquetes de sitio web de Pixel & Panel",
    description: "Paquetes iniciales de sitio web y visibilidad para negocios del sureste de Texas",
    itemListElement: websitePackages.map((pkg, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Offer",
        name: pkg.name,
        description: pkg.description,
        price: ["299", "499", "799", "999"][index],
        priceCurrency: "USD",
        priceValidUntil: "2026-12-31",
        availability: "https://schema.org/InStock",
        url: "https://www.pixelnpanel.com/es/precios",
        seller: {
          "@type": "LocalBusiness",
          name: "Pixel & Panel",
          url: "https://www.pixelnpanel.com",
        },
      },
    })),
  };

  return (
    <>
      <JsonLd data={faqSchema} />
      <JsonLd data={offersSchema} />
      <PricingClient
        websitePackages={websitePackages}
        carePlans={carePlans}
        addOns={addOns}
        signageExamples={signageExamples}
        faqs={pricingFaqs}
        copy={spanishCopy}
      />
    </>
  );
}
