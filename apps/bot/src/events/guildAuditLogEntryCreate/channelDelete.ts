import assert from "node:assert";
import type { AuditLogEvent } from "discord.js";
import { channelMention } from "discord.js";

import type { Handler } from ".";
import { LogService } from "~/services/LogService";

export const channelDeleteHandler: Handler<AuditLogEvent.ChannelDelete> = (
  auditLogEntry,
  guild,
  i18n,
) => {
  assert(auditLogEntry.targetId);

  void LogService.log({
    eventName: "channelDelete",
    guild,
    i18n,
    relatedChannels: [auditLogEntry.targetId],
    relatedUsers: [auditLogEntry.executor?.id],
    executor: auditLogEntry.executor,
    data: {
      TARGET_ID: channelMention(auditLogEntry.targetId),
      CHANNEL_NAME:
        typeof auditLogEntry.target.name === "string"
          ? auditLogEntry.target.name
          : i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
    },
  });
};
