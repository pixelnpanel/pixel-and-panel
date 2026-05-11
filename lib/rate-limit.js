const buckets = new Map();

export function getClientIp(request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();

  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp;

  return "unknown";
}

export function rateLimit({ key, limit = 5, windowMs = 10 * 60 * 1000 }) {
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
