/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import type { AuditLogEvent } from "discord.js";
import { time } from "discord.js";

import type { Handler } from ".";
import { LogService } from "~/services/LogService";

export const scheduledEventCreateHandler: Handler<
  AuditLogEvent.GuildScheduledEventCreate
> = (auditLogEntry, guild, i18n) => {
  // Extract scheduled event metadata from target

  const description =
    auditLogEntry.target && "description" in auditLogEntry.target
      ? auditLogEntry.target.description
      : "None";

  const location =
    auditLogEntry.target &&
    "entityMetadata" in auditLogEntry.target &&
    auditLogEntry.target.entityMetadata
      ? (auditLogEntry.target.entityMetadata.location ?? "None")
      : "None";

  const startTime =
    auditLogEntry.target &&
    "scheduledStartAt" in auditLogEntry.target &&
    auditLogEntry.target.scheduledStartAt
      ? time(auditLogEntry.target.scheduledStartAt, "F")
      : "Unknown";

  const endTime =
    auditLogEntry.target &&
    "scheduledEndAt" in auditLogEntry.target &&
    auditLogEntry.target.scheduledEndAt
      ? time(auditLogEntry.target.scheduledEndAt, "F")
      : "None";

  LogService.log({
    eventName: "scheduledEventCreate",
    guild,
    i18n,
    relatedChannels: [],
    relatedUsers: [auditLogEntry.executor?.id],
    executor: auditLogEntry.executor,
    target: auditLogEntry.target,
    data: {
      DESCRIPTION: description ?? "None",
      LOCATION: location,
      START_TIME: startTime,
      END_TIME: endTime,
      REASON:
        auditLogEntry.reason ??
        i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
    },
  });
};
