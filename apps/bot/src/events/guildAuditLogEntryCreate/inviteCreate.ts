import assert from "node:assert";
import type { AuditLogEvent } from "discord.js";

import type { Handler } from ".";
import { formatTimeDuration } from "~/formatters/formatTimeDuration";
import { LogService } from "~/services/LogService";

export const inviteCreateHandler: Handler<AuditLogEvent.InviteCreate> = (
  auditLogEntry,
  guild,
  i18n,
) => {
  assert(auditLogEntry.targetId);

  void LogService.log({
    eventName: "inviteCreate",
    guild,
    i18n,
    relatedChannels: [auditLogEntry.target.channel?.id],
    relatedUsers: [auditLogEntry.executorId, auditLogEntry.target.inviter?.id],
    executor: auditLogEntry.executor,
    target: auditLogEntry.target,
    data: {
      INVITE_URL: auditLogEntry.target.url,
      INVITE_CODE: auditLogEntry.target.code,
      INVITE_CHANNEL_MENTION:
        auditLogEntry.target.channel?.toString() ??
        i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
      INVITE_MAX_AGE:
        typeof auditLogEntry.target.maxAge === "number"
          ? formatTimeDuration(i18n.language, auditLogEntry.target.maxAge)
          : i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
      INVITE_MAX_USES:
        typeof auditLogEntry.target.maxUses === "number"
          ? auditLogEntry.target.maxUses.toString()
          : i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
      INVITE_TEMPORARY: i18n.t(
        `main:eventDataTransformers.common.${!!auditLogEntry.target.temporary}`,
      ),
    },
  });
};
