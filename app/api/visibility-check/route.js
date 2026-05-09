import { cleanHeader, cleanText, emailPattern, escapeHtml, sendEmail } from "@/lib/email";

export const runtime = "nodejs";

const HELP_OPTIONS = new Set([
  "Website",
  "Google Business Profile / Local SEO",
  "Signs / Print Materials",
  "QR Code Campaign",
  "Not sure yet",
]);

function jsonResponse(body, status = 200) {
  return Response.json(body, { status });
}

function cleanHelpOptions(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.map(cleanText).filter((item) => HELP_OPTIONS.has(item));
}

function buildEmail({
  name,
  businessName,
  email,
  phone,
  websiteUrl,
  businessCity,
  helpOptions,
  message,
  sourcePage,
  language,
}) {
  const submittedAt = new Date().toLocaleString("en-US", {
    timeZone: "America/Chicago",
    dateStyle: "medium",
    timeStyle: "short",
  });
  const helpText = helpOptions.length ? helpOptions.join(", ") : "Not provided";

  const safe = {
    name: escapeHtml(name),
    businessName: escapeHtml(businessName),
    email: escapeHtml(email || "Not provided"),
    phone: escapeHtml(phone || "Not provided"),
    websiteUrl: escapeHtml(websiteUrl || "Not provided"),
    businessCity: escapeHtml(businessCity || "Not provided"),
    helpOptions: escapeHtml(helpText),
    message: escapeHtml(message || "Not provided"),
    sourcePage: escapeHtml(sourcePage || "/free-visibility-check"),
    language: escapeHtml(language || "English"),
    submittedAt: escapeHtml(`${submittedAt} CT`),
  };

  const text = [
    language === "Spanish"
      ? "Nueva solicitud de chequeo de visibilidad — Pixel & Panel"
      : "New Free Visibility Check Request from pixelnpanel.com",
    "",
    `Language: ${language || "English"}`,
    `Name: ${name}`,
    `Business name: ${businessName}`,
    `Email: ${email || "Not provided"}`,
    `Phone: ${phone || "Not provided"}`,
    `Website URL: ${websiteUrl || "Not provided"}`,
    `Business city: ${businessCity || "Not provided"}`,
    `Selected help options: ${helpText}`,
    `Source page: ${sourcePage || "/free-visibility-check"}`,
    `Submitted: ${submittedAt} CT`,
    "",
    "Message:",
    message || "Not provided",
  ].join("\n");

  const html = `
    <div style="font-family: Arial, sans-serif; color: #1C1917; line-height: 1.6; max-width: 720px;">
      <h1 style="font-size: 22px; color: #0369A1; margin: 0 0 16px;">New Free Visibility Check Request</h1>
      <table style="border-collapse: collapse; width: 100%; margin: 0 0 20px;">
        <tbody>
          <tr><td style="padding: 8px 0; font-weight: 700;">Language</td><td style="padding: 8px 0;">${safe.language}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: 700;">Name</td><td style="padding: 8px 0;">${safe.name}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: 700;">Business name</td><td style="padding: 8px 0;">${safe.businessName}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: 700;">Email</td><td style="padding: 8px 0;">${safe.email}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: 700;">Phone</td><td style="padding: 8px 0;">${safe.phone}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: 700;">Website URL</td><td style="padding: 8px 0;">${safe.websiteUrl}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: 700;">Business city</td><td style="padding: 8px 0;">${safe.businessCity}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: 700;">Selected help options</td><td style="padding: 8px 0;">${safe.helpOptions}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: 700;">Source page</td><td style="padding: 8px 0;">${safe.sourcePage}</td></tr>
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
  const websiteUrl = cleanText(payload.websiteUrl);
  const businessCity = cleanText(payload.businessCity);
  const message = cleanText(payload.message);
  const company = cleanText(payload.company);
  const sourcePage = cleanText(payload.sourcePage) || "/free-visibility-check";
  const language = cleanText(payload.language) || "English";
  const helpOptions = cleanHelpOptions(payload.helpOptions);

  if (company) {
    return jsonResponse({ ok: true });
  }

  if (!name || !businessName) {
    return jsonResponse({ error: "Name and business name are required." }, 400);
  }

  if (!email && !phone) {
    return jsonResponse({ error: "Email or phone is required." }, 400);
  }

  if (email && !emailPattern.test(email)) {
    return jsonResponse({ error: "Please enter a valid email address." }, 400);
  }

  if (!helpOptions.length && !message) {
    return jsonResponse({ error: "Please choose at least one help option or include a message." }, 400);
  }

  const { text, html } = buildEmail({
    name,
    businessName,
    email,
    phone,
    websiteUrl,
    businessCity,
    helpOptions,
    message,
    sourcePage,
    language,
  });

  try {
    await sendEmail({
      fromName: process.env.VISIBILITY_CHECK_FROM_NAME || "Pixel & Panel Visibility Check",
      to: process.env.VISIBILITY_CHECK_TO_EMAIL || "hello@pixelnpanel.com",
      replyTo: email || undefined,
      subject:
        language === "Spanish"
          ? cleanHeader("Nueva solicitud de chequeo de visibilidad — Pixel & Panel")
          : cleanHeader("New Free Visibility Check Request — Pixel & Panel"),
      text,
      html,
    });

    return jsonResponse({ ok: true });
  } catch (error) {
    console.error("Unable to send visibility check request email.", error);
    return jsonResponse({ error: "Unable to send visibility check request right now." }, 500);
  }
}
