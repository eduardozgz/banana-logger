import { EventType } from "@bl/db/client";
import {
  EVENT_PRESETS,
  PRESET_NAMES,
  type PresetName,
} from "@bl/common/eventPresets";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

const guildInput = z.object({ guildId: z.string() });
const channelInput = z.object({ guildId: z.string(), channelId: z.string() });

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
  has: protectedProcedure
    .input(guildInput)
    .query(async ({ ctx, input }) => {
      const count = await ctx.db.settings.count({
        where: { guildId: input.guildId },
      });
      return count > 0;
    }),

  getLogChannels: protectedProcedure
    .input(guildInput)
    .query(async ({ ctx, input }) => {
      return ctx.db.settings.findMany({
        where: { guildId: input.guildId },
      });
    }),

  getLogChannel: protectedProcedure
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

  createLogChannel: protectedProcedure
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

  deleteLogChannel: protectedProcedure
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

  toggleEvent: protectedProcedure
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

  togglePreset: protectedProcedure
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

  toggleAllEvents: protectedProcedure
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

  toggleIgnoreChannel: protectedProcedure
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

  toggleWatchChannel: protectedProcedure
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

  toggleIgnoreUser: protectedProcedure
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

  toggleWatchUser: protectedProcedure
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
