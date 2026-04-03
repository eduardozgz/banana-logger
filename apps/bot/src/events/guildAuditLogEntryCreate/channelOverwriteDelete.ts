import type { AuditLogEvent } from "discord.js";

import type { Handler } from ".";
import { LogService } from "~/services/LogService";

export const channelOverwriteDeleteHandler: Handler<
  AuditLogEvent.ChannelOverwriteDelete
> = (auditLogEntry, guild, i18n) => {
  const extra = auditLogEntry.extra as
    | { id: string; type: string; role_name?: string }
    | undefined;
  const overwriteId = extra?.id;
  const overwriteType = extra?.type;
  const roleName = extra?.role_name;

  const overwriteTypes: Record<string, string> = {
    "0": i18n.t("main:eventDataTransformers.channelOverwriteType.0"),
    "1": i18n.t("main:eventDataTransformers.channelOverwriteType.1"),
  };

  LogService.log({
    eventName: "channelOverwriteDelete",
    guild,
    i18n,
    relatedChannels: [auditLogEntry.targetId],
    relatedUsers: [auditLogEntry.executor?.id],
    executor: auditLogEntry.executor,
    target: auditLogEntry.target,
    data: {
      OVERWRITE_ID:
        overwriteId ??
        i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
      OVERWRITE_TYPE:
        (overwriteType !== undefined ? overwriteTypes[overwriteType] : null) ??
        i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
      OVERWRITE_NAME:
        roleName ??
        i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
      REASON:
        auditLogEntry.reason ??
        i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
    },
  });
};
