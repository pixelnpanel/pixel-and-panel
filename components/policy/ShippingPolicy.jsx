import Link from "next/link";

const COPY = {
  en: {
    title: "Shipping & Delivery Policy",
    intro: "How we confirm fulfillment for signs and print before you pay.",
    sections: [
      ["Nationwide shipping", "Eligible sign and print products can ship within the United States. Whether an item can ship depends on the product, quantity, and destination. Share your delivery ZIP code and the date you need the order so we can confirm available options."],
      ["Local delivery, pickup, and installation", "Some projects require local delivery, an arranged pickup, or on-site installation. Availability depends on the project and location. Any available method and related charges will be confirmed in your quote. Pixel & Panel is a service-area business without a public storefront."],
      ["Cost and timing", "Your quote will identify the fulfillment method and any applicable charges before payment. Production timing depends on the project, artwork and proof approval, and the payment terms in your quote. Shipping transit is separate from production time."],
      ["Delivery issues", "If an order arrives damaged or there is a problem with what you received, contact us promptly with the order reference and details. Keep the packaging and take photos if possible. See the Refund / Reprint Policy for how to report an issue."],
    ],
    related: "Related policies",
    refund: "Refund / Reprint Policy",
    payment: "Payment Policy",
    proof: "Proof Approval Policy",
    contact: "Contact us about delivery",
    contactHref: "/contact",
  },
  es: {
    title: "Política de Envío y Entrega",
    intro: "Cómo confirmamos la entrega de letreros e impresos antes de que pagues.",
    sections: [
      ["Envíos dentro de Estados Unidos", "Los letreros e impresos elegibles se pueden enviar dentro de Estados Unidos. La disponibilidad depende del producto, la cantidad y el destino. Indícanos el código postal de entrega y la fecha en que necesitas el pedido para que podamos confirmar las opciones."],
      ["Entrega local, recogida e instalación", "Algunos proyectos requieren entrega local, recogida acordada o instalación en el lugar. La disponibilidad depende del proyecto y de la ubicación. Confirmaremos en tu cotización las opciones disponibles y cualquier cargo aplicable. Pixel & Panel atiende por área de servicio y no tiene una tienda abierta al público."],
      ["Costo y plazos", "Antes del pago, tu cotización indicará el método de entrega y los cargos aplicables. El plazo de producción depende del proyecto, de la aprobación del diseño y de las condiciones de pago de tu cotización. El tiempo de transporte se suma al tiempo de producción."],
      ["Problemas con una entrega", "Si tu pedido llega dañado o hay un problema con lo que recibiste, comunícate con nosotros pronto e incluye la referencia del pedido y los detalles. Conserva el embalaje y toma fotos si puedes. La Política de Reembolso y Reimpresión explica cómo reportar un problema."],
    ],
    related: "Políticas relacionadas",
    refund: "Política de reembolso y reimpresión (en inglés)",
    payment: "Política de pagos (en inglés)",
    proof: "Política de aprobación de diseño (en inglés)",
    contact: "Consultar sobre una entrega",
    contactHref: "/es/contacto",
  },
};

const PATHS = { en: "/shipping-policy", es: "/es/politica-de-envio" };

export function shippingMetadata(locale) {
  return {
    title: { absolute: COPY[locale].title + " | Pixel & Panel" },
    description: COPY[locale].intro,
    robots: { index: false, follow: true },
    alternates: {
      canonical: PATHS[locale],
      languages: { "en-US": PATHS.en, "es-US": PATHS.es, "x-default": PATHS.en },
    },
  };
}

export default function ShippingPolicy({ locale = "en" }) {
  const copy = COPY[locale];
  return (
    <div className="bg-[#FAF8F4] text-[#1C1917]">
      <header className="bg-[#0369A1] px-6 pb-12 pt-32 text-white">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-white">{copy.title}</h1>
          <p className="mt-4 text-white">{copy.intro}</p>
        </div>
      </header>
      <article className="mx-auto max-w-3xl space-y-8 px-6 py-12">
        {copy.sections.map(([heading, body]) => (
          <section key={heading}>
            <h2 className="text-xl">{heading}</h2>
            <p className="mt-2 leading-7 text-slate-700">{body}</p>
          </section>
        ))}
        <nav className="border-t border-slate-200 pt-6" aria-label={copy.related}>
          <ul className="flex flex-wrap gap-4 text-sm font-semibold text-[#0369A1] underline underline-offset-4">
            <li><Link href="/refund-reprint-policy">{copy.refund}</Link></li>
            <li><Link href="/payment-policy">{copy.payment}</Link></li>
            <li><Link href="/proof-approval-policy">{copy.proof}</Link></li>
          </ul>
        </nav>
        <Link href={copy.contactHref} className="btn-amber">{copy.contact}</Link>
      </article>
    </div>
  );
}
