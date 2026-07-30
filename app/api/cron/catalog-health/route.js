import crypto from "crypto";
import { sendEmail } from "@/lib/email";

// Daily canary for the Google Sheet the signage catalog is built from.
//
// Both fetches in lib/signage/data.js degrade *silently* — a broken price CSV
// renders an empty catalog (no categories on /signage, no product URLs in the
// sitemap) and a broken content CSV drops every product page back to generated
// copy. Each only leaves a console.warn behind, which nobody reads. This route
// tests the live sources and emails when one goes bad.
//
// Fails closed: with no CRON_SECRET set the endpoint refuses to run, so the
// path is never an open trigger.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SOURCES = [
  {
    env: "SIGNAGE_SHEET_CSV_URL",
    label: "Price sheet",
    impact: "The whole catalog empties: /signage renders zero categories and every product URL leaves the sitemap.",
  },
  {
    env: "SIGNAGE_CONTENT_CSV_URL",
    label: "Product content",
    impact: "Every product page falls back to generated copy — long-form content, specs and FAQs disappear.",
  },
];

function safeEqual(a, b) {
  const left = Buffer.from(String(a || ""));
  const right = Buffer.from(String(b || ""));
  return left.length === right.length && crypto.timingSafeEqual(left, right);
}

function isAuthorized(request) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  return safeEqual(request.headers.get("authorization") || "", `Bearer ${secret}`);
}

async function checkSource({ env, label, impact }) {
  const url = process.env[env];
  if (!url) {
    return { label, impact, ok: false, detail: `${env} is not set.` };
  }

  try {
    // cache: "no-store" on purpose — the point is to test the live source, not
    // the ISR copy the site is currently serving from.
    const res = await fetch(url, { cache: "no-store", redirect: "follow" });
    if (!res.ok) {
      return { label, impact, ok: false, detail: `HTTP ${res.status} ${res.statusText}` };
    }

    const text = await res.text();

    // A revoked "publish to web" link answers 200 with a sign-in page rather
    // than a 404, so the status code alone does not prove the sheet is live.
    if (text.trimStart().startsWith("<")) {
      return {
        label,
        impact,
        ok: false,
        detail: "Responded with HTML instead of CSV — the publish-to-web link was most likely revoked.",
      };
    }

    // Approximate: a quoted field can hold a newline. Close enough for a canary
    // whose only question is "did this go to zero?".
    const rows = text.trim().split("\n").length - 1;
    if (rows < 1) {
      return { label, impact, ok: false, detail: "CSV has a header row but no data rows." };
    }

    return { label, impact, ok: true, detail: `${rows} data row${rows === 1 ? "" : "s"}` };
  } catch (err) {
    return { label, impact, ok: false, detail: `Fetch threw: ${err.message}` };
  }
}

async function sendAlert(failures) {
  const to = process.env.CATALOG_ALERT_TO_EMAIL || process.env.CONTACT_TO_EMAIL;
  if (!to) return { sent: false, reason: "No CATALOG_ALERT_TO_EMAIL or CONTACT_TO_EMAIL configured." };

  const body = [
    "The daily signage catalog check found a problem with the Google Sheet feed.",
    "",
    ...failures.flatMap((f) => [`${f.label}: ${f.detail}`, `Impact: ${f.impact}`, ""]),
    "Check that the sheet is still shared via File → Share → Publish to web (CSV),",
    "then confirm the site recovered at https://www.pixelnpanel.com/signage",
  ].join("\n");

  try {
    await sendEmail({
      to,
      fromName: "Pixel & Panel Catalog Monitor",
      subject: `Signage catalog feed problem — ${failures.map((f) => f.label).join(", ")}`,
      text: body,
    });
    return { sent: true };
  } catch (err) {
    // Never fail the cron over the alert channel — the log still records it.
    console.error("[catalog-health] alert email failed to send.", err);
    return { sent: false, reason: err.message };
  }
}

export async function GET(request) {
  if (!isAuthorized(request)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const results = await Promise.all(SOURCES.map(checkSource));
  const failures = results.filter((r) => !r.ok);
  const healthy = failures.length === 0;

  if (!healthy) {
    console.error("[catalog-health] unhealthy:", failures.map((f) => `${f.label} — ${f.detail}`).join(" | "));
    const alert = await sendAlert(failures);
    return Response.json({ healthy, results, alert }, { status: 200 });
  }

  return Response.json({ healthy, results }, { status: 200 });
}
