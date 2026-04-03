import type { AuditLogEvent, ChannelType } from "discord.js";
import {
  ChannelFlagsBitField,
  formatEmoji,
  PermissionsBitField,
} from "discord.js";

import type {
  AuditLogChangeTransformers,
  ChangeMap,
  CreateGenericAuditLogHandlerOptions,
} from ".";
import { formatBandwidth } from "~/formatters/formatBandwidth";
import { formatTimeDuration } from "~/formatters/formatTimeDuration";

const channelUpdateChangesMap = {
  name: "channelUpdateName",
  type: "channelUpdateType",
  topic: "channelUpdateTopic",
  nsfw: "channelUpdateNsfw",
  bitrate: "channelUpdateBitrate",
  user_limit: "channelUpdateUserLimit",
  rate_limit_per_user: "channelUpdateRateLimitPerUser",
  position: "channelUpdatePosition",
  permission_overwrites: "channelUpdatePermissionOverwrites",
  default_auto_archive_duration: "channelUpdateDefaultAutoArchiveDurations",
  video_quality_mode: "channelUpdateVideoQualityMode",
  rtc_region: "channelUpdateRtcRegion",
  flags: "channelUpdateFlags",
  default_thread_rate_limit_per_user:
    "channelUpdateDefaultThreadRateLimitPerUser",
  available_tags: "channelUpdateAvailableTags",
  default_reaction_emoji: "channelUpdateDefaultReactionEmoji",
} satisfies ChangeMap;

interface PermissionOverwrite {
  id: string;
  type: number;
  allow: string;
  deny: string;
}

function formatOverwritesDiff(
  oldOverwrites: unknown,
  newOverwrites: unknown,
  fallback: string,
): string {
  const oldMap = new Map<string, PermissionOverwrite>();
  const newMap = new Map<string, PermissionOverwrite>();
  if (Array.isArray(oldOverwrites))
    for (const ow of oldOverwrites as PermissionOverwrite[])
      oldMap.set(ow.id, ow);
  if (Array.isArray(newOverwrites))
    for (const ow of newOverwrites as PermissionOverwrite[])
      newMap.set(ow.id, ow);

  const parts: string[] = [];
  const mention = (ow: PermissionOverwrite) =>
    `<@${ow.type === 0 ? "&" : ""}${ow.id}>`;

  for (const [id, newOw] of newMap) {
    const oldOw = oldMap.get(id);
    if (!oldOw) {
      const allow = new PermissionsBitField(BigInt(newOw.allow)).toArray();
      const deny = new PermissionsBitField(BigInt(newOw.deny)).toArray();
      const details: string[] = [];
      if (allow.length) details.push(`Allow: ${allow.join(", ")}`);
      if (deny.length) details.push(`Deny: ${deny.join(", ")}`);
      parts.push(
        `**Added** ${mention(newOw)}${details.length ? `\n${details.join("\n")}` : ""}`,
      );
      continue;
    }
    const oldAllow = new PermissionsBitField(BigInt(oldOw.allow)).toArray();
    const newAllow = new PermissionsBitField(BigInt(newOw.allow)).toArray();
    const oldDeny = new PermissionsBitField(BigInt(oldOw.deny)).toArray();
    const newDeny = new PermissionsBitField(BigInt(newOw.deny)).toArray();
    const changes: string[] = [];
    const allowAdded = newAllow.filter((p) => !oldAllow.includes(p));
    const allowRemoved = oldAllow.filter((p) => !newAllow.includes(p));
    const denyAdded = newDeny.filter((p) => !oldDeny.includes(p));
    const denyRemoved = oldDeny.filter((p) => !newDeny.includes(p));
    if (allowAdded.length)
      changes.push(`Allow added: ${allowAdded.join(", ")}`);
    if (allowRemoved.length)
      changes.push(`Allow removed: ${allowRemoved.join(", ")}`);
    if (denyAdded.length) changes.push(`Deny added: ${denyAdded.join(", ")}`);
    if (denyRemoved.length)
      changes.push(`Deny removed: ${denyRemoved.join(", ")}`);
    if (changes.length)
      parts.push(`**Changed** ${mention(newOw)}\n${changes.join("\n")}`);
  }

  for (const [id, oldOw] of oldMap) {
    if (!newMap.has(id)) {
      parts.push(`**Removed** ${mention(oldOw)}`);
    }
  }

  return parts.length > 0 ? parts.join("\n\n") : fallback;
}

interface ForumTag {
  id: string;
  name: string;
  emoji_id?: string | null;
  emoji_name?: string | null;
  moderated?: boolean;
}

function formatTags(tags: unknown, fallback: string): string {
  if (!Array.isArray(tags) || tags.length === 0) return fallback;
  return (tags as ForumTag[]).map((t) => t.name).join(", ");
}

interface DefaultReactionEmoji {
  emoji_id?: string | null;
  emoji_name?: string | null;
}

function formatDefaultReactionEmoji(
  emoji: unknown,
  fallback: string,
): string {
  if (!emoji || typeof emoji !== "object") return fallback;
  const e = emoji as DefaultReactionEmoji;
  if (e.emoji_id) return formatEmoji(e.emoji_id);
  if (e.emoji_name) return e.emoji_name;
  return fallback;
}

const channelUpdateChangesTransformers = {
  type: (i18n, change) => {
    return {
      old:
        change.old !== undefined
          ? i18n.t(
              `main:eventDataTransformers.channelUpdateType.${change.old as ChannelType}`,
            )
          : i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
      new:
        change.new !== undefined
          ? i18n.t(
              `main:eventDataTransformers.channelUpdateType.${change.new as ChannelType}`,
            )
          : i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
    };
  },
  nsfw: (i18n, change) => {
    return {
      old:
        change.old !== undefined
          ? i18n.t(`main:eventDataTransformers.common.${change.old}`)
          : i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
      new:
        change.new !== undefined
          ? i18n.t(`main:eventDataTransformers.common.${change.new}`)
          : i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
    };
  },
  bitrate: (i18n, change) => {
    return {
      old: change.old
        ? formatBandwidth(i18n.language, change.old)
        : i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
      new: change.new
        ? formatBandwidth(i18n.language, change.new)
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
  permission_overwrites: (i18n, change) => {
    const fallback = i18n.t("main:eventDataTransformers.common.none");
    const diff = formatOverwritesDiff(change.old, change.new, fallback);
    return { old: diff, new: diff };
  },
  default_auto_archive_duration: (i18n, change) => {
    return {
      old: change.old
        ? formatTimeDuration(i18n.language, change.old * 60)
        : i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
      new: change.new
        ? formatTimeDuration(i18n.language, change.new * 60)
        : i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
    };
  },
  video_quality_mode: (i18n, change) => {
    const modes: Record<number, string> = {
      1: i18n.t("main:eventDataTransformers.channelUpdateVideoQualityMode.1"),
      2: i18n.t("main:eventDataTransformers.channelUpdateVideoQualityMode.2"),
    };
    return {
      old:
        modes[change.old as number] ??
        i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
      new:
        modes[change.new as number] ??
        i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
    };
  },
  rtc_region: (i18n, change) => {
    return {
      old:
        (change.old as string | null) ??
        i18n.t("main:eventDataTransformers.common.none"),
      new:
        (change.new as string | null) ??
        i18n.t("main:eventDataTransformers.common.none"),
    };
  },
  flags: (i18n, change) => {
    const fallback = i18n.t(
      "main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE",
    );
    const format = (v: unknown) => {
      if (v === undefined || v === null) return fallback;
      const names = new ChannelFlagsBitField(Number(v)).toArray();
      return names.length > 0 ? names.join(", ") : "None";
    };
    return { old: format(change.old), new: format(change.new) };
  },
  default_thread_rate_limit_per_user: (i18n, change) => {
    return {
      old: change.old
        ? formatTimeDuration(i18n.language, change.old)
        : i18n.t("main:eventDataTransformers.common.none"),
      new: change.new
        ? formatTimeDuration(i18n.language, change.new)
        : i18n.t("main:eventDataTransformers.common.none"),
    };
  },
  available_tags: (i18n, change) => {
    const fallback = i18n.t("main:eventDataTransformers.common.none");
    return {
      old: formatTags(change.old, fallback),
      new: formatTags(change.new, fallback),
    };
  },
  default_reaction_emoji: (i18n, change) => {
    const fallback = i18n.t("main:eventDataTransformers.common.none");
    return {
      old: formatDefaultReactionEmoji(change.old, fallback),
      new: formatDefaultReactionEmoji(change.new, fallback),
    };
  },
} satisfies AuditLogChangeTransformers<keyof typeof channelUpdateChangesMap>;

export const channelUpdate: CreateGenericAuditLogHandlerOptions<
  typeof channelUpdateChangesMap,
  AuditLogEvent.ChannelUpdate
> = {
  changesMap: channelUpdateChangesMap,
  detectRelatedChannels: (auditLogEntry) => [auditLogEntry.targetId],
  detectRelatedUsers: (auditLogEntry) => {
    return [auditLogEntry.executorId];
  },
  changesTransformers: channelUpdateChangesTransformers,
};
