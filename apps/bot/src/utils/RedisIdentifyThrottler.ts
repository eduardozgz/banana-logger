import type { IIdentifyThrottler } from "discord.js";
import { redis } from "@bl/redis";
import { Redlock } from "@sesamecare-oss/redlock";

import type { BotInstanceOptions } from "~/@types/BotInstanceOptions";

// Discord allows one gateway IDENTIFY per 5s per concurrency bucket. We hold the
// distributed lock a little longer than that so overlapping processes serialise
// cleanly, and never release it explicitly — it just expires after this TTL.
const IDENTIFY_LOCK_TTL_MS = 5_500;

const redlock = new Redlock([redis], {
  // A shard that can't identify yet must wait, not error out, so retry forever.
  retryCount: Infinity,
  retryDelay: IDENTIFY_LOCK_TTL_MS,
});

// Namespaces the lock per bot and per identify bucket (shardId % maxConcurrency)
// so several processes sharing one token never identify the same bucket at once.
const identifyLockKey = (
  botId: string,
  shardId: number,
  maxConcurrency: number,
) => `bl:discord-identify-lock:${botId}:${shardId % maxConcurrency}`;

/**
 * Cross-process gateway identify throttler backed by Redis (Redlock).
 *
 * When several bot processes share a single token they must coordinate their
 * gateway IDENTIFYs so they don't trip Discord's per-bucket rate limit. A plain
 * in-process throttler can't see the other processes; acquiring a short-lived
 * distributed lock before each identify serialises them across the deployment.
 */
export class RedisIdentifyThrottler implements IIdentifyThrottler {
  constructor(private readonly options: BotInstanceOptions) {}

  async waitForIdentify(shardId: number): Promise<void> {
    await redlock.acquire(
      [identifyLockKey(this.options.id, shardId, this.options.maxConcurrency)],
      IDENTIFY_LOCK_TTL_MS,
    );
  }
}
