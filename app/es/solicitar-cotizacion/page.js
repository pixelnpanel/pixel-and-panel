import QuoteRequestClient from "@/app/quote-request/QuoteRequestClient";

const spanishQuoteCopy = {
  language: "Spanish",
  eyebrow: "Cotización gratis",
  h1Start: "Solicitar una",
  h1Highlight: "cotización",
  intro:
    "Completa el formulario y Pixel & Panel te contactará pronto con el siguiente paso. Sin presión y sin compromiso.",
  bullets: [
    "Respuesta dentro de 1 día hábil",
    "Sin contratos obligatorios",
    "Comunicación clara y práctica",
    "Consulta inicial incluida",
  ],
  formTitle: "Solicitar una cotización",
  formNote: "Toma menos de 2 minutos.",
  productSelected: "Producto seleccionado",
  name: "Nombre",
  businessName: "Nombre del negocio",
  email: "Correo electrónico",
  phone: "Teléfono",
  productService: "Producto seleccionado",
  message: "Detalles del proyecto",
  messagePlaceholder:
    "Cuéntanos qué necesitas: sitio web, letreros, impresión, SEO local, códigos QR, tamaño, cantidad, fecha o detalles que ya tengas.",
  submit: "Enviar solicitud",
  sending: "Enviando...",
  trackOrderPrompt: "¿Ya tienes un pedido o ya enviaste una solicitud?",
  trackOrderHelp:
    "Usa tu número de pedido con el mismo correo o teléfono para ver el estado, notas y próximos pasos.",
  trackOrder: "Rastrear mi pedido",
  trackOrderHref: "/es/rastrear-pedido",
  footer: "Respondemos dentro de 1 día hábil. Sin spam.",
  successTitle: "Gracias — recibimos tu solicitud.",
  successText: "Pixel & Panel te contactará pronto.",
  errorFallback: "Algo salió mal. Por favor escríbenos directamente a hello@pixelnpanel.com.",
  failed: "Algo salió mal. Por favor escríbenos directamente a hello@pixelnpanel.com.",
  defaultMessageTemplate: "Quiero una cotización para {product}.",
  showBusinessName: true,
  showProductField: true,
};

export const metadata = {
  title: {
    absolute: "Solicitar Cotización | Pixel & Panel",
  },
  description:
    "Solicita una cotización para sitio web, letreros, impresión, SEO local o campaña con código QR con Pixel & Panel.",
  alternates: {
    canonical: "https://pixelnpanel.com/es/solicitar-cotizacion",
    languages: {
      "en-US": "https://pixelnpanel.com/quote-request",
      "es-US": "https://pixelnpanel.com/es/solicitar-cotizacion",
    },
  },
  openGraph: {
    title: "Solicitar Cotización | Pixel & Panel",
    description:
      "Cotiza sitio web, letreros, impresión, SEO local o campaña con código QR.",
    url: "https://pixelnpanel.com/es/solicitar-cotizacion",
    locale: "es_US",
  },
};

export default async function SpanishQuoteRequestPage({ searchParams }) {
  const params = await searchParams;
  const selectedProduct = params?.product || "";
  const selectedCategory = params?.category || "";

  return (
    <QuoteRequestClient
      selectedProduct={selectedProduct}
      selectedCategory={selectedCategory}
      copy={spanishQuoteCopy}
    />
  );
}
