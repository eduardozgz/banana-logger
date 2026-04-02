import type { AuditLogEvent } from "discord.js";
import { channelMention } from "discord.js";
import { z } from "zod/v4";

import type { Handler } from ".";
import { LogService } from "~/services/LogService";

const AutoModExtraSchema = z.object({
  autoModerationRuleName: z.string(),
  autoModerationRuleTriggerType: z.enum(["1", "3", "4", "5", "6"]),
  channel: z.object({ id: z.string() }),
});

export const autoModBlockMessageHandler: Handler<
  AuditLogEvent.AutoModerationBlockMessage
> = (auditLogEntry, guild, i18n) => {
  const { autoModerationRuleName, autoModerationRuleTriggerType, channel } =
    auditLogEntry.extra;

  void LogService.log({
    eventName: "autoModBlockMessage",
    guild,
    i18n,
    relatedChannels: [channel.id],
    relatedUsers: [auditLogEntry.executorId, auditLogEntry.targetId],
    executor: auditLogEntry.executor,
    target: auditLogEntry.target,
    data: {
      AUTO_MOD_RULE_NAME: autoModerationRuleName,
      AUTO_MOD_RULE_TRIGGER_TYPE: i18n.t(
        `main:eventDataTransformers.autoModRuleTriggerType.${autoModerationRuleTriggerType}`,
      ),
      CHANNEL_MENTION: channelMention(channel.id),
      REASON:
        auditLogEntry.reason ??
        i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
    },
  });
};

export const autoModFlagToChannelHandler: Handler<
  AuditLogEvent.AutoModerationFlagToChannel
> = (auditLogEntry, guild, i18n) => {
  const { autoModerationRuleName, autoModerationRuleTriggerType, channel } =
    auditLogEntry.extra;

  void LogService.log({
    eventName: "autoModFlagToChannel",
    guild,
    i18n,
    relatedChannels: [channel.id],
    relatedUsers: [auditLogEntry.executorId, auditLogEntry.targetId],
    executor: auditLogEntry.executor,
    target: auditLogEntry.target,
    data: {
      AUTO_MOD_RULE_NAME: autoModerationRuleName,
      AUTO_MOD_RULE_TRIGGER_TYPE: i18n.t(
        `main:eventDataTransformers.autoModRuleTriggerType.${autoModerationRuleTriggerType}`,
      ),
      CHANNEL_MENTION: channelMention(channel.id),
      REASON:
        auditLogEntry.reason ??
        i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
    },
  });
};

export const autoModTimeoutHandler: Handler<
  AuditLogEvent.AutoModerationUserCommunicationDisabled
> = (auditLogEntry, guild, i18n) => {
  const { autoModerationRuleName, autoModerationRuleTriggerType, channel } =
    auditLogEntry.extra;

  void LogService.log({
    eventName: "autoModTimeout",
    guild,
    i18n,
    relatedChannels: [channel.id],
    relatedUsers: [auditLogEntry.executorId, auditLogEntry.targetId],
    executor: auditLogEntry.executor,
    target: auditLogEntry.target,
    data: {
      AUTO_MOD_RULE_NAME: autoModerationRuleName,
      AUTO_MOD_RULE_TRIGGER_TYPE: i18n.t(
        `main:eventDataTransformers.autoModRuleTriggerType.${autoModerationRuleTriggerType}`,
      ),
      CHANNEL_MENTION: channelMention(channel.id),
      REASON:
        auditLogEntry.reason ??
        i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
    },
  });
};

// QuarantineUser extras aren't typed by discord.js yet - validate at runtime
export const autoModQuarantineHandler: Handler<
  AuditLogEvent.AutoModerationQuarantineUser
> = (auditLogEntry, guild, i18n) => {
  const parsed = AutoModExtraSchema.safeParse(auditLogEntry.extra);

  if (!parsed.success) {
    guild.client.botInstanceOptions.logger
      .child({ component: "autoModQuarantine" })
      .warn("Unknown automod quarantine extra shape", {
        extra: auditLogEntry.extra,
        error: parsed.error.message,
      });

    void LogService.log({
      eventName: "autoModQuarantine",
      guild,
      i18n,
      relatedChannels: [],
      relatedUsers: [auditLogEntry.executorId, auditLogEntry.targetId],
      executor: auditLogEntry.executor,
      target: auditLogEntry.target,
      data: {
        AUTO_MOD_RULE_NAME: i18n.t(
          "main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE",
        ),
        AUTO_MOD_RULE_TRIGGER_TYPE: i18n.t(
          "main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE",
        ),
        REASON:
          auditLogEntry.reason ??
          i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
      },
    });
    return;
  }

  const { autoModerationRuleName, autoModerationRuleTriggerType, channel } =
    parsed.data;

  void LogService.log({
    eventName: "autoModQuarantine",
    guild,
    i18n,
    relatedChannels: [channel.id],
    relatedUsers: [auditLogEntry.executorId, auditLogEntry.targetId],
    executor: auditLogEntry.executor,
    target: auditLogEntry.target,
    data: {
      AUTO_MOD_RULE_NAME: autoModerationRuleName,
      AUTO_MOD_RULE_TRIGGER_TYPE: i18n.t(
        `main:eventDataTransformers.autoModRuleTriggerType.${autoModerationRuleTriggerType}`,
      ),
      REASON:
        auditLogEntry.reason ??
        i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
    },
  });
};
