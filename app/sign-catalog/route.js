import { NextResponse } from "next/server";
import { SIGNAGE_PATH } from "@/lib/sign-catalog";

export const dynamic = "force-dynamic";

function redirectToSignage(request) {
  const response = NextResponse.redirect(new URL(SIGNAGE_PATH, request.url), 307);
  response.headers.set("Cache-Control", "no-store");
  return response;
}

export function GET(request) {
  return redirectToSignage(request);
}

export function HEAD(request) {
  return redirectToSignage(request);
}
