import type { AuditLogEvent } from "discord.js";

import type { Handler } from ".";
import { LogService } from "~/services/LogService";

export const webhookCreateHandler: Handler<AuditLogEvent.WebhookCreate> = (
  auditLogEntry,
  guild,
  i18n,
) => {
  void LogService.log({
    eventName: "webhookCreate",
    guild,
    i18n,
    relatedChannels: [auditLogEntry.target.channel?.id],
    relatedUsers: [auditLogEntry.executorId],
    executor: auditLogEntry.executor,
    target: auditLogEntry.target,
    data: {
      WEBHOOK_CHANNEL_MENTION:
        auditLogEntry.target.channel?.toString() ??
        i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
    },
  });
};
