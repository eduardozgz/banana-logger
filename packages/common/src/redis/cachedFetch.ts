/**
 * Minimal subset of the ioredis client this module needs. Typing it structurally
 * keeps `@bl/common` free of an ioredis dependency; the real client (and
 * `ctx.redis`) satisfies it.
 */
export interface RedisLike {
  get(key: string): Promise<string | null>;
  setex(key: string, seconds: number, value: string): Promise<unknown>;
  del(key: string): Promise<unknown>;
}

const inFlight = new Map<string, Promise<unknown>>();

/**
 * Read-through Redis cache: returns the cached value when present and
 * parseable, otherwise fetches, caches and returns it. Concurrent callers of
 * the same key share a single in-flight fetch, and Redis failures are treated
 * as cache misses so they never fail a request the fetcher can still serve.
 *
 * `validate` sees the raw value on both paths (fresh fetch and cache read) and
 * may throw to discard a bad cached entry. The codec is plain JSON by default;
 * pass `stringify`/`parse` (e.g. SuperJSON's) when the value holds Maps, Dates
 * or other types JSON can't round-trip.
 */
export async function cachedFetch<T>(opts: {
  redis: RedisLike;
  key: string;
  ttlSeconds: number;
  fetch: () => Promise<unknown>;
  validate: (raw: unknown) => T;
  stringify?: (raw: unknown) => string;
  parse?: (cached: string) => unknown;
}): Promise<T> {
  const {
    redis,
    key,
    ttlSeconds,
    fetch,
    validate,
    stringify = JSON.stringify,
    parse = JSON.parse,
  } = opts;

  const cached = await redis.get(key).catch(() => null);
  if (cached) {
    try {
      return validate(parse(cached));
    } catch {
      await redis.del(key).catch(() => undefined);
    }
  }

  let pending = inFlight.get(key);
  if (!pending) {
    pending = fetch()
      .then(async (raw) => {
        await redis
          .setex(key, ttlSeconds, stringify(raw))
          .catch(() => undefined);
        return raw;
      })
      .finally(() => inFlight.delete(key));
    inFlight.set(key, pending);
  }

  return validate(await pending);
}
