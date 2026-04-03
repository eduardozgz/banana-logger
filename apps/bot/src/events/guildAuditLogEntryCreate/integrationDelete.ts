import type { AuditLogEvent } from "discord.js";

import type { Handler } from ".";
import { LogService } from "~/services/LogService";

export const integrationDeleteHandler: Handler<
  AuditLogEvent.IntegrationDelete
> = (auditLogEntry, guild, i18n) => {
  LogService.log({
    eventName: "integrationDelete",
    guild,
    i18n,
    relatedChannels: [],
    relatedUsers: [auditLogEntry.executorId],
    executor: auditLogEntry.executor,
    data: {
      INTEGRATION_NAME:
        (auditLogEntry.target && "name" in auditLogEntry.target
          ? auditLogEntry.target.name
          : undefined) ??
        i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
      INTEGRATION_TYPE:
        (auditLogEntry.target && "type" in auditLogEntry.target
          ? auditLogEntry.target.type
          : undefined) ??
        i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
      REASON:
        auditLogEntry.reason ??
        i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
    },
  });
};
