import type { AuditLogEvent } from "discord.js";
import { channelMention, roleMention } from "discord.js";

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

function formatIdList(
  ids: unknown,
  formatter: (id: string) => string,
  fallback: string,
): string {
  if (!Array.isArray(ids) || ids.length === 0) return fallback;
  return ids.map((id) => formatter(String(id))).join(", ");
}

interface TriggerMetadata {
  keyword_filter?: string[];
  regex_patterns?: string[];
  presets?: number[];
  allow_list?: string[];
  mention_total_limit?: number;
}

function formatTriggerMetadata(meta: unknown, fallback: string): string {
  if (!meta || typeof meta !== "object") return fallback;
  const m = meta as TriggerMetadata;
  const parts: string[] = [];
  if (m.keyword_filter?.length)
    parts.push(`Keywords: ${m.keyword_filter.join(", ")}`);
  if (m.regex_patterns?.length)
    parts.push(`Regex: ${m.regex_patterns.join(", ")}`);
  if (m.presets?.length) {
    const presetNames: Record<number, string> = {
      1: "Profanity",
      2: "Sexual Content",
      3: "Slurs",
    };
    parts.push(
      `Presets: ${m.presets.map((p) => presetNames[p] ?? String(p)).join(", ")}`,
    );
  }
  if (m.allow_list?.length)
    parts.push(`Allow list: ${m.allow_list.join(", ")}`);
  if (m.mention_total_limit !== undefined)
    parts.push(`Mention limit: ${m.mention_total_limit}`);
  return parts.length > 0 ? parts.join("\n") : fallback;
}

interface AutoModAction {
  type: number;
  metadata?: {
    channel_id?: string;
    duration_seconds?: number;
    custom_message?: string;
  };
}

function formatActions(actions: unknown, fallback: string): string {
  if (!Array.isArray(actions) || actions.length === 0) return fallback;
  const actionNames: Record<number, string> = {
    1: "Block Message",
    2: "Send Alert",
    3: "Timeout",
    4: "Block Member Interaction",
  };
  return (actions as AutoModAction[])
    .map((a) => {
      const name = actionNames[a.type] ?? `Action ${a.type}`;
      const details: string[] = [];
      if (a.metadata?.channel_id)
        details.push(`in ${channelMention(a.metadata.channel_id)}`);
      if (a.metadata?.duration_seconds)
        details.push(`for ${a.metadata.duration_seconds}s`);
      if (a.metadata?.custom_message)
        details.push(`"${a.metadata.custom_message}"`);
      return details.length > 0 ? `${name} (${details.join(", ")})` : name;
    })
    .join("\n");
}

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
  trigger_metadata: (i18n, change) => {
    const fallback = i18n.t(
      "main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE",
    );
    return {
      old: formatTriggerMetadata(change.old, fallback),
      new: formatTriggerMetadata(change.new, fallback),
    };
  },
  actions: (i18n, change) => {
    const fallback = i18n.t(
      "main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE",
    );
    return {
      old: formatActions(change.old, fallback),
      new: formatActions(change.new, fallback),
    };
  },
  exempt_roles: (i18n, change) => {
    const fallback = i18n.t("main:eventDataTransformers.common.none");
    return {
      old: formatIdList(change.old, roleMention, fallback),
      new: formatIdList(change.new, roleMention, fallback),
    };
  },
  exempt_channels: (i18n, change) => {
    const fallback = i18n.t("main:eventDataTransformers.common.none");
    return {
      old: formatIdList(change.old, channelMention, fallback),
      new: formatIdList(change.new, channelMention, fallback),
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
