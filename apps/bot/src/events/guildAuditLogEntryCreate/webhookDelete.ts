import type { AuditLogEvent } from "discord.js";

import type { Handler } from ".";
import { LogService } from "~/services/LogService";

export const webhookDeleteHandler: Handler<AuditLogEvent.WebhookDelete> = (
  auditLogEntry,
  guild,
  i18n,
) => {
  void LogService.log({
    eventName: auditLogEntry.executor ? "webhookDelete" : "webhookSelfDelete",
    guild,
    i18n,
    relatedChannels: [auditLogEntry.target.channel?.id],
    relatedUsers: [auditLogEntry.executorId],
    executor: auditLogEntry.executor,
    target: auditLogEntry.target,
    data: {},
  });
};
