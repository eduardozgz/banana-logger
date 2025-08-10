import { createEnv } from "@t3-oss/env-core";
import { z } from "zod/v4";

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "production", "test"]),
    DISCORD_BOT_INSTANCE_TOKEN: z.string(),
    DISCORD_CLIENT_ID: z.string(),
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
