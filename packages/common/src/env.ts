import { createEnv } from "@t3-oss/env-core";
import { z } from "zod/v4";

export const env = createEnv({
  shared: {
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    DISCORD_CLIENT_ID: z.string(),
  },
  server: {},

  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
