import { ClipboardList, Search, CheckCircle2 } from "lucide-react";

const COPY = {
  English: {
    title: "How your quote works",
    steps: [
      ["Tell us what you need", "Share your project, size, deadline, and the best way to reach you."],
      ["We review the details", "We check materials, design needs, and timing with you."],
      ["Review your quote", "You receive pricing for your project before deciding how to proceed."],
    ],
  },
  Spanish: {
    title: "Cómo solicitar tu cotización",
    steps: [
      ["Cuéntanos qué necesitas", "Comparte tu proyecto, las medidas, la fecha y cómo podemos contactarte."],
      ["Revisamos los detalles", "Confirmamos contigo los materiales, el diseño y los tiempos."],
      ["Revisa tu cotización", "Recibes el precio de tu proyecto antes de decidir cómo continuar."],
    ],
  },
};
const ICONS = [ClipboardList, Search, CheckCircle2];

export default function QuoteVisual({ language = "English" }) {
  const copy = COPY[language] || COPY.English;
  return (
    <aside className="relative mx-auto w-full max-w-[480px] rounded-2xl border border-white/20 bg-white/10 p-6 shadow-xl">
      <h2 className="mb-6 text-xl text-white">{copy.title}</h2>
      <ol className="space-y-4">
        {copy.steps.map(([title, description], index) => {
          const Icon = ICONS[index];
          return (
            <li key={title} className="flex gap-4 rounded-xl bg-white p-4 text-[#1C1917]">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F59E0B]">
                <Icon size={20} aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-base font-bold">{index + 1}. {title}</h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">{description}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </aside>
  );
}
