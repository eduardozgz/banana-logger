import { Client, Partials } from "discord.js";

import { botIntents } from "@bl/common/botIntents";
import { redis } from "@bl/redis";

import type { BotInstanceOptions } from "~/@types/BotInstanceOptions";
import { setupBotAPIProvider } from "./botAPI/provider";
import { setupEvents } from "./events";
import { AuditLogCollector } from "./utils/AuditLogCollector";
import { deployCommands } from "./utils/deployCommands";
import { makeCache } from "./utils/makeCache";
import { sweepers } from "./utils/sweepers";

export async function startBot(options: BotInstanceOptions) {
  await deployCommands(options);

  const { logger } = options;

  const botClient = new Client({
    intents: botIntents,
    // Required so message/reaction events fire for uncached objects (anything
    // sent before startup or evicted from cache) — otherwise the logger
    // silently drops a large share of real events.
    partials: [
      Partials.Message,
      Partials.Channel,
      Partials.Reaction,
      Partials.User,
    ],
    makeCache: makeCache(),
    sweepers,
    // When a shared REST proxy is configured it owns the token's whole rate
    // limit, so disable the local limiter (Infinity) to avoid throttling twice;
    // requests queue at the proxy instead.
    ...(options.restProxyURL
      ? {
          rest: {
            api: options.restProxyURL,
            globalRequestsPerSecond: Infinity,
          },
        }
      : {}),
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
