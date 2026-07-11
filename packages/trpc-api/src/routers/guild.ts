import { EventType } from "@bl/db/client";
import {
  EVENT_PRESETS,
  PRESET_NAMES,
  type PresetName,
} from "@bl/common/eventPresets";
import { z } from "zod";

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
    await assertManageGuild(ctx.session, input.guildId);
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

  toggleEvent: guildProcedure
    .input(
      channelInput.extend({
        event: z.nativeEnum(EventType),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const settings = await ctx.db.settings.findUniqueOrThrow({
        where: {
          guildId_channelId: {
            guildId: input.guildId,
            channelId: input.channelId,
          },
        },
      });

      const updated = toggleArrayItem(settings.watchingEvents, input.event);

      return ctx.db.settings.update({
        where: { id: settings.id },
        data: { watchingEvents: updated },
      });
    }),

  togglePreset: guildProcedure
    .input(
      channelInput.extend({
        preset: z.enum(PRESET_NAMES as [PresetName, ...PresetName[]]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const settings = await ctx.db.settings.findUniqueOrThrow({
        where: {
          guildId_channelId: {
            guildId: input.guildId,
            channelId: input.channelId,
          },
        },
      });

      const presetEvents = [...EVENT_PRESETS[input.preset]];
      const allPresent = presetEvents.every((e) =>
        settings.watchingEvents.includes(e),
      );

      let updated: EventType[];
      if (allPresent) {
        updated = settings.watchingEvents.filter(
          (e) => !presetEvents.includes(e),
        );
      } else {
        const toAdd = presetEvents.filter(
          (e) => !settings.watchingEvents.includes(e),
        );
        updated = [...settings.watchingEvents, ...toAdd];
      }

      return ctx.db.settings.update({
        where: { id: settings.id },
        data: { watchingEvents: updated },
      });
    }),

  toggleAllEvents: guildProcedure
    .input(channelInput)
    .mutation(async ({ ctx, input }) => {
      const settings = await ctx.db.settings.findUniqueOrThrow({
        where: {
          guildId_channelId: {
            guildId: input.guildId,
            channelId: input.channelId,
          },
        },
      });

      const allEvents = Object.values(EventType);
      const updated =
        settings.watchingEvents.length === allEvents.length ? [] : allEvents;

      return ctx.db.settings.update({
        where: { id: settings.id },
        data: { watchingEvents: updated },
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
