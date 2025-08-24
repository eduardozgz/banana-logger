import type { AuditLogEvent } from "discord.js";

import type { Handler } from ".";
import { LogService } from "~/services/LogService";

export const memberPruneHandler: Handler<AuditLogEvent.MemberPrune> = (
  auditLogEntry,
  guild,
  i18n,
) => {
  void LogService.log({
    eventName: "memberPrune",
    guild,
    i18n,
    relatedChannels: [],
    relatedUsers: [auditLogEntry.executorId, auditLogEntry.targetId],
    executor: auditLogEntry.executor,
    target: auditLogEntry.target,
    data: {
      DELETE_MEMBER_DAYS: auditLogEntry.extra.days.toString(),
      MEMBERS_REMOVED: auditLogEntry.extra.removed.toString(),
      REASON:
        auditLogEntry.reason ??
        i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
    },
  });
};
