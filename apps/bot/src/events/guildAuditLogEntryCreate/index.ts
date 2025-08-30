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
import { botAddHandler } from "./botAdd";
import { channelCreateHandler } from "./channelCreate";
import { channelDeleteHandler } from "./channelDelete";
import { channelUpdate } from "./channelUpdate";
import { guildUpdate } from "./guildUpdate";
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
import { roleCreateHandler } from "./roleCreate";
import { roleDeleteHandler } from "./roleDelete";
import { roleUpdate } from "./roleUpdate";

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
> = (i18n: i18n, change: C, guild: Guild) => { old: string; new: string };

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

      const transforedValues = transformer(i18n, change, guild);

      void LogService.log({
        eventName,
        guild,
        i18n,
        relatedChannels: options.detectRelatedUsers(auditLogEntry),
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
