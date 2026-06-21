import { NextResponse } from "next/server";
import { SIGN_CATALOG_DESTINATION_URL } from "@/lib/sign-catalog";

export const dynamic = "force-dynamic";

function redirectToSignCatalog() {
  const response = NextResponse.redirect(SIGN_CATALOG_DESTINATION_URL, 307);
  response.headers.set("Cache-Control", "no-store");
  return response;
}

export function GET() {
  return redirectToSignCatalog();
}

export function HEAD() {
  return redirectToSignCatalog();
}
