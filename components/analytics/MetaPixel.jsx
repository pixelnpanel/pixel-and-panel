"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { FB_PIXEL_ID, pageview } from "@/lib/fpixel";

export default function MetaPixel() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // App Router does client-side navigation without a full reload, so PageView
  // is fired here on every route change — NOT in the init script below.
  useEffect(() => {
    pageview();
  }, [pathname, searchParams]);

  // Phone / WhatsApp clicks used to be tracked from here, Meta-only and keyed
  // to a hardcoded number. They now run through ContactClickTracker, which
  // reports the same clicks to GA4 as well and matches on the link scheme
  // rather than the number.

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
