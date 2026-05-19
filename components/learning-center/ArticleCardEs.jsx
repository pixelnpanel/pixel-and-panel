import Link from "next/link";
import { ArrowRight } from "lucide-react";

function formatDate(dateString) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("es-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export default function ArticleCardEs({ post }) {
  return (
    <article className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-600">
          {post.category}
        </span>
        <span className="text-xs font-semibold text-slate-500">
          Actualizado {formatDate(post.updatedDate)}
        </span>
      </div>

      <h3 className="text-[#1C1917]">{post.title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-600">{post.description}</p>

      <div className="mt-4 text-sm text-slate-500">{post.readingTime}</div>

      <div className="mt-6">
        <Link
          href={`/es/centro-de-aprendizaje/${post.slug}`}
          className="inline-flex items-center gap-2 font-heading text-sm font-bold uppercase tracking-[0.12em] text-[#0369A1] transition hover:text-[#F59E0B]"
        >
          Leer guía <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
