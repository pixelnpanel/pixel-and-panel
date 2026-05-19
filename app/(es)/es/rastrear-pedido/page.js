import { TrackOrderExperience } from "../../../(en)/track-order/TrackOrderClient";

const spanishPreviewSteps = [
  {
    label: "Cotización recibida",
    detail: "Recibimos tu solicitud y estamos revisando los detalles.",
    state: "done",
  },
  {
    label: "Prueba lista",
    detail: "Tu prueba de diseño o los detalles del proyecto están listos para revisar.",
    state: "active",
  },
  {
    label: "En producción",
    detail: "Tu proyecto aprobado se está imprimiendo, fabricando o preparando.",
    state: "next",
  },
  {
    label: "Recogida o instalación",
    detail: "Te compartiremos los detalles de recogida, entrega o instalación cuando estén listos.",
    state: "next",
  },
];

const spanishCopy = {
  eyebrow: "Rastreo de pedido",
  headline: "Revisa el estado de tu proyecto.",
  intro:
    "Usa tu número de pedido y el correo o teléfono de contacto para ver el estado de tu letrero, impresión, sitio web o proyecto de marketing.",
  quoteCta: "Solicitar cotización",
  quoteHref: "/es/solicitar-cotizacion",
  noOrderTitle: "¿Aún no tienes un pedido?",
  noOrderText:
    "Empieza con una solicitud de cotización y te ayudamos a elegir el siguiente paso para tu letrero, impresión, sitio web o proyecto de marketing.",
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
  statusPreviewTitle: "Rastrea tu pedido de principio a fin",
  statusPreviewText:
    "Ve en qué paso está tu proyecto, qué sigue y si necesitamos algo de ti.",
  usefulFeaturesTitle: "Qué puedes revisar aquí",
  requestQuote: "Solicitar cotización",
  detailsTitle: "Detalles del proyecto",
  companyLabel: "Empresa",
  clientLabel: "Cliente",
  productLabel: "Producto",
  quantityLabel: "Cantidad",
  serviceLabel: "Servicio",
  orderDateLabel: "Fecha de pedido",
  paymentLabel: "Pago",
  proofLabel: "Prueba",
  deliveryLabel: "Estado del producto",
  targetDateLabel: "Fecha objetivo",
  nextActionLabel: "Próxima acción",
  filesLabel: "Archivos",
  previewSteps: spanishPreviewSteps,
  usefulFeatures: [
    "Busca tu proyecto con tu número de pedido y correo",
    "Revisa avances de prueba, producción, recogida o instalación",
    "Lee notas y próximos pasos de nuestro equipo",
    "Recibe actualizaciones cuando cambie el estado de tu pedido",
  ],
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
