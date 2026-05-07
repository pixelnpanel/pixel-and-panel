import { cleanHeader, cleanText, emailPattern, escapeHtml, sendEmail } from "@/lib/email";

export const runtime = "nodejs";

function jsonResponse(body, status = 200) {
  return Response.json(body, { status });
}

function buildEmail({ name, email, phone, subject, sourcePage, message }) {
  const submittedAt = new Date().toLocaleString("en-US", {
    timeZone: "America/Chicago",
    dateStyle: "medium",
    timeStyle: "short",
  });

  const safe = {
    name: escapeHtml(name),
    email: escapeHtml(email),
    phone: escapeHtml(phone || "Not provided"),
    subject: escapeHtml(subject || "General Inquiry"),
    sourcePage: escapeHtml(sourcePage || "Not provided"),
    message: escapeHtml(message),
    submittedAt: escapeHtml(`${submittedAt} CT`),
  };

  const text = [
    "New contact message from pixelnpanel.com",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || "Not provided"}`,
    `Subject: ${subject || "General Inquiry"}`,
    `Source Page: ${sourcePage || "Not provided"}`,
    `Submitted: ${submittedAt} CT`,
    "",
    "Message:",
    message,
  ].join("\n");

  const html = `
    <div style="font-family: Arial, sans-serif; color: #1C1917; line-height: 1.6; max-width: 680px;">
      <h1 style="font-size: 22px; color: #0369A1; margin: 0 0 16px;">New Contact Message</h1>
      <table style="border-collapse: collapse; width: 100%; margin: 0 0 20px;">
        <tbody>
          <tr><td style="padding: 8px 0; font-weight: 700;">Name</td><td style="padding: 8px 0;">${safe.name}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: 700;">Email</td><td style="padding: 8px 0;">${safe.email}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: 700;">Phone</td><td style="padding: 8px 0;">${safe.phone}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: 700;">Subject</td><td style="padding: 8px 0;">${safe.subject}</td></tr>
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
  const email = cleanText(payload.email);
  const phone = cleanText(payload.phone);
  const subject = cleanText(payload.subject) || "General Inquiry";
  const message = cleanText(payload.message);
  const company = cleanText(payload.company);
  const sourcePage = cleanText(payload.sourcePage);

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
    email,
    phone,
    subject,
    sourcePage,
    message,
  });

  try {
    await sendEmail({
      fromName: process.env.CONTACT_FROM_NAME || "Pixel & Panel Contact Form",
      to: process.env.CONTACT_TO_EMAIL || "hello@pixelnpanel.com",
      replyTo: email,
      subject: `New Contact Message: ${cleanHeader(subject)}`,
      text,
      html,
    });

    return jsonResponse({ ok: true });
  } catch (error) {
    console.error("Unable to send contact email.", error);
    return jsonResponse({ error: "Unable to send contact message right now." }, 500);
  }
}
