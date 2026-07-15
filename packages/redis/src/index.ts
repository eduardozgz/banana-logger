import { Redis } from "ioredis";

import { env } from "./env";

const createRedisClient = () => {
  const client = new Redis(env.REDIS_URL, { lazyConnect: true });

  // ioredis emits 'error' on connection problems; with no listener Node throws
  // on the unhandled 'error' event and can crash the process (compounded by
  // lazyConnect, which defers the first connection attempt).
  client.on("error", (error) => {
    console.error("[redis] client error", error);
  });

  return client;
};

const globalForRedis = globalThis as unknown as {
  redis: ReturnType<typeof createRedisClient> | undefined;
};

export const redis = globalForRedis.redis ?? createRedisClient();

if (env.NODE_ENV !== "production") globalForRedis.redis = redis;

// ---------------------------------------------------------------------------
// Guild config invalidation (pub/sub).
//
// The bot caches each guild's log-channel config in-process on the hot event
// path. Whenever config changes — from a bot command or the dashboard — the
// writer publishes the guild id on this channel and every bot pod drops its
// cached entry, so a fresh copy is loaded on the next read.
// ---------------------------------------------------------------------------

export const CONFIG_INVALIDATION_CHANNEL = "config:invalidate";

/** Notify all bot pods that a guild's config changed. Never throws. */
export async function publishConfigInvalidation(
  guildId: string,
): Promise<void> {
  try {
    await redis.publish(CONFIG_INVALIDATION_CHANNEL, guildId);
  } catch (error) {
    console.error("[redis] failed to publish config invalidation", error);
  }
}
