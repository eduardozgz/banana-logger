import { channelMention, userMention } from "@discordjs/builders";
import { AuditLogEvent } from "discord.js";

import { initI18n } from "@bl/i18n";

import { LogService } from "~/services/LogService";
import { EventHandler } from "~/structures";
import { AuditLogCollector } from "~/utils/AuditLogCollector";

export const messageDeleteEvent = new EventHandler({
  name: "messageDelete",
  handler: async (_client, message) => {
    // `guild` is resolvable for partial messages too (the bot is in the guild),
    // so use it directly rather than inGuild(), which would wrongly narrow away
    // the partial case and hide the null author/content below.
    const guild = message.guild;
    if (!guild) return;

    const channel = message.channel;

    const i18n = await initI18n(guild.preferredLocale);
    const unknownValue = i18n.t(
      "main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE",
    );

    // With Partials.Message enabled, a deleted *uncached* message arrives
    // partial: author and content are null, and it can't be fetched (it's
    // already gone). Degrade those fields to the unknown-value placeholder.
    const author = message.author;

    const auditLogEntry = await AuditLogCollector.tryToGet({
      guild,
      event: AuditLogEvent.MessageDelete,
      filter: (auditLogEntry) => {
        return (
          auditLogEntry.extra.count === 1 &&
          auditLogEntry.extra.channel.id === channel.id
        );
      },
    });

    const executor = auditLogEntry?.executor ?? author ?? undefined;

    LogService.log({
      eventName: "messageDelete",
      guild,
      executor,
      relatedChannels: [channel.id],
      relatedUsers: author ? [author.id] : [],
      target: author ?? undefined,
      data: {
        AUTHOR_MENTION: author ? userMention(author.id) : unknownValue,
        AUTHOR_NAME: author?.username ?? unknownValue,
        AUTHOR_ID: author?.id ?? "",
        AUTHOR_AVATAR: author?.displayAvatarURL(),
        OLD_CONTENT: message.content ?? unknownValue,
        MESSAGE_URL: message.url,
        CHANNEL_MENTION: channelMention(channel.id),
      },
      i18n,
    });
  },
});
