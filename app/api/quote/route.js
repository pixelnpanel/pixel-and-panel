import { cleanHeader, cleanText, emailPattern, escapeHtml, sendEmail } from "@/lib/email";
import { getClientIp, rateLimit, rateLimitResponse } from "@/lib/rate-limit";

export const runtime = "nodejs";

const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/svg+xml",
  "application/pdf",
  "application/postscript",
]);
const ALLOWED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg", ".pdf", ".ai", ".eps"]);
const MAX_FILE_BYTES = 4 * 1024 * 1024; // 4 MB

function jsonResponse(body, status = 200) {
  return Response.json(body, { status });
}

function getFileExtension(filename) {
  const index = filename.lastIndexOf(".");
  return index >= 0 ? filename.slice(index).toLowerCase() : "";
}

function isAllowedAttachment(file) {
  return ALLOWED_TYPES.has(file.type) || ALLOWED_EXTENSIONS.has(getFileExtension(file.name));
}

function buildEmail({ name, businessName, email, phone, productService, sourcePage, message, language, hasAttachment }) {
  const submittedAt = new Date().toLocaleString("en-US", {
    timeZone: "America/Chicago",
    dateStyle: "medium",
    timeStyle: "short",
  });

  const safe = {
    name: escapeHtml(name),
    businessName: escapeHtml(businessName || "Not provided"),
    email: escapeHtml(email || "Not provided"),
    phone: escapeHtml(phone || "Not provided"),
    productService: escapeHtml(productService || "General Quote"),
    sourcePage: escapeHtml(sourcePage || "Not provided"),
    message: escapeHtml(message),
    language: escapeHtml(language || "English"),
    submittedAt: escapeHtml(`${submittedAt} CT`),
  };

  const text = [
    language === "Spanish"
      ? "Nueva solicitud de cotización — Pixel & Panel"
      : "New quote request from pixelnpanel.com",
    "",
    `Language: ${language || "English"}`,
    `Name: ${name}`,
    `Business: ${businessName || "Not provided"}`,
    `Email: ${email || "Not provided"}`,
    `Phone: ${phone || "Not provided"}`,
    `Product/Service: ${productService || "General Quote"}`,
    `Source Page: ${sourcePage || "Not provided"}`,
    `Submitted: ${submittedAt} CT`,
    hasAttachment ? "Attachment: yes (see attached file)" : "",
    "",
    "Message:",
    message,
  ].filter((l) => l !== undefined).join("\n");

  const html = `
    <div style="font-family: Arial, sans-serif; color: #1C1917; line-height: 1.6; max-width: 680px;">
      <h1 style="font-size: 22px; color: #0369A1; margin: 0 0 16px;">New Quote Request</h1>
      <table style="border-collapse: collapse; width: 100%; margin: 0 0 20px;">
        <tbody>
          <tr><td style="padding: 8px 0; font-weight: 700;">Language</td><td style="padding: 8px 0;">${safe.language}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: 700;">Name</td><td style="padding: 8px 0;">${safe.name}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: 700;">Business</td><td style="padding: 8px 0;">${safe.businessName}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: 700;">Email</td><td style="padding: 8px 0;">${safe.email}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: 700;">Phone</td><td style="padding: 8px 0;">${safe.phone}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: 700;">Product/Service</td><td style="padding: 8px 0;">${safe.productService}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: 700;">Source Page</td><td style="padding: 8px 0;">${safe.sourcePage}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: 700;">Submitted</td><td style="padding: 8px 0;">${safe.submittedAt}</td></tr>
          ${hasAttachment ? '<tr><td style="padding: 8px 0; font-weight: 700;">Attachment</td><td style="padding: 8px 0;">✓ See attached file</td></tr>' : ""}
        </tbody>
      </table>
      <div style="background: #FAF8F4; border-left: 4px solid #F59E0B; padding: 16px;">
        <h2 style="font-size: 16px; margin: 0 0 8px; color: #1C1917;">Message</h2>
        <p style="white-space: pre-wrap; margin: 0;">${safe.message}</p>
      </div>
    </div>
  `;

  return { text, html };
}

export async function POST(request) {
  const ip = getClientIp(request);
  const limiter = await rateLimit({
    key: `quote:${ip}`,
    limit: 5,
    windowMs: 10 * 60 * 1000,
  });

  if (!limiter.success) {
    return rateLimitResponse(limiter.resetTime);
  }

  let formData;
  try {
    formData = await request.formData();
  } catch {
    return jsonResponse({ error: "Invalid request body." }, 400);
  }

  const name = cleanText(formData.get("name"));
  const businessName = cleanText(formData.get("businessName"));
  const email = cleanText(formData.get("email"));
  const phone = cleanText(formData.get("phone"));
  const productService = cleanText(formData.get("productService")) || "General Quote";
  const message = cleanText(formData.get("message"));
  const company = cleanText(formData.get("company"));
  const sourcePage = cleanText(formData.get("sourcePage"));
  const language = cleanText(formData.get("language")) || "English";

  if (company) {
    return jsonResponse({ ok: true });
  }

  if (!name || !message) {
    return jsonResponse({ error: "Name and project details are required." }, 400);
  }

  if (!email && !phone) {
    return jsonResponse({ error: "Email or phone is required." }, 400);
  }

  if (email && !emailPattern.test(email)) {
    return jsonResponse({ error: "Please enter a valid email address." }, 400);
  }

  // Process optional file attachment
  const attachments = [];
  const file = formData.get("attachment");
  if (file && file instanceof File && file.size > 0) {
    if (file.size > MAX_FILE_BYTES) {
      return jsonResponse({ error: "File must be 4 MB or smaller." }, 400);
    }
    if (!isAllowedAttachment(file)) {
      return jsonResponse({ error: "Only JPG, PNG, PDF, GIF, WebP, SVG, and AI/EPS files are allowed." }, 400);
    }
    const buffer = Buffer.from(await file.arrayBuffer());
    attachments.push({ filename: file.name, content: buffer, contentType: file.type });
  }

  const { text, html } = buildEmail({
    name,
    businessName,
    email,
    phone,
    productService,
    sourcePage,
    message,
    language,
    hasAttachment: attachments.length > 0,
  });

  try {
    await sendEmail({
      fromName: process.env.QUOTE_FROM_NAME || "Pixel & Panel Website",
      to: process.env.QUOTE_TO_EMAIL || "hello@pixelnpanel.com",
      replyTo: email || undefined,
      subject:
        language === "Spanish"
          ? cleanHeader("Nueva solicitud de cotización — Pixel & Panel")
          : `New Quote Request: ${cleanHeader(productService)}`,
      text,
      html,
      attachments,
    });

    return jsonResponse({ ok: true });
  } catch (error) {
    console.error("Unable to send quote request email.", error);
    return jsonResponse({ error: "Unable to send quote request right now." }, 500);
  }
}
