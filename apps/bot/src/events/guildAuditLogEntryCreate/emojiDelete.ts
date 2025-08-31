import assert from "node:assert";
import type { AuditLogEvent } from "discord.js";

import type { Handler } from ".";
import { LogService } from "~/services/LogService";

export const emojiDeleteHandler: Handler<AuditLogEvent.EmojiDelete> = (
  auditLogEntry,
  guild,
  i18n,
) => {
  const name = auditLogEntry.changes.find(
    (change) => change.key === "name",
  )?.old;

  assert(name);
  assert(auditLogEntry.target.id);

  void LogService.log({
    eventName: "emojiDelete",
    guild,
    i18n,
    relatedChannels: [],
    relatedUsers: [auditLogEntry.executor?.id],
    executor: auditLogEntry.executor,
    target: {
      id: auditLogEntry.target.id,
      name,
    },
    data: {},
  });
};
