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
  MousePointerClick,
  PanelTop,
  QrCode,
  Search,
  ShieldCheck,
  Store,
  Wrench,
} from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp, stagger, staggerFast, viewport } from "@/lib/animations";

const serviceSilos = [
  {
    eyebrow: "Digital Services",
    title: "Get found online",
    description:
      "Websites, local SEO, Google Business Profile, CRM setup, and QR campaigns.",
    href: "/digital",
    accent: "#0EA5E9",
    icon: MonitorSmartphone,
    items: ["Website pages built for local search", "Google visibility basics", "QR campaigns that connect offline to online"],
  },
  {
    eyebrow: "Signage & Print",
    title: "Get noticed in person",
    description:
      "Banners, yard signs, vehicle graphics, storefront signs, business cards, flyers, menus, and more.",
    href: "/signage",
    accent: "#F59E0B",
    icon: PanelTop,
    items: ["Signs for storefronts and job sites", "Print materials for walk-ins and events", "Design guidance before production"],
  },
];

const problemCards = [
  {
    title: "Outdated or missing website",
    description: "Customers look you up before they call. A slow, unclear, or missing site can cost real opportunities.",
    icon: MonitorSmartphone,
  },
  {
    title: "Weak Google visibility",
    description: "If your business is hard to find on Google, nearby customers may choose someone else first.",
    icon: Search,
  },
  {
    title: "Signs and print with no tracking",
    description: "Print can work harder when QR codes connect signs, menus, cards, and flyers to measurable actions.",
    icon: QrCode,
  },
];

const steps = [
  {
    title: "Build your online presence",
    description: "Create a clear website and local search foundation so people can find you and understand what you offer.",
    icon: Globe2,
  },
  {
    title: "Create signs and print that get attention",
    description: "Design banners, storefront pieces, cards, flyers, menus, and vehicle graphics that match your business.",
    icon: Megaphone,
  },
  {
    title: "Connect everything with QR-powered tracking",
    description: "Add smart QR paths so signs and print can send people to quote forms, menus, offers, or service pages.",
    icon: QrCode,
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
    description: "Turn work vehicles into moving brand impressions with decals, magnets, and graphics.",
    href: "/signage/vehicle-graphics",
    icon: Car,
  },
  {
    title: "Storefront Signs",
    description: "Exterior and interior signage that helps customers recognize and trust your location.",
    href: "/signage/storefront-signs",
    icon: Store,
  },
  {
    title: "Business Cards",
    description: "Professional cards that make follow-up easier after meetings, jobs, and local events.",
    href: "/signage/business-cards",
    icon: CreditCard,
  },
  {
    title: "Website Development",
    description: "Fast, mobile-first websites with clear pages, quote paths, and local SEO structure.",
    href: "/digital/web-development",
    icon: MonitorSmartphone,
  },
  {
    title: "Local SEO",
    description: "Improve how your business appears in local searches across Beaumont, Nederland, and Port Arthur.",
    href: "/digital/local-seo",
    icon: Search,
  },
  {
    title: "Google Business Profile",
    description: "Set up and improve the listing many customers see before they visit or call.",
    href: "/digital/google-business-profile",
    icon: BadgeCheck,
  },
];

const cityCards = [
  {
    city: "Beaumont",
    href: "/service-area/beaumont-tx",
    description:
      "Websites, local SEO, banners, yard signs, vehicle graphics, and storefront signs for Beaumont service businesses, shops, and local organizations.",
  },
  {
    city: "Nederland",
    href: "/service-area/nederland-tx",
    description:
      "Business cards, flyers, yard signs, vinyl banners, menus, and website support for Nederland businesses that need practical visibility.",
  },
  {
    city: "Port Arthur",
    href: "/service-area/port-arthur-tx",
    description:
      "Vehicle graphics, metal signs, window graphics, vinyl banners, storefront signs, and local SEO for Port Arthur businesses.",
  },
];

const reasons = [
  {
    title: "One partner for signs and digital",
    description: "Keep your website, signs, print, and QR campaigns aligned instead of managing disconnected pieces.",
    icon: Building2,
  },
  {
    title: "Built for local business owners",
    description: "Clear service pages, useful signs, and quote paths made for contractors, shops, restaurants, churches, schools, and service teams.",
    icon: Wrench,
  },
  {
    title: "Plain-English process",
    description: "No heavy jargon. Just clear recommendations, practical options, and next steps you can understand.",
    icon: ClipboardList,
  },
  {
    title: "Quote-first, no pressure",
    description: "Start with what you need. We will help you choose the right next step before anything moves forward.",
    icon: ShieldCheck,
  },
];

function SectionIntro({ eyebrow, title, description, centered = true, light = false }) {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}
    >
      {eyebrow && (
        <motion.p variants={fadeUp} className="section-label">
          {eyebrow}
        </motion.p>
      )}
      <motion.h2 variants={fadeUp} className={light ? "text-white" : "text-[#1C1917]"}>
        {title}
      </motion.h2>
      {description && (
        <motion.p
          variants={fadeUp}
          className={light ? "mt-5 text-base leading-8 text-white/70 md:text-lg" : "mt-5 text-base leading-8 text-slate-600 md:text-lg"}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}

function PhygitalVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto w-full max-w-[520px]"
      aria-label="Abstract visual showing websites, QR campaigns, and signage connected"
    >
      <div className="absolute -inset-6 rounded-[2rem] bg-[#0EA5E9]/15 blur-3xl" />
      <div className="relative overflow-hidden rounded-[1.5rem] border border-white/15 bg-white/[0.08] p-4 shadow-2xl backdrop-blur-md sm:p-5">
        <div className="rounded-[1.15rem] border border-white/10 bg-[#061A32]/85 p-4">
          <div className="mb-4 flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#F59E0B]" />
            <span className="h-3 w-3 rounded-full bg-[#0EA5E9]" />
            <span className="h-3 w-3 rounded-full bg-white/35" />
            <span className="ml-auto rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/60">
              pixelnpanel.com
            </span>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="rounded-2xl bg-white p-4 text-[#1C1917] shadow-xl">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase text-[#0369A1]">Website</p>
                  <p className="mt-1 font-heading text-xl font-black">Local service page</p>
                </div>
                <MonitorSmartphone className="h-8 w-8 text-[#0EA5E9]" />
              </div>
              <div className="space-y-2">
                <div className="h-3 w-11/12 rounded-full bg-slate-200" />
                <div className="h-3 w-8/12 rounded-full bg-slate-200" />
                <div className="h-3 w-10/12 rounded-full bg-slate-200" />
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-[#FAF8F4] p-3">
                  <Search className="mb-2 h-5 w-5 text-[#0369A1]" />
                  <p className="text-xs font-bold">Google-ready</p>
                </div>
                <div className="rounded-xl bg-[#F59E0B]/15 p-3">
                  <MousePointerClick className="mb-2 h-5 w-5 text-[#F59E0B]" />
                  <p className="text-xs font-bold">Quote path</p>
                </div>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="rounded-2xl border border-[#F59E0B]/35 bg-[#F59E0B]/15 p-4">
                <div className="mb-3 flex items-center gap-3">
                  <PanelTop className="h-6 w-6 text-[#F59E0B]" />
                  <p className="font-heading text-sm font-black uppercase text-white">Signage</p>
                </div>
                <div className="rounded-xl bg-[#F59E0B] p-4 text-center font-heading text-xl font-black uppercase text-[#1C1917]">
                  Now Open
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                <div className="flex items-center gap-4">
                  <div className="grid h-20 w-20 shrink-0 grid-cols-4 gap-1 rounded-xl bg-white p-2">
                    {Array.from({ length: 16 }).map((_, index) => (
                      <span
                        key={index}
                        className={index % 3 === 0 || index === 5 || index === 10 ? "rounded-sm bg-[#1C1917]" : "rounded-sm bg-slate-200"}
                      />
                    ))}
                  </div>
                  <div>
                    <p className="font-heading text-sm font-black uppercase text-white">QR Campaign</p>
                    <p className="mt-1 text-sm leading-6 text-white/65">Connect print to quote forms, menus, offers, and local pages.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3">
            {["Website", "QR", "Sign"].map((item) => (
              <div key={item} className="rounded-xl border border-white/10 bg-white/[0.07] px-3 py-2 text-center text-xs font-bold uppercase tracking-wide text-white/70">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
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
            ? "group block h-full rounded-2xl border border-white/10 bg-white/[0.07] p-5 transition duration-200 hover:-translate-y-1 hover:border-[#F59E0B]/45 hover:bg-white/[0.1]"
            : "group block h-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-[#0EA5E9]/35 hover:shadow-xl"
        }
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <span className={isDark ? "inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-[#F59E0B]" : "inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#0369A1]/10 text-[#0369A1]"}>
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

export default function HomeClient({ faqs }) {
  return (
    <div className="bg-[#FAF8F4] text-[#1C1917]">
      <section className="relative overflow-hidden bg-[#071C35] pt-24 text-white md:pt-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(14,165,233,0.28),transparent_32%),radial-gradient(circle_at_84%_16%,rgba(245,158,11,0.16),transparent_28%),linear-gradient(135deg,#061A32_0%,#0369A1_58%,#0EA5E9_100%)]" />
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:42px_42px]" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#FAF8F4] to-transparent" />

        <div className="container-px relative grid items-center gap-10 pb-20 md:pb-24 lg:grid-cols-[1.02fr_0.98fr]">
          <motion.div variants={stagger} initial="hidden" animate="visible" className="max-w-3xl">
            <motion.div variants={fadeUp} className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-sky-100 backdrop-blur">
              <span className="h-2.5 w-2.5 rounded-full bg-[#F59E0B]" />
              Serving Beaumont, Nederland &amp; Port Arthur, TX
            </motion.div>

            <motion.h1 variants={fadeUp} className="font-heading text-[clamp(2.35rem,5vw,4.25rem)] font-black leading-[1.04] tracking-normal text-white">
              Websites, Signs &amp; Print That Help Local Businesses Get Seen
            </motion.h1>

            <motion.p variants={fadeUp} className="mt-6 max-w-2xl text-base leading-8 text-white/75 md:text-lg">
              Pixel &amp; Panel helps local businesses in Beaumont, Nederland, and Port Arthur build a stronger online presence, better signs, and QR-powered marketing that connects both.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link href="/quote-request" className="btn-amber justify-center">
                Get a Free Quote <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/digital" className="btn-ghost justify-center">
                Digital Services
              </Link>
              <Link href="/signage" className="btn-ghost justify-center">
                Signage &amp; Print
              </Link>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-9 grid gap-3 text-sm text-white/65 sm:grid-cols-3">
              {["Your Vision. Made Visible.", "Online and offline visibility", "Quote-first process"].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#F59E0B]" />
                  <span>{item}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <PhygitalVisual />
        </div>
      </section>

      <section className="section-base">
        <div className="container-px">
          <SectionIntro
            eyebrow="The Visibility Gap"
            title="Your business may be visible on the street — but is it visible on Google?"
            description="Most local customers move between the real world and the search bar. Your website, signs, print materials, and QR paths should work together."
          />

          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport} className="mt-12 grid gap-5 md:grid-cols-3">
            {problemCards.map((item) => {
              const Icon = item.icon;
              return (
                <motion.article key={item.title} variants={fadeUp} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#0369A1]/10 text-[#0369A1]">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3>{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section className="section-base bg-white">
        <div className="container-px">
          <SectionIntro
            eyebrow="Two Clear Service Silos"
            title="Digital visibility and physical visibility, connected"
            description="Choose the lane you need now, or start with a quote and we will recommend the right next step."
          />

          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport} className="mt-12 grid gap-6 lg:grid-cols-2">
            {serviceSilos.map((item) => {
              const Icon = item.icon;
              return (
                <motion.article key={item.title} variants={fadeUp} className="relative overflow-hidden rounded-2xl border border-slate-200 bg-[#FAF8F4] p-6 shadow-sm md:p-8">
                  <div className="absolute right-0 top-0 h-28 w-28 rounded-bl-[4rem] opacity-15" style={{ backgroundColor: item.accent }} />
                  <div className="relative">
                    <div className="mb-6 flex items-center gap-4">
                      <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl text-white" style={{ backgroundColor: item.accent }}>
                        <Icon className="h-7 w-7" />
                      </span>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-slate-500">{item.eyebrow}</p>
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
                    <Link href={item.href} className="mt-7 inline-flex items-center gap-2 font-heading text-sm font-bold uppercase tracking-wider text-[#0369A1]">
                      Explore {item.eyebrow} <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section className="section-base bg-[#071C35] text-white">
        <div className="container-px">
          <SectionIntro
            eyebrow="How It Works"
            title="A practical path from attention to action"
            description="We help people notice your business, understand what you offer, and take the next step."
            light
          />

          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport} className="mt-12 grid gap-5 md:grid-cols-3">
            {steps.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.article key={item.title} variants={fadeUp} className="rounded-2xl border border-white/10 bg-white/[0.07] p-6">
                  <div className="mb-6 flex items-center justify-between">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#F59E0B] text-[#1C1917]">
                      <Icon className="h-6 w-6" />
                    </span>
                    <span className="font-heading text-4xl font-black text-white/15">0{index + 1}</span>
                  </div>
                  <h3 className="text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/65">{item.description}</p>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section className="section-base">
        <div className="container-px">
          <SectionIntro
            eyebrow="Popular Services"
            title="Start with the services local businesses ask for most"
            description="These internal links point to real crawlable pages built for clear service intent."
          />

          <motion.div variants={staggerFast} initial="hidden" whileInView="visible" viewport={viewport} className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {popularServices.map((item) => (
              <LinkCard key={item.href} item={item} />
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section-base bg-white">
        <div className="container-px">
          <SectionIntro
            eyebrow="Local Service Area"
            title="Built for Beaumont, Nederland & Port Arthur Businesses"
            description="Focused local pages help customers find the services that fit their city and business needs."
          />

          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport} className="mt-12 grid gap-5 md:grid-cols-3">
            {cityCards.map((city) => (
              <motion.div key={city.href} variants={fadeUp}>
                <Link href={city.href} className="group block h-full rounded-2xl border border-slate-200 bg-[#FAF8F4] p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-[#F59E0B]/45 hover:shadow-xl">
                  <div className="mb-5 flex items-center justify-between">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#F59E0B]/15 text-[#F59E0B]">
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

      <section className="section-base">
        <div className="container-px">
          <SectionIntro
            eyebrow="Why Pixel & Panel"
            title="Premium enough to trust, practical enough to use"
            description="The goal is simple: make your business easier to notice, easier to understand, and easier to contact."
          />

          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport} className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((item) => {
              const Icon = item.icon;
              return (
                <motion.article key={item.title} variants={fadeUp} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#0369A1]/10 text-[#0369A1]">
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

      <section className="section-base bg-[#071C35] text-white">
        <div className="container-px">
          <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <SectionIntro
              eyebrow="Portfolio"
              title="Portfolio Coming Together"
              description="Real project photos, signage examples, and website work will be added as projects are completed. For now, tell us what you need and we will guide you with options."
              centered={false}
              light
            />
            <motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={fadeUp} className="rounded-2xl border border-white/10 bg-white/[0.07] p-6 md:p-8">
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  ["Website work", MonitorSmartphone],
                  ["Signage examples", PanelTop],
                  ["Print materials", FileText],
                ].map(([label, Icon]) => (
                  <div key={label} className="rounded-2xl bg-white/10 p-5 text-center">
                    <Icon className="mx-auto mb-3 h-7 w-7 text-[#F59E0B]" />
                    <p className="font-heading text-sm font-bold uppercase tracking-wider text-white/75">{label}</p>
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

      <section className="section-base">
        <div className="container-px">
          <SectionIntro
            eyebrow="FAQ"
            title="Common homepage questions"
            description="Quick answers before you request a quote."
          />

          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport} className="mx-auto mt-12 grid max-w-4xl gap-4">
            {faqs.map((faq) => (
              <motion.article key={faq.question} variants={fadeUp} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
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

      <section className="px-4 pb-16 md:pb-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={stagger}
          className="mx-auto max-w-6xl overflow-hidden rounded-[1.5rem] bg-[#0369A1] px-6 py-14 text-center text-white shadow-2xl md:px-12"
        >
          <motion.p variants={fadeUp} className="section-label" style={{ color: "#F59E0B" }}>
            Start a Project
          </motion.p>
          <motion.h2 variants={fadeUp} className="mx-auto max-w-3xl text-white">
            Ready to Make Your Business Easier to Find?
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/75">
            Start with a free quote. Tell us what you need, and we will recommend the right next step.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8 flex justify-center">
            <Link href="/quote-request" className="btn-amber">
              Get a Free Quote <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
