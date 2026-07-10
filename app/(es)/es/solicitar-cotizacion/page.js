import QuoteRequestClient from "../../../(en)/quote-request/QuoteRequestClient";
import { Suspense } from "react";
import { withDefaultSocialImage } from "@/lib/seo";

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
  reviewsLabel: "de 5 reseñas de Google",
  nextStepsTitle: "Qué sigue",
  nextSteps: [
    "Nos envías los detalles — qué necesitas, tamaño, cantidad y fecha límite.",
    "Respondemos en 1 día hábil con una cotización exacta — sin adivinar.",
    "Aprobamos todo contigo antes de imprimir o publicar.",
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
  contactRequirement: "Incluye correo electrónico o teléfono.",
  attachLabel: "Adjuntar archivo",
  attachOptional: "(opcional)",
  attachPrompt: "Logo, boceto o imagen de referencia",
  attachTypes: "JPG, PNG, PDF · 4 MB",
  removeAttachmentAria: "Quitar archivo adjunto",
  fileSizeError: "El archivo debe pesar 4 MB o menos.",
  fileTypeError: "Solo se permiten archivos JPG, PNG, PDF, GIF, WebP, SVG y AI/EPS.",
  footer: "Respondemos dentro de 1 día hábil. Sin spam.",
  agreementPrefix: "Al enviar este formulario, aceptas nuestros",
  termsLabel: "Términos de servicio",
  termsHref: "/terms",
  agreementConnector: "y",
  privacyLabel: "Política de privacidad",
  privacyHref: "/privacy-policy",
  agreementSuffix: ".",
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

export const metadata = withDefaultSocialImage({
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
});

// Server-rendered Suspense fallback — mirrors the client hero so crawlers get
// a real H1 and copy (useSearchParams bails the client subtree out of SSR).
function SpanishQuoteRequestFallback() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#0369A1] bg-[radial-gradient(circle_at_80%_20%,rgba(14,165,233,0.65),transparent_32%),linear-gradient(135deg,#06213f_0%,#0369A1_48%,#0EA5E9_100%)] text-white">
      <section className="pnp-mobile-quote-hero relative overflow-hidden px-6 py-24 sm:py-28 lg:px-8">
        <div className="absolute inset-0 opacity-20">
          <div className="h-full w-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.22)_1px,transparent_1px)] [background-size:28px_28px]" />
        </div>
        <div className="relative mx-auto max-w-6xl">
          <p className="mb-5 section-label">{spanishQuoteCopy.eyebrow}</p>
          <h1 className="pnp-mobile-form-title max-w-[342px] break-words text-[1.85rem] leading-tight md:max-w-xl md:text-[clamp(2rem,4vw,3rem)]" style={{ color: "white" }}>
            {spanishQuoteCopy.h1Start}{" "}
            <span className="text-[#F59E0B]">{spanishQuoteCopy.h1Highlight}</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-white/80">
            {spanishQuoteCopy.intro} Letreros, banners, rotulación vehicular, impresión,
            sitios web y visibilidad en Google para negocios del sureste de Texas.
          </p>
          <p className="mt-4 max-w-xl text-sm font-semibold text-white/70">
            ★ 5.0 en Google · Negocio local de Texas · Archivos aprobados antes de imprimir
          </p>
        </div>
      </section>
    </div>
  );
}

export default function SpanishQuoteRequestPage() {
  return (
    <Suspense fallback={<SpanishQuoteRequestFallback />}>
      <QuoteRequestClient copy={spanishQuoteCopy} />
    </Suspense>
  );
}
