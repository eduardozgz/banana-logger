import { resolve } from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "~": resolve(__dirname, "src"),
    },
  },
  test: {
    root: ".",
    env: {
      NODE_ENV: "test",
      PUBLIC_URL: "http://localhost:3000",
      IMG_PUBLIC_URL: "http://localhost:3001",
      DISCORD_BOT_INSTANCE_TOKEN: "test-token",
      DISCORD_CLIENT_ID: "test-client-id",
      DISCORD_BOT_INSTANCE_DEPLOY_COMMANDS: "false",
    },
  },
});
