import type { AuditLogEvent } from "discord.js";
import { channelMention } from "@discordjs/builders";

import type { Handler } from ".";
import { LogService } from "~/services/LogService";

export const messageUnpinHandler: Handler<AuditLogEvent.MessageUnpin> = (
  auditLogEntry,
  guild,
  i18n,
) => {
  const messageLink = `https://discord.com/channels/${guild.id}/${auditLogEntry.extra.channel.id}/${auditLogEntry.extra.messageId}`;

  void LogService.log({
    eventName: "messageUnpin",
    guild,
    i18n,
    relatedChannels: [auditLogEntry.extra.channel.id],
    relatedUsers: [auditLogEntry.executor?.id],
    executor: auditLogEntry.executor,
    target: auditLogEntry.target,
    data: {
      MESSAGE_URL: messageLink,
    },
  });
};
