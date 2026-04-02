import assert from "node:assert";
import type { AuditLogEvent } from "discord.js";
import { CDNRoutes, ImageFormat, RouteBases } from "discord.js";

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
