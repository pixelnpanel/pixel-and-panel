import { cleanHeader, cleanText, emailPattern, escapeHtml, sendEmail } from "@/lib/email";

export const runtime = "nodejs";

function jsonResponse(body, status = 200) {
  return Response.json(body, { status });
}

function buildEmail({ name, businessName, email, phone, productService, sourcePage, message, language }) {
  const submittedAt = new Date().toLocaleString("en-US", {
    timeZone: "America/Chicago",
    dateStyle: "medium",
    timeStyle: "short",
  });

  const safe = {
    name: escapeHtml(name),
    businessName: escapeHtml(businessName || "Not provided"),
    email: escapeHtml(email),
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
    `Email: ${email}`,
    `Phone: ${phone || "Not provided"}`,
    `Product/Service: ${productService || "General Quote"}`,
    `Source Page: ${sourcePage || "Not provided"}`,
    `Submitted: ${submittedAt} CT`,
    "",
    "Message:",
    message,
  ].join("\n");

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
  let payload;

  try {
    payload = await request.json();
  } catch {
    return jsonResponse({ error: "Invalid request body." }, 400);
  }

  const name = cleanText(payload.name);
  const businessName = cleanText(payload.businessName);
  const email = cleanText(payload.email);
  const phone = cleanText(payload.phone);
  const productService = cleanText(payload.productService) || "General Quote";
  const message = cleanText(payload.message);
  const company = cleanText(payload.company);
  const sourcePage = cleanText(payload.sourcePage);
  const language = cleanText(payload.language) || "English";

  if (company) {
    return jsonResponse({ ok: true });
  }

  if (!name || !email || !message) {
    return jsonResponse({ error: "Name, email, and message are required." }, 400);
  }

  if (!emailPattern.test(email)) {
    return jsonResponse({ error: "Please enter a valid email address." }, 400);
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
  });

  try {
    await sendEmail({
      fromName: process.env.QUOTE_FROM_NAME || "Pixel & Panel Website",
      to: process.env.QUOTE_TO_EMAIL || "hello@pixelnpanel.com",
      replyTo: email,
      subject:
        language === "Spanish"
          ? cleanHeader("Nueva solicitud de cotización — Pixel & Panel")
          : `New Quote Request: ${cleanHeader(productService)}`,
      text,
      html,
    });

    return jsonResponse({ ok: true });
  } catch (error) {
    console.error("Unable to send quote request email.", error);
    return jsonResponse({ error: "Unable to send quote request right now." }, 500);
  }
}
