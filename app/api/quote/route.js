import { cleanHeader, cleanText, emailPattern, escapeHtml, sendEmail } from "@/lib/email";
import { getClientIp, rateLimit, rateLimitResponse } from "@/lib/rate-limit";
import { quoteSelectionLines, validReplyPhone } from "@/lib/quote-selection";
import { logLeadFailure } from "@/lib/lead-delivery";
import { deliverWebsiteLead } from "@/lib/website-lead-delivery";

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

function buildEmail({
  name,
  businessName,
  email,
  phone,
  productService,
  selectedCategory,
  selectedProduct,
  selectedPackage,
  replyMethod,
  selection,
  sourcePage,
  message,
  language,
  hasAttachment,
}) {
  const submittedAt = new Date().toLocaleString("en-US", {
    timeZone: "America/Chicago",
    dateStyle: "medium",
    timeStyle: "short",
  });
  const isProductRequest = Boolean(selectedProduct);
  const isPackageRequest = !isProductRequest && Boolean(selectedPackage);
  const emptyFallback = isPackageRequest ? "" : "Not provided";
  const selectedLines = isProductRequest
    ? [
        `Selected Category: ${selectedCategory || "Not provided"}`,
        `Selected Product: ${selectedProduct}`,
        ...selection,
      ]
    : isPackageRequest
      ? [
          `Selected Category: ${selectedCategory || ""}`,
          `Selected Package: ${selectedPackage}`,
          `Preferred reply: ${replyMethod === "phone" ? "Phone" : "Email"}`,
        ]
      : [];
  const messageLabel = isPackageRequest ? "Message / Notes" : "Message";

  const safe = {
    name: escapeHtml(name),
    businessName: escapeHtml(businessName || emptyFallback),
    email: escapeHtml(email || emptyFallback),
    phone: escapeHtml(phone || emptyFallback),
    productService: escapeHtml(productService || "General Quote"),
    selectedCategory: escapeHtml(selectedCategory || emptyFallback),
    selectedProduct: escapeHtml(selectedProduct || emptyFallback),
    selectedPackage: escapeHtml(selectedPackage || emptyFallback),
    sourcePage: escapeHtml(sourcePage || "Not provided"),
    message: escapeHtml(message),
    language: escapeHtml(language || "English"),
    submittedAt: escapeHtml(`${submittedAt} CT`),
  };

  const text = [
    language === "Spanish"
      ? "Nueva solicitud de cotización — Pixel & Panel"
      : "New quote request from www.pixelnpanel.com",
    "",
    `Language: ${language || "English"}`,
    ...selectedLines,
    `Name: ${name}`,
    `Phone Number: ${phone || emptyFallback}`,
    `Business Name: ${businessName || emptyFallback}`,
    `Email: ${email || emptyFallback}`,
    ...(!isPackageRequest ? [`Product/Service: ${productService || "General Quote"}`] : []),
    `Source Page: ${sourcePage || "Not provided"}`,
    `Submitted: ${submittedAt} CT`,
    hasAttachment ? "Attachment: yes (see attached file)" : "",
    "",
    `${messageLabel}:`,
    message,
  ].filter((l) => l !== undefined).join("\n");

  const html = `
    <div style="font-family: Arial, sans-serif; color: #1C1917; line-height: 1.6; max-width: 680px;">
      <h1 style="font-size: 22px; color: #0369A1; margin: 0 0 16px;">New Quote Request</h1>
      <table style="border-collapse: collapse; width: 100%; margin: 0 0 20px;">
        <tbody>
          <tr><td style="padding: 8px 0; font-weight: 700;">Language</td><td style="padding: 8px 0;">${safe.language}</td></tr>
          ${isProductRequest ? `<tr><td style="padding: 8px 0; font-weight: 700;">Selected Category</td><td style="padding: 8px 0;">${safe.selectedCategory}</td></tr>` : ""}
          ${isProductRequest ? `<tr><td style="padding: 8px 0; font-weight: 700;">Selected Product</td><td style="padding: 8px 0;">${safe.selectedProduct}</td></tr>` : ""}
          ${isProductRequest && selection.length ? `<tr><td style="padding: 8px 0; font-weight: 700;">Selected options</td><td style="padding: 8px 0;">${selection.map(escapeHtml).join("<br>")}</td></tr>` : ""}
          ${isPackageRequest ? `<tr><td style="padding: 8px 0; font-weight: 700;">Selected Category</td><td style="padding: 8px 0;">${safe.selectedCategory}</td></tr>` : ""}
          ${isPackageRequest ? `<tr><td style="padding: 8px 0; font-weight: 700;">Selected Package</td><td style="padding: 8px 0;">${safe.selectedPackage}</td></tr>` : ""}
          ${isPackageRequest ? `<tr><td style="padding: 8px 0; font-weight: 700;">Preferred reply</td><td style="padding: 8px 0;">${replyMethod === "phone" ? "Phone" : "Email"}</td></tr>` : ""}
          <tr><td style="padding: 8px 0; font-weight: 700;">Name</td><td style="padding: 8px 0;">${safe.name}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: 700;">Phone Number</td><td style="padding: 8px 0;">${safe.phone}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: 700;">Business Name</td><td style="padding: 8px 0;">${safe.businessName}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: 700;">Email</td><td style="padding: 8px 0;">${safe.email}</td></tr>
          ${!isPackageRequest ? `<tr><td style="padding: 8px 0; font-weight: 700;">Product/Service</td><td style="padding: 8px 0;">${safe.productService}</td></tr>` : ""}
          <tr><td style="padding: 8px 0; font-weight: 700;">Source Page</td><td style="padding: 8px 0;">${safe.sourcePage}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: 700;">Submitted</td><td style="padding: 8px 0;">${safe.submittedAt}</td></tr>
          ${hasAttachment ? '<tr><td style="padding: 8px 0; font-weight: 700;">Attachment</td><td style="padding: 8px 0;">✓ See attached file</td></tr>' : ""}
        </tbody>
      </table>
      <div style="background: #FAF8F4; border-left: 4px solid #F59E0B; padding: 16px;">
        <h2 style="font-size: 16px; margin: 0 0 8px; color: #1C1917;">${messageLabel}</h2>
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

  if ([...formData.values()].some((value) => typeof value === "string" && value.length > 10000)) {
    return jsonResponse({ error: "Please keep each field under 10,000 characters." }, 400);
  }

  const name = cleanText(formData.get("name"));
  const businessName = cleanText(formData.get("businessName"));
  const email = cleanText(formData.get("email"));
  const phone = cleanText(formData.get("phone"));
  const productService = cleanText(formData.get("productService")) || "General Quote";
  const selectedCategory = cleanText(formData.get("selectedCategory"));
  const selectedProduct = cleanText(formData.get("selectedProduct"));
  const selectedPackageValue = cleanText(formData.get("selectedPackage"));
  const selectedPackage = selectedProduct ? "" : selectedPackageValue;
  const message = cleanText(formData.get("message"));
  const company = cleanText(formData.get("company"));
  const sourcePage = cleanText(formData.get("sourcePage"));
  const language = cleanText(formData.get("language")) || "English";
  const isPackageRequest = Boolean(selectedPackage);
  const requestedReply = cleanText(formData.get("replyMethod"));
  const replyMethod = ["email", "phone"].includes(requestedReply) ? requestedReply : (email ? "email" : "phone");
  const selection = selectedProduct ? quoteSelectionLines({
    size: cleanText(formData.get("selectedSize")).slice(0, 120),
    side: cleanText(formData.get("selectedSide")).slice(0, 80),
    material: cleanText(formData.get("selectedMaterial")).slice(0, 120),
    configuration: cleanText(formData.get("selectedConfiguration")).slice(0, 120),
    quantity: cleanText(formData.get("requestedQuantity")),
    language,
  }) : [];

  if (company) {
    return jsonResponse({ ok: true });
  }

  if (!name) {
    return jsonResponse({ error: "Name is required." }, 400);
  }

  if (isPackageRequest && (replyMethod === "phone" ? !validReplyPhone(phone) : !emailPattern.test(email))) {
    return jsonResponse({ error: replyMethod === "phone" ? "Please enter a valid phone number." : "Please enter a valid email address." }, 400);
  }

  if (!isPackageRequest && !message) {
    return jsonResponse({ error: "Name and project details are required." }, 400);
  }

  if (!isPackageRequest && !email && !phone) {
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

  const details = {
    name,
    businessName,
    email,
    phone,
    productService,
    selectedCategory,
    selectedProduct,
    selectedPackage,
    replyMethod,
    selection,
    sourcePage,
    message,
    language,
    hasAttachment: attachments.length > 0,
  };

  try {
    const reference = await deliverWebsiteLead(
      "quote", request, [details, attachments[0]?.filename, attachments[0]?.contentType],
      async (ref) => {
        const { text, html } = buildEmail(details);
        const recipient = process.env.QUOTE_TO_EMAIL || "hello@pixelnpanel.com";
        const spanish = language === "Spanish";
        await sendEmail({
          fromName: process.env.QUOTE_FROM_NAME || "Pixel & Panel Website",
          to: recipient,
          replyTo: email || undefined,
          subject: spanish ? `[${ref}] Nueva solicitud de cotización` : `[${ref}] New Quote Request: ${cleanHeader(productService)}`,
          text,
          html,
          attachments,
        });
      },
      attachments[0]?.content,
    );

    return jsonResponse({ ok: true, accepted: true, reference });
  } catch (error) {
    logLeadFailure("quote", "internal message", error);
    return jsonResponse({ error: "Unable to send quote request right now." }, 500);
  }
}
