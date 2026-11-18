"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { attachAnalyticsRelay, trackPageView } from "@/lib/analytics";
import { analyticsReferrer, analyticsRelayOrigin, analyticsUrl } from "@/lib/analytics-privacy";

function sanitizeVercelEvent(event) {
  const url = analyticsUrl(event.url, window.location.origin);
  if (!url) return null;
  return {
    ...event,
    url,
    ...("referrer" in event ? { referrer: analyticsReferrer(event.referrer) } : {}),
  };
}

export default function SiteAnalytics() {
  const pathname = usePathname();
  const frame = useRef(null);
  const relayOrigin = useRef(null);
  const previousPath = useRef(null);

  useEffect(() => {
    const origin = analyticsRelayOrigin(window.location.href);
    if (!origin || !frame.current) return;
    relayOrigin.current = origin;
    function connect(event) {
      if (event.origin !== origin || event.data !== "analytics-ready") return;
      if (event.source !== frame.current?.contentWindow) return;
      attachAnalyticsRelay(event.source, origin);
    }
    window.addEventListener("message", connect);
    frame.current.src = origin + "/analytics-frame";
    return () => window.removeEventListener("message", connect);
  }, []);

  useEffect(() => {
    if (previousPath.current === pathname) return;
    previousPath.current = pathname;
    trackPageView();
  }, [pathname]);

  return (
    <>
      <iframe
        ref={frame}
        title="Site analytics"
        hidden
        sandbox="allow-scripts allow-same-origin"
        referrerPolicy="no-referrer"
        onLoad={() => {
          if (relayOrigin.current) frame.current?.contentWindow?.postMessage({ type: "connect" }, relayOrigin.current);
        }}
      />
      <Analytics beforeSend={sanitizeVercelEvent} />
      <SpeedInsights beforeSend={sanitizeVercelEvent} />
    </>
  );
}
