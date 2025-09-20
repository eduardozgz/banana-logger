import assert from "node:assert";
import type { PartialUser, User } from "discord.js";
import { channelMention, userMention } from "@discordjs/builders";
import { AuditLogEvent } from "discord.js";

import { initI18n } from "@/i18n";

import { LogService } from "~/services/LogService";
import { EventHandler } from "~/structures";
import { AuditLogCollector } from "~/utils/AuditLogCollector";

export const messageDeleteEvent = new EventHandler({
  name: "messageDelete",
  handler: async (client, message) => {
    assert(message.inGuild());

    const auditLogEntry = await AuditLogCollector.tryToGet({
      guild: message.guild,
      event: AuditLogEvent.MessageDelete,
      filter: (auditLogEntry) => {
        return (
          auditLogEntry.extra.count === 1 &&
          auditLogEntry.extra.channel.id === message.channel.id
        );
      },
    });

    const executor: User | PartialUser =
      auditLogEntry?.executor ?? message.author;

    const i18n = await initI18n(message.guild.preferredLocale);

    await LogService.log({
      eventName: "messageDelete",
      guild: message.guild,
      executor,
      relatedChannels: [message.channel.id],
      relatedUsers: [message.author.id],
      target: message.author,
      data: {
        AUTHOR_MENTION: userMention(message.author.id),
        AUTHOR_NAME: message.author.username,
        AUTHOR_ID: message.author.id,
        AUTHOR_AVATAR: message.author.displayAvatarURL(),
        OLD_CONTENT:
          message.content ||
          i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
        MESSAGE_URL: message.url,
        CHANNEL_MENTION: channelMention(message.channel.id),
      },
      i18n,
    });
  },
});
