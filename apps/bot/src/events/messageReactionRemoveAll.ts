import { channelMention } from "discord.js";

import { initI18n } from "@/i18n";

import { LogService } from "~/services/LogService";
import { EventHandler } from "~/structures";

export const messageReactionRemoveAllEvent = new EventHandler({
  name: "messageReactionRemoveAll",
  handler: async (_client, message, _reactions) => {
    if (!message.inGuild()) return;

    if (message.partial) {
      try {
        await message.fetch();
      } catch {
        return;
      }
    }

    const i18n = await initI18n(message.guild.preferredLocale);

    LogService.log({
      eventName: "messageReactionRemoveAll",
      relatedUsers: [message.author.id],
      relatedChannels: [message.channelId],
      guild: message.guild,
      i18n,
      data: {
        AUTHOR_MENTION: message.author.toString(),
        AUTHOR_NAME: message.author.username,
        MESSAGE_URL: message.url,
        CHANNEL_MENTION: channelMention(message.channelId),
      },
    });
  },
});
