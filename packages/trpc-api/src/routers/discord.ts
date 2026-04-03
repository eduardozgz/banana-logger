import { REST } from "@discordjs/rest";
import { PermissionFlagsBits, Routes } from "discord-api-types/v10";
import { z } from "zod";

import type {
  APIUser,
  RESTGetAPICurrentUserGuildsResult,
} from "discord-api-types/v10";

import { botAPIConsumer } from "../botAPI";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { handleUnauthorizedDiscordError } from "../utils/discordErrors";

function makeRest(accessToken: string) {
  return new REST({ authPrefix: "Bearer" }).setToken(accessToken);
}

export const discordRouter = createTRPCRouter({
  identify: protectedProcedure.query(async ({ ctx }) => {
    const rest = makeRest(ctx.session.accessToken);
    const user = (await rest
      .get(Routes.user())
      .catch(handleUnauthorizedDiscordError)) as APIUser;

    const avatarUrl = user.avatar
      ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${user.avatar.startsWith("a_") ? "gif" : "png"}?size=128`
      : `https://cdn.discordapp.com/embed/avatars/${(BigInt(user.id) >> 22n) % 6n}.png`;

    return {
      id: user.id,
      username: user.username,
      discriminator: user.discriminator ?? "0",
      avatar: avatarUrl,
    };
  }),

  userGuilds: protectedProcedure.query(async ({ ctx }) => {
    const rest = makeRest(ctx.session.accessToken);
    const guilds = (await rest
      .get(Routes.userGuilds(), { query: new URLSearchParams({ limit: "200" }) })
      .catch(handleUnauthorizedDiscordError)) as RESTGetAPICurrentUserGuildsResult;

    const userGuilds = new Map<
      string,
      {
        id: string;
        name: string;
        icon: string | null;
        hasManageGuild: boolean;
      }
    >();

    for (const guild of guilds) {
      const permissions = BigInt(guild.permissions ?? "0");
      const hasManageGuild =
        (permissions & PermissionFlagsBits.ManageGuild) ===
        PermissionFlagsBits.ManageGuild;

      if (!hasManageGuild) continue;

      userGuilds.set(guild.id, {
        id: guild.id,
        name: guild.name,
        icon: guild.icon,
        hasManageGuild,
      });
    }

    return { userGuilds };
  }),

  getGuild: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      return botAPIConsumer.discord.getGuild.query({ id: input.id });
    }),
});
