import type { AuditLogEvent } from "discord.js";
import { channelMention, userMention } from "discord.js";

import type {
  AuditLogChangeTransformers,
  ChangeMap,
  CreateGenericAuditLogHandlerOptions,
} from ".";
import { formatTimeDuration } from "~/formatters/formatTimeDuration";

const inviteUpdateChangesMap = {
  code: "inviteUpdateCode",
  channel_id: "inviteUpdateChannel",
  inviter_id: "inviteUpdateInviter",
  max_uses: "inviteUpdateMaxUses",
  max_age: "inviteUpdateMaxAge",
  temporary: "inviteUpdateTemporary",
  uses: "inviteUpdateUses",
} satisfies ChangeMap;

const inviteUpdateChangesTransformers = {
  channel_id: (i18n, change) => {
    return {
      old: change.old
        ? channelMention(change.old)
        : i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
      new: change.new
        ? channelMention(change.new)
        : i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
    };
  },
  inviter_id: (i18n, change) => {
    return {
      old: change.old
        ? userMention(change.old)
        : i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
      new: change.new
        ? userMention(change.new)
        : i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
    };
  },
  max_uses: (i18n, change) => {
    return {
      old: change.old
        ? change.old.toString()
        : i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
      new: change.new
        ? change.new.toString()
        : i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
    };
  },
  max_age: (i18n, change) => {
    return {
      old: change.old
        ? formatTimeDuration(i18n.language, change.old)
        : i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
      new: change.new
        ? formatTimeDuration(i18n.language, change.new)
        : i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
    };
  },
  temporary: (i18n, change) => {
    return {
      old: i18n.t(`main:eventDataTransformers.common.${!!change.old}`),
      new: i18n.t(`main:eventDataTransformers.common.${!!change.new}`),
    };
  },
  uses: (i18n, change) => {
    return {
      old: change.old
        ? change.old.toString()
        : i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
      new: change.new
        ? change.new.toString()
        : i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
    };
  },
} satisfies AuditLogChangeTransformers<keyof typeof inviteUpdateChangesMap>;

// TODO test this, update events arent being send by audit log
export const inviteUpdate: CreateGenericAuditLogHandlerOptions<
  typeof inviteUpdateChangesMap,
  AuditLogEvent.InviteUpdate
> = {
  changesMap: inviteUpdateChangesMap,
  detectRelatedChannels: (auditLogEntry) => {
    const relatedChannels: string[] = [];

    const keys = ["channel_id"];
    for (const change of auditLogEntry.changes) {
      if (keys.includes(change.key)) {
        if (change.new) {
          relatedChannels.push(change.new as string);
        }
        if (change.old) {
          relatedChannels.push(change.old as string);
        }
      }
    }

    return relatedChannels;
  },
  detectRelatedUsers: (auditLogEntry) => {
    const relatedUsers = [auditLogEntry.executorId];

    const keys = ["inviter_id"];
    for (const change of auditLogEntry.changes) {
      if (keys.includes(change.key)) {
        if (change.new) {
          relatedUsers.push(change.new as string);
        }
        if (change.old) {
          relatedUsers.push(change.old as string);
        }
      }
    }

    return relatedUsers;
  },
  changesTransformers: inviteUpdateChangesTransformers,
};
