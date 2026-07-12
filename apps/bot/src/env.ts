import { createEnv } from "@t3-oss/env-core";
import { z } from "zod/v4";

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "production", "test"]),
    PUBLIC_URL: z.string(),
    IMG_PUBLIC_URL: z.string(),
    DISCORD_BOT_INSTANCE_TOKEN: z.string(),
    DISCORD_CLIENT_ID: z.string(),
    // Optional: base URL of the shared Discord REST proxy (@bl/rest-proxy).
    // When set, the bot routes all REST through it so a single rate limiter
    // owns the token's global budget. e.g. http://rest-proxy:8765/api
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
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
