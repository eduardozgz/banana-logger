/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import type { AuditLogEvent } from "discord.js";

import type { Handler } from ".";
import { LogService } from "~/services/LogService";

export const stageInstanceCreateHandler: Handler<
  AuditLogEvent.StageInstanceCreate
> = (auditLogEntry, guild, i18n) => {
  // Extract topic from the target

  const topic =
    auditLogEntry.target &&
    "topic" in auditLogEntry.target &&
    auditLogEntry.target.topic
      ? auditLogEntry.target.topic
      : "Unknown";

  void LogService.log({
    eventName: "stageInstanceCreate",
    guild,
    i18n,
    relatedChannels: [auditLogEntry.targetId],
    relatedUsers: [auditLogEntry.executor?.id],
    executor: auditLogEntry.executor,
    target: auditLogEntry.target,
    data: {
      TOPIC: topic,
      REASON:
        auditLogEntry.reason ??
        i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
    },
  });
};
