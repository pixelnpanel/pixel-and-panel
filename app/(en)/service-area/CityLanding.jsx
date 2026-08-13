import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Globe2,
  MapPin,
  PanelTop,
  Search,
  Store,
} from "lucide-react";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import CityVisual from "./CityVisual";
import { getAvailableCityServiceEntries } from "@/lib/city-service-pages";

function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

function splitFeaturedLinks(links) {
  return {
    signage: links.filter((link) => link.href.startsWith("/signage")),
    digital: links.filter((link) => link.href.startsWith("/digital")),
  };
}

function citySlug(name) {
  return name.toLowerCase().replace(/\s+/g, "-") + "-tx";
}

export default function CityLanding({ city }) {
  const quoteHref = `/quote-request?product=${encodeURIComponent(`${city.name} Visibility Project`)}&category=${encodeURIComponent("Service Area")}`;
  const visibilityHref = "/free-visibility-check";
  const featured = splitFeaturedLinks(city.featuredLinks);
  const reasons = city.reasons || [
    "Websites, signs, and QR paths can point customers toward the same clear next step.",
    "Recommendations stay practical for local budgets, timelines, and service needs.",
    "Pixel & Panel uses plain English so you can choose the right starting point.",
  ];
  const faqs = city.faqs || [
    [`Do you work with ${city.name} businesses?`, `Yes. Pixel & Panel helps ${city.name} businesses with websites, signage, print materials, local SEO, and QR-powered lead capture.`],
    [`Can you help with both signs and websites in ${city.name}?`, "Yes. Pixel & Panel can help connect real-world visibility with online pages, quote forms, and contact paths."],
    ["Where should I start?", "If you are not ready for a quote, the Free Visibility Check is a good first step."],
  ];

  const slug = city.slug || citySlug(city.name);
  const cityServiceEntries = getAvailableCityServiceEntries(slug);
  const pageUrl = `https://www.pixelnpanel.com/service-area/${slug}`;
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Pixel & Panel",
    url: "https://www.pixelnpanel.com",
    email: "hello@pixelnpanel.com",
    telephone: "(409) 225-2012",
    areaServed: ["Beaumont, TX", "Nederland, TX", "Port Arthur, TX", "Southeast Texas"],
    knowsAbout: [
      "Website design and development",
      "Local SEO",
      "Google Business Profile optimization",
      "Custom signs and print materials",
      "QR code campaigns",
    ],
  };

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://www.pixelnpanel.com" },
          { name: `${city.name}, TX`, url: pageUrl },
        ]}
      />
      <JsonLd data={faqSchema} />
      <JsonLd data={localBusinessSchema} />
      <div className="bg-[#FAF8F4] text-[#1C1917]">
      <section className="relative overflow-hidden bg-[#0C1E3C] px-6 pt-24 text-white md:pt-28">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#1C1917_0%,#0369A1_64%,#0EA5E9_100%)]" />
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.09)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.09)_1px,transparent_1px)] [background-size:44px_44px]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 pb-20 lg:grid-cols-[1fr_400px] lg:items-center">
          <div>
            <p className="section-label section-label-on-hero">
              Southeast Texas Service Area
            </p>
            <h1 className="max-w-4xl text-white">{city.h1}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/75">
              {city.intro}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href={quoteHref} className="btn-amber justify-center">
                Request a Quote <ArrowRight size={16} />
              </Link>
              <Link href={visibilityHref} className="btn-ghost justify-center">
                Free Visibility Check
              </Link>
            </div>
          </div>

          <div className="hidden lg:flex items-center justify-center">
            <CityVisual city={city} />
          </div>
        </div>
      </section>

      <section className="section-base">
        <div className="container-px grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="mb-6 flex items-center gap-3 text-[#0369A1]">
              <MapPin size={22} />
              <span className="font-bold">Serving {city.name} and the Southeast Texas area</span>
            </div>
            <h2 className="mb-4 text-[#1C1917]">Services for {city.name} Businesses</h2>
            <p className="leading-8 text-slate-600">
              Pixel &amp; Panel helps local businesses connect the pieces customers see
              in person with the places they search online. That includes signs,
              print materials, websites, local SEO, Google Business Profile work,
              QR code campaigns, and lead capture paths.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:p-7">
            <h2 className="mb-5 text-[#1C1917]">How We Can Help</h2>
            <ul className="grid gap-4 text-slate-600">
              {city.services.map((service) => (
                <li key={service} className="flex gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#F59E0B]" />
                  <span>{service}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16 md:py-24" aria-labelledby="popular-signage-heading">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="section-label text-[#0369A1]">Popular Signage Services</p>
              <h2 id="popular-signage-heading" className="text-[#1C1917]">Physical visibility for {city.name}</h2>
            </div>
            <Link href="/signage" className="btn-outline">
              Browse Signage
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {featured.signage.map((link) => (
              <ServiceCard key={link.href} link={link} icon={PanelTop} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-base" aria-labelledby="popular-digital-heading">
        <div className="container-px">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="section-label text-[#0369A1]">Popular Digital Services</p>
              <h2 id="popular-digital-heading" className="text-[#1C1917]">Help nearby customers find and contact you</h2>
            </div>
            <Link href="/digital" className="btn-outline">
              Explore Digital
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {featured.digital.map((link) => (
              <ServiceCard key={link.href} link={link} icon={Globe2} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16 md:py-24" aria-labelledby="city-services-heading">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <p className="section-label text-[#0369A1]">All Services in {city.name}</p>
            <h2 id="city-services-heading" className="text-[#1C1917]">Explore services specific to {city.name}, TX</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {cityServiceEntries.map(([serviceSlug, service]) => (
              <Link
                key={serviceSlug}
                href={`/service-area/${slug}/${serviceSlug}`}
                className="group rounded-xl border border-slate-200 bg-[#FAF8F4] p-4 hover:border-[#F59E0B] hover:bg-white transition-colors"
              >
                <span className="text-xs font-bold uppercase tracking-widest text-[#0369A1]">
                  {service.type === 'signage' ? 'Signage' : 'Digital'}
                </span>
                <p className="mt-1 font-bold text-[#1C1917] group-hover:text-[#0369A1] transition-colors">
                  {service.name} in {city.name}
                </p>
                <p className="mt-1 text-sm text-slate-500">Learn more →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16 md:py-24" aria-labelledby="why-city-heading">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="section-label text-[#0369A1]">Why Local Businesses Choose Pixel &amp; Panel</p>
            <h2 id="why-city-heading" className="text-[#1C1917]">Online and real-world visibility working together.</h2>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {reasons.map((reason, index) => {
              const Icon = [Store, Search, BadgeCheck][index] || BadgeCheck;
              return (
                <article key={reason} className="rounded-xl border border-slate-200 bg-[#FAF8F4] p-6">
                  <Icon className="mb-5 h-7 w-7 text-[#F59E0B]" />
                  <p className="leading-7 text-slate-700">{reason}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {city.crossMarket && (
        <section className="px-6 pb-4" aria-label="Other service areas">
          <div className="mx-auto max-w-4xl rounded-xl border border-slate-200 bg-white p-5 text-center shadow-sm">
            <p className="text-slate-600">
              {city.crossMarket.text}{" "}
              <Link href={city.crossMarket.href} className="font-bold text-[#0369A1] hover:underline">
                {city.crossMarket.label}
              </Link>
            </p>
          </div>
        </section>
      )}

      <section className="section-base" aria-labelledby="city-faq-heading">
        <div className="container-px">
          <div className="mx-auto max-w-4xl">
            <div className="mb-10 text-center">
              <p className="section-label text-[#0369A1]">FAQ</p>
              <h2 id="city-faq-heading" className="text-[#1C1917]">{city.name} Service Area Questions</h2>
            </div>
            <div className="grid gap-4">
              {faqs.map(([question, answer]) => (
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
              <p className="section-label" style={{ color: "#F59E0B" }}>{city.name} Visibility</p>
              <h2 className="text-white">Ready to make your business easier to find?</h2>
              <p className="mt-4 max-w-2xl text-white/72">
                Start with a quote when you know what you need, or use the Free Visibility Check if you want Pixel &amp; Panel to review the gaps first.
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

function ServiceCard({ link, icon: Icon }) {
  return (
    <Link
      href={link.href}
      className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-[#F59E0B]/50 hover:shadow-lg"
    >
      <div className="mb-5 flex items-center justify-between gap-3">
        <Icon className="h-5 w-5 text-[#F59E0B]" />
        <ArrowRight className="h-4 w-4 text-slate-300 transition group-hover:translate-x-1 group-hover:text-[#F59E0B]" />
      </div>
      <h3 className="mb-2 text-[#1C1917]">{link.label}</h3>
      <p className="text-sm leading-6 text-slate-600">{link.description}</p>
    </Link>
  );
}
