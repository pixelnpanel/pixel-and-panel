import crypto from "crypto";

export const ADMIN_SESSION_COOKIE = "pnp_admin_session";
const SESSION_TTL_SECONDS = 8 * 60 * 60;

function adminPassword() {
  return process.env.ADMIN_ORDERS_PASSWORD || "";
}

function sessionSecret() {
  return process.env.ADMIN_SESSION_SECRET || adminPassword();
}

function safeEqual(a, b) {
  const left = Buffer.from(String(a || ""));
  const right = Buffer.from(String(b || ""));
  return left.length === right.length && crypto.timingSafeEqual(left, right);
}

function sign(payload) {
  const secret = sessionSecret();
  if (!secret) throw new Error("Admin orders password is not configured.");
  return crypto.createHmac("sha256", secret).update(payload).digest("base64url");
}

function getCookieFromHeader(request, name) {
  const header = request.headers.get("cookie") || "";
  const cookies = header.split(";").map((item) => item.trim());
  const match = cookies.find((item) => item.startsWith(`${name}=`));
  if (!match) return "";
  return decodeURIComponent(match.slice(name.length + 1));
}

export function hasAdminPassword() {
  return Boolean(adminPassword());
}

export function verifyAdminPassword(password) {
  const expected = adminPassword();
  return Boolean(expected) && safeEqual(String(password || ""), expected);
}

export function createAdminSession() {
  const payload = Buffer.from(
    JSON.stringify({
      scope: "orders",
      expiresAt: Date.now() + SESSION_TTL_SECONDS * 1000,
    }),
  ).toString("base64url");

  return `${payload}.${sign(payload)}`;
}

export function verifyAdminSession(sessionValue) {
  if (!sessionValue || !hasAdminPassword()) return false;

  const [payload, signature] = String(sessionValue).split(".");
  if (!payload || !signature) return false;

  let expected;
  try {
    expected = sign(payload);
  } catch {
    return false;
  }

  if (!safeEqual(signature, expected)) return false;

  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    return data.scope === "orders" && Number(data.expiresAt) > Date.now();
  } catch {
    return false;
  }
}

export function getAdminSession(request) {
  return request.cookies?.get?.(ADMIN_SESSION_COOKIE)?.value || getCookieFromHeader(request, ADMIN_SESSION_COOKIE);
}

export function isAdminAuthorized(request) {
  return verifyAdminSession(getAdminSession(request));
}

export function adminCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  };
}

export function unauthorizedResponse() {
  return Response.json(
    { ok: false, error: "Admin login is required." },
    { status: 401 },
  );
}
