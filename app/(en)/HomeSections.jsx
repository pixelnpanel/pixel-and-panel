import Link from "next/link";
import { SIGNAGE_LABEL, SIGNAGE_PATH } from "@/lib/sign-catalog";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Car,
  CheckCircle2,
  ClipboardList,
  CreditCard,
  FileText,
  Globe2,
  HelpCircle,
  MapPin,
  Megaphone,
  MonitorSmartphone,
  PanelTop,
  QrCode,
  Search,
  ShieldCheck,
  Store,
} from "lucide-react";

const problemCards = [
  {
    title: "Outdated website",
    description:
      "Customers check you online before they call. A slow or confusing website can make a good local business look hard to trust.",
    icon: MonitorSmartphone,
  },
  {
    title: "Weak Google presence",
    description:
      "If nearby customers cannot find your services, hours, location, and contact options on Google Maps, they move on fast.",
    icon: Search,
  },
  {
    title: "Signs with no clear next step",
    description:
      "A great sign gets noticed. A short URL, QR code, or clear call path gives customers an easy next step.",
    icon: QrCode,
  },
];

const solutionSteps = [
  {
    title: "Build",
    description:
      "Build a secure website and optimized Google Profile that clearly explain your services, hours, and service area.",
    icon: Globe2,
  },
  {
    title: "Promote",
    description:
      "Promote your brand with storefront signs, roadside yard signs, vehicle lettering, banners, and print materials.",
    icon: Megaphone,
  },
  {
    title: "Connect",
    description:
      "Connect print and signs with QR code campaigns, short links, and clear forms so customers can request a quote fast.",
    icon: QrCode,
  },
];

const serviceSilos = [
  {
    eyebrow: "Digital Services",
    title: "Show up when nearby customers search on Google.",
    description:
      "Website design, local SEO, Google Business Profile optimization, lead capture, and QR campaigns for local business owners.",
    href: "/digital",
    cta: "View Digital Services",
    accent: "#0EA5E9",
    icon: MonitorSmartphone,
    items: [
      "Pages that turn visitors into calls and quote requests",
      "Google-ready service and location content",
      "QR codes that send customers from your signs to your website",
    ],
  },
  {
    eyebrow: "Signage & Print",
    title: "Get noticed in the real world.",
    description:
      "Custom signs, banners, yard signs, truck lettering, storefront signs, business cards, flyers, menus, and more.",
    href: SIGNAGE_PATH,
    cta: SIGNAGE_LABEL,
    accent: "#F59E0B",
    icon: PanelTop,
    items: [
      "Business signs that are easy to read",
      "Print materials for handoffs, events, and walk-ins",
      "Designs that give customers a clear next step online or by phone",
    ],
  },
];

const popularServices = [
  {
    title: "Vinyl Banners",
    description: "Durable banners for storefronts, events, job sites, and promotions.",
    href: "/signage/banners",
    icon: Megaphone,
  },
  {
    title: "Yard Signs",
    description: "Roadside and lawn signs for contractors, events, real estate, and local offers.",
    href: "/signage/rigid-and-metal-signs/coroplast-yard-signs",
    icon: MapPin,
  },
  {
    title: "Car & Vehicle Magnets",
    description: "Removable magnetic signs that turn work trucks and vans into moving ads.",
    href: "/signage/rigid-and-metal-signs/car-and-vehicle-magnets",
    icon: Car,
  },
  {
    title: "Banner Stands",
    description: "Retractable stands and backdrops for trade shows, lobbies, and events.",
    href: "/signage/banner-stands",
    icon: Store,
  },
  {
    title: "Feather Flags",
    description: "Tall, eye-catching flags that pull drive-by traffic into your business.",
    href: "/signage/flags",
    icon: CreditCard,
  },
  {
    title: "Metal & Rigid Signs",
    description: "Aluminum, acrylic, and coroplast signs for indoor and outdoor branding.",
    href: "/signage/rigid-and-metal-signs",
    icon: PanelTop,
  },
  {
    title: "A-Frame Sidewalk Signs",
    description: "Sturdy sidewalk signs that put your offer in front of foot traffic.",
    href: "/signage/sidewalk-a-frame-signs",
    icon: FileText,
  },
  {
    title: "Website Development",
    description: "Fast, mobile-first websites built around calls, quote requests, and trust.",
    href: "/digital/web-development",
    icon: MonitorSmartphone,
  },
  {
    title: "Get Found on Google",
    description: "Help nearby customers find you when they search for what you offer in your area.",
    href: "/digital/local-seo",
    icon: Search,
  },
  {
    title: "Google Business Profile",
    description: "Improve the listing many customers see before they call, visit, or request a quote.",
    href: "/digital/google-business-profile",
    icon: BadgeCheck,
  },
];

const cityCards = [
  {
    city: "Beaumont",
    href: "/service-area/beaumont-tx",
    description:
      "Website, local SEO, sign, and print support for Beaumont shops, contractors, service teams, and organizations.",
  },
  {
    city: "Nederland",
    href: "/service-area/nederland-tx",
    description:
      "Practical visibility tools for Nederland businesses, from business cards and banners to websites and print materials.",
  },
  {
    city: "Port Arthur",
    href: "/service-area/port-arthur-tx",
    description:
      "Website, signage, and print support for Port Arthur businesses that want more calls and customers.",
  },
];

const reasons = [
  {
    title: "Your website, signs, and print all working together",
    description:
      "Your website, signs, and print materials should all point customers toward the same clear next step.",
    icon: Building2,
  },
  {
    title: "Built for local business owners",
    description:
      "The work is shaped for contractors, shops, restaurants, churches, schools, clinics, and service-area teams.",
    icon: Store,
  },
  {
    title: "Plain-English process",
    description:
      "You get direct recommendations, useful options, and simple explanations without confusing technical language.",
    icon: ClipboardList,
  },
  {
    title: "Quote-first, no pressure",
    description:
      "Start with what you need. Pixel & Panel will recommend the right next step before any project moves forward.",
    icon: ShieldCheck,
  },
];

const portfolioItems = [
  ["Website work", MonitorSmartphone],
  ["Signage examples", PanelTop],
  ["Print materials", FileText],
];

export const defaultHomeSectionsContent = {
  problem: {
    eyebrow: "The Problem",
    title: "Your competitors are showing up. Are you?",
    description:
      "Customers move fast between Google, your website, your street signs, and your contact options. If those pieces do not work together, hot local leads go to a competitor.",
  },
  problemCta: {
    description:
      "Not sure where the gap is yet? Start with a free Google visibility review before asking for a project quote.",
    href: "/free-visibility-check",
    label: "Check My Google Visibility",
  },
  solution: {
    eyebrow: "The Solution",
    title: "One system for online and real-world visibility.",
    description:
      "Pixel & Panel connects the pieces local businesses already need: a clear website, a stronger Google presence, professional signs, useful print materials, QR codes, and lead forms.",
  },
  services: {
    eyebrow: "Services",
    title: "Choose what you need now or request a complete project quote",
    description:
      "Choose what you need now, or start with a quote request and Pixel & Panel will recommend the right next step.",
  },
  popularServices: {
    eyebrow: "Popular Services",
    title: "Start with the services local businesses ask for most",
    description:
      "Each card links to a real service page with details that help customers and search engines understand what Pixel & Panel offers.",
  },
  serviceArea: {
    eyebrow: "Service Area",
    title: "Serving Southeast Texas Businesses",
    description:
      "Pixel & Panel works with businesses across Southeast Texas, starting with Beaumont, Nederland, Port Arthur, and nearby communities.",
  },
  why: {
    eyebrow: "Why Pixel & Panel",
    title: "Clear enough for customers. Practical enough for local business.",
    description:
      "The goal is simple: make your business easier to notice, easier to understand, and easier to contact.",
  },
  portfolio: {
    eyebrow: "Portfolio",
    title: "Portfolio Coming Together",
    description:
      "Real project photos, signage examples, and website work will be added as projects are completed. For now, tell us what you need and we will guide you with options.",
    href: "/portfolio",
    label: "View Portfolio",
  },
  faq: {
    eyebrow: "FAQ",
    title: "Common homepage questions",
    description: "Quick answers before you request a quote.",
  },
  finalCta: {
    eyebrow: "Start a Project",
    title: "Ready to Make Your Business Easier to Find?",
    description:
      "Start with a quote request. Tell us what you need, and Pixel & Panel will recommend the right next step for your website, sign, print, or Google visibility project.",
    href: "/quote-request",
    label: "Request a Quote",
  },
};

function SectionIntro({ eyebrow, title, description, centered = true, light = false, id }) {
  return (
    <div
      className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}
    >
      {eyebrow && (
        <p
          className="font-heading text-xs font-bold uppercase tracking-[0.16em]"
          style={{ color: light ? "#F59E0B" : "#0369A1" }}
        >
          {eyebrow}
        </p>
      )}
      <h2 id={id} className={eyebrow ? "mt-4" : ""}>
        <span className={light ? "text-white" : "text-[#1C1917]"}>{title}</span>
      </h2>
      {description && (
        <p
          className={light ? "mt-5 text-base leading-8 text-white/72 md:text-lg" : "mt-5 text-base leading-8 text-slate-600 md:text-lg"}
        >
          {description}
        </p>
      )}
    </div>
  );
}

function LinkCard({ item, variant = "light" }) {
  const Icon = item.icon || ArrowRight;
  const isDark = variant === "dark";

  return (
    <div>
      <Link
        href={item.href}
        className={
          isDark
            ? "group block h-full rounded-xl border border-white/10 bg-white/[0.07] p-5 transition duration-200 hover:-translate-y-1 hover:border-[#F59E0B]/45 hover:bg-white/[0.1]"
            : "group block h-full rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-[#0EA5E9]/35 hover:shadow-xl"
        }
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <span className={isDark ? "inline-flex h-11 w-11 items-center justify-center rounded-lg bg-white/10 text-[#F59E0B]" : "inline-flex h-11 w-11 items-center justify-center rounded-lg bg-[#0369A1]/10 text-[#0369A1]"}>
            <Icon className="h-5 w-5" />
          </span>
          <ArrowRight className={isDark ? "h-5 w-5 text-white/35 transition group-hover:translate-x-1 group-hover:text-[#F59E0B]" : "h-5 w-5 text-slate-300 transition group-hover:translate-x-1 group-hover:text-[#0369A1]"} />
        </div>
        <h3 className={isDark ? "text-white" : "text-[#1C1917]"}>{item.title}</h3>
        <p className={isDark ? "mt-3 text-sm leading-7 text-white/65" : "mt-3 text-sm leading-7 text-slate-600"}>
          {item.description}
        </p>
      </Link>
    </div>
  );
}

export default function HomeSections({ faqs, content = {} }) {
  const sections = {
    problem: { ...defaultHomeSectionsContent.problem, ...content.problem },
    problemCta: { ...defaultHomeSectionsContent.problemCta, ...content.problemCta },
    solution: { ...defaultHomeSectionsContent.solution, ...content.solution },
    services: { ...defaultHomeSectionsContent.services, ...content.services },
    popularServices: { ...defaultHomeSectionsContent.popularServices, ...content.popularServices },
    serviceArea: { ...defaultHomeSectionsContent.serviceArea, ...content.serviceArea },
    why: { ...defaultHomeSectionsContent.why, ...content.why },
    portfolio: { ...defaultHomeSectionsContent.portfolio, ...content.portfolio },
    faq: { ...defaultHomeSectionsContent.faq, ...content.faq },
    finalCta: { ...defaultHomeSectionsContent.finalCta, ...content.finalCta },
  };
  const problemItems = content.problemCards || problemCards;
  const solutionItems = content.solutionSteps || solutionSteps;
  const serviceItems = content.serviceSilos || serviceSilos;
  const popularItems = content.popularServicesCards || popularServices;
  const cityItems = content.cityCards || cityCards;
  const reasonItems = content.reasons || reasons;
  const portfolioItemsToRender = content.portfolioItems || portfolioItems;

  return (
    <>
      <section className="section-base" aria-labelledby="problem-heading">
        <div className="container-px">
          <SectionIntro
            id="problem-heading"
            eyebrow={sections.problem.eyebrow}
            title={sections.problem.title}
            description={sections.problem.description}
          />

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {problemItems.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                  <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#0369A1]/10 text-[#0369A1]">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3>{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
                </article>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <p className="mx-auto max-w-2xl text-sm leading-7 text-slate-600">
              {sections.problemCta.description}
            </p>
            <Link href={sections.problemCta.href} className="mt-4 inline-flex items-center gap-2 font-heading text-sm font-bold uppercase tracking-[0.12em] text-[#0369A1] transition hover:text-[#F59E0B]">
              {sections.problemCta.label} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section-base bg-white" aria-labelledby="solution-heading">
        <div className="container-px">
          <SectionIntro
            id="solution-heading"
            eyebrow={sections.solution.eyebrow}
            title={sections.solution.title}
            description={sections.solution.description}
          />

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {solutionItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="rounded-xl border border-slate-200 bg-[#FAF8F4] p-6 shadow-sm">
                  <div className="mb-6 flex items-center justify-between">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#F59E0B] text-[#1C1917]">
                      <Icon className="h-6 w-6" />
                    </span>
                    <span className="font-heading text-4xl font-black text-[#0369A1]/15">0{index + 1}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-base" aria-labelledby="services-heading">
        <div className="container-px">
          <SectionIntro
            id="services-heading"
            eyebrow={sections.services.eyebrow}
            title={sections.services.title}
            description={sections.services.description}
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {serviceItems.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.eyebrow} className="relative overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                  <div className="absolute right-0 top-0 h-28 w-28 rounded-bl-[3rem] opacity-15" style={{ backgroundColor: item.accent }} />
                  <div className="relative">
                    <div className="mb-6 flex items-center gap-4">
                      <span className="inline-flex h-14 w-14 items-center justify-center rounded-lg text-white" style={{ backgroundColor: item.accent }}>
                        <Icon className="h-7 w-7" />
                      </span>
                      <div>
                        <p className="font-heading text-xs font-bold uppercase tracking-[0.16em] text-slate-500">{item.eyebrow}</p>
                        <h3 className="mt-1">{item.title}</h3>
                      </div>
                    </div>
                    <p className="max-w-xl leading-8 text-slate-600">{item.description}</p>
                    <ul className="mt-6 grid gap-3">
                      {item.items.map((listItem) => (
                        <li key={listItem} className="flex gap-3 text-sm leading-6 text-slate-700">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" style={{ color: item.accent }} />
                          {listItem}
                        </li>
                      ))}
                    </ul>
                    <Link href={item.href} className="mt-7 inline-flex items-center gap-2 font-heading text-sm font-bold uppercase tracking-[0.12em] text-[#0369A1] transition hover:text-[#0EA5E9]">
                      {item.cta} <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-base bg-[#1C1917] text-white" aria-labelledby="popular-services-heading">
        <div className="container-px">
          <SectionIntro
            id="popular-services-heading"
            eyebrow={sections.popularServices.eyebrow}
            title={sections.popularServices.title}
            description={sections.popularServices.description}
            light
          />

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {popularItems.map((item) => (
              <LinkCard key={item.href} item={item} variant="dark" />
            ))}
          </div>
        </div>
      </section>

      <section className="section-base bg-white" aria-labelledby="service-area-heading">
        <div className="container-px">
          <SectionIntro
            id="service-area-heading"
            eyebrow={sections.serviceArea.eyebrow}
            title={sections.serviceArea.title}
            description={sections.serviceArea.description}
          />

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {cityItems.map((city) => (
              <div key={city.href}>
                <Link href={city.href} className="group block h-full rounded-xl border border-slate-200 bg-[#FAF8F4] p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-[#F59E0B]/45 hover:shadow-xl">
                  <div className="mb-5 flex items-center justify-between">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#F59E0B]/15 text-[#F59E0B]">
                      <MapPin className="h-6 w-6" />
                    </span>
                    <ArrowRight className="h-5 w-5 text-slate-300 transition group-hover:translate-x-1 group-hover:text-[#F59E0B]" />
                  </div>
                  <h3>{city.label || `${city.city}, TX`}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{city.description}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-base" aria-labelledby="why-heading">
        <div className="container-px">
          <SectionIntro
            id="why-heading"
            eyebrow={sections.why.eyebrow}
            title={sections.why.title}
            description={sections.why.description}
          />

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {reasonItems.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                  <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#0369A1]/10 text-[#0369A1]">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="text-xl">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-base bg-[#0369A1] text-white" aria-labelledby="portfolio-heading">
        <div className="container-px">
          <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <SectionIntro
              id="portfolio-heading"
              eyebrow={sections.portfolio.eyebrow}
              title={sections.portfolio.title}
              description={sections.portfolio.description}
              centered={false}
              light
            />
            <div className="rounded-xl border border-white/10 bg-white/[0.08] p-6 md:p-8">
              <div className="grid gap-4 sm:grid-cols-3">
                {portfolioItemsToRender.map(([label, Icon]) => (
                  <div key={label} className="rounded-lg bg-white/10 p-5 text-center">
                    <Icon className="mx-auto mb-3 h-7 w-7 text-[#F59E0B]" />
                    <p className="font-heading text-sm font-bold uppercase tracking-[0.12em] text-white/75">{label}</p>
                  </div>
                ))}
              </div>
              <Link href={sections.portfolio.href} className="btn-amber mt-7 justify-center">
                {sections.portfolio.label} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-base" aria-labelledby="faq-heading">
        <div className="container-px">
          <SectionIntro
            id="faq-heading"
            eyebrow={sections.faq.eyebrow}
            title={sections.faq.title}
            description={sections.faq.description}
          />

          <div className="mx-auto mt-12 grid max-w-4xl gap-4">
            {faqs.map((faq) => (
              <article key={faq.question} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex gap-4">
                  <HelpCircle className="mt-1 h-5 w-5 shrink-0 text-[#0369A1]" />
                  <div>
                    <h3 className="text-xl">{faq.question}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{faq.answer}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 md:pb-24" aria-labelledby="final-cta-heading">
        <div
          className="mx-auto max-w-6xl overflow-hidden rounded-xl bg-[#1C1917] px-6 py-14 text-center text-white shadow-2xl md:px-12"
        >
          <p className="font-heading text-xs font-bold uppercase tracking-[0.16em] text-[#F59E0B]">
            {sections.finalCta.eyebrow}
          </p>
          <h2 id="final-cta-heading" className="mx-auto mt-4 max-w-3xl text-white">
            {sections.finalCta.title}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/75">
            {sections.finalCta.description}
          </p>
          <div className="mt-8 flex justify-center">
            <Link href={sections.finalCta.href} className="btn-amber">
              {sections.finalCta.label} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
