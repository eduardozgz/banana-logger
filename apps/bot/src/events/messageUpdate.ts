import assert from "node:assert";
import { channelMention, userMention } from "discord.js";

import { initI18n } from "@/i18n";

import { LogService } from "~/services/LogService";
import { EventHandler } from "~/structures";

export const messageUpdateEvent = new EventHandler({
  name: "messageUpdate",
  handler: async (_client, oldMessage, newMessage) => {
    assert(newMessage.inGuild());

    if (newMessage.author.bot) return;
    if (oldMessage.content === newMessage.content) return;

    if (oldMessage.partial) {
      try {
        await oldMessage.fetch();
      } catch {
        return;
      }
    }

    const i18n = await initI18n(newMessage.guild.preferredLocale);

    LogService.log({
      eventName: "messageUpdate",
      relatedUsers: [newMessage.author.id],
      relatedChannels: [newMessage.channelId],
      guild: newMessage.guild,
      i18n,
      data: {
        AUTHOR_MENTION: userMention(newMessage.author.id),
        AUTHOR_NAME: newMessage.author.username,
        AUTHOR_ID: newMessage.author.id,
        AUTHOR_AVATAR: newMessage.author.displayAvatarURL(),
        OLD_CONTENT:
          oldMessage.content ??
          i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
        NEW_CONTENT: newMessage.content,
        MESSAGE_URL: newMessage.url,
        CHANNEL_MENTION: channelMention(newMessage.channel.id),
      },
    });
  },
});
