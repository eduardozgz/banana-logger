import { db } from "@bl/db";
import baseLogger from "@bl/logger";
import { CONFIG_INVALIDATION_CHANNEL, redis } from "@bl/redis";

import type { GlobalSettings, Settings } from "@bl/db/client";

// ---------------------------------------------------------------------------
// Per-guild config cache.
//
// This bot logs "anything", so SettingsService.getByEventName runs on every
// gateway event. Reading a guild's log-channel config from the database that
// often is the hottest path in the process, yet the config changes rarely, so
// we cache each guild's full config (all its Settings rows + the GlobalSettings
// row) in memory and invalidate it over Redis when a write happens (from a bot
// command or the dashboard). A TTL backstops any missed invalidation so a stale
// entry self-heals within a few minutes.
// ---------------------------------------------------------------------------

const logger = baseLogger.child({ component: "config-cache" });

const TTL_MS = 5 * 60_000;

export interface GuildConfig {
  settings: Settings[];
  globalSettings: GlobalSettings | null;
}

const cache = new Map<string, { value: GuildConfig; expiresAt: number }>();
// Dedupes concurrent loads for the same guild — a burst of events on a cold
// entry issues one query, not one per event.
const inflight = new Map<string, Promise<GuildConfig>>();
// Per-guild version, bumped on every invalidation. A load captures it before
// querying and only caches its result if it hasn't changed since — otherwise a
// write (and its invalidation) that lands mid-load would be clobbered by the
// pre-write snapshot and served until the TTL.
const generation = new Map<string, number>();

async function load(guildId: string): Promise<GuildConfig> {
  const [settings, globalSettings] = await Promise.all([
    db.settings.getByGuild(guildId),
    db.globalSettings.get(guildId),
  ]);
  return { settings, globalSettings: globalSettings ?? null };
}

/**
 * The guild's cached config, loading (and caching) it on a miss. The returned
 * object is shared — callers must treat it as read-only (the services shallow-
 * copy any row they intend to mutate).
 */
export async function getGuildConfig(guildId: string): Promise<GuildConfig> {
  const cached = cache.get(guildId);
  if (cached && cached.expiresAt > Date.now()) return cached.value;

  const existing = inflight.get(guildId);
  if (existing) return existing;

  const loadedAt = generation.get(guildId) ?? 0;
  const pending = load(guildId)
    .then((value) => {
      // Skip caching if an invalidation raced this load; the next read reloads.
      if ((generation.get(guildId) ?? 0) === loadedAt) {
        cache.set(guildId, { value, expiresAt: Date.now() + TTL_MS });
      }
      return value;
    })
    .finally(() => {
      inflight.delete(guildId);
    });
  inflight.set(guildId, pending);
  return pending;
}

/** Drop a guild's cached config (call right after writing its config). */
export function invalidateGuildConfig(guildId: string): void {
  cache.delete(guildId);
  generation.set(guildId, (generation.get(guildId) ?? 0) + 1);
}

let subscriber: ReturnType<typeof redis.duplicate> | undefined;

/**
 * Subscribe to cross-pod config invalidations. Idempotent; call once on start.
 */
export async function startConfigCacheInvalidation(): Promise<void> {
  if (subscriber) return;

  const sub = redis.duplicate();
  sub.on("error", (error) => {
    logger.error("config-cache subscriber error", { error });
  });
  sub.on("message", (channel, message) => {
    if (channel === CONFIG_INVALIDATION_CHANNEL) invalidateGuildConfig(message);
  });
  await sub.subscribe(CONFIG_INVALIDATION_CHANNEL);

  subscriber = sub;
  logger.info("config-cache invalidation subscriber started");
}

/** Tear down the subscriber (graceful shutdown). */
export async function stopConfigCacheInvalidation(): Promise<void> {
  if (!subscriber) return;
  await subscriber.quit();
  subscriber = undefined;
}
