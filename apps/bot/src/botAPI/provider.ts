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
  await redisHandler({
    router: botAPIRouter,
    redisPubClient: opts.redisPubClient,
    redisSubClient: opts.redisSubClient,
    createContext: ({ takeRequest }): BotAPIContext => ({
      botClient: opts.botClient,
      takeRequest,
    }),
  });
}
