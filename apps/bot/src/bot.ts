import { Client } from "discord.js";

import { generateBotIntents } from "@/common/botIntents";

import type { BotInstanceOptions } from "~/@types/BotInstanceOptions";
import { setupEvents } from "./events";
import { deployCommands } from "./utils/deployCommands";

export async function startBot(options: BotInstanceOptions) {
  await deployCommands(options);

  const { logger } = options;

  const botClient = new Client({
    intents: generateBotIntents(),
  });

  botClient.botInstanceOptions = options;

  setupEvents(botClient);

  logger.info("Bot starting...");
  await botClient.login(options.token);

  return {
    botClient: botClient,
  };
}
