import ContactClient from "../../../(en)/contact/ContactClient";
import { withDefaultSocialImage } from "@/lib/seo";

const spanishContactCopy = {
  language: "Spanish",
  eyebrow: "Contacto",
  h1: "Contacto",
  headlineLines: ["¿Tienes una pregunta?", "Estamos listos", "para ayudarte."],
  mobileHeadlineLines: ["¿Necesitas ayuda?", "Te ayudamos."],
  introStart:
    "Cuéntanos qué necesita tu negocio — un sitio web, letreros, impresión, o todavía no sabes. Leemos cada mensaje personalmente. Si no sabes por dónde empezar, puedes pedir un",
  mobileIntroStart:
    "Pregunta por servicios, opciones o empieza con un",
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

export const metadata = withDefaultSocialImage({
  title: {
    absolute: "Contacto | Pixel & Panel",
  },
  description:
    "Contacta a Pixel & Panel para sitios web, letreros, impresión, SEO local y campañas con códigos QR en el sureste de Texas.",
  alternates: {
    canonical: "https://www.pixelnpanel.com/es/contacto",
    languages: {
      "en-US": "https://www.pixelnpanel.com/contact",
      "x-default": "https://www.pixelnpanel.com/contact",
      "es-US": "https://www.pixelnpanel.com/es/contacto",
    },
  },
  openGraph: {
    title: "Contacto | Pixel & Panel",
    description:
      "Contacta a Pixel & Panel para sitios web, letreros, impresión, SEO local y códigos QR.",
    url: "https://www.pixelnpanel.com/es/contacto",
    locale: "es_US",
  },
});

export default function SpanishContactPage() {
  return <ContactClient copy={spanishContactCopy} />;
}
