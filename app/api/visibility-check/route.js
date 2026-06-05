import { cleanHeader, cleanText, emailPattern, escapeHtml, sendEmail } from "@/lib/email";
import { getClientIp, rateLimit, rateLimitResponse } from "@/lib/rate-limit";

export const runtime = "nodejs";

const CAMPAIGN_HELP_OPTIONS = new Set([
  "Website",
  "Google Business Profile",
  "Local SEO",
  "Business Cards / Flyers",
  "Yard Signs / Banners",
  "Vehicle Graphics",
  "QR Code Campaigns",
  "Not Sure Yet",
]);

const LEGACY_HELP_OPTIONS = new Set([
  "Website",
  "Google Business Profile / Local SEO",
  "Signs / Print Materials",
  "QR Code Campaign",
  "Not sure yet",
]);

const SUCCESS_MESSAGE =
  "Thank you. Your free visibility check request was sent successfully. Pixel & Panel will review it and follow up soon.";
const ERROR_MESSAGE = "Unable to send visibility check request right now.";

function jsonResponse(body, status = 200) {
  return Response.json(body, { status });
}

function cleanCampaignHelpOption(value) {
  const option = cleanText(value);
  return CAMPAIGN_HELP_OPTIONS.has(option) ? option : "";
}

function cleanHelpOptions(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.map(cleanText).filter((item) => LEGACY_HELP_OPTIONS.has(item));
}

function submittedAtLabel(date = new Date()) {
  const submittedAt = date.toLocaleString("en-US", {
    timeZone: "America/Chicago",
    dateStyle: "medium",
    timeStyle: "short",
  });

  return `${submittedAt} CT`;
}

async function sendZohoFlowWebhook({
  name,
  businessName,
  phone,
  email,
  helpNeeded,
  message,
  source,
  campaign,
  utmSource,
  utmMedium,
  utmCampaign,
  submittedFrom,
  submittedAtIso,
}) {
  const webhookUrl = process.env.ZOHO_FLOW_WEBHOOK_URL;
  if (!webhookUrl) return;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date: submittedAtIso.slice(0, 10),
        name,
        businessName,
        phone,
        email,
        helpNeeded,
        message,
        source,
        campaign,
        utm_source: utmSource,
        utm_medium: utmMedium,
        utm_campaign: utmCampaign,
        submittedFrom,
        submittedAt: submittedAtIso,
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`Zoho Flow webhook responded with ${response.status}.`);
    }
  } catch (error) {
    console.error("Unable to send visibility check lead to Zoho Flow webhook.", error);
  } finally {
    clearTimeout(timeout);
  }
}

function buildInternalEmail({
  name,
  businessName,
  email,
  phone,
  needHelpWith,
  message,
  source,
  campaign,
  utmSource,
  utmMedium,
  utmCampaign,
  sourcePage,
  submittedAt,
  language,
  websiteUrl,
  businessCity,
}) {
  const safe = {
    name: escapeHtml(name),
    businessName: escapeHtml(businessName),
    phone: escapeHtml(phone || "Not provided"),
    email: escapeHtml(email || "Not provided"),
    needHelpWith: escapeHtml(needHelpWith || "Not provided"),
    message: escapeHtml(message || "Not provided"),
    source: escapeHtml(source || "direct"),
    campaign: escapeHtml(campaign || "local-launch"),
    utmSource: escapeHtml(utmSource || ""),
    utmMedium: escapeHtml(utmMedium || ""),
    utmCampaign: escapeHtml(utmCampaign || ""),
    sourcePage: escapeHtml(sourcePage || "/free-visibility-check"),
    submittedAt: escapeHtml(submittedAt),
    language: escapeHtml(language || "English"),
    websiteUrl: escapeHtml(websiteUrl || ""),
    businessCity: escapeHtml(businessCity || ""),
  };

  const text = [
    "New Free Visibility Check Lead - Pixel & Panel",
    "",
    `Name: ${name}`,
    `Business Name: ${businessName}`,
    `Phone: ${phone || "Not provided"}`,
    `Email: ${email || "Not provided"}`,
    `What do you need help with? ${needHelpWith || "Not provided"}`,
    `Message: ${message || "Not provided"}`,
    `Source: ${source || "direct"}`,
    `Campaign: ${campaign || "local-launch"}`,
    utmSource ? `UTM Source: ${utmSource}` : "",
    utmMedium ? `UTM Medium: ${utmMedium}` : "",
    utmCampaign ? `UTM Campaign: ${utmCampaign}` : "",
    `Page submitted from: ${sourcePage || "/free-visibility-check"}`,
    `Date/time: ${submittedAt}`,
    websiteUrl ? `Website URL: ${websiteUrl}` : "",
    businessCity ? `Business city: ${businessCity}` : "",
    `Language: ${language || "English"}`,
  ].filter(Boolean).join("\n");

  const trackingRows = [
    utmSource
      ? `<tr><td style="padding: 8px 0; font-weight: 700;">UTM Source</td><td style="padding: 8px 0;">${safe.utmSource}</td></tr>`
      : "",
    utmMedium
      ? `<tr><td style="padding: 8px 0; font-weight: 700;">UTM Medium</td><td style="padding: 8px 0;">${safe.utmMedium}</td></tr>`
      : "",
    utmCampaign
      ? `<tr><td style="padding: 8px 0; font-weight: 700;">UTM Campaign</td><td style="padding: 8px 0;">${safe.utmCampaign}</td></tr>`
      : "",
  ].join("");

  const optionalRows = [
    websiteUrl
      ? `<tr><td style="padding: 8px 0; font-weight: 700;">Website URL</td><td style="padding: 8px 0;">${safe.websiteUrl}</td></tr>`
      : "",
    businessCity
      ? `<tr><td style="padding: 8px 0; font-weight: 700;">Business city</td><td style="padding: 8px 0;">${safe.businessCity}</td></tr>`
      : "",
  ].join("");

  const html = `
    <div style="font-family: Arial, sans-serif; color: #1C1917; line-height: 1.6; max-width: 720px;">
      <h1 style="font-size: 22px; color: #0369A1; margin: 0 0 16px;">New Free Visibility Check Lead</h1>
      <table style="border-collapse: collapse; width: 100%; margin: 0 0 20px;">
        <tbody>
          <tr><td style="padding: 8px 0; font-weight: 700;">Name</td><td style="padding: 8px 0;">${safe.name}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: 700;">Business Name</td><td style="padding: 8px 0;">${safe.businessName}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: 700;">Phone</td><td style="padding: 8px 0;">${safe.phone}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: 700;">Email</td><td style="padding: 8px 0;">${safe.email}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: 700;">What do you need help with?</td><td style="padding: 8px 0;">${safe.needHelpWith}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: 700;">Source</td><td style="padding: 8px 0;">${safe.source}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: 700;">Campaign</td><td style="padding: 8px 0;">${safe.campaign}</td></tr>
          ${trackingRows}
          <tr><td style="padding: 8px 0; font-weight: 700;">Page submitted from</td><td style="padding: 8px 0;">${safe.sourcePage}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: 700;">Date/time</td><td style="padding: 8px 0;">${safe.submittedAt}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: 700;">Language</td><td style="padding: 8px 0;">${safe.language}</td></tr>
          ${optionalRows}
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

function buildAutoReply({ name }) {
  const greetingName = cleanText(name) || "there";
  const safeName = escapeHtml(greetingName);

  const text = [
    `Hi ${greetingName},`,
    "",
    "Thanks for requesting a Free Visibility Check from Pixel & Panel.",
    "",
    "We’ll review your business visibility and follow up within 1 business day. We may look at your website, Google presence, signs, print materials, and QR opportunities based on the information you submitted.",
    "",
    "If you need to add anything, you can reply to this email or contact us at hello@pixelnpanel.com.",
    "",
    "Pixel & Panel",
    "Your Vision. Made Visible.",
    "https://www.pixelnpanel.com",
    "(409) 225-2012",
  ].join("\n");

  const html = `
    <div style="font-family: Arial, sans-serif; color: #1C1917; line-height: 1.7; max-width: 640px;">
      <p>Hi ${safeName},</p>
      <p>Thanks for requesting a Free Visibility Check from Pixel &amp; Panel.</p>
      <p>We’ll review your business visibility and follow up within 1 business day. We may look at your website, Google presence, signs, print materials, and QR opportunities based on the information you submitted.</p>
      <p>If you need to add anything, you can reply to this email or contact us at <a href="mailto:hello@pixelnpanel.com" style="color: #0369A1;">hello@pixelnpanel.com</a>.</p>
      <p>
        Pixel &amp; Panel<br />
        Your Vision. Made Visible.<br />
        <a href="https://www.pixelnpanel.com" style="color: #0369A1;">https://www.pixelnpanel.com</a><br />
        (409) 225-2012
      </p>
    </div>
  `;

  return { text, html };
}

export async function POST(request) {
  const ip = getClientIp(request);
  const limiter = await rateLimit({
    key: `visibility:${ip}`,
    limit: 3,
    windowMs: 10 * 60 * 1000,
  });

  if (!limiter.success) {
    return rateLimitResponse(limiter.resetTime);
  }

  let payload;

  try {
    payload = await request.json();
  } catch {
    return jsonResponse({ success: false, message: "Invalid request body." }, 400);
  }

  if (!payload || typeof payload !== "object") {
    return jsonResponse({ success: false, message: "Invalid request body." }, 400);
  }

  const isCampaignSubmission = Object.prototype.hasOwnProperty.call(payload, "needHelpWith");
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
  const needHelpWith = cleanCampaignHelpOption(payload.needHelpWith);
  const legacyHelpOptions = cleanHelpOptions(payload.helpOptions);
  const helpText = needHelpWith || (legacyHelpOptions.length ? legacyHelpOptions.join(", ") : "");
  const source = cleanText(payload.source) || "direct";
  const campaign = cleanText(payload.campaign) || "local-launch";
  const utmSource = cleanText(payload.utm_source) || cleanText(payload.utmSource);
  const utmMedium = cleanText(payload.utm_medium) || cleanText(payload.utmMedium);
  const utmCampaign = cleanText(payload.utm_campaign) || cleanText(payload.utmCampaign);

  if (company) {
    return Response.json(
      { success: true, message: SUCCESS_MESSAGE },
      { status: 200 },
    );
  }

  if (!name || !businessName) {
    return jsonResponse({ success: false, message: "Name and business name are required." }, 400);
  }

  if (isCampaignSubmission && !email && !phone) {
    return jsonResponse({ success: false, message: "Email or phone is required." }, 400);
  }

  if (!isCampaignSubmission && !email && !phone) {
    return jsonResponse({ success: false, message: "Email or phone is required." }, 400);
  }

  if (email && !emailPattern.test(email)) {
    return jsonResponse({ success: false, message: "Please enter a valid email address." }, 400);
  }

  if (isCampaignSubmission && !helpText) {
    return jsonResponse({ success: false, message: "Please choose what you need help with." }, 400);
  }

  if (!isCampaignSubmission && !websiteUrl && !legacyHelpOptions.length && !message) {
    return jsonResponse(
      {
        success: false,
        message: "Please include a website, choose at least one help option, or include a message.",
      },
      400,
    );
  }

  const submittedAtDate = new Date();
  const submittedAt = submittedAtLabel(submittedAtDate);
  const submittedAtIso = submittedAtDate.toISOString();
  const { text, html } = buildInternalEmail({
    name,
    businessName,
    email,
    phone,
    needHelpWith: helpText,
    message,
    source,
    campaign,
    utmSource,
    utmMedium,
    utmCampaign,
    sourcePage,
    submittedAt,
    language,
    websiteUrl,
    businessCity,
  });

  try {
    await sendEmail({
      fromName: process.env.VISIBILITY_CHECK_FROM_NAME || "Pixel & Panel Visibility Check",
      to: process.env.VISIBILITY_CHECK_TO_EMAIL || "hello@pixelnpanel.com",
      replyTo: email || undefined,
      subject:
        language === "Spanish" && !isCampaignSubmission
          ? cleanHeader("Nueva solicitud de chequeo de visibilidad - Pixel & Panel")
          : cleanHeader("New Free Visibility Check Lead - Pixel & Panel"),
      text,
      html,
    });

    await sendZohoFlowWebhook({
      name,
      businessName,
      phone,
      email,
      helpNeeded: helpText,
      message,
      source,
      campaign,
      utmSource,
      utmMedium,
      utmCampaign,
      submittedFrom: sourcePage,
      submittedAtIso,
    });

    if (email && isCampaignSubmission) {
      const autoReply = buildAutoReply({ name });

      try {
        await sendEmail({
          fromName: process.env.VISIBILITY_CHECK_REPLY_FROM_NAME || "Pixel & Panel",
          to: email,
          replyTo: process.env.VISIBILITY_CHECK_TO_EMAIL || "hello@pixelnpanel.com",
          subject: cleanHeader("We received your Free Visibility Check request"),
          text: autoReply.text,
          html: autoReply.html,
        });
      } catch (autoReplyError) {
        console.error("Unable to send visibility check auto-reply email.", autoReplyError);
      }
    }

    return Response.json(
      { success: true, message: SUCCESS_MESSAGE },
      { status: 200 },
    );
  } catch (error) {
    console.error("Unable to send visibility check request email.", error);
    return Response.json(
      { success: false, message: ERROR_MESSAGE },
      { status: 500 },
    );
  }
}
