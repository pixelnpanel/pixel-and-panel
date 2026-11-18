import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function SignageMaterialGuide({ heading, intro, products }) {
  return (
    <section className="bg-white px-6 py-12 md:py-16" aria-labelledby="signage-material-guide">
      <div className="mx-auto max-w-5xl">
        <h2 id="signage-material-guide">{heading}</h2>
        <p className="mt-3 max-w-3xl leading-7 text-slate-600">{intro}</p>
        <ul className="mt-6 grid gap-4 md:grid-cols-3">
          {products.map(({ heading, description, href, label }) => (
            <li key={href} className="flex flex-col rounded-xl border border-brand-line bg-[#FAF8F4] p-5">
              <h3 className="text-lg">{heading}</h3>
              <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">{description}</p>
              <Link href={href} className="mt-2 inline-flex min-h-11 items-center gap-2 self-start text-sm font-semibold text-[#0369A1] underline-offset-4 hover:underline">
                {label} <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
