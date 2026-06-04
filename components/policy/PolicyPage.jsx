import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LEGAL_POLICY_LINKS, POLICY_DISCLAIMER } from "@/lib/legal-policies";

export default function PolicyPage({
  policy,
  title = policy?.title,
  description = policy?.description,
  lastUpdated = "June 2026",
  currentHref = policy?.href,
  sections = policy?.sections || [],
}) {
  const relatedPolicies = LEGAL_POLICY_LINKS.filter((link) => link.href !== currentHref);

  return (
    <div className="bg-[#FAF8F4] text-[#1C1917]">
      <section className="relative overflow-hidden bg-[#0C1E3C] px-4 py-24 text-white md:py-28">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#0C1E3C_0%,#0369A1_72%,#0EA5E9_100%)]" />
        <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(rgba(255,255,255,.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.1)_1px,transparent_1px)] [background-size:42px_42px]" />
        <div className="relative mx-auto max-w-4xl">
          <p className="section-label text-[#F59E0B]">Pixel &amp; Panel Policy</p>
          <h1 className="max-w-3xl text-white md:text-left">{title}</h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-white/78 md:text-lg">
            {description}
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-4xl px-4 py-14 md:py-20">
        <p className="mb-10 inline-flex rounded-full border border-[#0369A1]/20 bg-white px-4 py-2 text-sm font-semibold text-[#0369A1] shadow-sm">
          Last updated: {lastUpdated}
        </p>

        <div className="space-y-10">
          {sections.map((section) => (
            <section key={section.heading} className="border-b border-slate-200 pb-10 last:border-b-0">
              <h2 className="text-[#1C1917]">{section.heading}</h2>
              {section.body?.map((paragraph, index) => (
                <p key={`${section.heading}-body-${index}`} className="mt-4 leading-8 text-slate-700">
                  {paragraph}
                </p>
              ))}
              {section.rows && (
                <dl className="mt-5 grid gap-4 sm:grid-cols-2">
                  {section.rows.map((row) => (
                    <div key={row.label} className="rounded-lg border border-slate-200 bg-white px-5 py-4 shadow-sm">
                      <dt className="text-xs font-bold uppercase tracking-[0.16em] text-[#0369A1]">{row.label}</dt>
                      <dd className="mt-2 leading-7 text-slate-700">{row.value}</dd>
                    </div>
                  ))}
                </dl>
              )}
              {section.items && (
                <ul className="mt-4 list-disc space-y-3 pl-5 text-slate-700">
                  {section.items.map((item, index) => (
                    <li key={`${section.heading}-item-${index}`} className="leading-7">
                      {item}
                    </li>
                  ))}
                </ul>
              )}
              {section.note && (
                <p className="mt-4 leading-8 text-slate-700">
                  {section.note}
                </p>
              )}
            </section>
          ))}
        </div>

        <section className="mt-12 border-t border-slate-200 pt-10" aria-labelledby="related-policies-heading">
          <h2 id="related-policies-heading" className="text-[#1C1917]">
            Related Policies
          </h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {relatedPolicies.map((policy) => (
              <Link
                key={policy.href}
                href={policy.href}
                className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-5 py-4 text-sm font-bold text-[#0369A1] shadow-sm transition hover:border-[#0369A1]/40 hover:bg-sky-50"
              >
                {policy.label}
                <ArrowRight className="h-4 w-4" />
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-12 border-t border-slate-200 pt-10" aria-labelledby="policy-contact-heading">
          <h2 id="policy-contact-heading" className="text-[#1C1917]">
            Policy Contact
          </h2>
          <div className="mt-5 rounded-lg border border-slate-200 bg-white p-6 leading-8 text-slate-700 shadow-sm">
            <p className="font-bold text-[#1C1917]">Pixel &amp; Panel LLC</p>
            <p>
              Website:{" "}
              <a href="https://www.pixelnpanel.com" className="font-semibold text-[#0369A1] underline-offset-2 hover:underline">
                www.pixelnpanel.com
              </a>
            </p>
            <p>
              Email:{" "}
              <a href="mailto:hello@pixelnpanel.com" className="font-semibold text-[#0369A1] underline-offset-2 hover:underline">
                hello@pixelnpanel.com
              </a>
            </p>
            <p>
              Phone:{" "}
              <a href="tel:+14092252012" className="font-semibold text-[#0369A1] underline-offset-2 hover:underline">
                (409) 225-2012
              </a>
            </p>
            <p>Service-area/remote business &mdash; no public storefront</p>
          </div>
          <div className="mt-5 rounded-lg border border-[#F59E0B]/30 bg-[#F59E0B]/10 p-5 text-sm leading-7 text-slate-700">
            <p className="font-bold text-[#1C1917]">Disclaimer</p>
            <p className="mt-2">{POLICY_DISCLAIMER}</p>
          </div>
        </section>
      </article>
    </div>
  );
}
