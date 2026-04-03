import { channelMention, userMention } from "discord.js";

import { initI18n } from "@bl/i18n";

import { LogService } from "~/services/LogService";
import { EventHandler } from "~/structures";

export const voiceStateUpdateEvent = new EventHandler({
  name: "voiceStateUpdate",
  handler: async (_client, oldState, newState) => {
    const member = newState.member;
    if (!member) return;

    const i18n = await initI18n(newState.guild.preferredLocale);

    const userData = {
      USER_MENTION: userMention(member.id),
      USER_NAME: member.user.username,
      USER_ID: member.id,
      USER_AVATAR: member.displayAvatarURL(),
    };

    // Join
    if (!oldState.channelId && newState.channelId) {
      LogService.log({
        eventName: "voiceJoin",
        guild: newState.guild,
        i18n,
        relatedChannels: [newState.channelId],
        relatedUsers: [member.id],
        data: {
          ...userData,
          CHANNEL_MENTION: channelMention(newState.channelId),
          CHANNEL_NAME: newState.channel?.name ?? "Unknown",
        },
      });
      return;
    }

    // Leave
    if (oldState.channelId && !newState.channelId) {
      LogService.log({
        eventName: "voiceLeave",
        guild: newState.guild,
        i18n,
        relatedChannels: [oldState.channelId],
        relatedUsers: [member.id],
        data: {
          ...userData,
          CHANNEL_MENTION: channelMention(oldState.channelId),
          CHANNEL_NAME: oldState.channel?.name ?? "Unknown",
        },
      });
      return;
    }

    // Move
    if (
      oldState.channelId &&
      newState.channelId &&
      oldState.channelId !== newState.channelId
    ) {
      LogService.log({
        eventName: "voiceMove",
        guild: newState.guild,
        i18n,
        relatedChannels: [oldState.channelId, newState.channelId],
        relatedUsers: [member.id],
        data: {
          ...userData,
          OLD_CHANNEL_MENTION: channelMention(oldState.channelId),
          NEW_CHANNEL_MENTION: channelMention(newState.channelId),
        },
      });
    }

    if (!newState.channelId) return;

    // Server Mute
    if (
      oldState.serverMute !== newState.serverMute &&
      newState.serverMute !== null
    ) {
      LogService.log({
        eventName: "voiceServerMute",
        guild: newState.guild,
        i18n,
        relatedChannels: [newState.channelId],
        relatedUsers: [member.id],
        data: {
          ...userData,
          CHANNEL_MENTION: channelMention(newState.channelId),
          MUTE_STATUS: i18n.t(
            `main:eventDataTransformers.voiceMuteStatus.${newState.serverMute}`,
          ),
        },
      });
    }

    // Server Deaf
    if (
      oldState.serverDeaf !== newState.serverDeaf &&
      newState.serverDeaf !== null
    ) {
      LogService.log({
        eventName: "voiceServerDeaf",
        guild: newState.guild,
        i18n,
        relatedChannels: [newState.channelId],
        relatedUsers: [member.id],
        data: {
          ...userData,
          CHANNEL_MENTION: channelMention(newState.channelId),
          DEAF_STATUS: i18n.t(
            `main:eventDataTransformers.voiceDeafStatus.${newState.serverDeaf}`,
          ),
        },
      });
    }

    // Self Mute
    if (oldState.selfMute !== newState.selfMute && newState.selfMute !== null) {
      LogService.log({
        eventName: "voiceSelfMute",
        guild: newState.guild,
        i18n,
        relatedChannels: [newState.channelId],
        relatedUsers: [member.id],
        data: {
          ...userData,
          CHANNEL_MENTION: channelMention(newState.channelId),
          MUTE_STATUS: i18n.t(
            `main:eventDataTransformers.voiceMuteStatus.${newState.selfMute}`,
          ),
        },
      });
    }

    // Self Deaf
    if (oldState.selfDeaf !== newState.selfDeaf && newState.selfDeaf !== null) {
      LogService.log({
        eventName: "voiceSelfDeaf",
        guild: newState.guild,
        i18n,
        relatedChannels: [newState.channelId],
        relatedUsers: [member.id],
        data: {
          ...userData,
          CHANNEL_MENTION: channelMention(newState.channelId),
          DEAF_STATUS: i18n.t(
            `main:eventDataTransformers.voiceDeafStatus.${newState.selfDeaf}`,
          ),
        },
      });
    }

    // Streaming
    if (oldState.streaming !== newState.streaming) {
      LogService.log({
        eventName: newState.streaming ? "voiceStartStream" : "voiceStopStream",
        guild: newState.guild,
        i18n,
        relatedChannels: [newState.channelId],
        relatedUsers: [member.id],
        data: {
          ...userData,
          CHANNEL_MENTION: channelMention(newState.channelId),
        },
      });
    }

    // Video
    if (oldState.selfVideo !== newState.selfVideo) {
      LogService.log({
        eventName: newState.selfVideo ? "voiceStartVideo" : "voiceStopVideo",
        guild: newState.guild,
        i18n,
        relatedChannels: [newState.channelId],
        relatedUsers: [member.id],
        data: {
          ...userData,
          CHANNEL_MENTION: channelMention(newState.channelId),
        },
      });
    }
  },
});
