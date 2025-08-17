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
import { guildUpdate } from "./guildUpdate";

export type Handler<T extends AuditLogEvent> = (
  auditLogEntry: GuildAuditLogsEntry<T>,
  guild: Guild,
  i18n: i18n,
) => Promise<void> | void;

export type ChangeMap = Partial<Record<APIAuditLogChange["key"], EventType>>;
export type RelatedChannels<LocalMap> = (keyof LocalMap)[];
export type AuditLogChangeTransformers<
  LocalKeys extends AuditLogChange["key"] = AuditLogChange["key"],
> = Partial<{
  [key in LocalKeys]: AuditLogChangeTransformer<key>;
}>;

export type AuditLogChangeTransformer<
  K extends AuditLogChange["key"] = AuditLogChange["key"],
  C = AuditLogChange & { key: K },
> = (i18n: i18n, change: C) => { old: string; new: string };

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
  [AuditLogEvent.GuildUpdate]: createGenericAuditLogHandler({
    changesMap: guildUpdate.changesMap,
    changesWithRelatedChannels: guildUpdate.changesWithRelatedChannels,
    changesTransformers: guildUpdate.changesTransformers,
  }),
} as const;

export const guildAuditLogEntryCreateEvent = new EventHandler({
  name: "guildAuditLogEntryCreate",
  handler: async (_client, auditLogEntry, guild) => {
    const i18n = await initI18n(guild.preferredLocale);

    if (auditLogEntry.action in handlers) {
      handlers[auditLogEntry.action as keyof typeof handlers](
        auditLogEntry,
        guild,
        i18n,
      );
    }
  },
});

interface CreateGenericAuditLogHandlerOptions<CM extends ChangeMap> {
  changesMap: CM;
  changesWithRelatedChannels: RelatedChannels<CM>;
  changesTransformers: AuditLogChangeTransformers;
}

function createGenericAuditLogHandler<CM extends ChangeMap>(
  options: CreateGenericAuditLogHandlerOptions<CM>,
) {
  return (auditLogEntry: GuildAuditLogsEntry, guild: Guild, i18n: i18n) => {
    for (const change of auditLogEntry.changes) {
      const relatedChannels: string[] = [];
      if (options.changesWithRelatedChannels.includes(change.key)) {
        relatedChannels.push(change.new as string);
        relatedChannels.push(change.old as string);
      }

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

      const { old: OLD_VALUE, new: NEW_VALUE } = transformer(i18n, change);

      void LogService.log({
        eventName,
        guild,
        i18n,
        relatedChannels,
        relatedUsers: [auditLogEntry.executor?.id],
        executor: auditLogEntry.executor,
        data: {
          OLD_VALUE,
          NEW_VALUE,
        },
      });
    }
  };
}
