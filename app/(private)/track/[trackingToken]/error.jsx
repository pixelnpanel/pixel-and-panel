"use client";

import { useSearchParams } from "next/navigation";

export default function OrderStatusError() {
  const spanish = useSearchParams().get("lang") === "es";

  return (
    <section lang={spanish ? "es-US" : "en-US"} className="mx-auto max-w-2xl px-5 pb-16 pt-40">
      <h1>{spanish ? "El estado del pedido no está disponible" : "Order status is unavailable"}</h1>
      <p className="mt-4 leading-relaxed text-stone-700">
        {spanish
          ? "Intenta más tarde o escríbenos con tu número de pedido para consultar su estado."
          : "Try again later or email us with your order number for an update."}
      </p>
      <a className="mt-5 inline-flex min-h-11 items-center font-bold text-[#0369A1] underline underline-offset-4" href="mailto:hello@pixelnpanel.com">hello@pixelnpanel.com</a>
    </section>
  );
}
