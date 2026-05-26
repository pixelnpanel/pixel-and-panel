import QuoteRequestClient from "../../../(en)/quote-request/QuoteRequestClient";
import { Suspense } from "react";

const spanishQuoteCopy = {
  language: "Spanish",
  eyebrow: "Cotización gratis",
  h1Start: "Solicitar una",
  h1Highlight: "cotización",
  mobileH1Start: "Cuéntanos qué",
  mobileH1Highlight: "necesitas.",
  mobileIntro:
    "Comparte algunos detalles y te respondemos dentro de 1 día hábil.",
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
  pickerHelp: "¿Con qué podemos ayudarte?",
  contactNote: "Toma menos de 2 minutos.",
  detailsNote: "Casi listo — cuéntanos sobre tu proyecto.",
  stepCounterPrefix: "Paso",
  stepCounterMiddle: "de",
  stepLabels: ["¿Qué necesitas?", "Datos de contacto", "Detalles del proyecto"],
  shortStepLabels: ["Datos de contacto", "Detalles del proyecto"],
  serviceLabel: "Servicio:",
  change: "Cambiar",
  continue: "Continuar",
  back: "Atrás",
  backToContactAria: "Volver a los datos de contacto",
  namePlaceholder: "Juan Martínez",
  businessNamePlaceholder: "Tu negocio",
  emailPlaceholder: "juan@email.com",
  phonePlaceholder: "(555) 000-0000",
  attachLabel: "Adjuntar archivo",
  attachOptional: "(opcional)",
  attachPrompt: "Logo, boceto o imagen de referencia",
  attachTypes: "JPG, PNG, PDF · 4 MB",
  removeAttachmentAria: "Quitar archivo adjunto",
  fileSizeError: "El archivo debe pesar 4 MB o menos.",
  fileTypeError: "Solo se permiten archivos JPG, PNG, PDF, GIF, WebP, SVG y AI/EPS.",
  footer: "Respondemos dentro de 1 día hábil. Sin spam.",
  successTitle: "Gracias — recibimos tu solicitud.",
  successText: "Pixel & Panel te contactará pronto.",
  errorFallback: "Algo salió mal. Por favor escríbenos directamente a hello@pixelnpanel.com.",
  failed: "Algo salió mal. Por favor escríbenos directamente a hello@pixelnpanel.com.",
  defaultMessageTemplate: "Quiero una cotización para {product}.",
  serviceTiles: [
    { label: "Letreros e Impresión", category: "Letreros e Impresión", icon: "store", desc: "Banners, rotulación, letreros de jardín y fachada" },
    { label: "Diseño Web", category: "Servicios Digitales", icon: "globe", desc: "Sitio nuevo, rediseño o páginas de aterrizaje" },
    { label: "SEO Local", category: "Servicios Digitales", icon: "search", desc: "Visibilidad local y presencia en Google" },
    { label: "Perfil de Google", category: "Servicios Digitales", icon: "star", desc: "Configuración, fotos, reseñas y ficha local" },
    { label: "No estoy seguro", category: "General", icon: "help", desc: "Cuéntanos qué quieres resolver" },
  ],
  showBusinessName: false,
  showProductField: false,
};

export const metadata = {
  title: {
    absolute: "Solicitar Cotización | Pixel & Panel",
  },
  description:
    "Solicita una cotización para sitio web, letreros, impresión, SEO local o campaña con código QR con Pixel & Panel.",
  alternates: {
    canonical: "https://www.pixelnpanel.com/es/solicitar-cotizacion",
    languages: {
      "en-US": "https://www.pixelnpanel.com/quote-request",
      "es-US": "https://www.pixelnpanel.com/es/solicitar-cotizacion",
    },
  },
  openGraph: {
    title: "Solicitar Cotización | Pixel & Panel",
    description:
      "Cotiza sitio web, letreros, impresión, SEO local o campaña con código QR.",
    url: "https://www.pixelnpanel.com/es/solicitar-cotizacion",
    locale: "es_US",
  },
};

export default function SpanishQuoteRequestPage() {
  return (
    <Suspense fallback={null}>
      <QuoteRequestClient copy={spanishQuoteCopy} />
    </Suspense>
  );
}
