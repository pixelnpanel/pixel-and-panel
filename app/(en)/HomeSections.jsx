import Link from "next/link";
import ReviewsBand from "@/components/sections/ReviewsBand";
import SignageCategoryTeaser from "@/components/sections/SignageCategoryTeaser";
import { reviews } from "@/lib/reviews";
import { attachReviewImages } from "@/lib/review-images";
import { SIGNAGE_LABEL, SIGNAGE_PATH } from "@/lib/sign-catalog";
import {
  ArrowRight,
  Car,
  CheckCircle2,
  HelpCircle,
  MapPin,
  Megaphone,
  MonitorSmartphone,
  PanelTop,
  Search,
} from "lucide-react";

const HOMEPAGE_REVIEW_CHIPS = [
  "Independently owned & operated",
  "5.0 rated on Google",
  "Signage + digital under one roof",
  "Ships nationwide",
];

const serviceSilos = [
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
  {
    eyebrow: "Also Available",
    title: "Want more than a sign? Get found online, too.",
    description:
      "Once your signage gets you noticed, we can build the website, local SEO, Google Business Profile, and QR campaigns that turn attention into calls.",
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
    title: "Metal & Rigid Signs",
    description: "Aluminum, acrylic, and coroplast signs for indoor and outdoor branding.",
    href: "/signage/rigid-and-metal-signs",
    icon: PanelTop,
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
];

// Homepage → city hub links. This is the strongest internal link the Houston
// hub gets, and it does the same job for the three Southeast Texas cities.
const SERVICE_AREA_ITEMS = [
  {
    title: "Beaumont, TX",
    description: "Storefront signs, banners, vehicle graphics, and print for Beaumont businesses.",
    href: "/service-area/beaumont-tx",
    icon: MapPin,
  },
  {
    title: "Houston, TX",
    description: "Banners, yard signs, event banners, and real estate signs across Greater Houston.",
    href: "/houston",
    icon: MapPin,
  },
  {
    title: "Port Arthur, TX",
    description: "Custom signs and print for Port Arthur shops, contractors, and service companies.",
    href: "/service-area/port-arthur-tx",
    icon: MapPin,
  },
  {
    title: "Nederland, TX",
    description: "Business cards, signs, and print for Nederland's local businesses.",
    href: "/service-area/nederland-tx",
    icon: MapPin,
  },
];

export const defaultHomeSectionsContent = {
  visibilityCta: {
    description:
      "Not sure where the gap is yet? Start with a free Google visibility review before asking for a project quote.",
    href: "/free-visibility-check",
    label: "Check My Google Visibility",
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
      "Compare signs, print, and digital services to find the right fit for your business, budget, and next project.",
  },
  serviceAreas: {
    eyebrow: "Where We Work",
    title: "Southeast Texas and Greater Houston",
    description:
      "Each city page covers what local businesses there order most, what it costs, and how long it takes.",
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

export default function HomeSections({ faqs, content = {}, categories = [] }) {
  const homeReviews = attachReviewImages(reviews.slice(0, 3));
  const sections = {
    visibilityCta: { ...defaultHomeSectionsContent.visibilityCta, ...content.visibilityCta },
    services: { ...defaultHomeSectionsContent.services, ...content.services },
    popularServices: { ...defaultHomeSectionsContent.popularServices, ...content.popularServices },
    serviceAreas: { ...defaultHomeSectionsContent.serviceAreas, ...content.serviceAreas },
    faq: { ...defaultHomeSectionsContent.faq, ...content.faq },
    finalCta: { ...defaultHomeSectionsContent.finalCta, ...content.finalCta },
  };
  const serviceItems = content.serviceSilos || serviceSilos;
  const popularItems = content.popularServicesCards || popularServices;

  return (
    <>
      <ReviewsBand variant="strip" heading="Trusted by Southeast Texas businesses" />

      <SignageCategoryTeaser categories={categories} />

      <section className="section-base bg-white" aria-labelledby="services-heading">
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
          <nav className="mt-8 flex flex-wrap justify-center gap-3" aria-label={sections.popularServices.eyebrow}>
            {popularItems.map((item) => (
              <Link key={item.href} href={item.href} className="inline-flex min-h-11 items-center rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-[#0369A1] transition hover:border-[#0369A1] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0369A1]">
                {item.title}
              </Link>
            ))}
          </nav>

          <div className="mt-10 text-center">
            <p className="mx-auto max-w-2xl text-sm leading-7 text-slate-600">
              {sections.visibilityCta.description}
            </p>
            <Link href={sections.visibilityCta.href} className="mt-4 inline-flex items-center gap-2 font-heading text-sm font-bold uppercase tracking-[0.12em] text-[#0369A1] transition hover:text-[#F59E0B]">
              {sections.visibilityCta.label} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <ReviewsBand
        heading="What Our Clients Say"
        reviews={homeReviews}
        chips={HOMEPAGE_REVIEW_CHIPS}
      />

      <section className="section-base bg-white" aria-labelledby="service-areas-heading">
        <div className="container-px">
          <SectionIntro
            id="service-areas-heading"
            eyebrow={sections.serviceAreas.eyebrow}
            title={sections.serviceAreas.title}
            description={sections.serviceAreas.description}
          />

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICE_AREA_ITEMS.map((item) => (
              <LinkCard key={item.href} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-base bg-white" aria-labelledby="faq-heading">
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
