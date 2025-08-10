#!/usr/bin/env node
import { db } from "@/db";
import baseLogger from "@/logger";

import type { BotInstanceOptions } from "~/@types/BotInstanceOptions";
import { startBot } from "./bot";
import { env } from "./env";

async function main() {
  const logger = baseLogger.child({
    botId: env.DISCORD_CLIENT_ID,
  });

  const botOptions: BotInstanceOptions = {
    token: env.DISCORD_BOT_INSTANCE_TOKEN,
    deployCommands: env.DISCORD_BOT_INSTANCE_DEPLOY_COMMANDS,
    logger,
  };

  const { botClient } = await startBot(botOptions).catch((err) => {
    logger.error("Failed to start the bot", err);
    process.exit(1);
  });

  process.on("SIGTERM", () => {
    Promise.all([botClient.destroy(), db.$disconnect()])
      .catch((error: unknown) => {
        logger.error("Error while trying to gracefully shutdown:", { error });
      })
      .finally(() => {
        process.exit(0);
      });
  });
}

void main();
