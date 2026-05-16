export function getAdminToken(request) {
  const headerToken = request.headers.get("x-admin-token");
  if (headerToken) return headerToken.trim();

  const authHeader = request.headers.get("authorization");
  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.slice("Bearer ".length).trim();
  }

  return "";
}

export function isAdminAuthorized(request) {
  const expected = process.env.ORDER_ADMIN_TOKEN;
  if (!expected) return false;

  return getAdminToken(request) === expected;
}

export function unauthorizedResponse() {
  return Response.json(
    { ok: false, error: "Admin token is required." },
    { status: 401 },
  );
}
