import assert from "node:assert";
import type { AuditLogEvent } from "discord.js";
import { userMention } from "discord.js";

import type { Handler } from ".";
import { LogService } from "~/services/LogService";

export const memberBanAddHandler: Handler<AuditLogEvent.MemberBanAdd> = (
  auditLogEntry,
  guild,
  i18n,
) => {
  assert(auditLogEntry.targetId);

  void LogService.log({
    eventName: "memberBanAdd",
    guild,
    i18n,
    relatedChannels: [auditLogEntry.targetId],
    relatedUsers: [auditLogEntry.executor?.id],
    executor: auditLogEntry.executor,
    data: {
      TARGET_ID: userMention(auditLogEntry.targetId),
      TARGET_NAME:
        auditLogEntry.target?.username ??
        i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
      REASON:
        auditLogEntry.reason ??
        i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
    },
  });
};
