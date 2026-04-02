import type { AuditLogEvent } from "discord.js";

import type {
  AuditLogChangeTransformers,
  ChangeMap,
  CreateGenericAuditLogHandlerOptions,
} from ".";

const stageInstanceUpdateChangesMap = {
  topic: "stageInstanceUpdateTopic",
  privacy_level: "stageInstanceUpdatePrivacyLevel",
} satisfies ChangeMap;

const stageInstanceUpdateChangesTransformers = {
  privacy_level: (i18n, change) => {
    const levels: Record<number, string> = {
      1: i18n.t("main:eventDataTransformers.stageInstanceUpdatePrivacyLevel.1"),
      2: i18n.t("main:eventDataTransformers.stageInstanceUpdatePrivacyLevel.2"),
    };
    return {
      old: levels[change.old as number] ?? "Unknown",
      new: levels[change.new as number] ?? "Unknown",
    };
  },
} satisfies AuditLogChangeTransformers<
  keyof typeof stageInstanceUpdateChangesMap
>;

export const stageInstanceUpdate: CreateGenericAuditLogHandlerOptions<
  typeof stageInstanceUpdateChangesMap,
  AuditLogEvent.StageInstanceUpdate
> = {
  changesMap: stageInstanceUpdateChangesMap,
  detectRelatedChannels: (auditLogEntry) => [auditLogEntry.targetId],
  detectRelatedUsers: (auditLogEntry) => [auditLogEntry.executor?.id],
  changesTransformers: stageInstanceUpdateChangesTransformers,
};
