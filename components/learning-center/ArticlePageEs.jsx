import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { getRelatedPostsEs } from "@/lib/learning-center-posts-es";

function formatDate(dateString) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("es-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

const ctaConfig = {
  quote: {
    title: "¿Listo para planear tu proyecto?",
    copy: "Comparte tus objetivos y recibe una cotización práctica para tu próximo paso de visibilidad.",
    primary: { label: "Solicitar cotización", href: "/es/solicitar-cotizacion" },
    secondary: { label: "Ver precios", href: "/es/precios" },
  },
  visibility: {
    title: "¿Quieres revisar primero tu visibilidad?",
    copy: "Empieza con una revisión gratis de tu sitio, presencia local y oportunidades de siguiente paso.",
    primary: { label: "Chequeo gratis de visibilidad", href: "/es/chequeo-gratis-de-visibilidad" },
    secondary: { label: "Ver servicios digitales", href: "/es/servicios-digitales" },
  },
  signage: {
    title: "¿Necesitas ayuda con letreros e impresión?",
    copy: "Compara opciones prácticas según tu uso real, presupuesto y fecha.",
    primary: { label: "Ver letreros e impresión", href: "/es/letreros" },
    secondary: { label: "Solicitar cotización", href: "/es/solicitar-cotizacion" },
  },
  digital: {
    title: "¿Necesitas una base digital que apoye tus leads?",
    copy: "Explora sitios web, SEO local, Perfil de Google y estrategia QR.",
    primary: { label: "Ver servicios digitales", href: "/es/servicios-digitales" },
    secondary: { label: "Chequeo gratis de visibilidad", href: "/es/chequeo-gratis-de-visibilidad" },
  },
  pricing: {
    title: "¿No sabes por dónde empezar?",
    copy: "Revisa rangos de precios y elige un siguiente paso práctico según presupuesto.",
    primary: { label: "Ver precios", href: "/es/precios" },
    secondary: { label: "Solicitar cotización", href: "/es/solicitar-cotizacion" },
  },
};

export default function ArticlePageEs({ post }) {
  const relatedPosts = getRelatedPostsEs(post, 3);
  const cta = ctaConfig[post.ctaType] || ctaConfig.visibility;
  const pageUrl = `https://www.pixelnpanel.com/es/centro-de-aprendizaje/${post.slug}`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Inicio",
        item: "https://www.pixelnpanel.com/es",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Centro de Aprendizaje",
        item: "https://www.pixelnpanel.com/es/centro-de-aprendizaje",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: pageUrl,
      },
    ],
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.publishDate,
    dateModified: post.updatedDate,
    author: {
      "@type": "Organization",
      name: post.authorName,
    },
    publisher: {
      "@type": "Organization",
      name: "Pixel & Panel",
      url: "https://www.pixelnpanel.com",
    },
    mainEntityOfPage: pageUrl,
    keywords: [post.primaryKeyword, ...post.secondaryKeywords].join(", "),
    articleSection: post.category,
    inLanguage: "es-US",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={articleSchema} />
      <JsonLd data={faqSchema} />

      <main className="bg-[#FAF8F4] text-[#1C1917]">
        <section className="relative overflow-hidden bg-[#0C1E3C] px-6 pt-24 text-white md:pt-28">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,#0C1E3C_0%,#0369A1_100%)]" />
          <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.09)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.09)_1px,transparent_1px)] [background-size:44px_44px]" />

          <div className="relative mx-auto max-w-5xl pb-16 md:pb-20">
            <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-white/65" aria-label="Breadcrumb">
              <Link href="/es" className="transition hover:text-white">Inicio</Link>
              <span aria-hidden="true">/</span>
              <Link href="/es/centro-de-aprendizaje" className="transition hover:text-white">Centro de Aprendizaje</Link>
              <span aria-hidden="true">/</span>
              <span className="text-white">{post.title}</span>
            </nav>

            <p className="section-label" style={{ color: "#F59E0B" }}>{post.category}</p>
            <h1 className="mt-4 text-white">{post.title}</h1>
            <p className="mt-5 max-w-4xl text-lg leading-8 text-white/78">{post.intro}</p>

            <div className="mt-6 flex flex-wrap gap-4 text-sm text-white/72">
              <span>Publicado {formatDate(post.publishDate)}</span>
              <span>Actualizado {formatDate(post.updatedDate)}</span>
              <span>{post.readingTime}</span>
              <span>Por {post.authorName}</span>
            </div>
          </div>
        </section>

        <section className="section-base">
          <div className="container-px">
            <div className="mx-auto max-w-4xl space-y-10">
              {post.sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="text-[#1C1917]">{section.heading}</h2>
                  <div className="mt-4 space-y-4">
                    {section.paragraphs?.map((paragraph) => (
                      <p key={paragraph} className="leading-8 text-slate-700">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  {section.bullets?.length ? (
                    <ul className="mt-5 grid gap-3">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-3 rounded-lg border border-slate-200 bg-white p-4 text-slate-700">
                          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#0369A1]" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}

              <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-[#1C1917]">Enlaces útiles</h2>
                <ul className="mt-4 grid gap-3">
                  {post.helpfulLinks.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="inline-flex items-center gap-2 text-[#0369A1] transition hover:text-[#F59E0B]">
                        {link.label} <ArrowRight className="h-4 w-4" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-[#1C1917]">Preguntas frecuentes</h2>
                <div className="mt-5 grid gap-4">
                  {post.faqs.map((faq) => (
                    <article key={faq.question} className="rounded-lg border border-slate-200 bg-[#FAF8F4] p-5">
                      <h3 className="text-xl text-[#1C1917]">{faq.question}</h3>
                      <p className="mt-2 text-slate-700">{faq.answer}</p>
                    </article>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </section>

        <section className="bg-white px-6 py-16 md:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="section-label text-[#0369A1]">Guías relacionadas</p>
                <h2 className="text-[#1C1917]">Seguir aprendiendo</h2>
              </div>
              <Link href="/es/centro-de-aprendizaje" className="btn-outline">
                Ver todas las guías
              </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {relatedPosts.map((related) => (
                <article key={related.slug} className="rounded-xl border border-slate-200 bg-[#FAF8F4] p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#0369A1]">{related.category}</p>
                  <h3 className="mt-3 text-[#1C1917]">{related.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{related.description}</p>
                  <Link
                    href={`/es/centro-de-aprendizaje/${related.slug}`}
                    className="mt-4 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.12em] text-[#0369A1] transition hover:text-[#F59E0B]"
                  >
                    Leer guía <ArrowRight className="h-4 w-4" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 pb-16 pt-8 md:pb-24 md:pt-12">
          <div className="mx-auto max-w-6xl rounded-xl bg-[#1C1917] p-8 text-white shadow-2xl md:p-10">
            <p className="section-label" style={{ color: "#F59E0B" }}>Siguiente paso</p>
            <h2 className="mt-3 text-white">{cta.title}</h2>
            <p className="mt-3 max-w-3xl text-white/75">{cta.copy}</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href={cta.primary.href} className="btn-amber justify-center">
                {cta.primary.label} <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href={cta.secondary.href} className="btn-ghost justify-center">
                {cta.secondary.label}
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
