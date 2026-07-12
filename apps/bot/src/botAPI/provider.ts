import type { Client } from "discord.js";
import type { Redis } from "ioredis";
import { redisHandler } from "@bl/trpc-redis";

import type { BotAPIContext } from "./trpc";
import { botAPIRouter } from "./root";

export async function setupBotAPIProvider(opts: {
  botClient: Client<true>;
  redisPubClient: Redis;
  redisSubClient: Redis;
}) {
  const logger = opts.botClient.botInstanceOptions.logger.child({
    component: "botAPIProvider",
  });

  await redisHandler({
    router: botAPIRouter,
    redisPubClient: opts.redisPubClient,
    redisSubClient: opts.redisSubClient,
    createContext: ({ takeRequest }): BotAPIContext => ({
      botClient: opts.botClient,
      takeRequest,
    }),
    // Without this, procedure errors served to the backend/frontend are
    // swallowed and never surface in the bot's logs.
    onError: ({ error, path }) => {
      logger.error(`Bot API error on '${path ?? "<unknown>"}'`, { error });
    },
  });
}
