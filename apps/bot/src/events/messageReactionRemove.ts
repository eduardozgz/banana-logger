import { channelMention, formatEmoji, userMention } from "discord.js";

import { initI18n } from "@/i18n";

import { LogService } from "~/services/LogService";
import { EventHandler } from "~/structures";
import { twemojiURL } from "~/utils/twemoji";

export const messageReactionRemoveEvent = new EventHandler({
  name: "messageReactionRemove",
  handler: async (_client, reaction, user) => {
    if (!reaction.message.inGuild()) return;
    if (user.bot) return;

    if (reaction.partial) {
      try {
        await reaction.fetch();
      } catch {
        return;
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
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
      eventName: "messageReactionRemove",
      relatedUsers: [user.id, message.author.id],
      relatedChannels: [message.channelId],
      guild: message.guild,
      i18n,
      data: {
        REACTOR_MENTION: userMention(user.id),
        REACTOR_NAME: user.username ?? "Unknown",
        REACTOR_ID: user.id,
        REACTOR_AVATAR: user.displayAvatarURL(),
        REACTION_EMOJI: emoji.id
          ? formatEmoji(emoji.id, emoji.animated ?? false)
          : (emoji.name ?? ""),
        AUTHOR_MENTION: userMention(message.author.id),
        AUTHOR_NAME: message.author.username,
        MESSAGE_URL: message.url,
        CHANNEL_MENTION: channelMention(message.channelId),
        REACTION_IMAGE_URL: emoji.url ?? twemojiURL(emoji.name ?? ""),
      },
    });
  },
});
