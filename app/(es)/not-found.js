import Link from "next/link";

export const metadata = {
  title: "Página no encontrada | Pixel & Panel",
  description: "La página solicitada no se pudo encontrar.",
};

export default function NotFound() {
  return (
    <section className="min-h-[70vh] bg-[#FAF8F4] px-6 py-24 text-[#1C1917] md:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <p className="section-label text-[#0369A1]">404</p>
        <h1 className="mt-4 text-[#1C1917]">Página no encontrada</h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
          Esta página pudo haber cambiado de ubicación, o el enlace puede ser incorrecto. Vuelve al inicio o solicita una cotización y te ayudamos con el siguiente paso.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/es" className="btn-outline justify-center">
            Volver al inicio
          </Link>
          <Link href="/es/solicitar-cotizacion" className="btn-amber justify-center">
            Solicitar cotización
          </Link>
        </div>
      </div>
    </section>
  );
}
