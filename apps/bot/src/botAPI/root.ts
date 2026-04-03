import { createBotAPIRouter } from "./trpc";
import { discordRouter } from "./routers/discord";

export const botAPIRouter = createBotAPIRouter({
  discord: discordRouter,
});

export type BotAPIRouter = typeof botAPIRouter;
