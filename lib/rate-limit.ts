/**
 * Fixed-window, in-memory rate limiter. Best effort on serverless hosting: each warm instance keeps its
 * own counts, so the real ceiling is `limit` × instances. Enough to blunt a single bot hammering the
 * form; add Turnstile if spam gets through (D-028).
 */
export function createRateLimiter({ limit, windowMs }: { limit: number; windowMs: number }) {
  const hits = new Map<string, { count: number; resetAt: number }>();

  return function allow(key: string, now = Date.now()) {
    const entry = hits.get(key);
    if (!entry || now >= entry.resetAt) {
      // Drop expired keys occasionally so the map can't grow without bound.
      if (hits.size > 5_000) for (const [k, v] of hits) if (now >= v.resetAt) hits.delete(k);
      hits.set(key, { count: 1, resetAt: now + windowMs });
      return true;
    }
    entry.count += 1;
    return entry.count <= limit;
  };
}
