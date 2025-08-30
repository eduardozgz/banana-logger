import type { AuditLogEvent } from "discord.js";

import type { Handler } from ".";
import { LogService } from "~/services/LogService";

export const inviteDeleteHandler: Handler<AuditLogEvent.InviteDelete> = (
  auditLogEntry,
  guild,
  i18n,
) => {
  void LogService.log({
    eventName: "inviteDelete",
    guild,
    i18n,
    relatedChannels: [auditLogEntry.target.channel?.id],
    relatedUsers: [auditLogEntry.executor?.id],
    executor: auditLogEntry.executor,
    target: auditLogEntry.target,
    data: {
      INVITE_URL: auditLogEntry.target.url,
    },
  });
};
