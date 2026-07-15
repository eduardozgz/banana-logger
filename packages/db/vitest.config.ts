import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    root: ".",
    env: {
      NODE_ENV: "test",
      DATABASE_URL: ":memory:",
    },
  },
});
