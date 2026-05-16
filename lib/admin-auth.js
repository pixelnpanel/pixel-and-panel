import crypto from "crypto";

export const ADMIN_SESSION_COOKIE = "pnp_admin_session";
const SESSION_TTL_SECONDS = 8 * 60 * 60;

function envCredentials() {
  return {
    username: process.env.ADMIN_USERNAME,
    passwordHash: process.env.ADMIN_PASSWORD_HASH,
    passwordSalt: process.env.ADMIN_PASSWORD_SALT,
    sessionSecret: process.env.ADMIN_SESSION_SECRET,
  };
}

function hasPasswordAuth() {
  const { username, passwordHash, passwordSalt, sessionSecret } = envCredentials();
  return Boolean(username && passwordHash && passwordSalt && sessionSecret);
}

function hashPassword(password, salt) {
  return crypto.scryptSync(password, salt, 64).toString("hex");
}

function safeEqual(a, b) {
  const left = Buffer.from(a || "");
  const right = Buffer.from(b || "");
  return left.length === right.length && crypto.timingSafeEqual(left, right);
}

function sign(payload, secret) {
  return crypto.createHmac("sha256", secret).update(payload).digest("base64url");
}

function getCookieFromHeader(request, name) {
  const header = request.headers.get("cookie") || "";
  const cookies = header.split(";").map((item) => item.trim());
  const match = cookies.find((item) => item.startsWith(`${name}=`));
  if (!match) return "";
  return decodeURIComponent(match.slice(name.length + 1));
}

export function verifyAdminPassword(username, password) {
  if (!hasPasswordAuth()) return false;

  const credentials = envCredentials();
  const submittedHash = hashPassword(String(password || ""), credentials.passwordSalt);

  return (
    safeEqual(String(username || ""), credentials.username) &&
    safeEqual(submittedHash, credentials.passwordHash)
  );
}

export function createAdminSession(username) {
  const { sessionSecret } = envCredentials();
  if (!sessionSecret) throw new Error("Admin session secret is not configured.");

  const payload = Buffer.from(
    JSON.stringify({
      username,
      expiresAt: Date.now() + SESSION_TTL_SECONDS * 1000,
    }),
  ).toString("base64url");

  return `${payload}.${sign(payload, sessionSecret)}`;
}

export function verifyAdminSession(sessionValue) {
  if (!sessionValue || !hasPasswordAuth()) return false;

  const { sessionSecret, username } = envCredentials();
  const [payload, signature] = String(sessionValue).split(".");
  if (!payload || !signature) return false;

  const expected = sign(payload, sessionSecret);
  if (!safeEqual(signature, expected)) return false;

  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    return data.username === username && Number(data.expiresAt) > Date.now();
  } catch {
    return false;
  }
}

export function getAdminSession(request) {
  return request.cookies?.get?.(ADMIN_SESSION_COOKIE)?.value || getCookieFromHeader(request, ADMIN_SESSION_COOKIE);
}

export function isAdminAuthorized(request) {
  if (verifyAdminSession(getAdminSession(request))) return true;
  return false;
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
