import type { AuditLogEvent } from "discord.js";

import type {
  AuditLogChangeTransformers,
  ChangeMap,
  CreateGenericAuditLogHandlerOptions,
} from ".";
import { formatTimeDuration } from "~/formatters/formatTimeDuration";

const threadUpdateChangesMap = {
  name: "threadUpdateName",
  archived: "threadUpdateArchived",
  locked: "threadUpdateLocked",
  auto_archive_duration: "threadUpdateAutoArchiveDuration",
  rate_limit_per_user: "threadUpdateRateLimitPerUser",
  flags: "threadUpdateFlags",
} satisfies ChangeMap;

const threadUpdateChangesTransformers = {
  archived: (i18n, change) => {
    return {
      old: i18n.t(
        `main:eventDataTransformers.threadUpdateArchived.${!!change.old}`,
      ),
      new: i18n.t(
        `main:eventDataTransformers.threadUpdateArchived.${!!change.new}`,
      ),
    };
  },
  locked: (i18n, change) => {
    return {
      old: i18n.t(
        `main:eventDataTransformers.threadUpdateLocked.${!!change.old}`,
      ),
      new: i18n.t(
        `main:eventDataTransformers.threadUpdateLocked.${!!change.new}`,
      ),
    };
  },
  auto_archive_duration: (i18n, change) => {
    return {
      old: change.old
        ? formatTimeDuration(i18n.language, change.old * 60)
        : i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
      new: change.new
        ? formatTimeDuration(i18n.language, change.new * 60)
        : i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
    };
  },
  rate_limit_per_user: (i18n, change) => {
    return {
      old: change.old
        ? formatTimeDuration(i18n.language, change.old)
        : i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
      new: change.new
        ? formatTimeDuration(i18n.language, change.new)
        : i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
    };
  },
} satisfies AuditLogChangeTransformers<keyof typeof threadUpdateChangesMap>;

export const threadUpdate: CreateGenericAuditLogHandlerOptions<
  typeof threadUpdateChangesMap,
  AuditLogEvent.ThreadUpdate
> = {
  changesMap: threadUpdateChangesMap,
  detectRelatedChannels: (auditLogEntry) => [auditLogEntry.targetId],
  detectRelatedUsers: (auditLogEntry) => [auditLogEntry.executorId],
  changesTransformers: threadUpdateChangesTransformers,
};
