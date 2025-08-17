import type { GuildSystemChannelFlags } from "discord.js";
import { bold } from "@discordjs/builders";
import {
  channelMention,
  Locale,
  SystemChannelFlagsBitField,
  userMention,
} from "discord.js";

import type { AuditLogChangeTransformers, ChangeMap, RelatedChannels } from ".";

const guildUpdateChangesMap = {
  name: "guildUpdateName",
  description: "guildUpdateDescription",
  icon_hash: "guildUpdateIcon",
  splash_hash: "guildUpdateSplash",
  discovery_splash_hash: "guildUpdateDiscoverySplash",
  banner_hash: "guildUpdateBanner",
  owner_id: "guildUpdateOwner",
  region: "guildUpdateRegion",
  preferred_locale: "guildUpdatePreferredLocale",
  afk_channel_id: "guildUpdateAfkChannel",
  afk_timeout: "guildUpdateAfkTimeout",
  rules_channel_id: "guildUpdateRulesChannel",
  public_updates_channel_id: "guildUpdatePublicUpdatesChannel",
  // TODO
  // safety_alerts_channel_id: "guildUpdateSafetyAlertsChannel",
  mfa_level: "guildUpdateMfaLevel",
  verification_level: "guildUpdateVerificationLevel",
  explicit_content_filter: "guildUpdateExplicitContentFilter",
  default_message_notifications: "guildUpdateDefaultMessageNotifications",
  vanity_url_code: "guildUpdateVanityUrlCode",
  premium_progress_bar_enabled: "guildUpdatePremiumProgressBarEnabled",
  widget_enabled: "guildUpdateWidgetEnabled",
  widget_channel_id: "guildUpdateWidgetChannel",
  system_channel_flags: "guildUpdateSystemChannelFlags",
  system_channel_id: "guildUpdateSystemChannel",
} satisfies ChangeMap;

const guildUpdateChangesWithRelatedChannels = [] satisfies RelatedChannels<
  typeof guildUpdateChangesMap
>;

const guildUpdateChangesTransformers = {
  preferred_locale: (i18n, change) => {
    return {
      old: Object.values(Locale).includes(change.old as Locale)
        ? i18n.t(
            `main:eventDataTransformers.guildUpdatePreferredLocale.${change.old as Locale}`,
          )
        : (change.old ??
          i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE")),
      new: Object.values(Locale).includes(change.new as Locale)
        ? i18n.t(
            `main:eventDataTransformers.guildUpdatePreferredLocale.${change.new as Locale}`,
          )
        : i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
    };
  },
  owner_id: (i18n, change) => {
    return {
      old: change.old
        ? userMention(change.old)
        : i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
      new: change.new
        ? userMention(change.new)
        : i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
    };
  },
  afk_channel_id: (i18n, change) => {
    return {
      old: change.old
        ? channelMention(change.old)
        : i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
      new: change.new
        ? channelMention(change.new)
        : i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
    };
  },
  rules_channel_id: (i18n, change) => {
    return {
      old: change.old
        ? channelMention(change.old)
        : i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
      new: change.new
        ? channelMention(change.new)
        : i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
    };
  },
  public_updates_channel_id: (i18n, change) => {
    return {
      old: change.old
        ? channelMention(change.old)
        : i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
      new: change.new
        ? channelMention(change.new)
        : i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
    };
  },
  // TODO
  // safety_alerts_channel_id: (i18n, change) => {
  //   return {
  //     old: change.old
  //       ? channelMention(change.old)
  //       : i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
  //     new: change.new
  //       ? channelMention(change.new)
  //       : i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
  //   };
  // },
  mfa_level: (i18n, change) => {
    return {
      old:
        change.old !== undefined
          ? i18n.t(
              `main:eventDataTransformers.guildUpdateMfaLevel.${change.old}`,
            )
          : i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
      new:
        change.new !== undefined
          ? i18n.t(
              `main:eventDataTransformers.guildUpdateMfaLevel.${change.new}`,
            )
          : i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
    };
  },
  verification_level: (i18n, change) => {
    return {
      old:
        change.old !== undefined
          ? i18n.t(
              `main:eventDataTransformers.guildUpdateVerificationLevel.${change.old}`,
            )
          : i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
      new:
        change.new !== undefined
          ? i18n.t(
              `main:eventDataTransformers.guildUpdateVerificationLevel.${change.new}`,
            )
          : i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
    };
  },
  explicit_content_filter: (i18n, change) => {
    return {
      old:
        change.old !== undefined
          ? i18n.t(
              `main:eventDataTransformers.guildUpdateExplicitContentFilter.${change.old}`,
            )
          : i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
      new:
        change.new !== undefined
          ? i18n.t(
              `main:eventDataTransformers.guildUpdateExplicitContentFilter.${change.new}`,
            )
          : i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
    };
  },
  default_message_notifications: (i18n, change) => {
    return {
      old:
        change.old !== undefined
          ? i18n.t(
              `main:eventDataTransformers.guildUpdateDefaultMessageNotifications.${change.old}`,
            )
          : i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
      new:
        change.new !== undefined
          ? i18n.t(
              `main:eventDataTransformers.guildUpdateDefaultMessageNotifications.${change.new}`,
            )
          : i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
    };
  },
  premium_progress_bar_enabled: (i18n, change) => {
    return {
      old:
        change.old !== undefined
          ? i18n.t(
              `main:eventDataTransformers.guildUpdatePremiumProgressBarEnabled.${change.old}`,
            )
          : i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
      new:
        change.new !== undefined
          ? i18n.t(
              `main:eventDataTransformers.guildUpdatePremiumProgressBarEnabled.${change.new}`,
            )
          : i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
    };
  },
  widget_enabled: (i18n, change) => {
    return {
      old:
        change.old !== undefined
          ? i18n.t(
              `main:eventDataTransformers.guildUpdateWidgetEnabled.${change.old}`,
            )
          : i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
      new:
        change.new !== undefined
          ? i18n.t(
              `main:eventDataTransformers.guildUpdateWidgetEnabled.${change.new}`,
            )
          : i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
    };
  },
  widget_channel_id: (i18n, change) => {
    return {
      old:
        change.old !== undefined
          ? channelMention(change.old)
          : i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
      new:
        change.new !== undefined
          ? channelMention(change.new)
          : i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
    };
  },
  system_channel_flags: (i18n, change) => {
    const formatFlags = (rawFlags: GuildSystemChannelFlags) => {
      const flags = new SystemChannelFlagsBitField(rawFlags);
      const allFlags = Object.values(SystemChannelFlagsBitField.Flags).filter(
        (x) => typeof x === "string",
      ) as (keyof typeof SystemChannelFlagsBitField.Flags)[];

      return allFlags
        .map((flag) => {
          const flagLabel = i18n.t(
            `main:eventDataTransformers.guildUpdateSystemChannelFlags.flags.${flag}`,
          );
          const isSuppressed = flags.has(flag);
          const isSuppressedLabel = i18n.t(
            "main:eventDataTransformers.guildUpdateSystemChannelFlags.labels.Suppress",
          );
          const isShowLabel = i18n.t(
            "main:eventDataTransformers.guildUpdateSystemChannelFlags.labels.Show",
          );

          return `${bold(isSuppressed ? isSuppressedLabel : isShowLabel)}: ${flagLabel}`;
        })
        .join("\n");
    };

    return {
      old:
        change.old !== undefined
          ? formatFlags(change.old)
          : i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
      new:
        change.new !== undefined
          ? formatFlags(change.new)
          : i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
    };
  },
  system_channel_id: (i18n, change) => {
    return {
      old:
        change.old !== undefined
          ? channelMention(change.old)
          : i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
      new:
        change.new !== undefined
          ? channelMention(change.new)
          : i18n.t("main:eventTemplatePlaceholdersDefaults.UNKNOWN_VALUE"),
    };
  },
} satisfies AuditLogChangeTransformers<keyof typeof guildUpdateChangesMap>;

export const guildUpdate = {
  changesMap: guildUpdateChangesMap,
  changesWithRelatedChannels: guildUpdateChangesWithRelatedChannels,
  changesTransformers: guildUpdateChangesTransformers,
};
