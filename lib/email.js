import nodemailer from "nodemailer";

export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function cleanText(value) {
  return typeof value === "string" ? value.trim() : "";
}

export function cleanHeader(value) {
  return cleanText(value).replace(/[\r\n]+/g, " ");
}

export function escapeHtml(value) {
  return cleanText(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getSmtpConfig() {
  const host = process.env.ZOHO_SMTP_HOST;
  const port = Number(process.env.ZOHO_SMTP_PORT || 465);
  const user = process.env.ZOHO_SMTP_USER;
  const pass = process.env.ZOHO_SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error("SMTP environment variables are missing.");
  }

  return {
    host,
    port,
    secure: port === 465,
    user,
    pass,
  };
}

export async function sendEmail({ to, fromName, replyTo, subject, text, html, attachments = [] }) {
  const smtp = getSmtpConfig();
  const transporter = nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    secure: smtp.secure,
    auth: {
      user: smtp.user,
      pass: smtp.pass,
    },
  });

  return transporter.sendMail({
    from: {
      name: cleanHeader(fromName),
      address: smtp.user,
    },
    to,
    replyTo,
    subject: cleanHeader(subject),
    text,
    html,
    attachments,
  });
}
