import { randomUUID } from "node:crypto";

import type { EventType } from "@/db/client";

import { env } from "./env";

export const Colors = {
  RED: 0xed4245,
  GREEN: 0x57f287,
  YELLOW: 0xfee75c,
  BLURPLE: 0x5865f2,
  FUCHSIA: 0xeb459e,
  WHITE: 0xffffff,
  BLACK: 0x000000,
};

export const baseGalleryEmbedUrl = () =>
  `${env.PUBLIC_URL}/embeds#${randomUUID()}`;

export const BasePlaceholders = ["GUILD_ID"];

export const AuditLogBasedEventBasePlaceholders = [
  "TARGET_ID",
  "TARGET_NAME",
  "TARGET_MENTION",
  "TARGET_IMAGE_URL",
  "OLD_VALUE",
  "NEW_VALUE",
  "OLD_VALUE_RAW",
  "NEW_VALUE_RAW",
  "EXECUTOR_MENTION",
  "EXECUTOR_NAME",
  "EXECUTOR_ID",
  "EXECUTOR_AVATAR",
] as const;

export const EmbedTemplatePlaceholders = {
  // guildMemberNicknameChange: [
  //   ...BasePlaceholders,
  //   ...AuditLogBasedEventBasePlaceholders,
  //   "MEMBER_MENTION",
  //   "MEMBER_AVATAR",
  //   "MEMBER_ID",
  //   "OLD_NICKNAME",
  //   "NEW_NICKNAME",
  // ],
  guildUpdateName: [...BasePlaceholders, ...AuditLogBasedEventBasePlaceholders],
  guildUpdateDescription: [
    ...BasePlaceholders,
    ...AuditLogBasedEventBasePlaceholders,
  ],
  guildUpdateIcon: [...BasePlaceholders, ...AuditLogBasedEventBasePlaceholders],
  guildUpdateSplash: [
    ...BasePlaceholders,
    ...AuditLogBasedEventBasePlaceholders,
  ],
  guildUpdateDiscoverySplash: [
    ...BasePlaceholders,
    ...AuditLogBasedEventBasePlaceholders,
  ],
  guildUpdateBanner: [
    ...BasePlaceholders,
    ...AuditLogBasedEventBasePlaceholders,
  ],
  guildUpdateOwner: [
    ...BasePlaceholders,
    ...AuditLogBasedEventBasePlaceholders,
  ],
  guildUpdateRegion: [
    ...BasePlaceholders,
    ...AuditLogBasedEventBasePlaceholders,
  ],
  guildUpdatePreferredLocale: [
    ...BasePlaceholders,
    ...AuditLogBasedEventBasePlaceholders,
  ],
  guildUpdateAfkChannel: [
    ...BasePlaceholders,
    ...AuditLogBasedEventBasePlaceholders,
  ],
  guildUpdateAfkTimeout: [
    ...BasePlaceholders,
    ...AuditLogBasedEventBasePlaceholders,
  ],
  guildUpdateRulesChannel: [
    ...BasePlaceholders,
    ...AuditLogBasedEventBasePlaceholders,
  ],
  guildUpdatePublicUpdatesChannel: [
    ...BasePlaceholders,
    ...AuditLogBasedEventBasePlaceholders,
  ],
  guildUpdateSafetyAlertsChannel: [
    ...BasePlaceholders,
    ...AuditLogBasedEventBasePlaceholders,
  ],
  guildUpdateMfaLevel: [
    ...BasePlaceholders,
    ...AuditLogBasedEventBasePlaceholders,
  ],
  guildUpdateVerificationLevel: [
    ...BasePlaceholders,
    ...AuditLogBasedEventBasePlaceholders,
  ],
  guildUpdateExplicitContentFilter: [
    ...BasePlaceholders,
    ...AuditLogBasedEventBasePlaceholders,
  ],
  guildUpdateDefaultMessageNotifications: [
    ...BasePlaceholders,
    ...AuditLogBasedEventBasePlaceholders,
  ],
  guildUpdateVanityUrlCode: [
    ...BasePlaceholders,
    ...AuditLogBasedEventBasePlaceholders,
  ],
  guildUpdatePremiumProgressBarEnabled: [
    ...BasePlaceholders,
    ...AuditLogBasedEventBasePlaceholders,
  ],
  guildUpdateSystemChannelFlags: [
    ...BasePlaceholders,
    ...AuditLogBasedEventBasePlaceholders,
  ],
  guildUpdateSystemChannel: [
    ...BasePlaceholders,
    ...AuditLogBasedEventBasePlaceholders,
  ],
  guildUpdateWidgetEnabled: [
    ...BasePlaceholders,
    ...AuditLogBasedEventBasePlaceholders,
  ],
  guildUpdateWidgetChannel: [
    ...BasePlaceholders,
    ...AuditLogBasedEventBasePlaceholders,
  ],
  channelCreate: [...BasePlaceholders, ...AuditLogBasedEventBasePlaceholders],
  channelUpdateName: [
    ...BasePlaceholders,
    ...AuditLogBasedEventBasePlaceholders,
  ],
  channelUpdateType: [
    ...BasePlaceholders,
    ...AuditLogBasedEventBasePlaceholders,
  ],
  channelUpdateTopic: [
    ...BasePlaceholders,
    ...AuditLogBasedEventBasePlaceholders,
  ],
  channelUpdateNsfw: [
    ...BasePlaceholders,
    ...AuditLogBasedEventBasePlaceholders,
  ],
  channelUpdateBitrate: [
    ...BasePlaceholders,
    ...AuditLogBasedEventBasePlaceholders,
  ],
  channelUpdateUserLimit: [
    ...BasePlaceholders,
    ...AuditLogBasedEventBasePlaceholders,
  ],
  channelUpdateRateLimitPerUser: [
    ...BasePlaceholders,
    ...AuditLogBasedEventBasePlaceholders,
  ],
  channelUpdatePosition: [
    ...BasePlaceholders,
    ...AuditLogBasedEventBasePlaceholders,
  ],
  channelUpdatePermissionOverwrites: [
    ...BasePlaceholders,
    ...AuditLogBasedEventBasePlaceholders,
  ],
  channelUpdateDefaultAutoArchiveDurations: [
    ...BasePlaceholders,
    ...AuditLogBasedEventBasePlaceholders,
  ],
  channelDelete: [
    ...BasePlaceholders,
    ...AuditLogBasedEventBasePlaceholders,
    "CHANNEL_NAME",
  ],
  memberKick: [
    ...BasePlaceholders,
    ...AuditLogBasedEventBasePlaceholders,
    "REASON",
  ],
  memberBanAdd: [
    ...BasePlaceholders,
    ...AuditLogBasedEventBasePlaceholders,
    "REASON",
  ],
  memberBanRemove: [
    ...BasePlaceholders,
    ...AuditLogBasedEventBasePlaceholders,
    "REASON",
  ],
  memberPrune: [
    ...BasePlaceholders,
    ...AuditLogBasedEventBasePlaceholders,
    "REASON",
    "DELETE_MEMBER_DAYS",
    "MEMBERS_REMOVED",
  ],
  memberUpdateNick: [
    ...BasePlaceholders,
    ...AuditLogBasedEventBasePlaceholders,
  ],
  memberUpdateDeaf: [
    ...BasePlaceholders,
    ...AuditLogBasedEventBasePlaceholders,
  ],
  memberUpdateMute: [
    ...BasePlaceholders,
    ...AuditLogBasedEventBasePlaceholders,
  ],
  memberUpdateAvatar: [
    ...BasePlaceholders,
    ...AuditLogBasedEventBasePlaceholders,
  ],
  memberUpdateTimeout: [
    ...BasePlaceholders,
    ...AuditLogBasedEventBasePlaceholders,
  ],
  memberRoleUpdate: [
    ...BasePlaceholders,
    ...AuditLogBasedEventBasePlaceholders,
    "REMOVED_ROLES",
    "ADDED_ROLES",
  ],
  memberMove: [
    ...BasePlaceholders,
    ...AuditLogBasedEventBasePlaceholders,
    "COUNT",
    "CHANNEL_MENTION",
  ],
  memberDisconnect: [
    ...BasePlaceholders,
    ...AuditLogBasedEventBasePlaceholders,
  ],
} as const satisfies Record<EventType, string[]>;

export const ALL_EVENTS_CHOICE = "all";
