import assert from "node:assert";
import type { AuditLogEvent } from "discord.js";
import { channelMention } from "discord.js";

import type { Handler } from ".";
import { LogService } from "~/services/LogService";

export const channelCreateHandler: Handler<AuditLogEvent.ChannelCreate> = (
  auditLogEntry,
  guild,
  i18n,
) => {
  assert(auditLogEntry.targetId);

  void LogService.log({
    eventName: "channelCreate",
    guild,
    i18n,
    relatedChannels: [],
    relatedUsers: [auditLogEntry.executor?.id],
    executor: auditLogEntry.executor,
    data: {
      TARGET_ID: channelMention(auditLogEntry.targetId),
    },
  });
};
