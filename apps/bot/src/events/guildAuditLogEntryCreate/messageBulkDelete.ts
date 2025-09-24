import type { AuditLogEvent } from "discord.js";

import type { Handler } from ".";
import { LogService } from "~/services/LogService";

export const messageBulkDeleteHandler: Handler<
  AuditLogEvent.MessageBulkDelete
> = (auditLogEntry, guild, i18n) => {
  void LogService.log({
    eventName: "messageBulkDelete",
    guild,
    i18n,
    relatedChannels: [auditLogEntry.target.id],
    relatedUsers: [auditLogEntry.executor?.id],
    executor: auditLogEntry.executor,
    target: auditLogEntry.target,
    data: {
      COUNT: auditLogEntry.extra.count.toString(),
    },
  });
};
