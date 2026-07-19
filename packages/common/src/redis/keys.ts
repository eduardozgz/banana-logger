// Explicit string namespaces (not a numeric enum): the emitted keys are
// greppable/readable when inspecting Redis, and adding or reordering a
// namespace can never shift another one's prefix — a positional enum renumbered
// every later member, silently splitting a cache (and its invalidations)
// between old and new pods during a rolling deploy.
const BaseKeys = {
  DiscordIdentityCache: "discord-identity-cache",
  DiscordUserGuildsCache: "discord-user-guilds-cache",
  DiscordGuildCache: "discord-guild-cache",
} as const;

/** Cache of a user's Discord profile, keyed by a hash of their access token. */
export const discordIdentityCacheKey = (tokenHash: string) =>
  `${BaseKeys.DiscordIdentityCache}:${tokenHash}`;

/** Cache of a user's guild list, keyed by a hash of their access token. */
export const discordUserGuildsCacheKey = (tokenHash: string) =>
  `${BaseKeys.DiscordUserGuildsCache}:${tokenHash}`;

/** Cache of the bot's snapshot of a guild, keyed by guild id (shared across users). */
export const discordGuildCacheKey = (guildId: string) =>
  `${BaseKeys.DiscordGuildCache}:${guildId}`;
