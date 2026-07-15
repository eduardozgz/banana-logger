import type { AuditLogEvent } from "discord.js";

import type { Handler } from ".";
import { LogService } from "~/services/LogService";

export const integrationCreateHandler: Handler<
  AuditLogEvent.IntegrationCreate
> = (auditLogEntry, guild, i18n) => {
  LogService.log({
    eventName: "integrationCreate",
    guild,
    i18n,
    relatedChannels: [],
    relatedUsers: [auditLogEntry.executorId],
    executor: auditLogEntry.executor,
    data: {
      INTEGRATION_NAME:
        ("name" in auditLogEntry.target
          ? auditLogEntry.target.name
          : undefined) ??
        i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
      INTEGRATION_TYPE:
        ("type" in auditLogEntry.target
          ? auditLogEntry.target.type
          : undefined) ??
        i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
      REASON:
        auditLogEntry.reason ??
        i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
    },
  });
};
