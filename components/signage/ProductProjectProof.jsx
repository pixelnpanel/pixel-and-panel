import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { portfolioProjects } from "@/lib/portfolio-projects";
import { portfolioProjectsEs } from "@/lib/portfolio-projects-es";

const PROJECT_BY_PRODUCT = {
  "business-cards": "remax-realtor-business-cards",
  "acrylic-signs": "house-of-rogo-storefront-sign",
  "tarjetas-de-presentacion": "remax-realtor-business-cards",
  "letreros-de-acrilico": "house-of-rogo-storefront-sign",
};

export default function ProductProjectProof({ slug, locale = "en" }) {
  const spanish = locale === "es";
  const project = (spanish ? portfolioProjectsEs : portfolioProjects).find((item) => item.slug === PROJECT_BY_PRODUCT[slug]);
  if (!project) return null;

  return (
    <aside aria-labelledby="related-customer-project" className="mt-7 grid items-center gap-4 rounded-2xl border border-stone-200 bg-white p-4 sm:grid-cols-[160px_1fr]">
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-[#FAF8F4]">
        <Image src={project.image} alt={project.imageAlt} fill sizes="(max-width: 639px) 80vw, 160px" className="object-contain" />
      </div>
      <div>
        <p className="mb-1 text-sm font-semibold text-[#0369A1]">{spanish ? "Proyecto de un cliente" : "Customer project"}</p>
        <h2 id="related-customer-project" className="text-xl">{project.title}</h2>
        <Link href={(spanish ? "/es/portafolio" : "/portfolio") + "#" + project.slug} className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-[#0369A1] underline underline-offset-4">
          {spanish ? "Ver el proyecto" : "See the project"} <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </aside>
  );
}
