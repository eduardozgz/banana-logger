import type { AuditLogEvent } from "discord.js";

import type {
  AuditLogChangeTransformers,
  ChangeMap,
  CreateGenericAuditLogHandlerOptions,
} from ".";

const autoModRuleUpdateChangesMap = {
  name: "autoModRuleUpdateName",
  event_type: "autoModRuleUpdateEventType",
  trigger_type: "autoModRuleUpdateTriggerType",
  trigger_metadata: "autoModRuleUpdateTriggerMetadata",
  actions: "autoModRuleUpdateActions",
  enabled: "autoModRuleUpdateEnabled",
  exempt_roles: "autoModRuleUpdateExemptRoles",
  exempt_channels: "autoModRuleUpdateExemptChannels",
} satisfies ChangeMap;

const autoModRuleUpdateChangesTransformers = {
  enabled: (i18n, change) => {
    return {
      old: i18n.t(`main:eventDataTransformers.common.${!!change.old}`),
      new: i18n.t(`main:eventDataTransformers.common.${!!change.new}`),
    };
  },
  event_type: (i18n, change) => {
    return {
      old:
        change.old !== undefined
          ? i18n.t(
              `main:eventDataTransformers.autoModRuleEventType.${change.old}`,
            )
          : i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
      new:
        change.new !== undefined
          ? i18n.t(
              `main:eventDataTransformers.autoModRuleEventType.${change.new}`,
            )
          : i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
    };
  },
  trigger_type: (i18n, change) => {
    return {
      old:
        change.old !== undefined
          ? i18n.t(
              `main:eventDataTransformers.autoModRuleTriggerType.${change.old}`,
            )
          : i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
      new:
        change.new !== undefined
          ? i18n.t(
              `main:eventDataTransformers.autoModRuleTriggerType.${change.new}`,
            )
          : i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
    };
  },
} satisfies AuditLogChangeTransformers<
  keyof typeof autoModRuleUpdateChangesMap
>;

export const autoModRuleUpdate: CreateGenericAuditLogHandlerOptions<
  typeof autoModRuleUpdateChangesMap,
  AuditLogEvent.AutoModerationRuleUpdate
> = {
  changesMap: autoModRuleUpdateChangesMap,
  detectRelatedChannels: () => [],
  detectRelatedUsers: (auditLogEntry) => [auditLogEntry.executorId],
  changesTransformers: autoModRuleUpdateChangesTransformers,
};
