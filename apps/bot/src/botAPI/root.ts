import { discordRouter } from "./routers/discord";
import { createBotAPIRouter } from "./trpc";

export const botAPIRouter = createBotAPIRouter({
  discord: discordRouter,
});

export type BotAPIRouter = typeof botAPIRouter;
