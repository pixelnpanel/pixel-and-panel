const buckets = new Map();
let warnedAboutFallback = false;
let persistentDisabledUntil = 0;

function getSupabaseConfig() {
  return {
    url: process.env.SUPABASE_URL,
    serviceKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  };
}

export function getClientIp(request) {
  const vercelForwarded = request.headers.get("x-vercel-forwarded-for");
  if (vercelForwarded) return vercelForwarded.split(",")[0].trim();

  const cloudflareIp = request.headers.get("cf-connecting-ip");
  if (cloudflareIp) return cloudflareIp.trim();

  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();

  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp;

  return "unknown";
}

function inMemoryRateLimit({ key, limit = 5, windowMs = 10 * 60 * 1000 }) {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetTime <= now) {
    buckets.set(key, {
      count: 1,
      resetTime: now + windowMs,
    });

    return {
      success: true,
      remaining: limit - 1,
      resetTime: now + windowMs,
    };
  }

  if (bucket.count >= limit) {
    return {
      success: false,
      remaining: 0,
      resetTime: bucket.resetTime,
    };
  }

  bucket.count += 1;
  buckets.set(key, bucket);

  return {
    success: true,
    remaining: limit - bucket.count,
    resetTime: bucket.resetTime,
  };
}

async function supabaseRateLimit({ key, limit, windowMs }) {
  const { url, serviceKey } = getSupabaseConfig();
  if (!url || !serviceKey) return null;
  if (persistentDisabledUntil > Date.now()) return null;

  const response = await fetch(`${url.replace(/\/$/, "")}/rest/v1/rpc/check_rate_limit`, {
    method: "POST",
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      p_key: key,
      p_limit: limit,
      p_window_seconds: Math.ceil(windowMs / 1000),
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Supabase rate limit request failed with ${response.status}.`);
  }

  const payload = await response.json();
  const result = Array.isArray(payload) ? payload[0] : payload;
  if (!result || typeof result.allowed === "undefined" || !result.reset_at) {
    throw new Error("Supabase rate limit function returned an invalid response.");
  }

  const resetTime = Date.parse(result.reset_at);
  if (!Number.isFinite(resetTime)) {
    throw new Error("Supabase rate limit function returned an invalid reset time.");
  }

  return {
    success: Boolean(result.allowed),
    remaining: Number(result.remaining || 0),
    resetTime,
  };
}

export async function rateLimit({ key, limit = 5, windowMs = 10 * 60 * 1000 }) {
  try {
    const persisted = await supabaseRateLimit({ key, limit, windowMs });
    if (persisted) return persisted;
  } catch (error) {
    persistentDisabledUntil = Date.now() + 5 * 60 * 1000;
    if (!warnedAboutFallback) {
      warnedAboutFallback = true;
      console.warn("Persistent rate limiting is unavailable; using in-memory fallback.", error);
    }
  }

  return inMemoryRateLimit({ key, limit, windowMs });
}

export function rateLimitResponse(resetTime) {
  const retryAfter = Math.max(1, Math.ceil((resetTime - Date.now()) / 1000));

  return Response.json(
    {
      ok: false,
      error: "Too many requests. Please wait a few minutes and try again.",
    },
    {
      status: 429,
      headers: {
        "Retry-After": String(retryAfter),
      },
    },
  );
}
