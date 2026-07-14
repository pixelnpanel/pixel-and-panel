"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { FB_PIXEL_ID, pageview, event } from "@/lib/fpixel";

export default function MetaPixel() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // App Router does client-side navigation without a full reload, so PageView
  // is fired here on every route change — NOT in the init script below.
  useEffect(() => {
    pageview();
  }, [pathname, searchParams]);

  // Delegated Contact tracking: any WhatsApp or phone link, incl. ones built
  // dynamically, without editing each call site.
  useEffect(() => {
    function onClick(e) {
      const link = e.target.closest?.("a[href]");
      if (!link) return;
      const href = link.getAttribute("href") || "";
      if (
        href.includes("wa.me/14092252012") ||
        href.startsWith("tel:+14092252012") ||
        href.startsWith("tel:14092252012")
      ) {
        event("Contact");
      }
    }
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  if (!FB_PIXEL_ID) return null;

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window,document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${FB_PIXEL_ID}');
        `}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element -- Meta's standard 1x1 noscript tracking pixel; next/image can't render inside <noscript>. */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  );
}
