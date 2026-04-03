import { Client } from "discord.js";

import { botIntents } from "@bl/common/botIntents";
import { redis } from "@bl/redis";

import type { BotInstanceOptions } from "~/@types/BotInstanceOptions";
import { setupBotAPIProvider } from "./botAPI/provider";
import { setupEvents } from "./events";
import { AuditLogCollector } from "./utils/AuditLogCollector";
import { deployCommands } from "./utils/deployCommands";

export async function startBot(options: BotInstanceOptions) {
  await deployCommands(options);

  const { logger } = options;

  const botClient = new Client({
    intents: botIntents,
  });

  botClient.botInstanceOptions = options;

  setupEvents(botClient);
  AuditLogCollector.initialize(botClient);

  logger.info("Bot starting...");
  await botClient.login(options.token);

  const redisPubClient = redis.duplicate();
  const redisSubClient = redis.duplicate();
  await setupBotAPIProvider({
    botClient: botClient as Client<true>,
    redisPubClient,
    redisSubClient,
  });
  logger.info("Bot API provider started");

  return {
    botClient: botClient,
  };
}
