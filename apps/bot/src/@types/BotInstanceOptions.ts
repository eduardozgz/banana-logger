import type logger from "@/logger";

export interface BotInstanceOptions {
  token: string;
  deployCommands: boolean | string;
  logger: typeof logger;
}
