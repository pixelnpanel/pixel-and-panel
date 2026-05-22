import fs from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const BASE_URL = "http://localhost:3000";
const PUBLIC_URL = "https://www.pixelnpanel.com";
const OUTPUT_DIR = "docs/wording-handoff";
const OUTPUT_JSON = path.join(OUTPUT_DIR, "website-wording-inventory-2026-05-21.json");
const OUTPUT_MD = path.join(OUTPUT_DIR, "website-wording-inventory-2026-05-21.md");

const backendSourceFiles = [
  "app/api/contact/route.js",
  "app/api/quote/route.js",
  "app/api/visibility-check/route.js",
  "app/api/orders/lookup/route.js",
  "app/api/admin/login/route.js",
  "app/api/admin/logout/route.js",
  "app/api/admin/orders/route.js",
  "app/admin/login/page.js",
  "app/admin/orders/page.js",
  "app/(en)/track-order/page.js",
  "app/(es)/es/rastrear-pedido/page.js",
  "lib/order-tracking.js",
  "lib/admin-orders.js",
  "lib/email.js",
];

function cleanLines(text) {
  return [...new Set(
    text
      .split("\n")
      .map((line) => line.replace(/\s+/g, " ").trim())
      .filter(Boolean),
  )];
}

function mdEscape(text = "") {
  return text.replace(/\|/g, "\\|");
}

function isHumanString(value) {
  if (!value || value.length < 3) return false;
  if (!/[A-Za-zÁÉÍÓÚÜÑáéíóúüñ¿]/.test(value)) return false;
  if (/^[.#/[{(:]/.test(value)) return false;
  if (/^(GET|POST|PUT|DELETE|PATCH|true|false|null|async|await|return|const|let|var)$/i.test(value)) return false;
  if (value.includes("className") || value.includes("process.env")) return false;
  return true;
}

async function getSitemapPaths() {
  const xml = await fetch(`${BASE_URL}/sitemap.xml`).then((res) => res.text());
  return [...xml.matchAll(/<loc>(.*?)<\/loc>/g)]
    .map((match) => match[1].replace(PUBLIC_URL, "") || "/")
    .sort((a, b) => a.localeCompare(b));
}

async function capturePage(page, routePath, viewport) {
  await page.setViewportSize(viewport);
  const response = await page.goto(`${BASE_URL}${routePath}`, {
    waitUntil: "networkidle",
    timeout: 30000,
  });

  const data = await page.evaluate(() => {
    const getAttr = (selector, attr) => document.querySelector(selector)?.getAttribute(attr) || "";
    const unique = (items) => [...new Set(items.map((item) => item.trim()).filter(Boolean))];

    return {
      title: document.title,
      metaDescription: document.querySelector('meta[name="description"]')?.content || "",
      canonical: getAttr('link[rel="canonical"]', "href"),
      ogTitle: document.querySelector('meta[property="og:title"]')?.content || "",
      ogDescription: document.querySelector('meta[property="og:description"]')?.content || "",
      headings: unique([...document.querySelectorAll("h1,h2,h3,h4")].map((node) => node.innerText)),
      visibleText: unique((document.body?.innerText || "").split("\n")),
      buttons: unique([...document.querySelectorAll("button,[role='button'],input[type='submit']")].map((node) => node.innerText || node.value || node.getAttribute("aria-label") || "")),
      links: unique([...document.querySelectorAll("a")].map((node) => {
        const text = node.innerText || node.getAttribute("aria-label") || "";
        const href = node.getAttribute("href") || "";
        return text && href ? `${text} -> ${href}` : text;
      })),
      forms: unique([...document.querySelectorAll("label,input,textarea,select")].map((node) => {
        const label = node.tagName.toLowerCase() === "label" ? node.innerText : "";
        const placeholder = node.getAttribute("placeholder") || "";
        const aria = node.getAttribute("aria-label") || "";
        const name = node.getAttribute("name") || "";
        return label || placeholder || aria || name;
      })),
      jsonLdTypes: unique([...document.querySelectorAll('script[type="application/ld+json"]')].map((node) => {
        try {
          const parsed = JSON.parse(node.textContent || "{}");
          return Array.isArray(parsed["@type"]) ? parsed["@type"].join(", ") : parsed["@type"] || "";
        } catch {
          return "Unparsed JSON-LD";
        }
      })),
    };
  });

  return {
    status: response?.status() || null,
    viewport: viewport.width < 768 ? "mobile" : "desktop",
    ...data,
  };
}

async function collectBackendStrings() {
  const groups = [];
  for (const file of backendSourceFiles) {
    try {
      const source = await fs.readFile(file, "utf8");
      const strings = [...source.matchAll(/(["'`])((?:\\.|(?!\1)[\s\S])*?)\1/g)]
        .map((match) => match[2].replace(/\\n/g, " ").replace(/\\"/g, '"').replace(/\\'/g, "'").replace(/\s+/g, " ").trim())
        .filter(isHumanString);
      groups.push({ file, strings: [...new Set(strings)] });
    } catch {
      groups.push({ file, strings: ["File not found during extraction"] });
    }
  }
  return groups;
}

function renderList(items, fallback = "None found") {
  if (!items || items.length === 0) return `- ${fallback}\n`;
  return items.map((item) => `- ${item}`).join("\n") + "\n";
}

function renderMarkdown(inventory) {
  const lines = [];
  lines.push("# Pixel & Panel Website Wording Inventory");
  lines.push("");
  lines.push(`Generated: ${inventory.generatedAt}`);
  lines.push(`Routes crawled: ${inventory.routes.length}`);
  lines.push("");
  lines.push("Purpose: upload this file or the matching PDF to Gemini so it can rewrite page wording, metadata, buttons, and supporting text for clearer local-business SEO in English and Spanish.");
  lines.push("");
  lines.push("## Route Summary");
  lines.push("");
  lines.push("| Route | Desktop title | Mobile title |");
  lines.push("|---|---|---|");
  for (const route of inventory.routes) {
    lines.push(`| ${mdEscape(route.path)} | ${mdEscape(route.desktop.title)} | ${mdEscape(route.mobile.title)} |`);
  }
  lines.push("");

  for (const route of inventory.routes) {
    lines.push("---");
    lines.push("");
    lines.push(`## ${route.path}`);
    lines.push("");
    lines.push("### Desktop Metadata");
    lines.push("");
    lines.push(`- Status: ${route.desktop.status}`);
    lines.push(`- Title: ${route.desktop.title}`);
    lines.push(`- Meta description: ${route.desktop.metaDescription}`);
    lines.push(`- Canonical: ${route.desktop.canonical}`);
    lines.push(`- OG title: ${route.desktop.ogTitle}`);
    lines.push(`- OG description: ${route.desktop.ogDescription}`);
    lines.push(`- JSON-LD types: ${route.desktop.jsonLdTypes.join(", ") || "None found"}`);
    lines.push("");
    lines.push("### Desktop Visible Text");
    lines.push("");
    lines.push(renderList(route.desktop.visibleText));
    lines.push("### Desktop Headings");
    lines.push("");
    lines.push(renderList(route.desktop.headings));
    lines.push("### Desktop Buttons / Controls");
    lines.push("");
    lines.push(renderList(route.desktop.buttons));
    lines.push("### Desktop Links");
    lines.push("");
    lines.push(renderList(route.desktop.links));
    lines.push("### Desktop Forms / Placeholders");
    lines.push("");
    lines.push(renderList(route.desktop.forms));
    lines.push("### Mobile Metadata");
    lines.push("");
    lines.push(`- Status: ${route.mobile.status}`);
    lines.push(`- Title: ${route.mobile.title}`);
    lines.push(`- Meta description: ${route.mobile.metaDescription}`);
    lines.push(`- Canonical: ${route.mobile.canonical}`);
    lines.push(`- OG title: ${route.mobile.ogTitle}`);
    lines.push(`- OG description: ${route.mobile.ogDescription}`);
    lines.push(`- JSON-LD types: ${route.mobile.jsonLdTypes.join(", ") || "None found"}`);
    lines.push("");
    lines.push("### Mobile Visible Text");
    lines.push("");
    lines.push(renderList(route.mobile.visibleText));
    lines.push("### Mobile Buttons / Controls");
    lines.push("");
    lines.push(renderList(route.mobile.buttons));
    lines.push("### Mobile Links");
    lines.push("");
    lines.push(renderList(route.mobile.links));
    lines.push("### Mobile Forms / Placeholders");
    lines.push("");
    lines.push(renderList(route.mobile.forms));
    lines.push("");
  }

  lines.push("---");
  lines.push("");
  lines.push("## Backend / Admin / Email Source Strings");
  lines.push("");
  for (const group of inventory.backendStrings) {
    lines.push(`### ${group.file}`);
    lines.push("");
    lines.push(renderList(group.strings));
  }

  return lines.join("\n");
}

async function main() {
  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  const paths = await getSitemapPaths();
  const browser = await chromium.launch({
    headless: true,
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  });
  const page = await browser.newPage();
  const routes = [];

  for (const routePath of paths) {
    const desktop = await capturePage(page, routePath, { width: 1440, height: 1200 });
    const mobile = await capturePage(page, routePath, { width: 390, height: 1200 });
    routes.push({ path: routePath, desktop, mobile });
    console.log(`Captured ${routePath}`);
  }

  await browser.close();

  const inventory = {
    generatedAt: new Date().toISOString(),
    baseUrl: PUBLIC_URL,
    routes,
    backendStrings: await collectBackendStrings(),
  };

  await fs.writeFile(OUTPUT_JSON, JSON.stringify(inventory, null, 2));
  await fs.writeFile(OUTPUT_MD, renderMarkdown(inventory));
  console.log(`Wrote ${OUTPUT_JSON}`);
  console.log(`Wrote ${OUTPUT_MD}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
