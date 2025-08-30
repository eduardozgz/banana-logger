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

export const BasePlaceholders = ["GUILD_ID"] as const;

export const AuditLogBasePlaceholders = [
  "EXECUTOR_MENTION",
  "EXECUTOR_NAME",
  "EXECUTOR_ID",
  "EXECUTOR_AVATAR",
  "REASON",
] as const;

export const AuditLogChangePlaceholders = [
  "OLD_VALUE",
  "NEW_VALUE",
  "OLD_VALUE_RAW",
  "NEW_VALUE_RAW",
] as const;

export const AuditLogTargetPlaceholders = [
  "TARGET_ID",
  "TARGET_NAME",
  "TARGET_MENTION",
  "TARGET_IMAGE_URL",
] as const;

export const EmbedTemplatePlaceholders = {
  guildUpdateName: [
    ...BasePlaceholders,
    ...AuditLogBasePlaceholders,
    ...AuditLogChangePlaceholders,
  ],
  guildUpdateDescription: [
    ...BasePlaceholders,
    ...AuditLogBasePlaceholders,
    ...AuditLogChangePlaceholders,
  ],
  guildUpdateIcon: [...BasePlaceholders, ...AuditLogBasePlaceholders],
  guildUpdateSplash: [
    ...BasePlaceholders,
    ...AuditLogBasePlaceholders,
    ...AuditLogChangePlaceholders,
  ],
  guildUpdateDiscoverySplash: [
    ...BasePlaceholders,
    ...AuditLogBasePlaceholders,
    ...AuditLogChangePlaceholders,
  ],
  guildUpdateBanner: [
    ...BasePlaceholders,
    ...AuditLogBasePlaceholders,
    ...AuditLogChangePlaceholders,
  ],
  guildUpdateOwner: [
    ...BasePlaceholders,
    ...AuditLogBasePlaceholders,
    ...AuditLogChangePlaceholders,
  ],
  guildUpdateRegion: [
    ...BasePlaceholders,
    ...AuditLogBasePlaceholders,
    ...AuditLogChangePlaceholders,
  ],
  guildUpdatePreferredLocale: [
    ...BasePlaceholders,
    ...AuditLogBasePlaceholders,
    ...AuditLogChangePlaceholders,
  ],
  guildUpdateAfkChannel: [
    ...BasePlaceholders,
    ...AuditLogBasePlaceholders,
    ...AuditLogChangePlaceholders,
  ],
  guildUpdateAfkTimeout: [
    ...BasePlaceholders,
    ...AuditLogBasePlaceholders,
    ...AuditLogChangePlaceholders,
  ],
  guildUpdateRulesChannel: [
    ...BasePlaceholders,
    ...AuditLogBasePlaceholders,
    ...AuditLogChangePlaceholders,
  ],
  guildUpdatePublicUpdatesChannel: [
    ...BasePlaceholders,
    ...AuditLogBasePlaceholders,
    ...AuditLogChangePlaceholders,
  ],
  guildUpdateSafetyAlertsChannel: [
    ...BasePlaceholders,
    ...AuditLogBasePlaceholders,
    ...AuditLogChangePlaceholders,
  ],
  guildUpdateMfaLevel: [
    ...BasePlaceholders,
    ...AuditLogBasePlaceholders,
    ...AuditLogChangePlaceholders,
  ],
  guildUpdateVerificationLevel: [
    ...BasePlaceholders,
    ...AuditLogBasePlaceholders,
    ...AuditLogChangePlaceholders,
  ],
  guildUpdateExplicitContentFilter: [
    ...BasePlaceholders,
    ...AuditLogBasePlaceholders,
    ...AuditLogChangePlaceholders,
  ],
  guildUpdateDefaultMessageNotifications: [
    ...BasePlaceholders,
    ...AuditLogBasePlaceholders,
    ...AuditLogChangePlaceholders,
  ],
  guildUpdateVanityUrlCode: [
    ...BasePlaceholders,
    ...AuditLogBasePlaceholders,
    ...AuditLogChangePlaceholders,
  ],
  guildUpdatePremiumProgressBarEnabled: [
    ...BasePlaceholders,
    ...AuditLogBasePlaceholders,
    ...AuditLogChangePlaceholders,
  ],
  guildUpdateSystemChannelFlags: [
    ...BasePlaceholders,
    ...AuditLogBasePlaceholders,
    ...AuditLogChangePlaceholders,
  ],
  guildUpdateSystemChannel: [
    ...BasePlaceholders,
    ...AuditLogBasePlaceholders,
    ...AuditLogChangePlaceholders,
  ],
  guildUpdateWidgetEnabled: [
    ...BasePlaceholders,
    ...AuditLogBasePlaceholders,
    ...AuditLogChangePlaceholders,
  ],
  guildUpdateWidgetChannel: [
    ...BasePlaceholders,
    ...AuditLogBasePlaceholders,
    ...AuditLogChangePlaceholders,
  ],
  channelCreate: [
    ...BasePlaceholders,
    ...AuditLogBasePlaceholders,
    ...AuditLogTargetPlaceholders,
  ],
  channelUpdateName: [
    ...BasePlaceholders,
    ...AuditLogBasePlaceholders,
    ...AuditLogChangePlaceholders,
    ...AuditLogTargetPlaceholders,
  ],
  channelUpdateType: [
    ...BasePlaceholders,
    ...AuditLogBasePlaceholders,
    ...AuditLogChangePlaceholders,
    ...AuditLogTargetPlaceholders,
  ],
  channelUpdateTopic: [
    ...BasePlaceholders,
    ...AuditLogBasePlaceholders,
    ...AuditLogChangePlaceholders,
    ...AuditLogTargetPlaceholders,
  ],
  channelUpdateNsfw: [
    ...BasePlaceholders,
    ...AuditLogBasePlaceholders,
    ...AuditLogChangePlaceholders,
  ],
  channelUpdateBitrate: [
    ...BasePlaceholders,
    ...AuditLogBasePlaceholders,
    ...AuditLogChangePlaceholders,
    ...AuditLogTargetPlaceholders,
  ],
  channelUpdateUserLimit: [
    ...BasePlaceholders,
    ...AuditLogBasePlaceholders,
    ...AuditLogChangePlaceholders,
    ...AuditLogTargetPlaceholders,
  ],
  channelUpdateRateLimitPerUser: [
    ...BasePlaceholders,
    ...AuditLogBasePlaceholders,
    ...AuditLogChangePlaceholders,
    ...AuditLogTargetPlaceholders,
  ],
  channelUpdatePosition: [
    ...BasePlaceholders,
    ...AuditLogBasePlaceholders,
    ...AuditLogChangePlaceholders,
    ...AuditLogTargetPlaceholders,
  ],
  channelUpdatePermissionOverwrites: [
    ...BasePlaceholders,
    ...AuditLogBasePlaceholders,
    ...AuditLogChangePlaceholders,
    ...AuditLogTargetPlaceholders,
  ],
  channelUpdateDefaultAutoArchiveDurations: [
    ...BasePlaceholders,
    ...AuditLogBasePlaceholders,
    ...AuditLogChangePlaceholders,
    ...AuditLogTargetPlaceholders,
  ],
  channelDelete: [
    ...BasePlaceholders,
    ...AuditLogBasePlaceholders,
    ...AuditLogTargetPlaceholders,
  ],
  memberKick: [
    ...BasePlaceholders,
    ...AuditLogBasePlaceholders,
    ...AuditLogTargetPlaceholders,
  ],
  memberBanAdd: [
    ...BasePlaceholders,
    ...AuditLogBasePlaceholders,
    ...AuditLogTargetPlaceholders,
  ],
  memberBanRemove: [
    ...BasePlaceholders,
    ...AuditLogBasePlaceholders,
    ...AuditLogTargetPlaceholders,
  ],
  memberPrune: [
    ...BasePlaceholders,
    ...AuditLogBasePlaceholders,
    "DELETE_MEMBER_DAYS",
    "MEMBERS_REMOVED",
  ],
  memberUpdateNick: [
    ...BasePlaceholders,
    ...AuditLogBasePlaceholders,
    ...AuditLogChangePlaceholders,
    ...AuditLogTargetPlaceholders,
  ],
  memberUpdateDeaf: [
    ...BasePlaceholders,
    ...AuditLogBasePlaceholders,
    ...AuditLogChangePlaceholders,
    ...AuditLogTargetPlaceholders,
  ],
  memberUpdateMute: [
    ...BasePlaceholders,
    ...AuditLogBasePlaceholders,
    ...AuditLogChangePlaceholders,
    ...AuditLogTargetPlaceholders,
  ],
  memberUpdateAvatar: [
    ...BasePlaceholders,
    ...AuditLogBasePlaceholders,
    ...AuditLogChangePlaceholders,
    ...AuditLogTargetPlaceholders,
  ],
  memberUpdateTimeout: [
    ...BasePlaceholders,
    ...AuditLogBasePlaceholders,
    ...AuditLogChangePlaceholders,
    ...AuditLogTargetPlaceholders,
  ],
  memberRoleUpdate: [
    ...BasePlaceholders,
    ...AuditLogBasePlaceholders,
    ...AuditLogTargetPlaceholders,
    "REMOVED_ROLES",
    "ADDED_ROLES",
  ],
  memberMove: [
    ...BasePlaceholders,
    ...AuditLogBasePlaceholders,
    "COUNT",
    "CHANNEL_MENTION",
  ],
  memberDisconnect: [...BasePlaceholders, ...AuditLogBasePlaceholders],
  botAdd: [...BasePlaceholders, ...AuditLogBasePlaceholders],
  roleCreate: [
    ...BasePlaceholders,
    ...AuditLogBasePlaceholders,
    ...AuditLogTargetPlaceholders,
  ],
  roleUpdateName: [
    ...BasePlaceholders,
    ...AuditLogBasePlaceholders,
    ...AuditLogChangePlaceholders,
    ...AuditLogTargetPlaceholders,
  ],
  roleUpdateColor: [
    ...BasePlaceholders,
    ...AuditLogBasePlaceholders,
    ...AuditLogChangePlaceholders,
    ...AuditLogTargetPlaceholders,
  ],
  roleUpdateHoist: [
    ...BasePlaceholders,
    ...AuditLogBasePlaceholders,
    ...AuditLogChangePlaceholders,
    ...AuditLogTargetPlaceholders,
  ],
  roleUpdateMentionable: [
    ...BasePlaceholders,
    ...AuditLogBasePlaceholders,
    ...AuditLogChangePlaceholders,
    ...AuditLogTargetPlaceholders,
  ],
  roleUpdatePermissions: [
    ...BasePlaceholders,
    ...AuditLogBasePlaceholders,
    ...AuditLogChangePlaceholders,
    ...AuditLogTargetPlaceholders,
  ],
  roleDelete: [
    ...BasePlaceholders,
    ...AuditLogBasePlaceholders,
    ...AuditLogTargetPlaceholders,
  ],
  inviteCreate: [
    ...BasePlaceholders,
    ...AuditLogBasePlaceholders,
    "INVITE_URL",
    "INVITE_CODE",
    "INVITE_CHANNEL_MENTION",
    "INVITE_MAX_AGE",
    "INVITE_MAX_USES",
    "INVITE_TEMPORARY",
  ],
  inviteUpdateCode: [
    ...BasePlaceholders,
    ...AuditLogBasePlaceholders,
    ...AuditLogChangePlaceholders,
    "INVITE_URL",
  ],
  inviteUpdateChannel: [
    ...BasePlaceholders,
    ...AuditLogBasePlaceholders,
    ...AuditLogChangePlaceholders,
    "INVITE_URL",
  ],
  inviteUpdateInviter: [
    ...BasePlaceholders,
    ...AuditLogBasePlaceholders,
    ...AuditLogChangePlaceholders,
    "INVITE_URL",
  ],
  inviteUpdateMaxUses: [
    ...BasePlaceholders,
    ...AuditLogBasePlaceholders,
    ...AuditLogChangePlaceholders,
    "INVITE_URL",
  ],
  inviteUpdateMaxAge: [
    ...BasePlaceholders,
    ...AuditLogBasePlaceholders,
    ...AuditLogChangePlaceholders,
    "INVITE_URL",
  ],
  inviteUpdateTemporary: [
    ...BasePlaceholders,
    ...AuditLogBasePlaceholders,
    ...AuditLogChangePlaceholders,
    "INVITE_URL",
  ],
  inviteUpdateUses: [
    ...BasePlaceholders,
    ...AuditLogBasePlaceholders,
    ...AuditLogChangePlaceholders,
    "INVITE_URL",
  ],
  inviteDelete: [
    ...BasePlaceholders,
    ...AuditLogBasePlaceholders,
    "INVITE_URL",
  ],
  webhookCreate: [
    ...BasePlaceholders,
    ...AuditLogBasePlaceholders,
    ...AuditLogTargetPlaceholders,
    "WEBHOOK_CHANNEL_MENTION",
  ],
  webhookUpdateName: [
    ...BasePlaceholders,
    ...AuditLogBasePlaceholders,
    ...AuditLogChangePlaceholders,
    ...AuditLogTargetPlaceholders,
  ],
  webhookUpdateAvatar: [
    ...BasePlaceholders,
    ...AuditLogBasePlaceholders,
    ...AuditLogChangePlaceholders,
    ...AuditLogTargetPlaceholders,
  ],
  webhookUpdateChannel: [
    ...BasePlaceholders,
    ...AuditLogBasePlaceholders,
    ...AuditLogChangePlaceholders,
    ...AuditLogTargetPlaceholders,
  ],
  webhookDelete: [
    ...BasePlaceholders,
    ...AuditLogBasePlaceholders,
    ...AuditLogTargetPlaceholders,
  ],
  webhookSelfDelete: [
    ...BasePlaceholders,
    ...AuditLogBasePlaceholders,
    ...AuditLogTargetPlaceholders,
  ],
} as const satisfies Record<EventType, string[]>;

export const ALL_EVENTS_CHOICE = "all";
