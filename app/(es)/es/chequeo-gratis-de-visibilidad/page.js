import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  MapPin,
} from "lucide-react";
import VisibilityCheckForm from "../../../(en)/free-visibility-check/VisibilityCheckForm";
import VisibilityCheckVisual from "../../../(en)/free-visibility-check/VisibilityCheckVisual";

const whoFor = [
  "Negocios nuevos",
  "Contratistas y servicios locales",
  "Restaurantes y tiendas",
  "Negocios con letreros pero poca visibilidad en línea",
  "Negocios con sitio web que no genera contactos",
];

const checks = [
  "Claridad del sitio web y experiencia móvil",
  "Visibilidad del Perfil de Google",
  "Bases de SEO local",
  "Letreros y materiales impresos",
  "Oportunidades con códigos QR y captura de leads",
  "Flujo de contacto o cotización",
];

const receive = [
  "Un resumen simple de visibilidad",
  "Ideas rápidas de mejora",
  "Siguientes pasos recomendados",
  "Opción de cotización sin presión si quieres ayuda",
];

const faqs = [
  {
    question: "¿Qué es un Chequeo Gratis de Visibilidad?",
    answer:
      "Es una revisión práctica de cómo los clientes encuentran, entienden y contactan tu negocio en línea y en el mundo real.",
  },
  {
    question: "¿De verdad es gratis?",
    answer:
      "Sí. Pixel & Panel revisará la información que envíes y compartirá observaciones prácticas sin requerir un proyecto pagado.",
  },
  {
    question: "¿Necesito tener sitio web?",
    answer:
      "No. Si todavía no tienes sitio web, Pixel & Panel puede revisar tu Perfil de Google, letreros, materiales impresos y oportunidades de captura de leads.",
  },
  {
    question: "¿Pueden revisar mi Perfil de Google?",
    answer:
      "Sí. Comparte el nombre del negocio, ciudad y cualquier detalle del perfil que tengas, y Pixel & Panel puede revisar lo básico de cómo aparece.",
  },
  {
    question: "¿También ayudan con letreros e impresión?",
    answer:
      "Sí. Pixel & Panel puede revisar letreros, materiales impresos, oportunidades con códigos QR y cómo esas piezas conectan con tu sitio o flujo de contacto.",
  },
  {
    question: "¿Qué pasa después de enviar el formulario?",
    answer:
      "Pixel & Panel revisa tu solicitud, busca oportunidades prácticas de mejora y te contacta con un resumen simple y posibles siguientes pasos.",
  },
];

const formCopy = {
  language: "Spanish",
  sectionLabel: "Empezar",
  title: "Solicita tu chequeo gratis de visibilidad",
  intro:
    "Comparte la información básica y Pixel & Panel revisará dónde te encuentran los clientes, qué ven y qué tan fácil es tomar el siguiente paso.",
  name: "Nombre",
  businessName: "Nombre del negocio",
  email: "Correo electrónico",
  phone: "Teléfono",
  websiteUrl: "Sitio web opcional",
  businessCity: "Ciudad del negocio",
  helpLegend: "¿En qué necesitas ayuda?",
  messageLabel: "Cuéntanos qué quieres mejorar.",
  messagePlaceholder:
    "Ejemplo: más llamadas desde Google, letreros más claros, mejor sitio web, códigos QR en menús o banners...",
  submit: "Solicitar chequeo gratis",
  sending: "Enviando...",
  footer: "Sin garantías falsas, sin presión. Solo próximos pasos prácticos para tu negocio.",
  successTitle: "Gracias — recibimos tu solicitud.",
  successText: "Pixel & Panel te contactará pronto.",
  validationName: "Por favor incluye tu nombre y el nombre del negocio.",
  validationContact: "Por favor incluye correo electrónico o teléfono.",
  validationHelp: "Elige al menos una área o cuéntanos qué quieres mejorar.",
  error: "Algo salió mal. Por favor escríbenos directamente a hello@pixelnpanel.com.",
  sourceFallback: "/es/chequeo-gratis-de-visibilidad",
  helpOptions: [
    { value: "Website", label: "Sitio web" },
    { value: "Google Business Profile / Local SEO", label: "Perfil de Google / SEO local" },
    { value: "Signs / Print Materials", label: "Letreros / Materiales impresos" },
    { value: "QR Code Campaign", label: "Campaña con código QR" },
    { value: "Not sure yet", label: "No estoy seguro todavía" },
  ],
};

export const metadata = {
  title: {
    absolute: "Chequeo Gratis de Visibilidad | Pixel & Panel",
  },
  description:
    "Recibe una revisión gratis de tu sitio web, perfil de Google, letreros y configuración de códigos QR con Pixel & Panel.",
  alternates: {
    canonical: "https://pixelnpanel.com/es/chequeo-gratis-de-visibilidad",
    languages: {
      "en-US": "https://pixelnpanel.com/free-visibility-check",
      "es-US": "https://pixelnpanel.com/es/chequeo-gratis-de-visibilidad",
    },
  },
  openGraph: {
    title: "Chequeo Gratis de Visibilidad | Pixel & Panel",
    description:
      "Revisión gratis de sitio web, Perfil de Google, letreros y códigos QR.",
    url: "https://pixelnpanel.com/es/chequeo-gratis-de-visibilidad",
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

export default function SpanishVisibilityCheckPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <JsonLd data={faqSchema} />
      <div className="bg-[#FAF8F4] text-[#1C1917]">
      <section className="relative overflow-hidden bg-[#0C1E3C] px-4 pt-28 text-white md:pt-32">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#0C1E3C_0%,#0369A1_70%,#0EA5E9_100%)]" />
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.09)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.09)_1px,transparent_1px)] [background-size:44px_44px]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 pb-20 lg:grid-cols-[1.03fr_0.97fr]">
          <div>
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-sky-100">
              <MapPin className="h-4 w-4 text-[#F59E0B]" />
              Para negocios del sureste de Texas
            </div>
            <h1 className="max-w-4xl text-white">
              Chequeo gratis de visibilidad para negocios del sureste de Texas
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/78 md:text-lg">
              ¿No estás seguro por qué más clientes no encuentran tu negocio?
              Pixel &amp; Panel revisa tu presencia en línea y en el mundo real
              para darte ideas prácticas de mejora.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#visibility-check-form" className="btn-amber justify-center">
                Empezar chequeo gratis <ArrowRight className="h-4 w-4" />
              </a>
              <Link href="/es/precios" className="btn-ghost justify-center">
                Ver precios
              </Link>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <VisibilityCheckVisual />
          </div>
        </div>
      </section>

      <section className="section-base" aria-labelledby="who-for-heading-es">
        <div className="container-px">
          <SectionIntro
            id="who-for-heading-es"
            eyebrow="Para quién es"
            title="Un primer paso sencillo si todavía no estás listo para cotizar."
            description="Úsalo cuando sabes que tu visibilidad puede mejorar, pero todavía no sabes cuál problema resolver primero."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
            {whoFor.map((item) => (
              <article key={item} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <Building2 className="mb-5 h-7 w-7 text-[#0369A1]" />
                <h3 className="text-lg text-[#1C1917]">{item}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-base bg-white" aria-labelledby="checks-heading-es">
        <div className="container-px">
          <SectionIntro
            id="checks-heading-es"
            eyebrow="Qué revisamos"
            title="Puntos claros, sin reportes confusos."
            description="Pixel & Panel revisa los lugares donde tus clientes deciden si llaman, visitan, escanean o siguen buscando."
          />
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {checks.map((item) => (
              <article key={item} className="flex gap-4 rounded-xl border border-slate-200 bg-[#FAF8F4] p-5">
                <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#F59E0B]" />
                <h3 className="text-lg text-[#1C1917]">{item}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-base" aria-labelledby="receive-heading-es">
        <div className="container-px">
          <div className="grid items-center gap-10 lg:grid-cols-[0.92fr_1.08fr]">
            <div>
              <p className="section-label text-[#0369A1]">Qué recibes</p>
              <h2 id="receive-heading-es" className="text-[#1C1917]">
                Un resumen práctico que puedes usar.
              </h2>
              <p className="mt-5 leading-8 text-slate-600">
                El objetivo es mostrar qué está claro, qué falta y cuáles próximos
                pasos valen la pena. Pixel &amp; Panel no promete rankings garantizados.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {receive.map((item) => (
                <div key={item} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                  <ClipboardCheck className="mb-4 h-6 w-6 text-[#0369A1]" />
                  <h3 className="text-lg text-[#1C1917]">{item}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-base bg-white" aria-labelledby="form-heading-es">
        <div className="container-px grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className="section-label text-[#0369A1]">Formulario</p>
            <h2 id="form-heading-es" className="text-[#1C1917]">
              Empieza con lo que sabes.
            </h2>
            <p className="mt-5 leading-8 text-slate-600">
              Puedes enviar el formulario con correo o teléfono. Si no sabes
              qué necesitas todavía, escribe el problema con tus propias palabras.
            </p>
            <div className="mt-6 rounded-xl border border-[#0369A1]/15 bg-[#FAF8F4] p-5">
              <BadgeCheck className="mb-4 h-6 w-6 text-[#F59E0B]" />
              <p className="text-sm leading-7 text-slate-700">
                Este chequeo no tiene presión. Si quieres ayuda después del resumen,
                Pixel &amp; Panel puede recomendar una opción de cotización.
              </p>
            </div>
          </div>
          <VisibilityCheckForm copy={formCopy} />
        </div>
      </section>

      <section className="section-base" aria-labelledby="faq-heading-es">
        <div className="container-px">
          <SectionIntro
            id="faq-heading-es"
            eyebrow="FAQ"
            title="Preguntas sobre el chequeo gratis de visibilidad"
            description="Respuestas rápidas antes de enviar el formulario."
          />
          <div className="mx-auto mt-12 grid max-w-4xl gap-4">
            {faqs.map((faq) => (
              <article key={faq.question} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl text-[#1C1917]">{faq.question}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 md:pb-24" aria-labelledby="final-visibility-cta-es">
        <div className="mx-auto max-w-6xl rounded-xl bg-[#1C1917] px-6 py-14 text-center text-white shadow-2xl md:px-12">
          <p className="font-heading text-xs font-bold uppercase tracking-[0.16em] text-[#F59E0B]">
            Empezar
          </p>
          <h2 id="final-visibility-cta-es" className="mx-auto mt-4 max-w-3xl text-white">
            ¿Quieres ver con más claridad dónde mejorar tu visibilidad?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/75">
            Completa el formulario y Pixel &amp; Panel revisará tu sitio, perfil de Google,
            letreros, oportunidades con QR y flujo de contacto.
          </p>
          <div className="mt-8 flex justify-center">
            <a href="#visibility-check-form" className="btn-amber">
              Empezar chequeo gratis <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}

function SectionIntro({ id, eyebrow, title, description }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="section-label text-[#0369A1]">{eyebrow}</p>
      <h2 id={id} className="text-[#1C1917]">{title}</h2>
      <p className="mt-5 text-base leading-8 text-slate-600 md:text-lg">{description}</p>
    </div>
  );
}
