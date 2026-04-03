import { channelMention, formatEmoji } from "discord.js";

import { initI18n } from "@/i18n";

import { LogService } from "~/services/LogService";
import { EventHandler } from "~/structures";
import { twemojiURL } from "~/utils/twemoji";

export const messageReactionRemoveEmojiEvent = new EventHandler({
  name: "messageReactionRemoveEmoji",
  handler: async (_client, reaction) => {
    if (!reaction.message.inGuild()) return;

    if (reaction.message.partial) {
      try {
        await reaction.message.fetch();
      } catch {
        return;
      }
    }

    const { message, emoji } = reaction;
    const i18n = await initI18n(message.guild.preferredLocale);

    LogService.log({
      eventName: "messageReactionRemoveEmoji",
      relatedUsers: [message.author.id],
      relatedChannels: [message.channelId],
      guild: message.guild,
      i18n,
      data: {
        REACTION_EMOJI: emoji.id
          ? formatEmoji(emoji.id, emoji.animated ?? false)
          : (emoji.name ?? ""),
        REACTION_IMAGE_URL: emoji.url ?? twemojiURL(emoji.name ?? ""),
        AUTHOR_MENTION: message.author.toString(),
        AUTHOR_NAME: message.author.username,
        MESSAGE_URL: message.url,
        CHANNEL_MENTION: channelMention(message.channelId),
      },
    });
  },
});
