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
