import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  Globe2,
  Info,
  Layers,
  MousePointerClick,
  QrCode,
  Search,
} from "lucide-react";
import { digitalServices, getDigitalService, getRelatedDigitalServices } from "@/lib/digital-services";
import { digitalSlugMap } from "@/lib/digital-services-es";
import { cityServiceServices, cityServiceCities } from "@/lib/city-service-pages";

const serviceDetails = {
  "web-development": {
    helps: ["Turn visitors into quote requests", "Explain services clearly on mobile", "Make your signs and website work together"],
    bestFor: ["New businesses that need a professional home base", "Local service companies that need quote requests", "Shops and restaurants that need clear pages customers can trust"],
    how: "Pixel & Panel keeps website builds focused on clear service pages, fast mobile layouts, and contact paths that make sense for local customers.",
    icon: Globe2,
  },
  "local-seo": {
    helps: ["Show up when nearby customers search on Google", "Clarify service areas and service pages", "Build internal links that help customers move naturally"],
    bestFor: ["Contractors and local service companies", "Businesses with good work but weak online visibility", "Teams serving Beaumont, Nederland, Port Arthur, and nearby Southeast Texas"],
    how: "Pixel & Panel improves the local signals customers and search engines use: page structure, service copy, Google profile alignment, and helpful internal links.",
    icon: Search,
  },
  "google-business-profile": {
    helps: ["Make your Google profile clearer", "Connect profile visitors to useful website or quote pages", "Improve the information customers see before they call"],
    bestFor: ["Businesses with outdated profile details", "Storefronts that depend on calls and visits", "Service businesses that need clearer category and service information"],
    how: "Pixel & Panel reviews the profile from a customer point of view, then improves the details, service descriptions, links, and update plan.",
    icon: BadgeCheck,
  },
  "crm-automation": {
    helps: ["Organize quote and contact inquiries", "Reduce missed follow-up", "Connect lead capture from forms and QR campaigns"],
    bestFor: ["Businesses getting leads from several places", "Small teams that need a simpler follow-up path", "Owners who want cleaner inquiry details before replying"],
    how: "Pixel & Panel helps shape simple lead flows so customer details land in a useful structure and the next step is easier to see.",
    icon: ClipboardCheck,
  },
  "qr-code-campaigns": {
    helps: ["Track scans from signs and print materials", "Send customers to the right next step", "Make signs, flyers, menus, and business cards more useful"],
    bestFor: ["Banners, menus, flyers, and business cards", "Events and promotions with a clear action", "Businesses that want print to connect to quote forms or landing pages"],
    how: "Pixel & Panel plans QR placement, destination pages, and campaign structure so scans lead somewhere useful instead of a generic homepage.",
    icon: QrCode,
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

export function generateStaticParams() {
  return digitalServices.map((service) => ({
    service: service.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { service: serviceSlug } = await params;
  const service = getDigitalService(serviceSlug);

  if (!service) {
    return {
      title: "Digital Services",
    };
  }

  return {
    title: service.title,
    description: service.description,
    alternates: {
      canonical: `/digital/${service.slug}`,
      languages: {
        "en-US": `/digital/${service.slug}`,
        "es-US": `/es/servicios-digitales/${digitalSlugMap[service.slug] || ""}`,
      },
    },
    openGraph: {
      title: `${service.title} | Pixel & Panel`,
      description: service.description,
      url: `https://pixelnpanel.com/digital/${service.slug}`,
      siteName: "Pixel & Panel",
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.title} | Pixel & Panel`,
      description: service.description,
    },
  };
}

export default async function DigitalServicePage({ params }) {
  const { service: serviceSlug } = await params;
  const service = getDigitalService(serviceSlug);

  if (!service) notFound();

  const details = serviceDetails[service.slug] || serviceDetails["web-development"];
  const HeroIcon = details.icon;
  const quoteHref = `/quote-request?product=${encodeURIComponent(service.name)}&category=${encodeURIComponent("Digital Services")}`;
  const visibilityHref = "/free-visibility-check";
  const related = getRelatedDigitalServices(service);
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://pixelnpanel.com" },
      { "@type": "ListItem", position: 2, name: "Digital Services", item: "https://pixelnpanel.com/digital" },
      { "@type": "ListItem", position: 3, name: service.name, item: `https://pixelnpanel.com/digital/${service.slug}` },
    ],
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map(([question, answer]) => ({
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
        <section className="relative overflow-hidden bg-[#0C1E3C] px-6 pt-24 text-white md:pt-28">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,#1C1917_0%,#0369A1_64%,#0EA5E9_100%)]" />
          <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.09)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.09)_1px,transparent_1px)] [background-size:44px_44px]" />
          <div className="relative mx-auto max-w-7xl pb-18 md:pb-24">
            <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-white/65" aria-label="Breadcrumb">
              <Link href="/" className="transition hover:text-white">Home</Link>
              <span aria-hidden="true">/</span>
              <Link href="/digital" className="transition hover:text-white">Digital Services</Link>
              <span aria-hidden="true">/</span>
              <span className="text-white">{service.name}</span>
            </nav>

            <div className="grid gap-10 lg:grid-cols-[1fr_420px] lg:items-center">
              <div>
                <p className="section-label" style={{ color: "#F59E0B" }}>Southeast Texas Digital Services</p>
                <h1 className="max-w-4xl text-white">{service.h1}</h1>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-white/75">{service.intro}</p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Link href={quoteHref} className="btn-amber justify-center">
                    Request Quote <ArrowRight size={16} />
                  </Link>
                  <Link href={visibilityHref} className="btn-ghost justify-center">
                    Free Visibility Check
                  </Link>
                </div>
              </div>

              <aside className="rounded-xl border border-white/15 bg-white/10 p-6 shadow-2xl">
                <span className="mb-6 flex h-14 w-14 items-center justify-center rounded-lg bg-[#F59E0B] text-[#1C1917]">
                  <HeroIcon className="h-7 w-7" />
                </span>
                <h2 className="text-white">Plain-English visibility support</h2>
                <p className="mt-4 text-sm leading-7 text-white/72">
                  Built around calls, quote requests, useful pages, and clear next steps instead of confusing marketing jargon.
                </p>
                <div className="mt-6 grid gap-3">
                  {["Show up clearly", "Convert attention", "Connect online and offline"].map((item) => (
                    <div key={item} className="flex items-center gap-3 rounded-lg bg-white/10 px-4 py-3 text-sm font-semibold text-white/78">
                      <CheckCircle2 className="h-4 w-4 text-[#F59E0B]" />
                      {item}
                    </div>
                  ))}
                </div>
                {service.turnaround && (
                  <div className="mt-4 flex items-start gap-3 rounded-lg bg-white/10 px-4 py-3">
                    <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#F59E0B]" />
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide text-[#F59E0B]">Timeline</p>
                      <p className="mt-0.5 text-sm text-white/80">{service.turnaround}</p>
                    </div>
                  </div>
                )}
              </aside>
            </div>
          </div>
        </section>

        <section className="section-base">
          <div className="container-px">
            <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
              <section aria-labelledby="helps-heading" className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                <p className="section-label text-[#0369A1]">What This Service Helps With</p>
                <h2 id="helps-heading" className="text-[#1C1917]">Focused on practical business visibility.</h2>
                <div className="mt-6 grid gap-3">
                  {details.helps.map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-lg bg-[#FAF8F4] p-4">
                      <MousePointerClick className="mt-1 h-5 w-5 shrink-0 text-[#F59E0B]" />
                      <span className="text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section aria-labelledby="included-heading" className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                <p className="section-label text-[#0369A1]">What&apos;s Included</p>
                <h2 id="included-heading" className="text-[#1C1917]">The core pieces Pixel &amp; Panel reviews or builds.</h2>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {service.includes.map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-lg border border-slate-100 bg-[#FAF8F4] p-4">
                      <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#0369A1]" />
                      <span className="text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1fr]">
              <section aria-labelledby="best-for-heading" className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                <p className="section-label text-[#0369A1]">Best For</p>
                <h2 id="best-for-heading" className="text-[#1C1917]">A good fit when you need clarity before scale.</h2>
                <div className="mt-6 grid gap-3">
                  {details.bestFor.map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-lg bg-[#FAF8F4] p-4">
                      <Layers className="mt-1 h-5 w-5 shrink-0 text-[#F59E0B]" />
                      <span className="text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section aria-labelledby="how-heading" className="rounded-xl bg-[#0C1E3C] p-6 text-white shadow-xl md:p-8">
                <p className="section-label" style={{ color: "#F59E0B" }}>How Pixel &amp; Panel Helps</p>
                <h2 id="how-heading" className="text-white">Online work that supports real customer action.</h2>
                <p className="mt-5 leading-8 text-white/72">{details.how}</p>
                <p className="mt-5 leading-8 text-white/72">
                  The goal is to help customers understand what you do, trust the page they landed on, and take the next step.
                </p>
              </section>
            </div>
          </div>
        </section>

        <section className="bg-white px-6 py-16 md:py-24" aria-labelledby="related-heading">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="section-label text-[#0369A1]">Related Digital Services</p>
                <h2 id="related-heading" className="text-[#1C1917]">Services that work well with {service.name.toLowerCase()}</h2>
              </div>
              <Link href="/digital" className="btn-outline">
                View All Digital Services
              </Link>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {related.map((item) => (
                <Link key={item.slug} href={`/digital/${item.slug}`} className="group rounded-xl border border-slate-200 bg-[#FAF8F4] p-5 shadow-sm transition hover:-translate-y-1 hover:border-[#F59E0B]/50 hover:shadow-lg">
                  <div className="mb-5 flex items-center justify-between gap-3">
                    <Globe2 className="h-5 w-5 text-[#F59E0B]" />
                    <ArrowRight className="h-4 w-4 text-slate-300 transition group-hover:translate-x-1 group-hover:text-[#F59E0B]" />
                  </div>
                  <h3 className="mb-2 text-[#1C1917]">{item.name}</h3>
                  <p className="text-sm leading-6 text-slate-600">{item.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── CITY+SERVICE LINKS ───────────────────────────────── */}
        {cityServiceServices[service.slug] && (
          <section className="bg-[#FAF8F4] px-6 py-14 md:py-16">
            <div className="mx-auto max-w-7xl">
              <p className="section-label text-[#0369A1]">Service Area</p>
              <h2 className="mb-6 text-[#1C1917]">{service.name} by City</h2>
              <div className="grid gap-3 sm:grid-cols-3">
                {Object.values(cityServiceCities).map((city) => (
                  <Link
                    key={city.slug}
                    href={`/service-area/${city.slug}/${service.slug}`}
                    className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:border-[#F59E0B] transition-colors"
                  >
                    <p className="font-bold text-[#1C1917] group-hover:text-[#0369A1] transition-colors">
                      {service.name} in {city.name}, TX
                    </p>
                    <p className="mt-1 text-sm text-slate-500">City-specific guide →</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {service.notAFitWhen && (
          <div className="container-px pb-4">
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
              <div className="flex gap-3">
                <Info className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
                <div>
                  <p className="font-heading text-sm font-bold text-amber-900">Good to know before starting</p>
                  <p className="mt-1 text-sm leading-7 text-amber-800">{service.notAFitWhen}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <section className="section-base">
          <div className="container-px">
            <div className="mx-auto max-w-4xl">
              <div className="mb-10 text-center">
                <p className="section-label text-[#0369A1]">FAQ</p>
                <h2 className="text-[#1C1917]">Questions About {service.name}</h2>
              </div>
              <div className="grid gap-4">
                {service.faqs.map(([question, answer]) => (
                  <article key={question} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                    <h3 className="mb-2 text-xl text-[#1C1917]">{question}</h3>
                    <p className="text-slate-600">{answer}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-14 md:py-20">
          <div className="mx-auto max-w-6xl rounded-xl bg-[#0C1E3C] p-8 text-white shadow-2xl md:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="section-label" style={{ color: "#F59E0B" }}>Next Step</p>
                <h2 className="text-white">Want help with {service.name.toLowerCase()}?</h2>
                <p className="mt-4 max-w-2xl text-white/72">
                  Tell Pixel &amp; Panel what you are trying to improve and we will recommend a practical starting point.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Link href={quoteHref} className="btn-amber justify-center">
                  Request a Quote <ArrowRight size={16} />
                </Link>
                <Link href={visibilityHref} className="btn-ghost justify-center">
                  Free Visibility Check
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
