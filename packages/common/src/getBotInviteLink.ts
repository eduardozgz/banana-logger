import { Routes } from "discord-api-types/v10";

import { botPermissions } from "./botPermissions";
import { env } from "./env";

export function getBotInviteLink(guildId?: string) {
  const inviteLink = new URL(
    `https://discord.com${Routes.oauth2Authorization()}`,
  );

  inviteLink.searchParams.set("client_id", env.DISCORD_CLIENT_ID);
  inviteLink.searchParams.set(
    "permissions",
    botPermissions.bitfield.toString(),
  );
  inviteLink.searchParams.set("scope", "bot");

  if (guildId) inviteLink.searchParams.set("guild_id", guildId);

  return inviteLink.toString();
}
