import { channelMention, userMention } from "@discordjs/builders";

import { LogService } from "~/services/LogService";
import { EventHandler } from "~/structures";

export const messageDeleteEvent = new EventHandler({
  name: "messageDelete",
  handler: async (message) => {
    if (!message.guild) return;

    // TODO Improve this
    await LogService.log({
      eventName: "messageDelete",
      relatedUsers: [message.author?.id],
      relatedChannels: [],
      guild: message.guild,
      data: {
        OLD_CONTENT: message.content ?? "",
        MESSAGE_URL: message.url,
        CHANNEL_MENTION: channelMention(message.channel.id),
        AUTHOR_MENTION: userMention(message.author?.id ?? ""),
        AUTHOR_AVATAR: message.author?.displayAvatarURL() ?? "",
      },
    });
  },
});
