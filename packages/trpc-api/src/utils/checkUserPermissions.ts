import { REST } from "@discordjs/rest";
import { TRPCError } from "@trpc/server";
import { PermissionFlagsBits, Routes } from "discord-api-types/v10";

import type { RESTGetAPICurrentUserGuildsResult } from "discord-api-types/v10";
import type { Session } from "@bl/validators/Session";

import { Errors } from "./errors";
import { handleUnauthorizedDiscordError } from "./discordErrors";

/**
 * Asserts that the session's user has permission to manage the given guild
 * (either ManageGuild or Administrator). Throws a FORBIDDEN tRPC error otherwise.
 *
 * This is the authorization guard for the guild router: every procedure there
 * takes a client-supplied `guildId`, so without this check any authenticated
 * user could read or mutate any guild's logging config (IDOR).
 *
 * The user's per-guild permissions come straight from Discord's
 * `GET /users/@me/guilds`, so this reflects live server membership/roles.
 */
export async function assertManageGuild(
  session: Session,
  guildId: string,
): Promise<void> {
  const rest = new REST({ authPrefix: "Bearer" }).setToken(session.accessToken);

  const guilds = (await rest
    .get(Routes.userGuilds())
    .catch(
      handleUnauthorizedDiscordError,
    )) as RESTGetAPICurrentUserGuildsResult;

  const guild = guilds.find((g) => g.id === guildId);

  if (!guild) {
    throw new TRPCError({ code: "FORBIDDEN", message: Errors.NotAuthorized });
  }

  const permissions = BigInt(guild.permissions);
  const canManage =
    (permissions & PermissionFlagsBits.ManageGuild) ===
      PermissionFlagsBits.ManageGuild ||
    (permissions & PermissionFlagsBits.Administrator) ===
      PermissionFlagsBits.Administrator;

  if (!canManage) {
    throw new TRPCError({ code: "FORBIDDEN", message: Errors.NotAuthorized });
  }
}
