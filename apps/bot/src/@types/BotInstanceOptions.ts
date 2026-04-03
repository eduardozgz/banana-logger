import type logger from "@bl/logger";

export interface BotInstanceOptions {
  token: string;
  deployCommands: boolean | string;
  logger: typeof logger;
}
