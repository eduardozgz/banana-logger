import assert from "node:assert";
import type { AuditLogEvent } from "discord.js";

import type { Handler } from ".";
import { LogService } from "~/services/LogService";

export const memberDisconnectHandler: Handler<
  AuditLogEvent.MemberDisconnect
> = (auditLogEntry, guild, i18n) => {
  assert(auditLogEntry.executorId);

  void LogService.log({
    eventName: "memberDisconnect",
    guild,
    i18n,
    relatedChannels: [],
    relatedUsers: [auditLogEntry.executorId],
    executor: auditLogEntry.executor,
    target: auditLogEntry.target,
  });
};
