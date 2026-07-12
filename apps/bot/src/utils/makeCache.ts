import { Options } from "discord.js";

/**
 * Cache limits for the Discord client.
 *
 * Unlike the member-counter reference (which zeroes almost every cache because
 * it only needs counts), a logger relies on discord.js caches for the "before"
 * state of edits/deletes: messages (messageUpdate/messageDelete), voice states
 * (voiceStateUpdate) and members. So we keep discord.js's defaults — which
 * already bound the message cache to 200 per channel — and let {@link sweepers}
 * drop stale entries by age. Presences are never logged, so they aren't cached
 * even though the all-intents gateway delivers them.
 *
 * These are the knobs to tune if memory becomes a concern in large guilds.
 */
export const makeCache = () =>
  Options.cacheWithLimits({
    ...Options.DefaultMakeCacheSettings,
    PresenceManager: 0,
  });
