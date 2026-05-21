import ContactClient from "../../../(en)/contact/ContactClient";

const spanishContactCopy = {
  language: "Spanish",
  eyebrow: "Contacto",
  h1: "Contacto",
  headlineLines: ["¿Tienes una pregunta?", "Estamos listos", "para ayudarte."],
  introStart:
    "Cuéntanos qué necesita tu negocio — un sitio web, letreros, impresión, o todavía no sabes. Leemos cada mensaje personalmente. Si no sabes por dónde empezar, puedes pedir un",
  visibilityHref: "/es/chequeo-gratis-de-visibilidad",
  visibilityLabel: "chequeo gratis de visibilidad",
  emailLabel: "Correo",
  phoneLabel: "Teléfono",
  responseLabel: "Tiempo de respuesta",
  responseValue: "Dentro de 1 día hábil",
  formTitle: "Envíanos un mensaje",
  formNote: "Sin presión. Solo una conversación clara.",
  name: "Nombre",
  email: "Correo electrónico",
  phone: "Teléfono",
  subject: "Asunto",
  message: "Mensaje",
  subjectPlaceholder: "Sitio web, letreros, impresión o pregunta general",
  messagePlaceholder:
    "Cuéntanos qué necesita tu negocio o qué problema quieres resolver...",
  submit: "Enviar mensaje",
  sending: "Enviando...",
  footer: "Respondemos dentro de 1 día hábil. Sin spam.",
  successTitle: "Gracias — recibimos tu mensaje.",
  successText: "Pixel & Panel te contactará pronto.",
  errorFallback: "Algo salió mal. Por favor escríbenos directamente a hello@pixelnpanel.com.",
  trackOrderHref: "/es/rastrear-pedido",
  trackOrderLabel: "Rastrear mi pedido",
  trackOrderValue: "Consulta el estado de tu pedido",
};

export const metadata = {
  title: {
    absolute: "Contacto | Pixel & Panel",
  },
  description:
    "Contacta a Pixel & Panel para sitios web, letreros, impresión, SEO local y campañas con códigos QR en el sureste de Texas.",
  alternates: {
    canonical: "https://pixelnpanel.com/es/contacto",
    languages: {
      "en-US": "https://pixelnpanel.com/contact",
      "es-US": "https://pixelnpanel.com/es/contacto",
    },
  },
  openGraph: {
    title: "Contacto | Pixel & Panel",
    description:
      "Contacta a Pixel & Panel para sitios web, letreros, impresión, SEO local y códigos QR.",
    url: "https://pixelnpanel.com/es/contacto",
    locale: "es_US",
  },
};

export default function SpanishContactPage() {
  return <ContactClient copy={spanishContactCopy} />;
}
