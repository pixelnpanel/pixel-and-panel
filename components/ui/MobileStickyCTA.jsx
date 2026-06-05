import Link from "next/link";
import { FileText, MessageCircle, Phone } from "lucide-react";
import { BRAND } from "@/lib/constants";

export default function MobileStickyCTA({
  callLabel = "Call",
  quoteHref = "/quote-request",
  quoteLabel = "Get Quote",
  whatsappLabel = "WhatsApp",
}) {
  return (
    <nav
      aria-label="Quick contact actions"
      className="fixed inset-x-0 bottom-0 z-[70] border-t border-white/20 bg-[#0C1E3C]/96 px-3 pb-[calc(0.55rem+env(safe-area-inset-bottom))] pt-2 shadow-[0_-12px_32px_rgba(12,30,60,0.24)] backdrop-blur md:hidden"
    >
      <div className="mx-auto grid max-w-md grid-cols-3 gap-2">
        <a
          href={BRAND.phoneHref}
          className="flex min-h-12 items-center justify-center gap-1.5 rounded-lg bg-white/10 px-2 text-center font-heading text-[0.72rem] font-bold uppercase tracking-normal text-white"
        >
          <Phone className="h-4 w-4 text-[#F59E0B]" aria-hidden="true" />
          {callLabel}
        </a>
        <a
          href="https://wa.me/14092252012"
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-12 items-center justify-center gap-1.5 rounded-lg bg-white/10 px-2 text-center font-heading text-[0.72rem] font-bold uppercase tracking-normal text-white"
        >
          <MessageCircle className="h-4 w-4 text-[#25D366]" aria-hidden="true" />
          {whatsappLabel}
        </a>
        <Link
          href={quoteHref}
          className="flex min-h-12 items-center justify-center gap-1.5 rounded-lg bg-[#F59E0B] px-2 text-center font-heading text-[0.72rem] font-black uppercase tracking-normal text-[#1C1917]"
        >
          <FileText className="h-4 w-4" aria-hidden="true" />
          {quoteLabel}
        </Link>
      </div>
    </nav>
  );
}
