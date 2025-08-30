import assert from "node:assert";
import type { AuditLogEvent } from "discord.js";
import { time } from "discord.js";

import type {
  AuditLogChangeTransformers,
  ChangeMap,
  CreateGenericAuditLogHandlerOptions,
} from ".";
import { displayAvatarUrl } from "~/utils/displayAvatarUrl";

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

  avatar_hash: (_i18n, change, _guild, target) => {
    assert(
      target !== null &&
        "id" in target &&
        typeof target.id === "string" &&
        "discriminator" in target &&
        typeof target.discriminator === "string",
    );

    return {
      old: displayAvatarUrl({
        id: target.id,
        discriminator: target.discriminator,
        avatarHash: change.old,
      }),
      new: displayAvatarUrl({
        id: target.id,
        discriminator: target.discriminator,
        avatarHash: change.new,
      }),
    };
  },
} satisfies AuditLogChangeTransformers<keyof typeof memberUpdateChangesMap>;

export const memberUpdate: CreateGenericAuditLogHandlerOptions<
  typeof memberUpdateChangesMap,
  AuditLogEvent.MemberUpdate
> = {
  changesMap: memberUpdateChangesMap,
  detectRelatedUsers: (auditLogEntry) => [
    auditLogEntry.targetId,
    auditLogEntry.executorId,
  ],
  detectRelatedChannels: () => [],
  changesTransformers: memberUpdateChangesTransformers,
};
