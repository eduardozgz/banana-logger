import type { BotAPIRouter } from "@bl/bot/botAPI";
import { createTRPCClient } from "@trpc/client";
import { redisLink } from "@bl/trpc-redis";
import SuperJSON from "superjson";

import type { Redis } from "ioredis";

export type { BotAPIRouter };

export let botAPIConsumer: ReturnType<typeof createTRPCClient<BotAPIRouter>>;

export async function initBotAPIConsumer(opts: {
  redisPubClient: Redis;
  redisSubClient: Redis;
}) {
  botAPIConsumer = createTRPCClient<BotAPIRouter>({
    links: [
      await redisLink({
        transformer: SuperJSON,
        redisPubClient: opts.redisPubClient,
        redisSubClient: opts.redisSubClient,
        requestTimeout: 10000,
      }),
    ],
  });
}
