import type {
  APIAuditLogChange,
  AuditLogChange,
  Guild,
  GuildAuditLogsEntry,
} from "discord.js";
import { AuditLogEvent } from "discord.js";

import type { EventType } from "@/db/client";
import type { i18n } from "@/i18n";
import { initI18n } from "@/i18n";

import { LogService } from "~/services/LogService";
import { EventHandler } from "~/structures";
import { applicationCommandPermissionUpdateHandler } from "./applicationCommandPermissionUpdate";
import {
  autoModBlockMessageHandler,
  autoModFlagToChannelHandler,
  autoModQuarantineHandler,
  autoModTimeoutHandler,
} from "./autoModAction";
import { autoModRuleCreateHandler } from "./autoModRuleCreate";
import { autoModRuleDeleteHandler } from "./autoModRuleDelete";
import { autoModRuleUpdate } from "./autoModRuleUpdate";
import { botAddHandler } from "./botAdd";
import { channelCreateHandler } from "./channelCreate";
import { channelDeleteHandler } from "./channelDelete";
import { channelOverwriteCreateHandler } from "./channelOverwriteCreate";
import { channelOverwriteDeleteHandler } from "./channelOverwriteDelete";
import { channelOverwriteUpdateHandler } from "./channelOverwriteUpdate";
import { channelUpdate } from "./channelUpdate";
import { emojiCreateHandler } from "./emojiCreate";
import { emojiDeleteHandler } from "./emojiDelete";
import { emojiUpdate } from "./emojiUpdate";
import { guildUpdate } from "./guildUpdate";
import { integrationCreateHandler } from "./integrationCreate";
import { integrationDeleteHandler } from "./integrationDelete";
import { inviteCreateHandler } from "./inviteCreate";
import { inviteDeleteHandler } from "./inviteDelete";
import { inviteUpdate } from "./inviteUpdate";
import { memberBanAddHandler } from "./memberBanAdd";
import { memberBanRemoveHandler } from "./memberBanRemove";
import { memberDisconnectHandler } from "./memberDisconnect";
import { memberKickHandler } from "./memberKick";
import { memberMoveHandler } from "./memberMove";
import { memberPruneHandler } from "./memberPrune";
import { memberRoleUpdateHandler } from "./memberRoleUpdate";
import { memberUpdate } from "./memberUpdate";
import { messageBulkDeleteHandler } from "./messageBulkDelete";
import { messagePinHandler } from "./messagePin";
import { messageUnpinHandler } from "./messageUnpin";
import { onboardingPromptCreateHandler } from "./onboardingPromptCreate";
import { onboardingPromptDeleteHandler } from "./onboardingPromptDelete";
import { onboardingPromptUpdateHandler } from "./onboardingPromptUpdate";
import { onboardingUpdateHandler } from "./onboardingUpdate";
import { roleCreateHandler } from "./roleCreate";
import { roleDeleteHandler } from "./roleDelete";
import { roleUpdate } from "./roleUpdate";
import { scheduledEventCreateHandler } from "./scheduledEventCreate";
import { scheduledEventDeleteHandler } from "./scheduledEventDelete";
import { scheduledEventUpdate } from "./scheduledEventUpdate";
import {
  creatorMonetizationRequestCreatedHandler,
  creatorMonetizationTermsAcceptedHandler,
  homeSettingsCreateHandler,
  homeSettingsUpdateHandler,
  onboardingCreateHandler,
} from "./simpleAuditLogHandlers";
import { soundboardSoundCreateHandler } from "./soundboardSoundCreate";
import { soundboardSoundDeleteHandler } from "./soundboardSoundDelete";
import { soundboardSoundUpdate } from "./soundboardSoundUpdate";
import { stageInstanceCreateHandler } from "./stageInstanceCreate";
import { stageInstanceDeleteHandler } from "./stageInstanceDelete";
import { stageInstanceUpdate } from "./stageInstanceUpdate";
import { stickerCreateHandler } from "./stickerCreate";
import { stickerDeleteHandler } from "./stickerDelete";
import { stickerUpdate } from "./stickerUpdate";
import { threadCreateHandler } from "./threadCreate";
import { threadDeleteHandler } from "./threadDelete";
import { threadUpdate } from "./threadUpdate";
import { webhookCreateHandler } from "./webhookCreate";
import { webhookDeleteHandler } from "./webhookDelete";
import { webhookUpdate } from "./webhookUpdate";

export type Handler<T extends AuditLogEvent> = (
  auditLogEntry: GuildAuditLogsEntry<T>,
  guild: Guild,
  i18n: i18n,
) => Promise<void> | void;

export type ChangeMap = Partial<Record<APIAuditLogChange["key"], EventType>>;
export type AuditLogChangeTransformers<
  LocalKeys extends AuditLogChange["key"] = AuditLogChange["key"],
> = Partial<{
  [key in LocalKeys]: AuditLogChangeTransformer<key>;
}>;

export type TargetIdTransformer<T extends AuditLogEvent = AuditLogEvent> = (
  i18n: i18n,
  change: GuildAuditLogsEntry<T>,
  guild: Guild,
) => string;

export type AuditLogChangeTransformer<
  K extends AuditLogChange["key"] = AuditLogChange["key"],
  C = AuditLogChange & { key: K },
> = (
  i18n: i18n,
  change: C,
  guild: Guild,
  target: GuildAuditLogsEntry["target"],
) => { old: string; new: string };

const defaultTransformer: AuditLogChangeTransformer = (i18n, change) => {
  return {
    old:
      typeof change.old === "string"
        ? change.old
        : i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
    new:
      typeof change.new === "string"
        ? change.new
        : i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
  };
};

const handlers = {
  [AuditLogEvent.GuildUpdate]: createGenericAuditLogHandler(guildUpdate),
  [AuditLogEvent.ChannelCreate]: channelCreateHandler,
  [AuditLogEvent.ChannelUpdate]: createGenericAuditLogHandler(channelUpdate),
  [AuditLogEvent.ChannelDelete]: channelDeleteHandler,
  [AuditLogEvent.ChannelOverwriteCreate]: channelOverwriteCreateHandler,
  [AuditLogEvent.ChannelOverwriteUpdate]: channelOverwriteUpdateHandler,
  [AuditLogEvent.ChannelOverwriteDelete]: channelOverwriteDeleteHandler,
  [AuditLogEvent.MemberKick]: memberKickHandler,
  [AuditLogEvent.MemberPrune]: memberPruneHandler,
  [AuditLogEvent.MemberBanAdd]: memberBanAddHandler,
  [AuditLogEvent.MemberBanRemove]: memberBanRemoveHandler,
  [AuditLogEvent.MemberUpdate]: createGenericAuditLogHandler(memberUpdate),
  [AuditLogEvent.MemberRoleUpdate]: memberRoleUpdateHandler,
  [AuditLogEvent.MemberMove]: memberMoveHandler,
  [AuditLogEvent.MemberDisconnect]: memberDisconnectHandler,
  [AuditLogEvent.BotAdd]: botAddHandler,
  [AuditLogEvent.RoleCreate]: roleCreateHandler,
  [AuditLogEvent.RoleUpdate]: createGenericAuditLogHandler(roleUpdate),
  [AuditLogEvent.RoleDelete]: roleDeleteHandler,
  [AuditLogEvent.InviteCreate]: inviteCreateHandler,
  [AuditLogEvent.InviteUpdate]: createGenericAuditLogHandler(inviteUpdate),
  [AuditLogEvent.InviteDelete]: inviteDeleteHandler,
  [AuditLogEvent.WebhookCreate]: webhookCreateHandler,
  [AuditLogEvent.WebhookUpdate]: createGenericAuditLogHandler(webhookUpdate),
  [AuditLogEvent.WebhookDelete]: webhookDeleteHandler,
  [AuditLogEvent.EmojiCreate]: emojiCreateHandler,
  [AuditLogEvent.EmojiUpdate]: createGenericAuditLogHandler(emojiUpdate),
  [AuditLogEvent.EmojiDelete]: emojiDeleteHandler,
  [AuditLogEvent.MessageBulkDelete]: messageBulkDeleteHandler,
  [AuditLogEvent.MessagePin]: messagePinHandler,
  [AuditLogEvent.MessageUnpin]: messageUnpinHandler,
  [AuditLogEvent.StageInstanceCreate]: stageInstanceCreateHandler,
  [AuditLogEvent.StageInstanceUpdate]:
    createGenericAuditLogHandler(stageInstanceUpdate),
  [AuditLogEvent.StageInstanceDelete]: stageInstanceDeleteHandler,
  [AuditLogEvent.StickerCreate]: stickerCreateHandler,
  [AuditLogEvent.StickerUpdate]: createGenericAuditLogHandler(stickerUpdate),
  [AuditLogEvent.StickerDelete]: stickerDeleteHandler,
  [AuditLogEvent.GuildScheduledEventCreate]: scheduledEventCreateHandler,
  [AuditLogEvent.GuildScheduledEventUpdate]:
    createGenericAuditLogHandler(scheduledEventUpdate),
  [AuditLogEvent.GuildScheduledEventDelete]: scheduledEventDeleteHandler,
  [AuditLogEvent.AutoModerationRuleCreate]: autoModRuleCreateHandler,
  [AuditLogEvent.AutoModerationRuleUpdate]:
    createGenericAuditLogHandler(autoModRuleUpdate),
  [AuditLogEvent.AutoModerationRuleDelete]: autoModRuleDeleteHandler,
  [AuditLogEvent.AutoModerationBlockMessage]: autoModBlockMessageHandler,
  [AuditLogEvent.AutoModerationFlagToChannel]: autoModFlagToChannelHandler,
  [AuditLogEvent.AutoModerationUserCommunicationDisabled]:
    autoModTimeoutHandler,
  [AuditLogEvent.ApplicationCommandPermissionUpdate]:
    applicationCommandPermissionUpdateHandler,
  [AuditLogEvent.AutoModerationQuarantineUser]: autoModQuarantineHandler,
  [AuditLogEvent.SoundboardSoundCreate]: soundboardSoundCreateHandler,
  [AuditLogEvent.SoundboardSoundUpdate]: createGenericAuditLogHandler(
    soundboardSoundUpdate,
  ),
  [AuditLogEvent.SoundboardSoundDelete]: soundboardSoundDeleteHandler,
  [AuditLogEvent.OnboardingPromptCreate]: onboardingPromptCreateHandler,
  [AuditLogEvent.OnboardingPromptUpdate]: onboardingPromptUpdateHandler,
  [AuditLogEvent.OnboardingPromptDelete]: onboardingPromptDeleteHandler,
  [AuditLogEvent.OnboardingCreate]: onboardingCreateHandler,
  [AuditLogEvent.OnboardingUpdate]: onboardingUpdateHandler,
  [AuditLogEvent.HomeSettingsCreate]: homeSettingsCreateHandler,
  [AuditLogEvent.HomeSettingsUpdate]: homeSettingsUpdateHandler,
  [AuditLogEvent.CreatorMonetizationRequestCreated]:
    creatorMonetizationRequestCreatedHandler,
  [AuditLogEvent.CreatorMonetizationTermsAccepted]:
    creatorMonetizationTermsAcceptedHandler,
  [AuditLogEvent.ThreadCreate]: threadCreateHandler,
  [AuditLogEvent.ThreadUpdate]: createGenericAuditLogHandler(threadUpdate),
  [AuditLogEvent.ThreadDelete]: threadDeleteHandler,
  [AuditLogEvent.IntegrationCreate]: integrationCreateHandler,
  [AuditLogEvent.IntegrationDelete]: integrationDeleteHandler,
} as const;

export const guildAuditLogEntryCreateEvent = new EventHandler({
  name: "guildAuditLogEntryCreate",
  handler: async (_client, auditLogEntry, guild) => {
    const i18n = await initI18n(guild.preferredLocale);

    if (auditLogEntry.action in handlers) {
      void handlers[auditLogEntry.action as keyof typeof handlers](
        auditLogEntry as never,
        guild,
        i18n,
      );
    }
  },
});

export interface CreateGenericAuditLogHandlerOptions<
  CM extends ChangeMap,
  T extends AuditLogEvent = AuditLogEvent,
> {
  changesMap: CM;
  detectRelatedChannels: (
    auditLogEntry: GuildAuditLogsEntry<T>,
  ) => (string | undefined | null)[];
  detectRelatedUsers: (
    auditLogEntry: GuildAuditLogsEntry<T>,
  ) => (string | undefined | null)[];
  changesTransformers: AuditLogChangeTransformers;
}

function createGenericAuditLogHandler<
  CM extends ChangeMap,
  T extends AuditLogEvent = AuditLogEvent,
>(options: CreateGenericAuditLogHandlerOptions<CM, T>): Handler<T> {
  return (auditLogEntry, guild, i18n) => {
    for (const change of auditLogEntry.changes) {
      const eventName =
        change.key in options.changesMap
          ? (options.changesMap[
              change.key as keyof typeof options.changesMap
            ] as EventType)
          : undefined;

      if (!eventName) {
        continue;
      }

      const transformer: AuditLogChangeTransformer =
        change.key in options.changesTransformers
          ? options.changesTransformers[change.key as never]
          : defaultTransformer;

      const transforedValues = transformer(
        i18n,
        change,
        guild,
        auditLogEntry.target,
      );

      LogService.log({
        eventName,
        guild,
        i18n,
        relatedChannels: options.detectRelatedChannels(auditLogEntry),
        relatedUsers: options.detectRelatedUsers(auditLogEntry),
        executor: auditLogEntry.executor,
        target: auditLogEntry.target,
        data: {
          REASON:
            auditLogEntry.reason ??
            i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
          OLD_VALUE_RAW:
            typeof change.old === "string"
              ? change.old
              : JSON.stringify(change.old),
          NEW_VALUE_RAW:
            typeof change.new === "string"
              ? change.new
              : JSON.stringify(change.new),
          OLD_VALUE: transforedValues.old,
          NEW_VALUE: transforedValues.new,
        },
      });
    }
  };
}
