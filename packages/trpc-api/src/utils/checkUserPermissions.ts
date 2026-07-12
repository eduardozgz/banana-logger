import { TRPCError } from "@trpc/server";

import type { RedisLike } from "@bl/common/redis/cachedFetch";
import type { Session } from "@bl/validators/Session";

import { Errors } from "./errors";
import { canManageGuild, fetchUserGuilds } from "./userGuilds";

/**
 * Asserts that the session's user has permission to manage the given guild
 * (ManageGuild or Administrator). Throws a FORBIDDEN tRPC error otherwise.
 *
 * This is the authorization guard for the guild router: every procedure there
 * takes a client-supplied `guildId`, so without this check any authenticated
 * user could read or mutate any guild's logging config (IDOR). It reads through
 * the same cached guild list as `discord.userGuilds`, so it adds no extra
 * Discord round-trip on a warm cache.
 */
export async function assertManageGuild(
  redis: RedisLike,
  session: Session,
  guildId: string,
): Promise<void> {
  const guilds = await fetchUserGuilds(redis, session.accessToken);
  const guild = guilds.find((g) => g.id === guildId);

  if (!guild || !canManageGuild(guild.permissions)) {
    throw new TRPCError({ code: "FORBIDDEN", message: Errors.NotAuthorized });
  }
}
