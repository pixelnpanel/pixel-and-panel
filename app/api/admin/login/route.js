import { NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  adminCookieOptions,
  createAdminSession,
  hasAdminPassword,
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

  const password = String(body?.password || "");

  if (!hasAdminPassword()) {
    return NextResponse.json({ ok: false, error: "Admin password is not configured." }, { status: 503 });
  }

  if (!verifyAdminPassword(password)) {
    return NextResponse.json({ ok: false, error: "Invalid admin password." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_SESSION_COOKIE, createAdminSession(), adminCookieOptions());
  return response;
}
