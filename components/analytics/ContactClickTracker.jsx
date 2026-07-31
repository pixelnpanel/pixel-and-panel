"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackContactClick } from "@/lib/analytics";

// Phone and WhatsApp taps are conversions — for a sign shop they are often the
// highest-intent ones — but they leave the page instead of hitting a form, so
// nothing else on the site records them.
//
// One delegated listener covers every such link on every page, including links
// built at runtime (the product calculator's prefilled WhatsApp message) and
// ones added later, so no call site has to remember to fire an event. It also
// means changing the phone number never silently breaks tracking: the match is
// on the URL scheme and the WhatsApp hosts, not on a hardcoded number.
const WHATSAPP_HOSTS = ["wa.me", "api.whatsapp.com", "web.whatsapp.com"];

function channelFor(href) {
  if (href.startsWith("tel:")) return "phone";
  if (WHATSAPP_HOSTS.some((host) => href.includes(host))) return "whatsapp";
  return null;
}

export default function ContactClickTracker() {
  const pathname = usePathname();

  useEffect(() => {
    function onClick(e) {
      const link = e.target.closest?.("a[href]");
      if (!link) return;

      const channel = channelFor(link.getAttribute("href") || "");
      if (channel) trackContactClick(channel, { sourcePath: pathname });
    }

    // Capture phase so the event is queued before the browser hands off to the
    // dialer or to WhatsApp and this document stops running.
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [pathname]);

  return null;
}
