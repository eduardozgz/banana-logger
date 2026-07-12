import { createHash } from "node:crypto";
import { REST } from "@discordjs/rest";
import { PermissionFlagsBits, Routes } from "discord-api-types/v10";
import { z } from "zod/v4";

import type { RedisLike } from "@bl/common/redis/cachedFetch";
import { cachedFetch } from "@bl/common/redis/cachedFetch";
import { discordUserGuildsCacheKey } from "@bl/common/redis/keys";

import { handleUnauthorizedDiscordError } from "./discordErrors";

// /users/@me/guilds is heavily rate limited per token and both the dashboard
// guild list and the per-guild permission check need it on every request, so
// they read through this same short-lived cache and share a single in-flight
// request. Kept short so permission changes made in Discord surface quickly.
const RESPONSE_CACHE_TTL = 15; // seconds

// We only read these fields; extra keys from Discord are stripped on parse.
const userGuildSchema = z.object({
  id: z.string(),
  name: z.string(),
  icon: z.string().nullable(),
  permissions: z.string(),
});
const userGuildsSchema = z.array(userGuildSchema);

export type UserGuild = z.infer<typeof userGuildSchema>;

export const tokenHash = (token: string) =>
  createHash("sha256").update(token).digest("hex");

/** Whether a Discord permissions bitfield grants management of the guild. */
export function canManageGuild(permissions: string): boolean {
  const bits = BigInt(permissions);
  return (
    (bits & PermissionFlagsBits.ManageGuild) ===
      PermissionFlagsBits.ManageGuild ||
    (bits & PermissionFlagsBits.Administrator) ===
      PermissionFlagsBits.Administrator
  );
}

/** The caller's Discord guilds, cached briefly per access token. */
export function fetchUserGuilds(
  redis: RedisLike,
  accessToken: string,
): Promise<UserGuild[]> {
  return cachedFetch({
    redis,
    key: discordUserGuildsCacheKey(tokenHash(accessToken)),
    ttlSeconds: RESPONSE_CACHE_TTL,
    fetch: () =>
      new REST({ authPrefix: "Bearer" })
        .setToken(accessToken)
        .get(Routes.userGuilds())
        .catch(handleUnauthorizedDiscordError),
    validate: (raw) => userGuildsSchema.parse(raw),
  });
}
