import { TrackOrderExperience } from "@/app/track-order/TrackOrderClient";

const spanishPreviewSteps = [
  {
    label: "Cotización recibida",
    detail: "La solicitud del proyecto está en revisión.",
    state: "done",
  },
  {
    label: "Prueba lista",
    detail: "La prueba de diseño o detalles del proyecto están listos para revisar.",
    state: "active",
  },
  {
    label: "En producción",
    detail: "Después de aprobación, el trabajo pasa a impresión, fabricación o sitio web.",
    state: "next",
  },
  {
    label: "Recogida o instalación",
    detail: "Programamos la recogida, entrega o instalación final.",
    state: "next",
  },
];

const spanishCopy = {
  eyebrow: "Rastreo de pedido",
  headline: "Revisa el estado de tu proyecto.",
  intro:
    "Usa tu número de pedido y el correo o teléfono de contacto para ver el estado de tu letrero, impresión, sitio web o proyecto de marketing.",
  quoteCta: "Solicitar cotización",
  contactCta: "Contáctanos",
  trackingTitle: "Cómo funciona el rastreo de pedidos",
  trackingText:
    "Ingresa tu número de pedido, confirma tu información de contacto y revisa el estado, notas de prueba y próximos pasos.",
  formTitle: "Rastrear un pedido",
  formIntro:
    "Ingresa el número de pedido de tu cotización, factura o actualización del proyecto. Usa el mismo correo o teléfono que diste a Pixel & Panel.",
  orderNumberLabel: "Número de pedido",
  orderNumberPlaceholder: "PNP-1007",
  contactLabel: "Correo o teléfono",
  contactPlaceholder: "tu@email.com",
  submit: "Revisar estado",
  checking: "Revisando...",
  lookupError: "No se pudo revisar el estado del pedido.",
  statusPreviewTitle: "Qué verá el cliente",
  statusPreviewText:
    "Una línea de tiempo simple, próximos pasos, contacto del proyecto y archivos o pruebas cuando estén disponibles.",
  usefulFeaturesTitle: "Funciones útiles",
  nextBuildTitle: "Próximo paso",
  nextBuildText:
    "El esquema de Supabase ya está listo en los documentos del proyecto. Agrega las llaves en Vercel y esta página leerá pedidos reales desde la base de datos.",
  requestQuote: "Solicitar cotización",
  detailsTitle: "Detalles del proyecto",
  clientLabel: "Cliente",
  productLabel: "Producto",
  quantityLabel: "Cantidad",
  serviceLabel: "Servicio",
  orderDateLabel: "Fecha de pedido",
  paymentLabel: "Pago",
  proofLabel: "Prueba",
  deliveryLabel: "Entrega / instalación",
  targetDateLabel: "Fecha objetivo",
  nextActionLabel: "Próxima acción",
  filesLabel: "Archivos",
  previewSteps: spanishPreviewSteps,
  usefulFeatures: [
    "Búsqueda privada por número de pedido y correo",
    "Notas visibles para prueba, producción, recogida o instalación",
    "Área de archivos para logos, arte, fotos y aprobaciones",
    "Actualizaciones por correo cuando cambia el estado",
  ],
  visual: {
    badge: "Cómo funciona",
    steps: [
      { num: "01", label: "Ingresa tu número de pedido", accent: "#0EA5E9" },
      { num: "02", label: "Confirma correo o teléfono", accent: "#F59E0B" },
      { num: "03", label: "Revisa el estado", accent: "#10B981" },
    ],
    lookupTitle: "Buscar pedido",
    orderNumber: "Número de pedido",
    orderNumberValue: "PNP-1007",
    contactLabel: "Correo o teléfono",
    contactValue: "tu@email.com",
    verifyTitle: "Confirma tu contacto",
    verifyText: "Usa el mismo correo o teléfono de tu cotización",
    verifyItems: [
      "Protege los detalles del cliente",
      "Encuentra el pedido correcto",
      "Muestra solo notas visibles al cliente",
    ],
    statusTitle: "Prueba lista",
    statusText: "Próxima acción: aprobar prueba de diseño",
    statusItems: ["Cotización recibida", "Prueba lista", "Producción después de aprobación"],
  },
};

export const metadata = {
  title: {
    absolute: "Rastrear Pedido | Pixel & Panel",
  },
  description:
    "Rastrea el estado de tu proyecto de Pixel & Panel con tu número de pedido y correo o teléfono.",
  alternates: {
    canonical: "https://pixelnpanel.com/es/rastrear-pedido",
    languages: {
      "en-US": "https://pixelnpanel.com/track-order",
      "es-US": "https://pixelnpanel.com/es/rastrear-pedido",
    },
  },
  openGraph: {
    title: "Rastrear Pedido | Pixel & Panel",
    description:
      "Revisa el estado de tu proyecto, prueba, producción, instalación o entrega.",
    url: "https://pixelnpanel.com/es/rastrear-pedido",
    locale: "es_US",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function SpanishTrackOrderPage() {
  return <TrackOrderExperience copy={spanishCopy} />;
}
