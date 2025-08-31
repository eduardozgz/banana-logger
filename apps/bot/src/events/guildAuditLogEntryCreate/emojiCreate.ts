import type { AuditLogEvent } from "discord.js";

import type { Handler } from ".";
import { LogService } from "~/services/LogService";

export const emojiCreateHandler: Handler<AuditLogEvent.EmojiCreate> = (
  auditLogEntry,
  guild,
  i18n,
) => {
  void LogService.log({
    eventName: "emojiCreate",
    guild,
    i18n,
    relatedChannels: [],
    relatedUsers: [auditLogEntry.executor?.id],
    executor: auditLogEntry.executor,
    target: auditLogEntry.target,
    data: {},
  });
};
