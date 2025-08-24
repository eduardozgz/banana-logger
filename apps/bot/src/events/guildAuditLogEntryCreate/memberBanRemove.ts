import assert from "node:assert";
import type { AuditLogEvent } from "discord.js";

import type { Handler } from ".";
import { LogService } from "~/services/LogService";

export const memberBanRemoveHandler: Handler<AuditLogEvent.MemberBanRemove> = (
  auditLogEntry,
  guild,
  i18n,
) => {
  assert(auditLogEntry.targetId);

  void LogService.log({
    eventName: "memberBanRemove",
    guild,
    i18n,
    relatedChannels: [auditLogEntry.targetId],
    relatedUsers: [auditLogEntry.executorId, auditLogEntry.targetId],
    executor: auditLogEntry.executor,
    target: auditLogEntry.target,
    data: {
      REASON:
        auditLogEntry.reason ??
        i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
    },
  });
};
