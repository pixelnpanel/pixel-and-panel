import Link from "next/link";
import { ArrowRight, CheckCircle2, HelpCircle, MonitorSmartphone, PanelTop } from "lucide-react";
import HomeHeroVisual from "./HomeHeroVisual";

export const defaultHomeStartOptions = [
  {
    title: "Website / Google",
    description: "Fast websites and Google Maps help.",
    href: "/digital",
    label: "Digital",
    icon: MonitorSmartphone,
    accent: "#0EA5E9",
  },
  {
    title: "Signs / Print",
    description: "Banners, signs, cards, and truck lettering.",
    href: "/signage",
    label: "Signage",
    icon: PanelTop,
    accent: "#F59E0B",
  },
  {
    title: "Not Sure Yet?",
    description: "Free Google visibility check.",
    href: "/free-visibility-check",
    label: "Free Check",
    icon: HelpCircle,
    accent: "#10B981",
  },
];

export const defaultHomeHeroCopy = {
  eyebrow: "Serving Southeast Texas",
  mobileTitleStart: "Get Your Business Found",
  mobileTitleHighlight: "Online & In Town",
  desktopTitleStart: "We Build Websites, Custom Signs & Local SEO",
  desktopTitleHighlight: "to Get Your Business Found",
  mobileIntro:
    "Fast websites, custom signs, and local SEO for contractors, stores, and service teams across Southeast Texas.",
  desktopIntro:
    "We help contractors, retail shops, and service businesses in Beaumont, Nederland, and Port Arthur look professional and get more calls. From fast, mobile-friendly website design to durable street banners and work truck lettering, Pixel & Panel connects everything together.",
  startHeading: "What do you need?",
  startOptionsLabel: "Choose what your business needs",
  quoteHref: "/quote-request",
  mobileQuoteLabel: "Get a Quote",
  desktopQuoteLabel: "Request a Quote",
  checklist: [
    "Your Vision. Made Visible.",
    "Websites, signs, Google, and print working together",
    "Quote-first process",
  ],
};

export default function HomeClient({ copy = {}, startOptions = defaultHomeStartOptions }) {
  const content = { ...defaultHomeHeroCopy, ...copy };

  return (
    <div className="bg-[#FAF8F4] text-[#1C1917]">
      <section className="relative overflow-hidden bg-[#0369A1] pt-24 text-white md:pt-28" aria-labelledby="homepage-hero-title">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#1C1917_0%,#0369A1_58%,#0EA5E9_100%)]" />
        <div className="absolute inset-0 opacity-18 [background-image:linear-gradient(rgba(255,255,255,.09)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.09)_1px,transparent_1px)] [background-size:44px_44px]" />
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#FAF8F4] to-transparent" />

        <div className="container-px relative grid items-center gap-10 pb-20 md:pb-24 lg:grid-cols-[1.02fr_0.98fr]">
          <div className="min-w-0 max-w-[calc(100vw-2rem)] md:max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur">
              <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#F59E0B] opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#F59E0B]" />
              </span>
              {content.eyebrow}
            </div>

            <h1 id="homepage-hero-title" className="font-heading text-[clamp(2.05rem,4.4vw,3.55rem)] font-extrabold leading-[1.08] tracking-normal text-white">
              <span className="md:hidden">
                {content.mobileTitleStart}
                <span className="mt-2 block text-[#F59E0B]">
                  {content.mobileTitleHighlight}
                </span>
              </span>
              <span className="hidden md:inline">
                {content.desktopTitleStart}{" "}
                <span className="mt-2 block text-[#F59E0B]">
                  {content.desktopTitleHighlight}
                </span>
              </span>
            </h1>

            <p className="mt-6 max-w-[21rem] break-words text-base leading-8 text-white md:hidden">
              {content.mobileIntro}
            </p>
            <p className="mt-6 hidden max-w-2xl text-base leading-8 text-white md:block md:text-lg">
              {content.desktopIntro}
            </p>

            <div className="mt-7 max-w-[calc(100vw-2rem)] md:hidden" aria-labelledby="mobile-home-start-heading">
              <p id="mobile-home-start-heading" className="font-heading text-xs font-bold uppercase tracking-[0.16em] text-[#F59E0B]">
                {content.startHeading}
              </p>
              <div className="mt-3 grid gap-3">
                {startOptions.map((item) => {
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex min-h-[88px] items-center gap-3 rounded-xl border border-white/15 bg-white/[0.09] p-4 text-left shadow-sm active:scale-[0.99]"
                    >
                      <span
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-[#1C1917]"
                        style={{ backgroundColor: item.accent }}
                        aria-hidden="true"
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-heading text-base font-bold leading-tight text-white">{item.title}</span>
                        <span className="mt-1 block text-sm leading-6 text-white/72">{item.description}</span>
                      </span>
                      <span className="sr-only">{item.label}</span>
                      <ArrowRight className="h-4 w-4 shrink-0 text-white/45" aria-hidden="true" />
                    </Link>
                  );
                })}
              </div>
              <Link href={content.quoteHref} className="btn-amber mt-4 w-full justify-center whitespace-nowrap px-5">
                {content.mobileQuoteLabel} <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="mt-8 hidden max-w-2xl md:block">
              <div className="grid gap-3 md:grid-cols-3" aria-label={content.startOptionsLabel}>
                {startOptions.map((item) => {
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="group flex min-h-[94px] items-center gap-3 rounded-xl border border-white/15 bg-white/[0.09] p-4 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.13] focus:outline-none focus:ring-2 focus:ring-[#F59E0B]/70"
                    >
                      <span
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-[#1C1917] shadow-lg shadow-black/10"
                        style={{ backgroundColor: item.accent }}
                        aria-hidden="true"
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-heading text-sm font-bold leading-tight text-white">{item.title}</span>
                        <span className="mt-1 block text-xs leading-5 text-white/72">{item.description}</span>
                      </span>
                      <span className="sr-only">{item.label}</span>
                      <ArrowRight className="h-4 w-4 shrink-0 text-white/45 transition group-hover:translate-x-0.5 group-hover:text-white/80" aria-hidden="true" />
                    </Link>
                  );
                })}
              </div>
              <Link href={content.quoteHref} className="btn-amber mt-5 inline-flex justify-center whitespace-nowrap px-5">
                {content.desktopQuoteLabel} <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="mt-8 grid gap-3 text-sm text-white sm:grid-cols-3 md:mt-9">
              {content.checklist.map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#F59E0B]" aria-hidden="true" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden md:contents">
            <HomeHeroVisual />
          </div>
        </div>
      </section>
    </div>
  );
}
