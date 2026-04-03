import { ChannelType } from "discord.js";
import { z } from "zod";

import { botAPIProcedure, createBotAPIRouter } from "../trpc";

export const discordRouter = createBotAPIRouter({
  getGuild: botAPIProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      await ctx.takeRequest(true);

      const guild = await ctx.botClient.guilds.fetch(input.id);

      const channels = await guild.channels.fetch();
      const mappedChannels = new Map<
        string,
        { id: string; name: string; type: ChannelType; parentId: string | null; position: number }
      >();

      for (const [id, channel] of channels) {
        if (!channel) continue;
        mappedChannels.set(id, {
          id: channel.id,
          name: channel.name,
          type: channel.type,
          parentId: channel.parentId,
          position: channel.position,
        });
      }

      return {
        id: guild.id,
        name: guild.name,
        icon: guild.icon,
        memberCount: guild.memberCount,
        channels: mappedChannels,
      };
    }),
});
