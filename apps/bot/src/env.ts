import { createEnv } from "@t3-oss/env-core";
import { z } from "zod/v4";

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "production", "test"]),
    PUBLIC_URL: z.string(),
    IMG_PUBLIC_URL: z.string(),
    DISCORD_BOT_INSTANCE_TOKEN: z.string(),
    DISCORD_CLIENT_ID: z.string(),
    DISCORD_BOT_INSTANCE_REST_PROXY_URL: z.string().optional(),
    DISCORD_BOT_INSTANCE_DEPLOY_COMMANDS: z
      .string()
      .toLowerCase()
      .transform((x) => {
        const parsed = JSON.parse(x);
        if (typeof parsed === "boolean") return parsed;
        else return x;
      })
      .pipe(z.string().or(z.boolean())),

    // --- Optional multi-process sharding ------------------------------------
    // Leave all of these unset for the default single-process deployment: the
    // client keeps discord.js's built-in identify throttler and default shard
    // behaviour, exactly as before. Set SHARDS + SHARD_COUNT (one process per
    // shard subset, same token) to split the load across processes; the Redis
    // identify throttler then serialises gateway IDENTIFYs across them.
    DISCORD_BOT_INSTANCE_SHARDING_SHARDS: z
      .string()
      .transform((raw): unknown => JSON.parse(raw))
      .pipe(
        z.union([
          z.array(z.number().int().min(0)).min(1),
          z
            .number()
            .int()
            .min(0)
            .transform((shardId) => [shardId]),
        ]),
      )
      .optional(),
    DISCORD_BOT_INSTANCE_SHARDING_SHARD_COUNT: z.coerce
      .number()
      .int()
      .min(1)
      .optional(),
    // Discord's gateway identify `max_concurrency` (identify buckets). Defaults
    // to 1, which is correct for every bot below the large-bot sharding tier.
    DISCORD_BOT_INSTANCE_SHARDING_SHARD_MAX_CONCURRENCY: z.coerce
      .number()
      .int()
      .min(1)
      .default(1),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
