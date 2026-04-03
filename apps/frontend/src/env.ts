import { createEnv } from "@t3-oss/env-core";
import { z } from "zod/v4";

export const env = createEnv({
  server: {
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
  },
  clientPrefix: "VITE_",
  client: {
    VITE_DISCORD_CLIENT_ID: z.string().optional(),
    VITE_SUPPORT_URL: z.string().optional(),
    VITE_BOT_REPO_URL: z.string().optional(),
  },

  runtimeEnv: import.meta.env,
  skipValidation: !!import.meta.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});
