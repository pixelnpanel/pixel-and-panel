"use client";

import Link from "next/link";
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
import { motion } from "framer-motion";
import { fadeUp, stagger, staggerFast, viewport } from "@/lib/animations";

const problemCards = [
  {
    title: "No website or outdated website",
    description:
      "Customers check you online before they call. A confusing site can make a good business look hard to trust.",
    icon: MonitorSmartphone,
  },
  {
    title: "Weak Google presence",
    description:
      "If nearby customers cannot find clear service, contact, and Google profile information, they move on fast.",
    icon: Search,
  },
  {
    title: "Signs with no clear next step",
    description:
      "A great sign gets you noticed. Adding a simple QR code or contact option gives customers an easy way to reach you.",
    icon: QrCode,
  },
];

const solutionSteps = [
  {
    title: "Build",
    description:
      "Create a professional website and Google presence that explains what you do and makes contact easy.",
    icon: Globe2,
  },
  {
    title: "Promote",
    description:
      "Use signs, banners, vehicle graphics, and print materials to get noticed around town and on job sites.",
    icon: Megaphone,
  },
  {
    title: "Connect",
    description:
      "Add QR codes and simple contact options so customers can easily call, visit, or ask for a quote right from your sign or flyer.",
    icon: QrCode,
  },
];

const serviceSilos = [
  {
    eyebrow: "Digital Services",
    title: "Show up when nearby customers search on Google.",
    description:
      "Websites, local SEO, Google Business Profile, lead capture, and QR campaigns.",
    href: "/digital",
    cta: "View Digital Services",
    accent: "#0EA5E9",
    icon: MonitorSmartphone,
    items: [
      "Pages that turn visitors into calls and quote requests",
      "Google-ready service content",
      "QR codes that send customers from your signs to your website",
    ],
  },
  {
    eyebrow: "Signage & Print",
    title: "Get noticed in the real world.",
    description:
      "Banners, yard signs, vehicle graphics, storefront signs, business cards, flyers, menus, and more.",
    href: "/signage",
    cta: "View Signage & Print",
    accent: "#F59E0B",
    icon: PanelTop,
    items: [
      "Business signs that are easy to read",
      "Print materials for handoffs, events, and walk-ins",
      "Designs that give customers a clear next step",
    ],
  },
];

const popularServices = [
  {
    title: "Vinyl Banners",
    description: "Durable banners for storefronts, events, job sites, and promotions.",
    href: "/signage/vinyl-banners",
    icon: Megaphone,
  },
  {
    title: "Yard Signs",
    description: "Roadside and lawn signs for contractors, events, real estate, and local offers.",
    href: "/signage/yard-signs",
    icon: MapPin,
  },
  {
    title: "Vehicle Graphics",
    description: "Professional decals, lettering, magnets, and fleet graphics for work vehicles.",
    href: "/signage/vehicle-graphics",
    icon: Car,
  },
  {
    title: "Storefront Signs",
    description: "Exterior and interior signs that help customers recognize your location.",
    href: "/signage/storefront-signs",
    icon: Store,
  },
  {
    title: "Business Cards",
    description: "Clean cards for referrals, networking, appointments, and follow-up.",
    href: "/signage/business-cards",
    icon: CreditCard,
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

function SectionIntro({ eyebrow, title, description, centered = true, light = false, id }) {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}
    >
      {eyebrow && (
        <motion.p
          variants={fadeUp}
          className="font-heading text-xs font-bold uppercase tracking-[0.16em]"
          style={{ color: light ? "#F59E0B" : "#0369A1" }}
        >
          {eyebrow}
        </motion.p>
      )}
      <motion.h2 id={id} variants={fadeUp} className={eyebrow ? "mt-4" : ""}>
        <span className={light ? "text-white" : "text-[#1C1917]"}>{title}</span>
      </motion.h2>
      {description && (
        <motion.p
          variants={fadeUp}
          className={light ? "mt-5 text-base leading-8 text-white/72 md:text-lg" : "mt-5 text-base leading-8 text-slate-600 md:text-lg"}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}

function LinkCard({ item, variant = "light" }) {
  const Icon = item.icon || ArrowRight;
  const isDark = variant === "dark";

  return (
    <motion.div variants={fadeUp}>
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
    </motion.div>
  );
}

export default function HomeSections({ faqs }) {
  return (
    <>
      <section className="section-base" aria-labelledby="problem-heading">
        <div className="container-px">
          <SectionIntro
            id="problem-heading"
            eyebrow="The Problem"
            title="Your competitors are getting found. Are you?"
            description="Customers move fast between Google, your website, your signs, and your contact options. Every piece should make the next step obvious."
          />

          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport} className="mt-12 grid gap-5 md:grid-cols-3">
            {problemCards.map((item) => {
              const Icon = item.icon;
              return (
                <motion.article key={item.title} variants={fadeUp} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                  <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#0369A1]/10 text-[#0369A1]">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3>{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
                </motion.article>
              );
            })}
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport} className="mt-10 text-center">
            <p className="mx-auto max-w-2xl text-sm leading-7 text-slate-600">
              Not sure where the gap is yet? Start with a free review before asking for a project quote.
            </p>
            <Link href="/free-visibility-check" className="mt-4 inline-flex items-center gap-2 font-heading text-sm font-bold uppercase tracking-[0.12em] text-[#0369A1] transition hover:text-[#F59E0B]">
              Start a Free Visibility Check <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="section-base bg-white" aria-labelledby="solution-heading">
        <div className="container-px">
          <SectionIntro
            id="solution-heading"
            eyebrow="The Solution"
            title="One system for online and real-world visibility."
            description="Pixel & Panel connects the pieces local businesses already need: a clear website, a stronger Google presence, professional signs, useful print materials, QR codes, and lead forms."
          />

          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport} className="mt-12 grid gap-5 md:grid-cols-3">
            {solutionSteps.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.article key={item.title} variants={fadeUp} className="rounded-xl border border-slate-200 bg-[#FAF8F4] p-6 shadow-sm">
                  <div className="mb-6 flex items-center justify-between">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#F59E0B] text-[#1C1917]">
                      <Icon className="h-6 w-6" />
                    </span>
                    <span className="font-heading text-4xl font-black text-[#0369A1]/15">0{index + 1}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section className="section-base" aria-labelledby="services-heading">
        <div className="container-px">
          <SectionIntro
            id="services-heading"
            eyebrow="Services"
            title="Your website, signs, and print — working together"
            description="Choose what you need now, or start with a quote request and Pixel & Panel will recommend the right next step."
          />

          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport} className="mt-12 grid gap-6 lg:grid-cols-2">
            {serviceSilos.map((item) => {
              const Icon = item.icon;
              return (
                <motion.article key={item.eyebrow} variants={fadeUp} className="relative overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
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
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section className="section-base bg-[#1C1917] text-white" aria-labelledby="popular-services-heading">
        <div className="container-px">
          <SectionIntro
            id="popular-services-heading"
            eyebrow="Popular Services"
            title="Start with the services local businesses ask for most"
            description="Each card links to a real service page with details that help customers and search engines understand what Pixel & Panel offers."
            light
          />

          <motion.div variants={staggerFast} initial="hidden" whileInView="visible" viewport={viewport} className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {popularServices.map((item) => (
              <LinkCard key={item.href} item={item} variant="dark" />
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section-base bg-white" aria-labelledby="service-area-heading">
        <div className="container-px">
          <SectionIntro
            id="service-area-heading"
            eyebrow="Service Area"
            title="Serving Southeast Texas Businesses"
            description="Pixel & Panel works with businesses across Southeast Texas, starting with Beaumont, Nederland, Port Arthur, and nearby communities."
          />

          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport} className="mt-12 grid gap-5 md:grid-cols-3">
            {cityCards.map((city) => (
              <motion.div key={city.href} variants={fadeUp}>
                <Link href={city.href} className="group block h-full rounded-xl border border-slate-200 bg-[#FAF8F4] p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-[#F59E0B]/45 hover:shadow-xl">
                  <div className="mb-5 flex items-center justify-between">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#F59E0B]/15 text-[#F59E0B]">
                      <MapPin className="h-6 w-6" />
                    </span>
                    <ArrowRight className="h-5 w-5 text-slate-300 transition group-hover:translate-x-1 group-hover:text-[#F59E0B]" />
                  </div>
                  <h3>{city.city}, TX</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{city.description}</p>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section-base" aria-labelledby="why-heading">
        <div className="container-px">
          <SectionIntro
            id="why-heading"
            eyebrow="Why Pixel & Panel"
            title="Premium enough to trust, practical enough to use"
            description="The goal is simple: make your business easier to notice, easier to understand, and easier to contact."
          />

          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport} className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((item) => {
              const Icon = item.icon;
              return (
                <motion.article key={item.title} variants={fadeUp} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                  <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#0369A1]/10 text-[#0369A1]">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="text-xl">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section className="section-base bg-[#0369A1] text-white" aria-labelledby="portfolio-heading">
        <div className="container-px">
          <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <SectionIntro
              id="portfolio-heading"
              eyebrow="Portfolio"
              title="Portfolio Coming Together"
              description="Real project photos, signage examples, and website work will be added as projects are completed. For now, tell us what you need and we will guide you with options."
              centered={false}
              light
            />
            <motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={fadeUp} className="rounded-xl border border-white/10 bg-white/[0.08] p-6 md:p-8">
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  ["Website work", MonitorSmartphone],
                  ["Signage examples", PanelTop],
                  ["Print materials", FileText],
                ].map(([label, Icon]) => (
                  <div key={label} className="rounded-lg bg-white/10 p-5 text-center">
                    <Icon className="mx-auto mb-3 h-7 w-7 text-[#F59E0B]" />
                    <p className="font-heading text-sm font-bold uppercase tracking-[0.12em] text-white/75">{label}</p>
                  </div>
                ))}
              </div>
              <Link href="/portfolio" className="btn-amber mt-7 justify-center">
                View Portfolio <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-base bg-white" aria-labelledby="testimonials-heading">
        <div className="container-px">
          <SectionIntro
            id="testimonials-heading"
            eyebrow="What Clients Say"
            title="Trusted by Southeast Texas businesses"
          />
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport} className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              {
                quote: "Pixel & Panel made the whole process simple. Our new vehicle graphics look incredibly professional and we've had multiple customers mention they found us because of our truck.",
                name: "Carlos M.",
                role: "Contractor, Beaumont TX",
              },
              {
                quote: "We needed a website that actually gets us calls. Pixel & Panel delivered fast, kept things simple, and our Google ranking improved within the first month.",
                name: "Jessica R.",
                role: "Small Business Owner, Nederland TX",
              },
              {
                quote: "The storefront sign they designed looks better than anything I could have imagined. Professional, clean, and exactly what we needed to stand out on the street.",
                name: "Marcus T.",
                role: "Retail Shop Owner, Port Arthur TX",
              },
            ].map((t) => (
              <motion.article key={t.name} variants={fadeUp} className="flex flex-col rounded-xl border border-slate-200 bg-[#FAF8F4] p-6 shadow-sm">
                <div className="mb-4 flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="#F59E0B"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  ))}
                </div>
                <p className="flex-1 text-slate-600 leading-7 italic">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-5 border-t border-slate-200 pt-4">
                  <p className="font-bold text-[#1C1917]">{t.name}</p>
                  <p className="text-sm text-slate-500">{t.role}</p>
                </div>
              </motion.article>
            ))}
          </motion.div>
          <div className="mt-10 text-center">
            <a
              href="https://g.page/r/CQf3A2TWP9JjEBM/review"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline inline-flex"
            >
              Leave us a Google Review →
            </a>
          </div>
        </div>
      </section>

      <section className="section-base" aria-labelledby="faq-heading">
        <div className="container-px">
          <SectionIntro
            id="faq-heading"
            eyebrow="FAQ"
            title="Common homepage questions"
            description="Quick answers before you request a quote."
          />

          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport} className="mx-auto mt-12 grid max-w-4xl gap-4">
            {faqs.map((faq) => (
              <motion.article key={faq.question} variants={fadeUp} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex gap-4">
                  <HelpCircle className="mt-1 h-5 w-5 shrink-0 text-[#0369A1]" />
                  <div>
                    <h3 className="text-xl">{faq.question}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{faq.answer}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="px-4 pb-16 md:pb-24" aria-labelledby="final-cta-heading">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={stagger}
          className="mx-auto max-w-6xl overflow-hidden rounded-xl bg-[#1C1917] px-6 py-14 text-center text-white shadow-2xl md:px-12"
        >
          <motion.p variants={fadeUp} className="font-heading text-xs font-bold uppercase tracking-[0.16em] text-[#F59E0B]">
            Start a Project
          </motion.p>
          <motion.h2 id="final-cta-heading" variants={fadeUp} className="mx-auto mt-4 max-w-3xl text-white">
            Ready to Make Your Business Easier to Find?
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/75">
            Start with a quote request. Tell us what you need, and Pixel &amp; Panel will recommend the right next step.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8 flex justify-center">
            <Link href="/quote-request" className="btn-amber">
              Request a Quote <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
