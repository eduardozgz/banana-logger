enum BaseKeys {
  DiscordIdentityCache,
  DiscordUserGuildsCache,
  DiscordGuildCache,
}

/** Cache of a user's Discord profile, keyed by a hash of their access token. */
export const discordIdentityCacheKey = (tokenHash: string) =>
  `${BaseKeys.DiscordIdentityCache}:${tokenHash}`;

/** Cache of a user's guild list, keyed by a hash of their access token. */
export const discordUserGuildsCacheKey = (tokenHash: string) =>
  `${BaseKeys.DiscordUserGuildsCache}:${tokenHash}`;

/** Cache of the bot's snapshot of a guild, keyed by guild id (shared across users). */
export const discordGuildCacheKey = (guildId: string) =>
  `${BaseKeys.DiscordGuildCache}:${guildId}`;
