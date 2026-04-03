import type { Client } from "discord.js";
import { initTRPC } from "@trpc/server";
import SuperJSON from "superjson";

export interface BotAPIContext {
  botClient: Client<true>;
  takeRequest: (take: boolean) => Promise<void>;
}

const t = initTRPC.context<BotAPIContext>().create({
  transformer: SuperJSON,
});

export const createBotAPIRouter = t.router;
export const botAPIProcedure = t.procedure;
