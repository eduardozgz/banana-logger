/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import type { AuditLogEvent } from "discord.js";

import type { Handler } from ".";
import { LogService } from "~/services/LogService";

export const stickerCreateHandler: Handler<AuditLogEvent.StickerCreate> = (
  auditLogEntry,
  guild,
  i18n,
) => {
  // Extract sticker metadata from target

  const description =
    auditLogEntry.target &&
    "description" in auditLogEntry.target &&
    auditLogEntry.target.description
      ? auditLogEntry.target.description
      : "None";

  const tags =
    auditLogEntry.target &&
    "tags" in auditLogEntry.target &&
    auditLogEntry.target.tags
      ? auditLogEntry.target.tags
      : "None";

  void LogService.log({
    eventName: "stickerCreate",
    guild,
    i18n,
    relatedChannels: [],
    relatedUsers: [auditLogEntry.executor?.id],
    executor: auditLogEntry.executor,
    target: auditLogEntry.target,
    data: {
      DESCRIPTION: description,
      TAGS: tags,
      REASON:
        auditLogEntry.reason ??
        i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
    },
  });
};
