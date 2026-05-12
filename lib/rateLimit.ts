// In-memory rate limiter for simple API protection
// Note: This is an in-memory store. In a serverless environment (e.g. Vercel, AWS Lambda),
// this memory may be reset across multiple instances. For robust production rate limiting,
// consider using @upstash/ratelimit with Redis.

const ipRequestCache = new Map<string, { count: number; expiresAt: number }>();

// Periodic sweep to prevent memory leaks from abandoned IPs
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of ipRequestCache.entries()) {
    if (record.expiresAt < now) {
      ipRequestCache.delete(ip);
    }
  }
}, 60000); // Sweep every 60 seconds

export function rateLimit(ip: string, limit: number = 20, windowMs: number = 60000): { success: boolean; limit: number; remaining: number } {
  const now = Date.now();
  const record = ipRequestCache.get(ip);

  // Clean up expired record for the current IP
  if (record && record.expiresAt < now) {
    ipRequestCache.delete(ip);
  }

  const currentRecord = ipRequestCache.get(ip);

  if (!currentRecord) {
    ipRequestCache.set(ip, {
      count: 1,
      expiresAt: now + windowMs,
    });
    return { success: true, limit, remaining: limit - 1 };
  }

  if (currentRecord.count >= limit) {
    return { success: false, limit, remaining: 0 };
  }

  currentRecord.count += 1;
  return { success: true, limit, remaining: limit - currentRecord.count };
}
