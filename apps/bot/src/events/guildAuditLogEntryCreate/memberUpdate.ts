import assert from "node:assert";
import type { AuditLogEvent } from "discord.js";
import {
  CDNRoutes,
  ImageFormat,
  RouteBases,
  time,
  userMention,
} from "discord.js";

import type {
  AuditLogChangeTransformers,
  ChangeMap,
  CreateGenericAuditLogHandlerOptions,
  TargetIdTransformer,
} from ".";

const memberUpdateChangesMap = {
  nick: "memberUpdateNick",
  deaf: "memberUpdateDeaf",
  mute: "memberUpdateMute",
  avatar_hash: "memberUpdateAvatar",
  communication_disabled_until: "memberUpdateTimeout",
  // TODO flags?
} satisfies ChangeMap;

const memberUpdateChangesTransformers = {
  deaf: (i18n, change) => {
    return {
      old:
        change.old !== undefined
          ? i18n.t(`main:eventDataTransformers.memberUpdateDeaf.${change.old}`)
          : i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
      new:
        change.new !== undefined
          ? i18n.t(`main:eventDataTransformers.memberUpdateDeaf.${change.new}`)
          : i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
    };
  },
  mute: (i18n, change) => {
    return {
      old:
        change.old !== undefined
          ? i18n.t(`main:eventDataTransformers.memberUpdateMute.${change.old}`)
          : i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
      new:
        change.new !== undefined
          ? i18n.t(`main:eventDataTransformers.memberUpdateMute.${change.new}`)
          : i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
    };
  },
  communication_disabled_until: (i18n, change) => {
    return {
      old: change.old
        ? time(new Date(change.old), "R")
        : i18n.t("main:eventDataTransformers.common.none"),
      new: change.new
        ? time(new Date(change.new), "R")
        : i18n.t("main:eventDataTransformers.common.none"),
    };
  },
  avatar_hash: (i18n, change, guild) => {
    return {
      old: change.old
        ? `${RouteBases.cdn}${CDNRoutes.guildIcon(guild.id, change.old, ImageFormat.PNG)}?size=1024`
        : i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
      new: change.new
        ? `${RouteBases.cdn}${CDNRoutes.guildIcon(guild.id, change.new, ImageFormat.PNG)}?size=1024`
        : i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
    };
  },
} satisfies AuditLogChangeTransformers<keyof typeof memberUpdateChangesMap>;

const memberUpdateTargetIdTransformer: TargetIdTransformer<
  AuditLogEvent.MemberUpdate
> = (_i18n, change) => {
  assert(change.targetId);
  return userMention(change.targetId);
};

export const memberUpdate: CreateGenericAuditLogHandlerOptions<
  typeof memberUpdateChangesMap,
  AuditLogEvent.MemberUpdate
> = {
  changesMap: memberUpdateChangesMap,
  changesWithRelatedChannels: [],
  changesTransformers: memberUpdateChangesTransformers,
  targetIdTransformer: memberUpdateTargetIdTransformer,
};
