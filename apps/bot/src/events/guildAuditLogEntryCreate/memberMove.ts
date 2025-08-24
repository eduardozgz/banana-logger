import assert from "node:assert";
import type { AuditLogEvent } from "discord.js";
import { channelMention } from "discord.js";

import type { Handler } from ".";
import { LogService } from "~/services/LogService";

export const memberMoveHandler: Handler<AuditLogEvent.MemberMove> = (
  auditLogEntry,
  guild,
  i18n,
) => {
  assert(auditLogEntry.executorId);

  void LogService.log({
    eventName: "memberMove",
    guild,
    i18n,
    relatedChannels: [auditLogEntry.extra.channel.id],
    relatedUsers: [auditLogEntry.executorId, auditLogEntry.targetId],
    executor: auditLogEntry.executor,
    target: auditLogEntry.target,
    data: {
      COUNT: auditLogEntry.extra.count.toString(),
      CHANNEL_MENTION: channelMention(auditLogEntry.extra.channel.id),
    },
  });
};
