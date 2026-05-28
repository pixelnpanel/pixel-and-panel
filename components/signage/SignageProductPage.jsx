import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Globe2,
  Home,
  Image as ImageIcon,
  Info,
  Layers,
  MapPin,
  Package,
  QrCode,
  Ruler,
  Search,
  Sparkles,
} from "lucide-react";
import { getRelatedSignageProducts, serviceAreaPhrase } from "@/lib/signage-products";
import { cityServiceServices, cityServiceCities } from "@/lib/city-service-pages";

const bestForBySlug = {
  "vinyl-banners": ["Grand openings and seasonal offers", "Fence lines and job sites", "Events, schools, and churches"],
  "yard-signs": ["Contractor job sites", "Neighborhood promotions", "Directional and event signage"],
  "real-estate-signs": ["Residential listings", "Commercial properties", "Open house directions"],
  "vehicle-graphics": ["Service businesses with trucks and vans", "Commercial lettering and partial wraps", "Fleet graphics with consistent local branding"],
  "car-magnets": ["Part-time business vehicles", "Temporary vehicle branding", "Delivery and service teams"],
  "window-graphics": ["Storefronts and offices", "Hours and service information", "Seasonal window promotions"],
  "storefront-signs": ["Retail shops and restaurants", "Offices and commercial spaces", "Businesses that need stronger street visibility"],
  "metal-signs": ["Outdoor property signs", "Parking and directional signs", "Long-term business identification"],
  "coroplast-signs": ["Temporary outdoor campaigns", "Event directions", "Short-term local promotions"],
  "a-frame-signs": ["Walk-in traffic", "Restaurants and retail shops", "Event entrances and pickup areas"],
  "business-cards": ["Local networking", "Referral handoffs", "Appointments and follow-up"],
  flyers: ["Local offers", "Event promotion", "Service handouts"],
  posters: ["Events and announcements", "Retail displays", "Menus and venue information"],
  menus: ["Restaurants and cafes", "Food trucks and catering", "Events with food service"],
  "mesh-banners": ["Job sites and construction fences", "Outdoor events with high wind exposure", "Stadium and open-air venue signage"],
  "backlit-banners": ["Retail and restaurant light box frames", "Trade show backlit display systems", "Illuminated menu boards and lobby displays"],
  "fabric-banners": ["Trade show backdrops and display walls", "Indoor retail and event spaces", "Photography studios and stage backdrops"],
  "retractable-banners": ["Trade show booths and conferences", "Lobby and reception area displays", "Pop-up retail and event promotions"],
  "step-and-repeat-backdrops": ["Corporate events and award ceremonies", "Grand openings and ribbon cuttings", "Photo opportunities at galas and fundraisers"],
  "table-covers": ["Trade show booths and expos", "Corporate meetings and sponsored events", "Outdoor markets and vendor tables"],
  "event-tents": ["Outdoor festivals and community events", "Branded vendor and sponsor setups", "Food service and pop-up retail"],
  "vehicle-lettering": ["Service vehicles and work trucks", "Fleet vehicles with consistent branding", "Small business vans and cars on a budget"],
  "partial-vehicle-wraps": ["Contractors and tradespeople", "Delivery and service fleet branding", "Businesses upgrading from lettering to full graphics"],
  "perforated-window-graphics": ["Storefronts with visibility privacy balance", "Auto dealerships and showroom windows", "Retail windows with promotional messaging"],
  "frosted-privacy-film": ["Office glass partitions and conference rooms", "Spa, salon, and medical office windows", "Storefronts that need branding with privacy"],
  "acrylic-signs": ["Lobbies and reception desks", "Office suites and professional suites", "Retail interior branding and wayfinding"],
  brochures: ["Sales appointments and take-home packets", "Service menus and multi-offering explainers", "Local businesses that need polished print materials"],
  postcards: ["Direct mail campaigns to targeted neighborhoods", "Grand openings, seasonal offers, and reminders", "Campaigns that pair print with QR tracking"],
};

const digitalSupportLinks = [
  {
    label: "Website Design",
    href: "/digital/web-development",
    description: "Send sign, print, and vehicle traffic to a fast page that explains your services and captures quote requests.",
    icon: Globe2,
  },
  {
    label: "Local SEO",
    href: "/digital/local-seo",
    description: "Make sure customers who notice your brand offline can also find your business when they search nearby.",
    icon: Search,
  },
  {
    label: "QR Code Campaigns",
    href: "/digital/qr-code-campaigns",
    description: "Connect flyers, banners, windows, and vehicle graphics to trackable menus, offers, forms, or landing pages.",
    icon: QrCode,
  },
];

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
  const visibilityHref = "/free-visibility-check";
  const related = getRelatedSignageProducts(product);
  const bestFor = bestForBySlug[product.slug] || product.uses.slice(0, 3);

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.pixelnpanel.com" },
      { "@type": "ListItem", position: 2, name: "Signage & Print", item: "https://www.pixelnpanel.com/signage" },
      { "@type": "ListItem", position: 3, name: product.name, item: `https://www.pixelnpanel.com/signage/${product.slug}` },
    ],
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: product.faqs.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };

  const service = {
    "@context": "https://schema.org",
    "@type": ["Service", "Product"],
    name: product.name,
    description: product.description,
    url: `https://www.pixelnpanel.com/signage/${product.slug}`,
    image: `https://www.pixelnpanel.com${product.image}`,
    serviceType: product.category,
    category: product.category,
    areaServed: [
      { "@type": "City", name: "Beaumont", containedInPlace: { "@type": "State", name: "Texas" } },
      { "@type": "City", name: "Nederland", containedInPlace: { "@type": "State", name: "Texas" } },
      { "@type": "City", name: "Port Arthur", containedInPlace: { "@type": "State", name: "Texas" } },
    ],
    provider: {
      "@type": "LocalBusiness",
      name: "Pixel & Panel",
      url: "https://www.pixelnpanel.com",
      telephone: "(409) 225-2012",
      email: "hello@pixelnpanel.com",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: "0",
      priceSpecification: {
        "@type": "PriceSpecification",
        description: "Custom quote based on size, material, and quantity",
      },
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "LocalBusiness",
        name: "Pixel & Panel",
        url: "https://www.pixelnpanel.com",
      },
      url: `https://www.pixelnpanel.com/quote-request?product=${encodeURIComponent(product.name)}&category=${encodeURIComponent(product.category)}`,
    },
  };

  return (
    <>
      <JsonLd data={breadcrumbs} />
      <JsonLd data={faq} />
      <JsonLd data={service} />

      <div className="bg-[#FAF8F4] text-[#1C1917]">
        {/* ── HERO ─────────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-[#0C1E3C] px-6 pt-24 text-white md:pt-28">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,#1C1917_0%,#0369A1_62%,#0EA5E9_100%)]" />
          <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.09)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.09)_1px,transparent_1px)] [background-size:44px_44px]" />
          <div className="relative mx-auto max-w-7xl pb-18 md:pb-24">
            <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-white/65" aria-label="Breadcrumb">
              <Link href="/" className="transition hover:text-white">Home</Link>
              <span aria-hidden="true">/</span>
              <Link href="/signage" className="transition hover:text-white">Signage &amp; Print</Link>
              <span aria-hidden="true">/</span>
              <span className="text-white">{product.name}</span>
            </nav>

            <div className="grid gap-10 lg:grid-cols-[1fr_460px] lg:items-center">
              <div>
                <p className="section-label" style={{ color: "#F59E0B" }}>Southeast Texas Signage</p>
                <h1 className="max-w-4xl text-white">{product.h1}</h1>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-white/75">{product.intro}</p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Link href={quoteHref} className="btn-amber justify-center">
                    Request Quote <ArrowRight size={16} />
                  </Link>
                  <Link href={visibilityHref} className="btn-ghost justify-center">
                    Free Visibility Check
                  </Link>
                </div>
                <div className="mt-8 grid gap-3 text-sm text-white/72 sm:grid-cols-3">
                  {["Readable from the right distance", "Designed around one clear next step", serviceAreaPhrase.replace("Serving ", "")].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-[#F59E0B]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="absolute -inset-4 rounded-2xl bg-[#0EA5E9]/18 blur-2xl" />
                <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/10 p-3 shadow-2xl">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-slate-900">
                    <Image
                      src={product.image}
                      alt={product.imageAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 460px"
                      className="object-cover"
                      priority
                    />
                  </div>
                  <div className="mt-3 rounded-lg bg-white/10 p-4">
                    <p className="font-heading text-xs font-bold uppercase tracking-[0.14em] text-[#F59E0B]">
                      Best first question
                    </p>
                    <p className="mt-2 text-sm leading-6 text-white/72">
                      Where will people see this, and what should they do next?
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── BEST FOR + COMMON USES ───────────────────────────── */}
        <section className="section-base">
          <div className="container-px">
            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
              <section aria-labelledby="best-for-heading" className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                <p className="section-label text-[#0369A1]">Best For</p>
                <h2 id="best-for-heading" className="text-[#1C1917]">When {product.name.toLowerCase()} make sense</h2>
                <div className="mt-6 grid gap-3">
                  {bestFor.map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-lg bg-[#FAF8F4] p-4">
                      <Sparkles className="mt-1 h-5 w-5 shrink-0 text-[#F59E0B]" />
                      <span className="text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section aria-labelledby="common-uses-heading" className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                <p className="section-label text-[#0369A1]">Common Uses</p>
                <h2 id="common-uses-heading" className="text-[#1C1917]">Practical ways local businesses use them</h2>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {product.uses.map((use) => (
                    <div key={use} className="flex items-start gap-3 rounded-lg border border-slate-100 bg-[#FAF8F4] p-4">
                      <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#0369A1]" />
                      <span className="text-slate-700">{use}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* ── SPECS & OPTIONS ───────────────────────────────── */}
            <section aria-labelledby="options-heading" className="mt-10 rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
                <div>
                  <p className="section-label text-[#0369A1]">Specs &amp; Options</p>
                  <h2 id="options-heading" className="text-[#1C1917]">What to know before you order.</h2>
                  <p className="mt-5 leading-8 text-slate-600">{product.guidance}</p>

                  <div className={`mt-6 grid gap-3 ${product.minOrder ? "grid-cols-2" : "grid-cols-1"}`}>
                    <div className="rounded-lg bg-[#FAF8F4] p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <Clock className="h-4 w-4 text-[#0369A1]" />
                        <span className="text-xs font-bold uppercase tracking-wide text-[#0369A1]">Turnaround</span>
                      </div>
                      <p className="text-sm font-semibold text-[#1C1917]">{product.turnaround}</p>
                    </div>
                    {product.minOrder && (
                      <div className="rounded-lg bg-[#FAF8F4] p-4">
                        <div className="mb-2 flex items-center gap-2">
                          <Package className="h-4 w-4 text-[#0369A1]" />
                          <span className="text-xs font-bold uppercase tracking-wide text-[#0369A1]">Min Order</span>
                        </div>
                        <p className="text-sm font-semibold text-[#1C1917]">{product.minOrder}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <article className="rounded-lg bg-[#FAF8F4] p-5">
                    <Layers className="mb-3 h-5 w-5 text-[#F59E0B]" />
                    <h3 className="text-base text-[#1C1917]">Materials</h3>
                    <ul className="mt-3 space-y-2">
                      {product.materials.map((m) => (
                        <li key={m} className="flex items-start gap-2 text-sm text-slate-600">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#0369A1]" />
                          {m}
                        </li>
                      ))}
                    </ul>
                  </article>

                  <article className="rounded-lg bg-[#FAF8F4] p-5">
                    <Ruler className="mb-3 h-5 w-5 text-[#F59E0B]" />
                    <h3 className="text-base text-[#1C1917]">Common Sizes</h3>
                    <ul className="mt-3 space-y-2">
                      {product.sizes.map((s) => (
                        <li key={s} className="flex items-start gap-2 text-sm text-slate-600">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#0369A1]" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </article>

                  {product.finishing && (
                    <article className="rounded-lg bg-[#FAF8F4] p-5 sm:col-span-2">
                      <ImageIcon className="mb-3 h-5 w-5 text-[#F59E0B]" />
                      <h3 className="text-base text-[#1C1917]">Finishing Options</h3>
                      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                        {product.finishing.map((f) => (
                          <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#0369A1]" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </article>
                  )}
                </div>
              </div>
            </section>
          </div>
        </section>

        {/* ── HOW IT WORKS ─────────────────────────────────────── */}
        <section className="bg-white px-6 py-16 md:py-24" aria-labelledby="process-heading">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="section-label text-[#0369A1]">How It Works</p>
              <h2 id="process-heading" className="text-[#1C1917]">A simple path from idea to quote.</h2>
              <p className="mt-5 leading-8 text-slate-600">
                Pixel &amp; Panel keeps sign projects focused on what customers need to notice, understand, and do next.
              </p>
            </div>
            <div className="mt-12 grid gap-4 md:grid-cols-4">
              {[
                ["Share the context", "Tell us where the piece will be used, the size or quantity you have in mind, and your timing."],
                ["Clarify the message", "We help simplify the copy so the design can be read quickly and confidently."],
                ["Plan the format", "Material, size, finish, and QR placement are matched to the use case."],
                ["Request the quote", "You get a practical next step based on the project details you provide."],
              ].map(([title, copy], index) => (
                <article key={title} className="rounded-xl border border-slate-200 bg-[#FAF8F4] p-5">
                  <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-[#0369A1] font-heading text-sm font-black text-white">
                    0{index + 1}
                  </span>
                  <h3 className="text-lg text-[#1C1917]">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── PHYGITAL INTERNAL LINKS ──────────────────────────── */}
        <section className="section-base" aria-labelledby="phygital-heading">
          <div className="container-px">
            <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
              <div>
                <p className="section-label text-[#0369A1]">Connect Physical to Digital</p>
                <h2 id="phygital-heading" className="text-[#1C1917]">Make {product.name.toLowerCase()} easier to act on.</h2>
                <p className="mt-5 leading-8 text-slate-600">
                  A sign, printed piece, or vehicle graphic gets attention in the real world. The next step is making sure customers can find you online, understand the offer, and contact you without friction.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {digitalSupportLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link key={item.href} href={item.href} className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-[#F59E0B]/50 hover:shadow-lg">
                      <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-[#FAF8F4] text-[#0369A1] transition group-hover:bg-[#F59E0B] group-hover:text-[#1C1917]">
                        <Icon className="h-5 w-5" />
                      </span>
                      <h3 className="text-base text-[#1C1917]">{item.label}</h3>
                      <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
                      <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#0369A1] transition group-hover:text-[#F59E0B]">
                        Learn more <ArrowRight className="h-4 w-4" />
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ── NOT A FIT CALLOUT ────────────────────────────────── */}
        {product.notAFitWhen && (
          <div className="container-px pb-10">
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
              <div className="flex gap-3">
                <Info className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
                <div>
                  <p className="font-heading text-sm font-bold text-amber-900">Good to know before ordering</p>
                  <p className="mt-1 text-sm leading-7 text-amber-800">{product.notAFitWhen}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── RELATED PRODUCTS ─────────────────────────────────── */}
        <section className="section-base">
          <div className="container-px">
            <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="section-label text-[#0369A1]">Related Signage Products</p>
                <h2 className="text-[#1C1917]">Other ways to support the same campaign</h2>
              </div>
              <Link href="/signage" className="btn-outline">
                Browse Signage &amp; Print
              </Link>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {related.map((item) => (
                <Link key={item.slug} href={`/signage/${item.slug}`} className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-[#F59E0B]/50 hover:shadow-lg">
                  <div className="mb-5 flex items-center justify-between gap-3">
                    <Home className="h-5 w-5 text-[#F59E0B]" />
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
        {cityServiceServices[product.slug] && (
          <section className="bg-[#FAF8F4] px-6 py-14 md:py-16">
            <div className="mx-auto max-w-7xl">
              <p className="section-label text-[#0369A1]">Service Area</p>
              <h2 className="mb-6 text-[#1C1917]">{product.name} by City</h2>
              <div className="grid gap-3 sm:grid-cols-3">
                {Object.values(cityServiceCities).map((city) => (
                  <Link
                    key={city.slug}
                    href={`/service-area/${city.slug}/${product.slug}`}
                    className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:border-[#F59E0B] transition-colors"
                  >
                    <p className="font-bold text-[#1C1917] group-hover:text-[#0369A1] transition-colors">
                      {product.name} in {city.name}, TX
                    </p>
                    <p className="mt-1 text-sm text-slate-500">City-specific guide →</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── FAQ ──────────────────────────────────────────────── */}
        <section className="bg-white px-6 py-16 md:py-24">
          <div className="mx-auto max-w-4xl">
            <div className="mb-10 text-center">
              <p className="section-label text-[#0369A1]">FAQ</p>
              <h2 className="text-[#1C1917]">Questions About {product.name}</h2>
            </div>
            <div className="grid gap-4">
              {product.faqs.map(([question, answer]) => (
                <article key={question} className="rounded-xl border border-slate-200 bg-[#FAF8F4] p-5">
                  <h3 className="mb-2 text-xl text-[#1C1917]">{question}</h3>
                  <p className="text-slate-600">{answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────── */}
        <section className="px-6 py-14 md:py-20">
          <div className="mx-auto max-w-6xl overflow-hidden rounded-xl bg-[#0C1E3C] p-8 text-white shadow-2xl md:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="mb-4 flex items-center gap-3 text-[#F59E0B]">
                  <MapPin className="h-5 w-5" />
                  <span className="font-heading text-xs font-bold uppercase tracking-[0.14em]">Southeast Texas</span>
                </div>
                <h2 className="text-white">Ready to price your {product.name.toLowerCase()}?</h2>
                <p className="mt-4 max-w-2xl text-white/70">
                  Tell us what you need, where it will be used, and your timeline.
                  Pixel &amp; Panel will reply with the next best step.
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
