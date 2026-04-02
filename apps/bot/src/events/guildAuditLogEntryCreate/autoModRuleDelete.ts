import type { AuditLogEvent } from "discord.js";

import type { Handler } from ".";
import { LogService } from "~/services/LogService";

export const autoModRuleDeleteHandler: Handler<
  AuditLogEvent.AutoModerationRuleDelete
> = (auditLogEntry, guild, i18n) => {
  void LogService.log({
    eventName: "autoModRuleDelete",
    guild,
    i18n,
    relatedChannels: [],
    relatedUsers: [auditLogEntry.executor?.id],
    executor: auditLogEntry.executor,
    target: auditLogEntry.target,
    data: {
      REASON:
        auditLogEntry.reason ??
        i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
    },
  });
};
