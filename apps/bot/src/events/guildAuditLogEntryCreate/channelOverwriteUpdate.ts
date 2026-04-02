import type { AuditLogEvent } from "discord.js";
import { PermissionsBitField } from "discord.js";

import type { Handler } from ".";
import { LogService } from "~/services/LogService";

export const channelOverwriteUpdateHandler: Handler<
  AuditLogEvent.ChannelOverwriteUpdate
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

  // Extract permission changes from audit log
  const permissionChanges: string[] = [];
  for (const change of auditLogEntry.changes) {
    if (change.key === "allow" || change.key === "deny") {
      const label = change.key === "allow" ? "Allow" : "Deny";
      const oldPerms = new PermissionsBitField(
        BigInt(String(change.old ?? 0)),
      ).toArray();
      const newPerms = new PermissionsBitField(
        BigInt(String(change.new ?? 0)),
      ).toArray();
      const added = newPerms.filter((p) => !oldPerms.includes(p));
      const removed = oldPerms.filter((p) => !newPerms.includes(p));
      if (added.length > 0)
        permissionChanges.push(`**${label} Added:** ${added.join(", ")}`);
      if (removed.length > 0)
        permissionChanges.push(`**${label} Removed:** ${removed.join(", ")}`);
    }
  }

  void LogService.log({
    eventName: "channelOverwriteUpdate",
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
      PERMISSIONS_CHANGED:
        permissionChanges.length > 0
          ? permissionChanges.join("\n")
          : i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
      REASON:
        auditLogEntry.reason ??
        i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
    },
  });
};
