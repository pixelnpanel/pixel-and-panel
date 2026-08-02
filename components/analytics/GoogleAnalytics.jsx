import Script from "next/script";

// GA4 is loaded HERE and nowhere else.
//
// This component was briefly deleted on the theory that the GTM container was
// loading GA4 too, because the browser showed two requests for
// `gtag/js?id=G-JF7FQTJRHJ`. That reading was wrong: gtag.js always re-requests
// itself once with `&cx=c&gtm=<hash>` appended as part of its own bootstrap, so
// two requests are what a single healthy install looks like. Container
// GTM-W5NHMVJF holds the Meta and Pinterest tags but has no GA4 Configuration
// tag, so removing this took GA4 off the site entirely — zero gtag/js loads,
// zero /g/collect hits, window.gtag undefined.
//
// Before changing anything here, check the live page for a `/g/collect`
// request. That is the only thing that proves GA4 is actually reporting.
export default function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID || "G-JF7FQTJRHJ";

  if (!gaId) return null;

  return (
    <>
      {/* afterInteractive, not lazyOnload: lazyOnload waits for the window load
          event, which left a window where a visitor could tap a phone link or
          submit the quote form before gtag existed and have the conversion go
          nowhere. */}
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = window.gtag || gtag;
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `}
      </Script>
    </>
  );
}
