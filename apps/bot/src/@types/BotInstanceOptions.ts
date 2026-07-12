import type logger from "@bl/logger";

export interface BotInstanceOptions {
  token: string;
  deployCommands: boolean | string;
  logger: typeof logger;
  /** Base URL of the shared Discord REST proxy, if one is configured. */
  restProxyURL?: string;
}
