import { EventType } from "@bl/db/client";
import { EVENT_PRESETS, PRESET_NAMES } from "@bl/common/eventPresets";
import type { PresetName } from "@bl/common/eventPresets";
import { z } from "zod/v4";

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
  .use(async ({ ctx, input, next }) => {
    await assertManageGuild(ctx.redis, ctx.session, input.guildId);
    return next();
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

export const guildRouter = createTRPCRouter({
  has: guildProcedure.query(async ({ ctx, input }) => {
    const count = await ctx.db.settings.count({
      where: { guildId: input.guildId },
    });
    return count > 0;
  }),

  getLogChannels: guildProcedure.query(async ({ ctx, input }) => {
    return ctx.db.settings.findMany({
      where: { guildId: input.guildId },
    });
  }),

  getLogChannel: guildProcedure
    .input(channelInput)
    .query(async ({ ctx, input }) => {
      return ctx.db.settings.findUnique({
        where: {
          guildId_channelId: {
            guildId: input.guildId,
            channelId: input.channelId,
          },
        },
      });
    }),

  createLogChannel: guildProcedure
    .input(channelInput)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.settings.upsert({
        where: {
          guildId_channelId: {
            guildId: input.guildId,
            channelId: input.channelId,
          },
        },
        update: {},
        create: {
          guildId: input.guildId,
          channelId: input.channelId,
        },
      });
    }),

  deleteLogChannel: guildProcedure
    .input(channelInput)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.settings.delete({
        where: {
          guildId_channelId: {
            guildId: input.guildId,
            channelId: input.channelId,
          },
        },
      });
    }),

  // Atomically replace the whole set of watched events. The dashboard edits a
  // draft client-side (toggling events/presets/all) and saves the resulting
  // array here in one shot, which is what makes autosave possible.
  setLogChannelEvents: guildProcedure
    .input(channelInput.extend({ watchingEvents: z.array(z.enum(EventType)) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.settings.update({
        where: {
          guildId_channelId: {
            guildId: input.guildId,
            channelId: input.channelId,
          },
        },
        // Dedupe defensively — the array is supplied by the client.
        data: { watchingEvents: [...new Set(input.watchingEvents)] },
      });
    }),

  toggleIgnoreChannel: guildProcedure
    .input(channelInput.extend({ targetChannelId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const settings = await ctx.db.settings.findUniqueOrThrow({
        where: {
          guildId_channelId: {
            guildId: input.guildId,
            channelId: input.channelId,
          },
        },
      });

      return ctx.db.settings.update({
        where: { id: settings.id },
        data: {
          ignoredChannels: toggleArrayItem(
            settings.ignoredChannels,
            input.targetChannelId,
          ),
        },
      });
    }),

  toggleWatchChannel: guildProcedure
    .input(channelInput.extend({ targetChannelId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const settings = await ctx.db.settings.findUniqueOrThrow({
        where: {
          guildId_channelId: {
            guildId: input.guildId,
            channelId: input.channelId,
          },
        },
      });

      return ctx.db.settings.update({
        where: { id: settings.id },
        data: {
          watchChannels: toggleArrayItem(
            settings.watchChannels,
            input.targetChannelId,
          ),
        },
      });
    }),

  toggleIgnoreUser: guildProcedure
    .input(channelInput.extend({ userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const settings = await ctx.db.settings.findUniqueOrThrow({
        where: {
          guildId_channelId: {
            guildId: input.guildId,
            channelId: input.channelId,
          },
        },
      });

      return ctx.db.settings.update({
        where: { id: settings.id },
        data: {
          ignoredUsers: toggleArrayItem(settings.ignoredUsers, input.userId),
        },
      });
    }),

  toggleWatchUser: guildProcedure
    .input(channelInput.extend({ userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const settings = await ctx.db.settings.findUniqueOrThrow({
        where: {
          guildId_channelId: {
            guildId: input.guildId,
            channelId: input.channelId,
          },
        },
      });

      return ctx.db.settings.update({
        where: { id: settings.id },
        data: {
          watchUsers: toggleArrayItem(settings.watchUsers, input.userId),
        },
      });
    }),

  presets: protectedProcedure.query(() => {
    return Object.fromEntries(
      PRESET_NAMES.map((name) => [name, [...EVENT_PRESETS[name]]]),
    ) as Record<PresetName, EventType[]>;
  }),
});
