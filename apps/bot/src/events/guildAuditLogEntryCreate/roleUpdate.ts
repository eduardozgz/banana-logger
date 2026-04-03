import assert from "node:assert";
import type { AuditLogEvent } from "discord.js";
import {
  CDNRoutes,
  ImageFormat,
  PermissionsBitField,
  RouteBases,
} from "discord.js";

import type {
  AuditLogChangeTransformers,
  ChangeMap,
  CreateGenericAuditLogHandlerOptions,
} from ".";

const roleUpdateChangesMap = {
  name: "roleUpdateName",
  color: "roleUpdateColor",
  hoist: "roleUpdateHoist",
  mentionable: "roleUpdateMentionable",
  permissions: "roleUpdatePermissions",
  icon_hash: "roleUpdateIcon",
} satisfies ChangeMap;

const roleUpdateChangesTransformers = {
  color: (i18n, change) => {
    const oldColor = change.old
      ? `#${change.old.toString(16).padStart(6, "0")}`
      : i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE");
    const newColor = change.new
      ? `#${change.new.toString(16).padStart(6, "0")}`
      : i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE");
    return {
      old: oldColor,
      new: newColor,
    };
  },
  hoist: (i18n, change) => {
    return {
      old: i18n.t(`main:eventDataTransformers.common.${!!change.old}`),
      new: i18n.t(`main:eventDataTransformers.common.${!!change.new}`),
    };
  },
  mentionable: (i18n, change) => {
    return {
      old: i18n.t(
        `main:eventDataTransformers.roleUpdateMentionable.${!!change.old}`,
      ),
      new: i18n.t(
        `main:eventDataTransformers.roleUpdateMentionable.${!!change.new}`,
      ),
    };
  },
  permissions: (i18n, change) => {
    const fallback = i18n.t(
      "main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE",
    );
    if (change.old === undefined || change.new === undefined)
      return { old: fallback, new: fallback };
    const oldPerms = new PermissionsBitField(BigInt(String(change.old))).toArray();
    const newPerms = new PermissionsBitField(BigInt(String(change.new))).toArray();
    const added = newPerms.filter((p) => !oldPerms.includes(p));
    const removed = oldPerms.filter((p) => !newPerms.includes(p));
    const parts: string[] = [];
    if (added.length > 0) parts.push(`**Added:** ${added.join(", ")}`);
    if (removed.length > 0) parts.push(`**Removed:** ${removed.join(", ")}`);
    const diff = parts.length > 0 ? parts.join("\n") : "No changes";
    return { old: diff, new: diff };
  },
  icon_hash: (i18n, change, _guild, target) => {
    assert(target && "id" in target && typeof target.id === "string");
    return {
      old: change.old
        ? `${RouteBases.cdn}${CDNRoutes.roleIcon(target.id, change.old, ImageFormat.PNG)}?size=128`
        : i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
      new: change.new
        ? `${RouteBases.cdn}${CDNRoutes.roleIcon(target.id, change.new, ImageFormat.PNG)}?size=128`
        : i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
    };
  },
} satisfies AuditLogChangeTransformers<keyof typeof roleUpdateChangesMap>;

export const roleUpdate: CreateGenericAuditLogHandlerOptions<
  typeof roleUpdateChangesMap,
  AuditLogEvent.RoleUpdate
> = {
  changesMap: roleUpdateChangesMap,
  detectRelatedChannels: () => [],
  detectRelatedUsers: (auditLogEntry) => {
    return [auditLogEntry.executorId];
  },
  changesTransformers: roleUpdateChangesTransformers,
};
