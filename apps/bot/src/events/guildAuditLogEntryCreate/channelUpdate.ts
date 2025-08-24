import type { ChannelType } from "discord.js";

import type {
  AuditLogChangeTransformers,
  ChangeMap,
  CreateGenericAuditLogHandlerOptions,
  RelatedChannels,
} from ".";
import { formatBandwidth } from "~/formatters/formatBandwidth";
import { formatTimeDuration } from "~/formatters/formatTimeDuration";

const channelUpdateChangesMap = {
  // TODO: video quality
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
} satisfies ChangeMap;

const channelUpdateChangesWithRelatedChannels = [] satisfies RelatedChannels<
  typeof channelUpdateChangesMap
>;

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
} satisfies AuditLogChangeTransformers<keyof typeof channelUpdateChangesMap>;

export const channelUpdate: CreateGenericAuditLogHandlerOptions<
  typeof channelUpdateChangesMap
> = {
  changesMap: channelUpdateChangesMap,
  changesWithRelatedChannels: channelUpdateChangesWithRelatedChannels,
  changesTransformers: channelUpdateChangesTransformers,
};
