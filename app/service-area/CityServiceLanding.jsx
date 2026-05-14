import Link from "next/link";
import { ArrowRight, BadgeCheck, CheckCircle2, MapPin } from "lucide-react";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";

function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export default function CityServiceLanding({ city, service }) {
  const headline = service.headline(city)
  const intro = service.intro(city)
  const benefits = service.benefits
  const cityUses = service.cityUses(city)
  const faqs = service.faqs(city)

  const quoteHref = `/quote-request?product=${encodeURIComponent(service.quoteProduct)}&category=${encodeURIComponent(service.quoteCategory)}`
  const cityHref = `/service-area/${city.slug}`
  const pageUrl = `https://pixelnpanel.com/service-area/${city.slug}/${service.slug}`

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  }

  const serviceType = service.type === 'signage' ? 'Signage & Print' : 'Digital Services'
  const serviceHubHref = service.type === 'signage' ? '/signage' : '/digital'

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://pixelnpanel.com" },
          { name: "Service Area", url: "https://pixelnpanel.com/service-area" },
          { name: `${city.name}, TX`, url: `https://pixelnpanel.com/service-area/${city.slug}` },
          { name: service.name, url: `https://pixelnpanel.com/service-area/${city.slug}` },
        ]}
      />
      <JsonLd data={faqSchema} />

      <div className="bg-[#FAF8F4] text-[#1C1917]">

        {/* Hero */}
        <section className="relative overflow-hidden bg-[#0C1E3C] px-6 pt-24 text-white md:pt-28">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,#1C1917_0%,#0369A1_64%,#0EA5E9_100%)]" />
          <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.09)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.09)_1px,transparent_1px)] [background-size:44px_44px]" />
          <div className="relative mx-auto max-w-7xl pb-20 md:pb-24">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Link href={cityHref} className="text-white/60 text-sm hover:text-white/90 transition-colors">
                {city.name}, TX
              </Link>
              <span className="text-white/40 text-sm">›</span>
              <span className="text-[#F59E0B] text-sm font-semibold">{service.name}</span>
            </div>
            <p className="section-label" style={{ color: "#F59E0B" }}>
              {serviceType} · {city.name}, TX
            </p>
            <h1 className="mt-3 max-w-4xl text-white">{headline}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/75">
              {intro}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href={quoteHref} className="btn-amber justify-center">
                Request a Quote <ArrowRight size={16} />
              </Link>
              <Link href={service.mainHref} className="btn-ghost justify-center">
                Learn More About {service.name}
              </Link>
            </div>
          </div>
        </section>

        {/* Benefits + Uses */}
        <section className="section-base">
          <div className="container-px grid gap-10 lg:grid-cols-2">
            <div>
              <div className="mb-4 flex items-center gap-3 text-[#0369A1]">
                <MapPin size={20} />
                <span className="font-bold text-sm">Serving {city.name} and {city.region}</span>
              </div>
              <h2 className="mb-5 text-[#1C1917]">What {service.name} Does for {city.name} Businesses</h2>
              <ul className="grid gap-3">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex gap-3 text-slate-600">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#F59E0B]" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:p-7">
              <h2 className="mb-5 text-xl text-[#1C1917]">Common Uses in {city.name}</h2>
              <ul className="grid gap-4">
                {cityUses.map((use) => (
                  <li key={use} className="flex gap-3 text-slate-600">
                    <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#0369A1]" />
                    <span>{use}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white px-6 py-16 md:py-24">
          <div className="mx-auto max-w-4xl">
            <div className="mb-10 text-center">
              <p className="section-label text-[#0369A1]">FAQ</p>
              <h2 className="text-[#1C1917]">{service.name} Questions — {city.name}, TX</h2>
            </div>
            <div className="grid gap-4">
              {faqs.map(([question, answer]) => (
                <article key={question} className="rounded-xl border border-slate-200 bg-[#FAF8F4] p-5 shadow-sm">
                  <h3 className="mb-2 text-xl text-[#1C1917]">{question}</h3>
                  <p className="text-slate-600 leading-7">{answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Related links */}
        <section className="section-base">
          <div className="container-px">
            <div className="mx-auto max-w-4xl">
              <p className="section-label text-[#0369A1]">Explore More</p>
              <h2 className="mb-6 text-[#1C1917]">Related Pages</h2>
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                <Link href={service.mainHref} className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:border-[#F59E0B] transition-colors">
                  <p className="font-bold text-[#1C1917] group-hover:text-[#0369A1] transition-colors">{service.name}</p>
                  <p className="mt-1 text-sm text-slate-500">Full service overview →</p>
                </Link>
                <Link href={cityHref} className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:border-[#F59E0B] transition-colors">
                  <p className="font-bold text-[#1C1917] group-hover:text-[#0369A1] transition-colors">{city.name}, TX</p>
                  <p className="mt-1 text-sm text-slate-500">All services in your area →</p>
                </Link>
                <Link href={serviceHubHref} className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:border-[#F59E0B] transition-colors">
                  <p className="font-bold text-[#1C1917] group-hover:text-[#0369A1] transition-colors">{serviceType}</p>
                  <p className="mt-1 text-sm text-slate-500">Browse all options →</p>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 py-14 md:py-20">
          <div className="mx-auto max-w-6xl rounded-xl bg-[#0C1E3C] p-8 text-white shadow-2xl md:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="section-label" style={{ color: "#F59E0B" }}>{city.name} · {service.name}</p>
                <h2 className="text-white">Ready to get started?</h2>
                <p className="mt-3 max-w-2xl text-white/75">
                  Request a quote for {service.name} in {city.name}, TX — or start with a free visibility check to see where you stand.
                </p>
              </div>
              <div className="flex flex-col gap-3 lg:shrink-0">
                <Link href={quoteHref} className="btn-amber justify-center">
                  Request a Quote <ArrowRight size={16} />
                </Link>
                <Link href="/free-visibility-check" className="btn-ghost justify-center">
                  Free Visibility Check
                </Link>
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  )
}
