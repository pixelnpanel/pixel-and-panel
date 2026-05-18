import { NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  adminCookieOptions,
  createAdminSession,
  verifyAdminPassword,
} from "@/lib/admin-auth";
import { getClientIp, rateLimit, rateLimitResponse } from "@/lib/rate-limit";

export const runtime = "nodejs";

export async function POST(request) {
  const ip = getClientIp(request);
  const limit = await rateLimit({
    key: `admin-login:${ip}`,
    limit: 5,
    windowMs: 10 * 60 * 1000,
  });

  if (!limit.success) return rateLimitResponse(limit.resetTime);

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const username = String(body?.username || "").trim();
  const password = String(body?.password || "");

  if (!verifyAdminPassword(username, password)) {
    return NextResponse.json({ ok: false, error: "Invalid username or password." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_SESSION_COOKIE, createAdminSession(username), adminCookieOptions());
  return response;
}
