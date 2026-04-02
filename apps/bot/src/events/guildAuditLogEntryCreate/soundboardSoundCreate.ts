import type { AuditLogEvent } from "discord.js";

import type { Handler } from ".";
import { LogService } from "~/services/LogService";

export const soundboardSoundCreateHandler: Handler<
  AuditLogEvent.SoundboardSoundCreate
> = (auditLogEntry, guild, i18n) => {
  void LogService.log({
    eventName: "soundboardSoundCreate",
    guild,
    i18n,
    relatedChannels: [],
    relatedUsers: [auditLogEntry.executor?.id],
    executor: auditLogEntry.executor,
    target: auditLogEntry.target,
    data: {
      REASON:
        auditLogEntry.reason ??
        i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
    },
  });
};
