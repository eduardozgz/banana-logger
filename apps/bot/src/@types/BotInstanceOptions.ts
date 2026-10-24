import type logger from "@bl/logger";

export interface BotInstanceOptions {
  /** Stable id for this bot; namespaces its Redis keys (the Discord client id). */
  id: string;
  token: string;
  deployCommands: boolean | string;
  logger: typeof logger;
  /** Base URL of the shared Discord REST proxy, if one is configured. */
  restProxyURL?: string;
  /**
   * Shard ids this process should run. When set together with {@link shardCount}
   * the client runs those shards and coordinates gateway identifies across
   * processes via Redis; unset means single-process, default discord.js behaviour.
   */
  shards?: number[];
  /** Total shard count across all processes. Set together with {@link shards}. */
  shardCount?: number;
  /**
   * Gateway identify `max_concurrency` (number of identify buckets). Keys the
   * Redis identify lock so only one shard per bucket identifies at a time.
   * Defaults to 1.
   */
  maxConcurrency: number;
}
