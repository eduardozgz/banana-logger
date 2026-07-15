#!/usr/bin/env node
import { db } from "@bl/db";
import baseLogger from "@bl/logger";

import type { BotInstanceOptions } from "~/@types/BotInstanceOptions";
import { startBot } from "./bot";
import { env } from "./env";
import {
  startConfigCacheInvalidation,
  stopConfigCacheInvalidation,
} from "./services/configCache";

async function main() {
  const logger = baseLogger.child({
    botId: env.DISCORD_CLIENT_ID,
  });

  // A stray rejection or throw must not silently take down (or, worse, leave in
  // a zombie state) a long-running daemon; log it so it's observable.
  process.on("unhandledRejection", (reason) => {
    logger.error("Unhandled promise rejection", { reason });
  });
  process.on("uncaughtException", (error) => {
    logger.error("Uncaught exception", { error });
  });

  const botOptions: BotInstanceOptions = {
    token: env.DISCORD_BOT_INSTANCE_TOKEN,
    deployCommands: env.DISCORD_BOT_INSTANCE_DEPLOY_COMMANDS,
    logger,
    restProxyURL: env.DISCORD_BOT_INSTANCE_REST_PROXY_URL,
  };

  const { botClient } = await startBot(botOptions).catch((err) => {
    logger.error("Failed to start the bot", err);
    process.exit(1);
  });

  // Drop cached guild config across pods when it changes (bot command or
  // dashboard). Non-fatal if Redis is unreachable — the cache TTL still bounds
  // staleness.
  await startConfigCacheInvalidation().catch((error: unknown) => {
    logger.error("Failed to start config-cache invalidation", { error });
  });

  process.on("SIGTERM", () => {
    Promise.all([
      botClient.destroy(),
      stopConfigCacheInvalidation(),
      db.close(),
    ])
      .catch((error: unknown) => {
        logger.error("Error while trying to gracefully shutdown:", { error });
      })
      .finally(() => {
        process.exit(0);
      });
  });
}

void main();
