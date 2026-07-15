import { EventType } from "@bl/db/client";
import { publishConfigInvalidation } from "@bl/redis";
import { EVENT_PRESETS, PRESET_NAMES } from "@bl/common/eventPresets";
import type { PresetName } from "@bl/common/eventPresets";
import { TRPCError } from "@trpc/server";
import { z } from "zod/v4";

import type { TRPCContext } from "../context";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { assertManageGuild } from "../utils/checkUserPermissions";

const channelInput = z.object({ channelId: z.string() });

/**
 * A procedure scoped to a single guild. It requires a `guildId` in the input and
 * asserts the caller may manage that guild before the resolver runs, so no guild
 * procedure can be invoked for a guild the user has no authority over.
 */
const guildProcedure = protectedProcedure
  .input(z.object({ guildId: z.string() }))
  .use(async ({ ctx, input, next, type }) => {
    await assertManageGuild(ctx.redis, ctx.session, input.guildId);
    const result = await next();
    // Every guild mutation changes this guild's log-channel config; on success,
    // tell the bot pods to drop their cached copy.
    if (type === "mutation" && result.ok) {
      await publishConfigInvalidation(input.guildId);
    }
    return result;
  });

function toggleArrayItem<T>(array: T[], item: T): T[] {
  const result = [...array];
  const index = result.indexOf(item);
  if (index >= 0) {
    result.splice(index, 1);
  } else {
    result.push(item);
  }
  return result;
}

async function requireLogChannel(
  db: TRPCContext["db"],
  guildId: string,
  channelId: string,
) {
  const settings = await db.settings.get(guildId, channelId);
  if (!settings) {
    throw new TRPCError({ code: "NOT_FOUND", message: "Log channel not found" });
  }
  return settings;
}

export const guildRouter = createTRPCRouter({
  has: guildProcedure.query(async ({ ctx, input }) => {
    const count = await ctx.db.settings.countByGuild(input.guildId);
    return count > 0;
  }),

  getLogChannels: guildProcedure.query(async ({ ctx, input }) => {
    return ctx.db.settings.getByGuild(input.guildId);
  }),

  getLogChannel: guildProcedure
    .input(channelInput)
    .query(async ({ ctx, input }) => {
      return (
        (await ctx.db.settings.get(input.guildId, input.channelId)) ?? null
      );
    }),

  createLogChannel: guildProcedure
    .input(channelInput)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.settings.ensure(input.guildId, input.channelId);
    }),

  deleteLogChannel: guildProcedure
    .input(channelInput)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.settings.delete(input.guildId, input.channelId);
    }),

  // Atomically replace the whole set of watched events. The dashboard edits a
  // draft client-side (toggling events/presets/all) and saves the resulting
  // array here in one shot, which is what makes autosave possible.
  setLogChannelEvents: guildProcedure
    .input(channelInput.extend({ watchingEvents: z.array(z.enum(EventType)) }))
    .mutation(async ({ ctx, input }) => {
      // Guard first: patch() is an upsert, so without this a stale autosave to a
      // channel that was just deleted would re-INSERT it and silently resume
      // logging. Matches the sibling toggle mutations.
      await requireLogChannel(ctx.db, input.guildId, input.channelId);
      // Dedupe defensively — the array is supplied by the client.
      return ctx.db.settings.patch(input.guildId, input.channelId, {
        watchingEvents: [...new Set(input.watchingEvents)],
      });
    }),

  toggleIgnoreChannel: guildProcedure
    .input(channelInput.extend({ targetChannelId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const settings = await requireLogChannel(
        ctx.db,
        input.guildId,
        input.channelId,
      );

      return ctx.db.settings.patch(input.guildId, input.channelId, {
        ignoredChannels: toggleArrayItem(
          settings.ignoredChannels,
          input.targetChannelId,
        ),
      });
    }),

  toggleWatchChannel: guildProcedure
    .input(channelInput.extend({ targetChannelId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const settings = await requireLogChannel(
        ctx.db,
        input.guildId,
        input.channelId,
      );

      return ctx.db.settings.patch(input.guildId, input.channelId, {
        watchChannels: toggleArrayItem(
          settings.watchChannels,
          input.targetChannelId,
        ),
      });
    }),

  toggleIgnoreUser: guildProcedure
    .input(channelInput.extend({ userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const settings = await requireLogChannel(
        ctx.db,
        input.guildId,
        input.channelId,
      );

      return ctx.db.settings.patch(input.guildId, input.channelId, {
        ignoredUsers: toggleArrayItem(settings.ignoredUsers, input.userId),
      });
    }),

  toggleWatchUser: guildProcedure
    .input(channelInput.extend({ userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const settings = await requireLogChannel(
        ctx.db,
        input.guildId,
        input.channelId,
      );

      return ctx.db.settings.patch(input.guildId, input.channelId, {
        watchUsers: toggleArrayItem(settings.watchUsers, input.userId),
      });
    }),

  presets: protectedProcedure.query(() => {
    return Object.fromEntries(
      PRESET_NAMES.map((name) => [name, [...EVENT_PRESETS[name]]]),
    ) as Record<PresetName, EventType[]>;
  }),
});
