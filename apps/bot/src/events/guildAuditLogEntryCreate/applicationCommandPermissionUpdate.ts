import type { AuditLogEvent, Snowflake } from "discord.js";
import { channelMention, roleMention, userMention } from "discord.js";

import type { Handler } from ".";
import { LogService } from "~/services/LogService";

interface PermissionValue {
  id: Snowflake;
  type: number;
  permission: boolean;
}

function formatPermissionChange(
  i18n: Parameters<Handler<AuditLogEvent>>[2],
  entityId: string,
  oldPerm: PermissionValue | undefined,
  newPerm: PermissionValue | undefined,
): string {
  const perm = newPerm ?? oldPerm;
  if (!perm) return entityId;

  const entityTypes: Record<number, string> = {
    1: i18n.t("main:eventDataTransformers.applicationCommandPermissionType.1"),
    2: i18n.t("main:eventDataTransformers.applicationCommandPermissionType.2"),
    3: i18n.t("main:eventDataTransformers.applicationCommandPermissionType.3"),
  };

  const mentionFormatters: Record<number, (id: string) => string> = {
    1: roleMention,
    2: userMention,
    3: channelMention,
  };

  const typeName = entityTypes[perm.type] ?? "Unknown";
  const mention = mentionFormatters[perm.type]?.(entityId) ?? entityId;

  if (!oldPerm && newPerm) {
    return `${typeName} ${mention}: ${newPerm.permission ? "Allow" : "Deny"}`;
  }
  if (oldPerm && !newPerm) {
    return `${typeName} ${mention}: Removed`;
  }
  if (oldPerm && newPerm) {
    return `${typeName} ${mention}: ${oldPerm.permission ? "Allow" : "Deny"} -> ${newPerm.permission ? "Allow" : "Deny"}`;
  }
  return `${typeName} ${mention}`;
}

export const applicationCommandPermissionUpdateHandler: Handler<
  AuditLogEvent.ApplicationCommandPermissionUpdate
> = (auditLogEntry, guild, i18n) => {
  const { applicationId } = auditLogEntry.extra;

  const permissionChanges = auditLogEntry.changes.map((change) =>
    formatPermissionChange(
      i18n,
      change.key,
      change.old as PermissionValue | undefined,
      change.new as PermissionValue | undefined,
    ),
  );

  void LogService.log({
    eventName: "applicationCommandPermissionUpdate",
    guild,
    i18n,
    relatedChannels: [],
    relatedUsers: [auditLogEntry.executor?.id],
    executor: auditLogEntry.executor,
    data: {
      APPLICATION_ID: applicationId,
      COMMAND_ID: auditLogEntry.targetId ?? "Unknown",
      PERMISSIONS_CHANGED:
        permissionChanges.join("\n") || "No changes detected",
      REASON:
        auditLogEntry.reason ??
        i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
    },
  });
};
