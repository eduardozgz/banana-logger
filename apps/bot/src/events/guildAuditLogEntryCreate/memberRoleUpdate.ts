import assert from "node:assert";
import type { AuditLogEvent } from "discord.js";
import { roleMention } from "discord.js";

import type { Handler } from ".";
import { LogService } from "~/services/LogService";
import { listFormat } from "~/utils/listFormat";

export const memberRoleUpdateHandler: Handler<
  AuditLogEvent.MemberRoleUpdate
> = (auditLogEntry, guild, i18n) => {
  assert(auditLogEntry.targetId);

  const addRoles =
    auditLogEntry.changes
      .find((change) => change.key === "$add")
      ?.new?.map((role) => roleMention(role.id)) ?? [];

  const removeRoles =
    auditLogEntry.changes
      .find((change) => change.key === "$remove")
      ?.new?.map((role) => roleMention(role.id)) ?? [];

  const addedRolesFormatted = addRoles.length
    ? listFormat(addRoles, i18n.language)
    : i18n.t("main:eventDataTransformers.memberRoleUpdate.nothingAdded");
  const removedRolesFormatted = removeRoles.length
    ? listFormat(removeRoles, i18n.language)
    : i18n.t("main:eventDataTransformers.memberRoleUpdate.nothingRemoved");

  void LogService.log({
    eventName: "memberRoleUpdate",
    guild,
    i18n,
    relatedChannels: [],
    relatedUsers: [auditLogEntry.executorId, auditLogEntry.targetId],
    executor: auditLogEntry.executor,
    target: auditLogEntry.target,
    data: {
      ADDED_ROLES: addedRolesFormatted,
      REMOVED_ROLES: removedRolesFormatted,
    },
  });
};
