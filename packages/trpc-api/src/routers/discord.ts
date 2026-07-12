import { REST } from "@discordjs/rest";
import { TRPCError } from "@trpc/server";
import { Routes } from "discord-api-types/v10";
import SuperJSON from "superjson";
import { z } from "zod";

import type { APIUser } from "discord-api-types/v10";

import { cachedFetch } from "@bl/common/redis/cachedFetch";
import {
  discordGuildCacheKey,
  discordIdentityCacheKey,
} from "@bl/common/redis/keys";
import { REQUEST_TIMEOUT_MESSAGE } from "@bl/trpc-redis/Constants";

import { botAPIConsumer } from "../botAPI";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { handleUnauthorizedDiscordError } from "../utils/discordErrors";
import { Errors } from "../utils/errors";
import {
  canManageGuild,
  fetchUserGuilds,
  tokenHash,
} from "../utils/userGuilds";

// /users/@me and the bot's guild snapshot are both hit on every dashboard load;
// cache them briefly so we don't pay the rate-limited REST call / cross-Redis
// RPC each time. Short TTL: the frontend refetches on window focus.
const RESPONSE_CACHE_TTL = 15; // seconds

function makeRest(accessToken: string) {
  return new REST({ authPrefix: "Bearer" }).setToken(accessToken);
}

type GuildSnapshot = Awaited<
  ReturnType<typeof botAPIConsumer.discord.getGuild.query>
>;

// When no bot instance answers in time (e.g. the bot is offline / not in the
// guild), surface a NOT_FOUND so the dashboard shows an "invite the bot" state
// instead of retrying a generic error for ~10s.
function notFoundOnTimeout(error: unknown): never {
  if (error instanceof Error && error.message === REQUEST_TIMEOUT_MESSAGE) {
    throw new TRPCError({ code: "NOT_FOUND", message: Errors.NotFound });
  }
  throw error;
}

export const discordRouter = createTRPCRouter({
  identify: protectedProcedure.query(async ({ ctx }) => {
    const user = await cachedFetch<APIUser>({
      redis: ctx.redis,
      key: discordIdentityCacheKey(tokenHash(ctx.session.accessToken)),
      ttlSeconds: RESPONSE_CACHE_TTL,
      fetch: () =>
        makeRest(ctx.session.accessToken)
          .get(Routes.user())
          .catch(handleUnauthorizedDiscordError),
      validate: (raw) => raw as APIUser,
    });

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
    const guilds = await fetchUserGuilds(ctx.redis, ctx.session.accessToken);

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
      if (!canManageGuild(guild.permissions)) continue;

      userGuilds.set(guild.id, {
        id: guild.id,
        name: guild.name,
        icon: guild.icon,
        hasManageGuild: true,
      });
    }

    return { userGuilds };
  }),

  getGuild: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return cachedFetch<GuildSnapshot>({
        redis: ctx.redis,
        key: discordGuildCacheKey(input.id),
        ttlSeconds: RESPONSE_CACHE_TTL,
        fetch: () =>
          botAPIConsumer.discord.getGuild
            .query({ id: input.id })
            .catch(notFoundOnTimeout),
        validate: (raw) => raw as GuildSnapshot,
        stringify: (raw) => SuperJSON.stringify(raw),
        parse: (cached) => SuperJSON.parse(cached),
      });
    }),
});
