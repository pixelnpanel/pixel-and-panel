import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  Globe2,
  MapPin,
  QrCode,
  Search,
  Store,
} from "lucide-react";
import VisibilityCheckForm from "./VisibilityCheckForm";
import VisibilityCheckVisual from "./VisibilityCheckVisual";

const whoFor = [
  "New businesses",
  "Contractors and local service companies",
  "Restaurants and retail shops",
  "Businesses with signs but weak online visibility",
  "Businesses with a website that does not bring leads",
];

const checks = [
  "Website clarity and mobile experience",
  "Google Business Profile visibility",
  "Local SEO basics",
  "Signage and print marketing setup",
  "QR code and lead capture opportunities",
  "Quote/contact flow",
];

const receive = [
  "A simple visibility summary",
  "Quick improvement ideas",
  "Recommended next steps",
  "No-pressure quote option if you want help",
];

const faqs = [
  {
    question: "What is a Free Visibility Check?",
    answer:
      "It is a practical review of how customers find, understand, and contact your business online and in the real world.",
  },
  {
    question: "Is it really free?",
    answer:
      "Yes. Pixel & Panel will review the information you submit and share practical observations without requiring a paid project.",
  },
  {
    question: "Do I need to already have a website?",
    answer:
      "No. If you do not have a website yet, Pixel & Panel can still review your Google profile, signage, print materials, and lead capture opportunities.",
  },
  {
    question: "Can you check my Google Business Profile?",
    answer:
      "Yes. Share your business name, city, and any profile details you have, and Pixel & Panel can review the basics of how your profile appears.",
  },
  {
    question: "Can you help with signs and print too?",
    answer:
      "Yes. Pixel & Panel can review signage, print materials, QR code opportunities, and how those pieces connect to your website or contact flow.",
  },
  {
    question: "What happens after I submit the form?",
    answer:
      "Pixel & Panel reviews your request, looks for practical improvement opportunities, and contacts you with a simple summary and possible next steps.",
  },
];

export const metadata = {
  metadataBase: new URL("https://pixelnpanel.com"),
  title: {
    absolute: "Free Visibility Check | Pixel & Panel",
  },
  description:
    "Get a free review of your website, Google profile, signage, and QR/lead capture setup from Pixel & Panel. Serving Southeast Texas businesses.",
  alternates: {
    canonical: "https://pixelnpanel.com/free-visibility-check",
    languages: {
      "en-US": "https://pixelnpanel.com/free-visibility-check",
      "es-US": "https://pixelnpanel.com/es/chequeo-gratis-de-visibilidad",
    },
  },
  openGraph: {
    title: "Free Visibility Check | Pixel & Panel",
    description:
      "Get a free review of your website, Google profile, signage, and QR/lead capture setup from Pixel & Panel.",
    url: "https://pixelnpanel.com/free-visibility-check",
    type: "website",
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

export default function FreeVisibilityCheckPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <JsonLd data={faqSchema} />
      <div className="bg-[#FAF8F4] text-[#1C1917]">
        <section className="relative overflow-hidden bg-[#0C1E3C] px-4 pt-28 text-white md:pt-32">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,#0C1E3C_0%,#0369A1_70%,#0EA5E9_100%)]" />
          <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.09)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.09)_1px,transparent_1px)] [background-size:44px_44px]" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-10 pb-20 lg:grid-cols-[1.03fr_0.97fr]">
            <div>
              <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-sky-100">
                <MapPin className="h-4 w-4 text-[#F59E0B]" />
                Serving Southeast Texas
              </div>
              <h1 className="max-w-4xl text-white">
                Free Visibility Check for Southeast Texas Businesses
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-white/78 md:text-lg">
                Not sure why customers are not finding you? Pixel &amp; Panel will review
                your online and real-world visibility and show you practical ways to improve.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="#visibility-check-form" className="btn-amber justify-center">
                  Start My Free Visibility Check <ArrowRight className="h-4 w-4" />
                </a>
                <Link href="/pricing" className="btn-ghost justify-center">
                  View Pricing
                </Link>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <VisibilityCheckVisual />
            </div>
          </div>
        </section>

        <section className="section-base" aria-labelledby="who-for-heading">
          <div className="container-px">
            <SectionIntro
              id="who-for-heading"
              eyebrow="Who It Is For"
              title="A softer first step for owners who are not ready for a quote."
              description="Use it when you know visibility could be better, but you are still figuring out which problem to solve first."
            />
            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
              {whoFor.map((item) => (
                <article key={item} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                  <Building2 className="mb-5 h-7 w-7 text-[#0369A1]" />
                  <h3 className="text-lg text-[#1C1917]">{item}</h3>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-base bg-white" aria-labelledby="checks-heading">
          <div className="container-px">
            <SectionIntro
              id="checks-heading"
              eyebrow="What Pixel & Panel Checks"
              title="Plain-English review points, not confusing reports."
              description="Pixel & Panel looks at the places where customers decide whether to call, visit, scan, or move on."
            />
            <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {checks.map((item) => (
                <article key={item} className="flex gap-4 rounded-xl border border-slate-200 bg-[#FAF8F4] p-5">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#F59E0B]" />
                  <h3 className="text-lg text-[#1C1917]">{item}</h3>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-base" aria-labelledby="receive-heading">
          <div className="container-px">
            <div className="grid items-center gap-10 lg:grid-cols-[0.92fr_1.08fr]">
              <div>
                <p className="section-label text-[#0369A1]">What You Receive</p>
                <h2 id="receive-heading" className="text-[#1C1917]">
                  A practical summary you can act on.
                </h2>
                <p className="mt-5 leading-8 text-slate-600">
                  The goal is to help you see what is clear, what is missing, and which
                  next steps are worth considering. Pixel &amp; Panel will not promise
                  rankings or guaranteed results.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {receive.map((item) => (
                  <div key={item} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                    <ClipboardCheck className="mb-4 h-6 w-6 text-[#0369A1]" />
                    <h3 className="text-lg text-[#1C1917]">{item}</h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-base bg-white" aria-labelledby="form-heading">
          <div className="container-px grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
            <div>
              <p className="section-label text-[#0369A1]">Free Visibility Check Form</p>
              <h2 id="form-heading" className="text-[#1C1917]">
                Start with what you know.
              </h2>
              <p className="mt-5 leading-8 text-slate-600">
                You can submit the form with an email or phone number. If you are not
                sure what you need help with yet, use the message box and describe the
                issue in your own words.
              </p>
              <div className="mt-6 rounded-xl border border-[#0369A1]/15 bg-[#FAF8F4] p-5">
                <BadgeCheck className="mb-4 h-6 w-6 text-[#F59E0B]" />
                <p className="text-sm leading-7 text-slate-700">
                  This is a no-pressure review. If you want help after the summary,
                  Pixel &amp; Panel can recommend a quote option.
                </p>
              </div>
            </div>
            <VisibilityCheckForm />
          </div>
        </section>

        <section className="section-base" aria-labelledby="faq-heading">
          <div className="container-px">
            <SectionIntro
              id="faq-heading"
              eyebrow="FAQ"
              title="Free Visibility Check questions"
              description="Quick answers before you submit the form."
            />
            <div className="mx-auto mt-12 grid max-w-4xl gap-4">
              {faqs.map((faq) => (
                <article key={faq.question} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-xl text-[#1C1917]">{faq.question}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{faq.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pb-16 md:pb-24" aria-labelledby="final-visibility-cta">
          <div className="mx-auto max-w-6xl rounded-xl bg-[#1C1917] px-6 py-14 text-center text-white shadow-2xl md:px-12">
            <p className="font-heading text-xs font-bold uppercase tracking-[0.16em] text-[#F59E0B]">
              Start Here
            </p>
            <h2 id="final-visibility-cta" className="mx-auto mt-4 max-w-3xl text-white">
              Want a clearer path to more visibility?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/75">
              Complete the form and Pixel &amp; Panel will review your website, Google
              profile, signage, QR opportunities, and contact flow.
            </p>
            <div className="mt-8 flex justify-center">
              <a href="#visibility-check-form" className="btn-amber">
                Start My Free Visibility Check <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

function SectionIntro({ id, eyebrow, title, description }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="section-label text-[#0369A1]">{eyebrow}</p>
      <h2 id={id} className="text-[#1C1917]">{title}</h2>
      <p className="mt-5 text-base leading-8 text-slate-600 md:text-lg">{description}</p>
    </div>
  );
}
