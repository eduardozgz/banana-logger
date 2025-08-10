import type { BotInstanceOptions } from "./BotInstanceOptions";

declare module "discord.js" {
  interface Client {
    botInstanceOptions: BotInstanceOptions;
  }
}
