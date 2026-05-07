import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle, Home } from "lucide-react";
import { getRelatedSignageProducts, serviceAreaPhrase } from "@/lib/signage-products";

function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export default function SignageProductPage({ product }) {
  const quoteHref = `/quote-request?product=${encodeURIComponent(product.name)}&category=${encodeURIComponent(product.category)}`;
  const related = getRelatedSignageProducts(product);

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://pixelnpanel.com" },
      { "@type": "ListItem", position: 2, name: "Signage & Print", item: "https://pixelnpanel.com/signage" },
      { "@type": "ListItem", position: 3, name: product.name, item: `https://pixelnpanel.com/signage/${product.slug}` },
    ],
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: product.faqs.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    })),
  };

  return (
    <>
      <JsonLd data={breadcrumbs} />
      <JsonLd data={faq} />

      <div className="bg-[#FAF8F4] text-[#1C1917]">
        <section className="bg-[#0C1E3C] px-6 py-24 text-white">
          <div className="mx-auto max-w-6xl">
            <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-white/65" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-white">Home</Link>
              <span>/</span>
              <Link href="/signage" className="hover:text-white">Signage & Print</Link>
              <span>/</span>
              <span className="text-white">{product.name}</span>
            </nav>

            <div className="grid gap-10 lg:grid-cols-[1fr_420px] lg:items-center">
              <div>
                <p className="section-label" style={{ color: "#F59E0B" }}>{serviceAreaPhrase}</p>
                <h1 style={{ color: "white" }}>{product.h1}</h1>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-white/75">{product.intro}</p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <Link href={quoteHref} className="btn-amber">
                    Get a Sign Quote <ArrowRight size={16} />
                  </Link>
                  <Link href="/signage" className="btn-ghost">
                    Browse Signage & Print
                  </Link>
                </div>
              </div>

              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-white/10">
                <Image
                  src={product.image}
                  alt={product.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 420px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        <section className="section-base">
          <div className="container-px grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <h2 className="mb-4">Common Uses</h2>
              <div className="grid gap-3">
                {product.uses.map((use) => (
                  <div key={use} className="white-card flex items-start gap-3 p-4">
                    <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-[#0369A1]" />
                    <span className="text-slate-700">{use}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="white-card p-7">
              <h2 className="mb-4">Material, Size & Design Guidance</h2>
              <p className="text-slate-600">{product.guidance}</p>
              <p className="mt-5 text-slate-600">
                {serviceAreaPhrase}. Every project starts with a quick review of
                where the piece will be used, how people will see it, and what
                action you want them to take.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white px-6 py-16">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-center">Questions About {product.name}</h2>
            <div className="grid gap-4">
              {product.faqs.map(([question, answer]) => (
                <div key={question} className="rounded-2xl border border-slate-200 bg-[#FAF8F4] p-5">
                  <h3 className="mb-2">{question}</h3>
                  <p className="text-slate-600">{answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-base">
          <div className="container-px">
            <div className="mb-8 flex items-center gap-3">
              <Home className="h-5 w-5 text-[#F59E0B]" />
              <h2>Related Signage & Print Products</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {related.map((item) => (
                <Link key={item.slug} href={`/signage/${item.slug}`} className="white-card p-5 transition hover:-translate-y-1 hover:shadow-lg">
                  <h3 className="mb-2">{item.name}</h3>
                  <p className="text-sm leading-6 text-slate-600">{item.description}</p>
                </Link>
              ))}
            </div>
            <div className="mt-10 rounded-2xl bg-[#0C1E3C] p-8 text-center text-white">
              <h2 style={{ color: "white" }}>Ready to price your project?</h2>
              <p className="mx-auto mt-3 max-w-2xl text-white/70">
                Tell us what you need, where it will be used, and your timeline.
                We will reply with the next best step.
              </p>
              <Link href={quoteHref} className="btn-amber mt-6">
                Request a Quote <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
