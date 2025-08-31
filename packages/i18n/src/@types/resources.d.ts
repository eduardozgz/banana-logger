interface Resources {
  baseTemplates: {
    guildUpdateName: [
      {
        title: "Server Name Change";
        description: "{EXECUTOR_MENTION} changed the server name";
        author: {
          name: "{EXECUTOR_NAME}";
          icon_url: "{EXECUTOR_AVATAR}";
        };
        fields: [
          {
            name: "__Old Name__";
            value: "{OLD_VALUE}";
          },
          {
            name: "__New Name__";
            value: "{NEW_VALUE}";
          },
        ];
      },
    ];
    guildUpdateDescription: [
      {
        title: "Server Description Change";
        description: "{EXECUTOR_MENTION} changed the server description";
        author: {
          name: "{EXECUTOR_NAME}";
          icon_url: "{EXECUTOR_AVATAR}";
        };
        fields: [
          {
            name: "__Old Description__";
            value: "{OLD_VALUE}";
          },
          {
            name: "__New Description__";
            value: "{NEW_VALUE}";
          },
        ];
      },
    ];
    guildUpdateIcon: [
      {
        title: "Server Icon Change";
        description: "{EXECUTOR_MENTION} changed the server icon";
        author: {
          name: "{EXECUTOR_NAME}";
          icon_url: "{EXECUTOR_AVATAR}";
        };
        image: {
          url: "{OLD_VALUE}";
        };
        fields: [
          {
            name: "__Old Icon Hash__";
            value: "`{OLD_VALUE_RAW}`";
          },
          {
            name: "__New Icon Hash__";
            value: "`{NEW_VALUE_RAW}`";
          },
        ];
      },
      {
        image: {
          url: "{NEW_VALUE}";
        };
      },
    ];
    guildUpdateSplash: [
      {
        title: "Server Splash Change";
        description: "{EXECUTOR_MENTION} changed the server splash";
        author: {
          name: "{EXECUTOR_NAME}";
          icon_url: "{EXECUTOR_AVATAR}";
        };
        image: {
          url: "{OLD_VALUE}";
        };
        fields: [
          {
            name: "__Old Splash Hash__";
            value: "`{OLD_VALUE_RAW}`";
          },
          {
            name: "__New Splash Hash__";
            value: "`{NEW_VALUE_RAW}`";
          },
        ];
      },
      {
        image: {
          url: "{NEW_VALUE}";
        };
      },
    ];
    guildUpdateDiscoverySplash: [
      {
        title: "Server Discovery Splash Change";
        description: "{EXECUTOR_MENTION} changed the server discovery splash";
        author: {
          name: "{EXECUTOR_NAME}";
          icon_url: "{EXECUTOR_AVATAR}";
        };
        image: {
          url: "{OLD_VALUE}";
        };
        fields: [
          {
            name: "__Old Discovery Splash Hash__";
            value: "`{OLD_VALUE_RAW}`";
          },
          {
            name: "__New Discovery Splash Hash__";
            value: "`{NEW_VALUE_RAW}`";
          },
        ];
      },
      {
        image: {
          url: "{NEW_VALUE}";
        };
      },
    ];
    guildUpdateBanner: [
      {
        title: "Server Banner Change";
        description: "{EXECUTOR_MENTION} changed the server banner";
        author: {
          name: "{EXECUTOR_NAME}";
          icon_url: "{EXECUTOR_AVATAR}";
        };
        image: {
          url: "{OLD_VALUE}";
        };
        fields: [
          {
            name: "__Old Banner Hash__";
            value: "`{OLD_VALUE_RAW}`";
          },
          {
            name: "__New Banner Hash__";
            value: "`{NEW_VALUE_RAW}`";
          },
        ];
      },
      {
        image: {
          url: "{NEW_VALUE}";
        };
      },
    ];
    guildUpdateOwner: [
      {
        title: "Server Owner Change";
        description: "{EXECUTOR_MENTION} changed the server owner";
        author: {
          name: "{EXECUTOR_NAME}";
          icon_url: "{EXECUTOR_AVATAR}";
        };
        fields: [
          {
            name: "__Old Owner__";
            value: "{OLD_VALUE}";
          },
          {
            name: "__New Owner__";
            value: "{NEW_VALUE}";
          },
        ];
      },
    ];
    guildUpdateRegion: [
      {
        title: "Server Region Change";
        description: "{EXECUTOR_MENTION} changed the server region";
        author: {
          name: "{EXECUTOR_NAME}";
          icon_url: "{EXECUTOR_AVATAR}";
        };
        fields: [
          {
            name: "__Old Region__";
            value: "`{OLD_VALUE}`";
          },
          {
            name: "__New Region__";
            value: "`{NEW_VALUE}`";
          },
        ];
      },
    ];
    guildUpdatePreferredLocale: [
      {
        title: "Server Primary Language Change";
        description: "{EXECUTOR_MENTION} changed the server primary language";
        author: {
          name: "{EXECUTOR_NAME}";
          icon_url: "{EXECUTOR_AVATAR}";
        };
        fields: [
          {
            name: "__Old primary language__";
            value: "{OLD_VALUE}";
          },
          {
            name: "__New primary language__";
            value: "{NEW_VALUE}";
          },
        ];
      },
    ];
    guildUpdateAfkChannel: [
      {
        title: "AFK Channel Change";
        description: "{EXECUTOR_MENTION} changed the AFK channel";
        author: {
          name: "{EXECUTOR_NAME}";
          icon_url: "{EXECUTOR_AVATAR}";
        };
        fields: [
          {
            name: "__Old AFK Channel__";
            value: "{OLD_VALUE}";
          },
          {
            name: "__New AFK Channel__";
            value: "{NEW_VALUE}";
          },
        ];
      },
    ];
    guildUpdateAfkTimeout: [
      {
        title: "AFK Timeout Change";
        description: "{EXECUTOR_MENTION} changed the AFK timeout";
        author: {
          name: "{EXECUTOR_NAME}";
          icon_url: "{EXECUTOR_AVATAR}";
        };
        fields: [
          {
            name: "__Old AFK Timeout__";
            value: "{OLD_VALUE}";
          },
          {
            name: "__New AFK Timeout__";
            value: "{NEW_VALUE}";
          },
        ];
      },
    ];
    guildUpdateRulesChannel: [
      {
        title: "Rules Channel Change";
        description: "{EXECUTOR_MENTION} changed the rules channel";
        author: {
          name: "{EXECUTOR_NAME}";
          icon_url: "{EXECUTOR_AVATAR}";
        };
        fields: [
          {
            name: "__Old Rules Channel__";
            value: "{OLD_VALUE}";
          },
          {
            name: "__New Rules Channel__";
            value: "{NEW_VALUE}";
          },
        ];
      },
    ];
    guildUpdatePublicUpdatesChannel: [
      {
        title: "Public Updates Channel Change";
        description: "{EXECUTOR_MENTION} changed the public updates channel";
        author: {
          name: "{EXECUTOR_NAME}";
          icon_url: "{EXECUTOR_AVATAR}";
        };
        fields: [
          {
            name: "__Old Public Updates Channel__";
            value: "{OLD_VALUE}";
          },
          {
            name: "__New Public Updates Channel__";
            value: "{NEW_VALUE}";
          },
        ];
      },
    ];
    guildUpdateSafetyAlertsChannel: [
      {
        title: "Safety Alerts Channel Change";
        description: "{EXECUTOR_MENTION} changed the safety alerts channel";
        author: {
          name: "{EXECUTOR_NAME}";
          icon_url: "{EXECUTOR_AVATAR}";
        };
        fields: [
          {
            name: "__Old Safety Alerts Channel__";
            value: "{OLD_VALUE}";
          },
          {
            name: "__New Safety Alerts Channel__";
            value: "{NEW_VALUE}";
          },
        ];
      },
    ];
    guildUpdateMfaLevel: [
      {
        title: "Server MFA Level Change";
        description: "{EXECUTOR_MENTION} changed the server MFA level";
        author: {
          name: "{EXECUTOR_NAME}";
          icon_url: "{EXECUTOR_AVATAR}";
        };
        fields: [
          {
            name: "__Old MFA Level__";
            value: "{OLD_VALUE}";
          },
          {
            name: "__New MFA Level__";
            value: "{NEW_VALUE}";
          },
        ];
      },
    ];
    guildUpdateVerificationLevel: [
      {
        title: "Server Verification Level Change";
        description: "{EXECUTOR_MENTION} changed the server verification level";
        author: {
          name: "{EXECUTOR_NAME}";
          icon_url: "{EXECUTOR_AVATAR}";
        };
        fields: [
          {
            name: "__Old Verification Level__";
            value: "{OLD_VALUE}";
          },
          {
            name: "__New Verification Level__";
            value: "{NEW_VALUE}";
          },
        ];
      },
    ];
    guildUpdateExplicitContentFilter: [
      {
        title: "Server Explicit Content Filter Change";
        description: "{EXECUTOR_MENTION} changed the explicit content filter";
        author: {
          name: "{EXECUTOR_NAME}";
          icon_url: "{EXECUTOR_AVATAR}";
        };
        fields: [
          {
            name: "__Old Filter__";
            value: "{OLD_VALUE}";
          },
          {
            name: "__New Filter__";
            value: "{NEW_VALUE}";
          },
        ];
      },
    ];
    guildUpdateDefaultMessageNotifications: [
      {
        title: "Default Message Notifications Change";
        description: "{EXECUTOR_MENTION} changed the default message notifications";
        author: {
          name: "{EXECUTOR_NAME}";
          icon_url: "{EXECUTOR_AVATAR}";
        };
        fields: [
          {
            name: "__Old Setting__";
            value: "{OLD_VALUE}";
          },
          {
            name: "__New Setting__";
            value: "{NEW_VALUE}";
          },
        ];
      },
    ];
    guildUpdateVanityUrlCode: [
      {
        title: "Server Vanity URL Change";
        description: "{EXECUTOR_MENTION} changed the server vanity URL";
        author: {
          name: "{EXECUTOR_NAME}";
          icon_url: "{EXECUTOR_AVATAR}";
        };
        fields: [
          {
            name: "__Old Vanity URL Code__";
            value: "{OLD_VALUE}";
          },
          {
            name: "__New Vanity URL Code__";
            value: "{NEW_VALUE}";
          },
        ];
      },
    ];
    guildUpdatePremiumProgressBarEnabled: [
      {
        title: "Premium Progress Bar Change";
        description: "{EXECUTOR_MENTION} changed the premium/nitro progress bar visibility";
        author: {
          name: "{EXECUTOR_NAME}";
          icon_url: "{EXECUTOR_AVATAR}";
        };
        fields: [
          {
            name: "__Old Status__";
            value: "{OLD_VALUE}";
          },
          {
            name: "__New Status__";
            value: "{NEW_VALUE}";
          },
        ];
      },
    ];
    guildUpdateWidgetEnabled: [
      {
        title: "Server Widget Enabled State Change";
        description: "{EXECUTOR_MENTION} changed the server widget enabled state";
        author: {
          name: "{EXECUTOR_NAME}";
          icon_url: "{EXECUTOR_AVATAR}";
        };
        fields: [
          {
            name: "__Old Status__";
            value: "{OLD_VALUE}";
          },
          {
            name: "__New Status__";
            value: "{NEW_VALUE}";
          },
        ];
      },
    ];
    guildUpdateWidgetChannel: [
      {
        title: "Server Widget Channel Change";
        description: "{EXECUTOR_MENTION} changed the server widget channel";
        author: {
          name: "{EXECUTOR_NAME}";
          icon_url: "{EXECUTOR_AVATAR}";
        };
        fields: [
          {
            name: "__Old Channel__";
            value: "{OLD_VALUE}";
          },
          {
            name: "__New Channel__";
            value: "{NEW_VALUE}";
          },
        ];
      },
    ];
    guildUpdateSystemChannelFlags: [
      {
        title: "Server System Channel Flags Change";
        description: "{EXECUTOR_MENTION} changed the server system channel flags";
        author: {
          name: "{EXECUTOR_NAME}";
          icon_url: "{EXECUTOR_AVATAR}";
        };
        fields: [
          {
            name: "__Old Flags__";
            value: "{OLD_VALUE}";
          },
          {
            name: "__New Flags__";
            value: "{NEW_VALUE}";
          },
        ];
      },
    ];
    guildUpdateSystemChannel: [
      {
        title: "Server System Channel Change";
        description: "{EXECUTOR_MENTION} changed the server system channel";
        author: {
          name: "{EXECUTOR_NAME}";
          icon_url: "{EXECUTOR_AVATAR}";
        };
        fields: [
          {
            name: "__Old Channel__";
            value: "{OLD_VALUE}";
          },
          {
            name: "__New Channel__";
            value: "{NEW_VALUE}";
          },
        ];
      },
    ];
    channelCreate: [
      {
        title: "Channel Created";
        description: "{EXECUTOR_MENTION} created {TARGET_MENTION}";
        author: {
          name: "{EXECUTOR_NAME}";
          icon_url: "{EXECUTOR_AVATAR}";
        };
      },
    ];
    channelUpdateName: [
      {
        title: "Channel Name Change";
        description: "{EXECUTOR_MENTION} changed the name of {TARGET_MENTION}";
        author: {
          name: "{EXECUTOR_NAME}";
          icon_url: "{EXECUTOR_AVATAR}";
        };
        fields: [
          {
            name: "__Old Name__";
            value: "{OLD_VALUE}";
          },
          {
            name: "__New Name__";
            value: "{NEW_VALUE}";
          },
        ];
      },
    ];
    channelUpdateType: [
      {
        title: "Channel Type Change";
        description: "{EXECUTOR_MENTION} changed the channel type of {TARGET_MENTION}";
        author: {
          name: "{EXECUTOR_NAME}";
          icon_url: "{EXECUTOR_AVATAR}";
        };
        fields: [
          {
            name: "__Old Type__";
            value: "{OLD_VALUE}";
          },
          {
            name: "__New Type__";
            value: "{NEW_VALUE}";
          },
        ];
      },
    ];
    channelUpdateTopic: [
      {
        title: "Channel Topic Change";
        description: "{EXECUTOR_MENTION} changed the topic of {TARGET_MENTION}";
        author: {
          name: "{EXECUTOR_NAME}";
          icon_url: "{EXECUTOR_AVATAR}";
        };
        fields: [
          {
            name: "__Old Topic__";
            value: "{OLD_VALUE}";
          },
          {
            name: "__New Topic__";
            value: "{NEW_VALUE}";
          },
        ];
      },
    ];
    channelUpdateNsfw: [
      {
        title: "Channel NSFW Change";
        description: "{EXECUTOR_MENTION} changed the NSFW status of {TARGET_MENTION}";
        author: {
          name: "{EXECUTOR_NAME}";
          icon_url: "{EXECUTOR_AVATAR}";
        };
        fields: [
          {
            name: "__Old NSFW__";
            value: "{OLD_VALUE}";
          },
          {
            name: "__New NSFW__";
            value: "{NEW_VALUE}";
          },
        ];
      },
    ];
    channelUpdateBitrate: [
      {
        title: "Channel Bitrate Change";
        description: "{EXECUTOR_MENTION} changed the bitrate of {TARGET_MENTION}";
        author: {
          name: "{EXECUTOR_NAME}";
          icon_url: "{EXECUTOR_AVATAR}";
        };
        fields: [
          {
            name: "__Old Bitrate__";
            value: "{OLD_VALUE}";
          },
          {
            name: "__New Bitrate__";
            value: "{NEW_VALUE}";
          },
        ];
      },
    ];
    channelUpdateUserLimit: [
      {
        title: "Channel User Limit Change";
        description: "{EXECUTOR_MENTION} changed the user limit of {TARGET_MENTION}";
        author: {
          name: "{EXECUTOR_NAME}";
          icon_url: "{EXECUTOR_AVATAR}";
        };
        fields: [
          {
            name: "__Old User Limit__";
            value: "{OLD_VALUE}";
          },
          {
            name: "__New User Limit__";
            value: "{NEW_VALUE}";
          },
        ];
      },
    ];
    channelUpdateRateLimitPerUser: [
      {
        title: "Channel Rate Limit Per User Change";
        description: "{EXECUTOR_MENTION} changed the rate limit per user of {TARGET_MENTION}";
        author: {
          name: "{EXECUTOR_NAME}";
          icon_url: "{EXECUTOR_AVATAR}";
        };
        fields: [
          {
            name: "__Old Rate Limit Per User__";
            value: "{OLD_VALUE}";
          },
          {
            name: "__New Rate Limit Per User__";
            value: "{NEW_VALUE}";
          },
        ];
      },
    ];
    channelUpdatePosition: [
      {
        title: "Channel Position Change";
        description: "{EXECUTOR_MENTION} changed the position of {TARGET_MENTION}";
        author: {
          name: "{EXECUTOR_NAME}";
          icon_url: "{EXECUTOR_AVATAR}";
        };
        fields: [
          {
            name: "__Old Position__";
            value: "{OLD_VALUE}";
          },
          {
            name: "__New Position__";
            value: "{NEW_VALUE}";
          },
        ];
      },
    ];
    channelUpdatePermissionOverwrites: [
      {
        title: "Channel Permission Overwrites Change";
        description: "{EXECUTOR_MENTION} changed the permission overwrites of {TARGET_MENTION}";
        author: {
          name: "{EXECUTOR_NAME}";
          icon_url: "{EXECUTOR_AVATAR}";
        };
      },
    ];
    channelUpdateDefaultAutoArchiveDurations: [
      {
        title: "Channel Default Auto Archive Durations Change";
        description: "{EXECUTOR_MENTION} changed the default auto archive duration of {TARGET_MENTION}";
        author: {
          name: "{EXECUTOR_NAME}";
          icon_url: "{EXECUTOR_AVATAR}";
        };
        fields: [
          {
            name: "__Old Default Auto Archive Duration__";
            value: "{OLD_VALUE}";
          },
          {
            name: "__New Default Auto Archive Duration__";
            value: "{NEW_VALUE}";
          },
        ];
      },
    ];
    channelDelete: [
      {
        title: "Channel Deleted";
        description: '{EXECUTOR_MENTION} deleted {TARGET_MENTION} (previously known as "{TARGET_NAME}")';
        author: {
          name: "{EXECUTOR_NAME}";
          icon_url: "{EXECUTOR_AVATAR}";
        };
      },
    ];
    memberKick: [
      {
        title: "Member Kicked";
        description: '{EXECUTOR_MENTION} kicked {TARGET_MENTION} (previously known as "{TARGET_NAME}")\n\n**Reason:** {REASON}';
        thumbnail: {
          url: "{TARGET_IMAGE_URL}";
        };
      },
    ];
    memberPrune: [
      {
        title: "Member Pruned";
        description: "{EXECUTOR_MENTION} pruned {MEMBERS_REMOVED} members that were inactive in the last {DELETE_MEMBER_DAYS} days\n**Reason:** {REASON}";
      },
    ];
    memberBanAdd: [
      {
        title: "Member Banned";
        description: '{EXECUTOR_MENTION} banned {TARGET_MENTION} (previously known as "{TARGET_NAME}")\n\n**Reason:** {REASON}';
        thumbnail: {
          url: "{TARGET_IMAGE_URL}";
        };
      },
    ];
    memberBanRemove: [
      {
        title: "Member Unbanned";
        description: '{EXECUTOR_MENTION} unbanned {TARGET_MENTION} (previously known as "{TARGET_NAME}")\n\n**Reason:** {REASON}';
        thumbnail: {
          url: "{TARGET_IMAGE_URL}";
        };
      },
    ];
    memberUpdateNick: [
      {
        title: "Member Nickname Change";
        description: "{EXECUTOR_MENTION} changed the nickname of {TARGET_MENTION}  ";
        thumbnail: {
          url: "{TARGET_IMAGE_URL}";
        };
        author: {
          name: "{EXECUTOR_NAME}";
          icon_url: "{EXECUTOR_AVATAR}";
        };
        fields: [
          {
            name: "__Old Nickname__";
            value: "{OLD_VALUE}";
          },
          {
            name: "__New Nickname__";
            value: "{NEW_VALUE}";
          },
        ];
      },
    ];
    memberUpdateDeaf: [
      {
        title: "Member Deaf Change";
        description: "{EXECUTOR_MENTION} changed the deaf status of {TARGET_MENTION}";
        thumbnail: {
          url: "{TARGET_IMAGE_URL}";
        };
        author: {
          name: "{EXECUTOR_NAME}";
          icon_url: "{EXECUTOR_AVATAR}";
        };
        fields: [
          {
            name: "__Old Deaf Status__";
            value: "{OLD_VALUE}";
          },
          {
            name: "__New Deaf Status__";
            value: "{NEW_VALUE}";
          },
        ];
      },
    ];
    memberUpdateMute: [
      {
        title: "Member Mute Change";
        description: "{EXECUTOR_MENTION} changed the mute status of {TARGET_MENTION}";
        thumbnail: {
          url: "{TARGET_IMAGE_URL}";
        };
        author: {
          name: "{EXECUTOR_NAME}";
          icon_url: "{EXECUTOR_AVATAR}";
        };
        fields: [
          {
            name: "__Old Mute Status__";
            value: "{OLD_VALUE}";
          },
          {
            name: "__New Mute Status__";
            value: "{NEW_VALUE}";
          },
        ];
      },
    ];
    memberUpdateAvatar: [
      {
        title: "Member Avatar Change";
        description: "{EXECUTOR_MENTION} changed the avatar of {TARGET_MENTION}";
        thumbnail: {
          url: "{TARGET_IMAGE_URL}";
        };
        author: {
          name: "{EXECUTOR_NAME}";
          icon_url: "{EXECUTOR_AVATAR}";
        };
        image: {
          url: "{OLD_VALUE}";
        };
        fields: [
          {
            name: "__Old Avatar Hash__";
            value: "`{OLD_VALUE_RAW}`";
          },
          {
            name: "__New Avatar Hash__";
            value: "`{NEW_VALUE_RAW}`";
          },
        ];
      },
      {
        image: {
          url: "{NEW_VALUE}";
        };
      },
    ];
    memberUpdateTimeout: [
      {
        title: "Member Timeout Change";
        description: "{EXECUTOR_MENTION} changed the timeout of {TARGET_MENTION}\n\n**Reason:** {REASON}";
        thumbnail: {
          url: "{TARGET_IMAGE_URL}";
        };
        author: {
          name: "{EXECUTOR_NAME}";
          icon_url: "{EXECUTOR_AVATAR}";
        };
        fields: [
          {
            name: "__Old Timeout__";
            value: "{OLD_VALUE}";
          },
          {
            name: "__New Timeout__";
            value: "{NEW_VALUE}";
          },
        ];
      },
    ];
    memberRoleUpdate: [
      {
        title: "Member Role Change";
        description: "{EXECUTOR_MENTION} changed the roles of {TARGET_MENTION}";
        thumbnail: {
          url: "{TARGET_IMAGE_URL}";
        };
        author: {
          name: "{EXECUTOR_NAME}";
          icon_url: "{EXECUTOR_AVATAR}";
        };
        fields: [
          {
            name: "__Removed Roles__";
            value: "{REMOVED_ROLES}";
          },
          {
            name: "__Added Roles__";
            value: "{ADDED_ROLES}";
          },
        ];
      },
    ];
    memberMove: [
      {
        title: "Member Voice Channel Move";
        description: "{EXECUTOR_MENTION} moved {COUNT} member(s) to {CHANNEL_MENTION}";
        author: {
          name: "{EXECUTOR_NAME}";
          icon_url: "{EXECUTOR_AVATAR}";
        };
      },
    ];
    memberDisconnect: [
      {
        title: "Member Disconnected";
        description: "{EXECUTOR_MENTION} disconnected someone from a voice channel";
        author: {
          name: "{EXECUTOR_NAME}";
          icon_url: "{EXECUTOR_AVATAR}";
        };
      },
    ];
    botAdd: [
      {
        title: "Bot Added";
        description: "{EXECUTOR_MENTION} added {TARGET_MENTION} to the server";
        thumbnail: {
          url: "{TARGET_IMAGE_URL}";
        };
        author: {
          name: "{EXECUTOR_NAME}";
          icon_url: "{EXECUTOR_AVATAR}";
        };
      },
    ];
    roleCreate: [
      {
        title: "Role Created";
        description: "{EXECUTOR_MENTION} created {TARGET_MENTION}";
        author: {
          name: "{EXECUTOR_NAME}";
          icon_url: "{EXECUTOR_AVATAR}";
        };
      },
    ];
    roleUpdateName: [
      {
        title: "Role Name Change";
        description: "{EXECUTOR_MENTION} changed the name of {TARGET_MENTION}";
        author: {
          name: "{EXECUTOR_NAME}";
          icon_url: "{EXECUTOR_AVATAR}";
        };
        fields: [
          {
            name: "__Old Name__";
            value: "{OLD_VALUE}";
          },
          {
            name: "__New Name__";
            value: "{NEW_VALUE}";
          },
        ];
      },
    ];
    roleUpdateColor: [
      {
        title: "Role Color Change";
        description: "{EXECUTOR_MENTION} changed the color of {TARGET_MENTION}";
        author: {
          name: "{EXECUTOR_NAME}";
          icon_url: "{EXECUTOR_AVATAR}";
        };
        fields: [
          {
            name: "__Old Color__";
            value: "`{OLD_VALUE}`";
            inline: true;
          },
          {
            name: "__New Color__";
            value: "`{NEW_VALUE}`";
            inline: true;
          },
        ];
      },
    ];
    roleUpdateHoist: [
      {
        title: "Role Hoist Change";
        description: "{EXECUTOR_MENTION} changed the hoist (display above members) status of {TARGET_MENTION}";
        author: {
          name: "{EXECUTOR_NAME}";
          icon_url: "{EXECUTOR_AVATAR}";
        };
        fields: [
          {
            name: "__Old Hoist Status__";
            value: "{OLD_VALUE}";
            inline: true;
          },
          {
            name: "__New Hoist Status__";
            value: "{NEW_VALUE}";
            inline: true;
          },
        ];
      },
    ];
    roleUpdateMentionable: [
      {
        title: "Role Mentionable Change";
        description: "{EXECUTOR_MENTION} changed the mentionable status of {TARGET_MENTION}";
        author: {
          name: "{EXECUTOR_NAME}";
          icon_url: "{EXECUTOR_AVATAR}";
        };
        fields: [
          {
            name: "__Old Mentionable Status__";
            value: "{OLD_VALUE}";
            inline: true;
          },
          {
            name: "__New Mentionable Status__";
            value: "{NEW_VALUE}";
            inline: true;
          },
        ];
      },
    ];
    roleUpdatePermissions: [
      {
        title: "Role Permissions Change";
        description: "{EXECUTOR_MENTION} changed the permissions of {TARGET_MENTION}";
        author: {
          name: "{EXECUTOR_NAME}";
          icon_url: "{EXECUTOR_AVATAR}";
        };
        fields: [
          {
            name: "__Old Permissions__";
            value: "`{OLD_VALUE_RAW}`";
            inline: true;
          },
          {
            name: "__New Permissions__";
            value: "`{NEW_VALUE_RAW}`";
            inline: true;
          },
        ];
      },
    ];
    roleDelete: [
      {
        title: "Role Deleted";
        description: '{EXECUTOR_MENTION} deleted {TARGET_MENTION} (previously known as "{TARGET_NAME}")';
      },
    ];
    inviteCreate: [
      {
        title: "Invite Created";
        description: "{EXECUTOR_MENTION} created an invite: {INVITE_URL}";
        author: {
          name: "{EXECUTOR_NAME}";
          icon_url: "{EXECUTOR_AVATAR}";
        };
        fields: [
          {
            name: "__Code__";
            value: "`{INVITE_CODE}`";
            inline: true;
          },
          {
            name: "__Channel__";
            value: "{INVITE_CHANNEL_MENTION}";
            inline: true;
          },
          {
            name: "__Expire after__";
            value: "{INVITE_MAX_AGE}";
            inline: true;
          },
          {
            name: "__Max Uses__";
            value: "{INVITE_MAX_USES}";
            inline: true;
          },
          {
            name: "__Temporary membership__";
            value: "{INVITE_TEMPORARY}";
            inline: true;
          },
        ];
      },
    ];
    inviteUpdateCode: [
      {
        title: "Invite Code Change";
        description: "{EXECUTOR_MENTION} changed the code of {INVITE_URL}";
        fields: [
          {
            name: "__Old Code__";
            value: "{OLD_VALUE}";
          },
          {
            name: "__New Code__";
            value: "{NEW_VALUE}";
          },
        ];
        author: {
          name: "{EXECUTOR_NAME}";
          icon_url: "{EXECUTOR_AVATAR}";
        };
      },
    ];
    inviteUpdateChannel: [
      {
        title: "Invite Channel Change";
        description: "{EXECUTOR_MENTION} changed the channel of {INVITE_URL}";
        fields: [
          {
            name: "__Old Channel__";
            value: "{OLD_VALUE}";
          },
          {
            name: "__New Channel__";
            value: "{NEW_VALUE}";
          },
        ];
        author: {
          name: "{EXECUTOR_NAME}";
          icon_url: "{EXECUTOR_AVATAR}";
        };
      },
    ];
    inviteUpdateInviter: [
      {
        title: "Invite Inviter Change";
        description: "{EXECUTOR_MENTION} changed the inviter of {INVITE_URL}";
        fields: [
          {
            name: "__Old Inviter__";
            value: "{OLD_VALUE}";
          },
          {
            name: "__New Inviter__";
            value: "{NEW_VALUE}";
          },
        ];
        author: {
          name: "{EXECUTOR_NAME}";
          icon_url: "{EXECUTOR_AVATAR}";
        };
      },
    ];
    inviteUpdateMaxUses: [
      {
        title: "Invite Max Uses Change";
        description: "{EXECUTOR_MENTION} changed the max uses of {INVITE_URL}";
        fields: [
          {
            name: "__Old Max Uses__";
            value: "{OLD_VALUE}";
          },
          {
            name: "__New Max Uses__";
            value: "{NEW_VALUE}";
          },
        ];
        author: {
          name: "{EXECUTOR_NAME}";
          icon_url: "{EXECUTOR_AVATAR}";
        };
      },
    ];
    inviteUpdateMaxAge: [
      {
        title: "Invite Max Age Change";
        description: "{EXECUTOR_MENTION} changed the max age of {INVITE_URL}";
        fields: [
          {
            name: "__Old Max Age__";
            value: "{OLD_VALUE}";
          },
          {
            name: "__New Max Age__";
            value: "{NEW_VALUE}";
          },
        ];
        author: {
          name: "{EXECUTOR_NAME}";
          icon_url: "{EXECUTOR_AVATAR}";
        };
      },
    ];
    inviteUpdateTemporary: [
      {
        title: "Invite Temporary Change";
        description: "{EXECUTOR_MENTION} changed the temporary status of {INVITE_URL}";
        fields: [
          {
            name: "__Old Temporary__";
            value: "{OLD_VALUE}";
          },
          {
            name: "__New Temporary__";
            value: "{NEW_VALUE}";
          },
        ];
        author: {
          name: "{EXECUTOR_NAME}";
          icon_url: "{EXECUTOR_AVATAR}";
        };
      },
    ];
    inviteUpdateUses: [
      {
        title: "Invite Uses Change";
        description: "{EXECUTOR_MENTION} changed the uses of {INVITE_URL}";
        fields: [
          {
            name: "__Old Uses__";
            value: "{OLD_VALUE}";
          },
          {
            name: "__New Uses__";
            value: "{NEW_VALUE}";
          },
        ];
        author: {
          name: "{EXECUTOR_NAME}";
          icon_url: "{EXECUTOR_AVATAR}";
        };
      },
    ];
    inviteDelete: [
      {
        title: "Invite Deleted";
        description: "{EXECUTOR_MENTION} deleted {INVITE_URL}";
        author: {
          name: "{EXECUTOR_NAME}";
          icon_url: "{EXECUTOR_AVATAR}";
        };
      },
    ];
    webhookCreate: [
      {
        title: "Webhook Created";
        description: "{EXECUTOR_MENTION} created a webhook";
        fields: [
          {
            name: "__Webhook Name__";
            value: "{TARGET_NAME}";
          },
          {
            name: "__Webhook Channel__";
            value: "{WEBHOOK_CHANNEL_MENTION}";
          },
        ];
        thumbnail: {
          url: "{TARGET_IMAGE_URL}";
        };
        author: {
          name: "{EXECUTOR_NAME}";
          icon_url: "{EXECUTOR_AVATAR}";
        };
      },
    ];
    webhookUpdateName: [
      {
        title: "Webhook Name Change";
        description: "{EXECUTOR_MENTION} changed the name of a webhook: {TARGET_NAME}";
        author: {
          name: "{EXECUTOR_NAME}";
          icon_url: "{EXECUTOR_AVATAR}";
        };
        thumbnail: {
          url: "{TARGET_IMAGE_URL}";
        };
        fields: [
          {
            name: "__Old Name__";
            value: "{OLD_VALUE}";
          },
          {
            name: "__New Name__";
            value: "{NEW_VALUE}";
          },
        ];
      },
    ];
    webhookUpdateAvatar: [
      {
        title: "Webhook Avatar Change";
        description: "{EXECUTOR_MENTION} changed the avatar of a webhook: {TARGET_NAME}";
        author: {
          name: "{EXECUTOR_NAME}";
          icon_url: "{EXECUTOR_AVATAR}";
        };
        thumbnail: {
          url: "{TARGET_IMAGE_URL}";
        };
        fields: [
          {
            name: "__Old Avatar__";
            value: "{OLD_VALUE}";
          },
          {
            name: "__New Avatar__";
            value: "{NEW_VALUE}";
          },
        ];
        image: {
          url: "{OLD_VALUE}";
        };
      },
      {
        image: {
          url: "{NEW_VALUE}";
        };
      },
    ];
    webhookUpdateChannel: [
      {
        title: "Webhook Channel Change";
        description: "{EXECUTOR_MENTION} changed the channel of a webhook: {TARGET_NAME}";
        author: {
          name: "{EXECUTOR_NAME}";
          icon_url: "{EXECUTOR_AVATAR}";
        };
        thumbnail: {
          url: "{TARGET_IMAGE_URL}";
        };
        fields: [
          {
            name: "__Old Channel__";
            value: "{OLD_VALUE}";
          },
          {
            name: "__New Channel__";
            value: "{NEW_VALUE}";
          },
        ];
      },
    ];
    webhookDelete: [
      {
        title: "Webhook Deleted";
        description: "{EXECUTOR_MENTION} deleted a webhook: {TARGET_NAME}";
        author: {
          name: "{EXECUTOR_NAME}";
          icon_url: "{EXECUTOR_AVATAR}";
        };
      },
    ];
    webhookSelfDelete: [
      {
        title: "Webhook Self Deleted";
        description: "Webhook deleted itself: {TARGET_NAME}";
      },
    ];
    emojiCreate: [
      {
        title: "Emoji Created";
        description: "{EXECUTOR_MENTION} created an emoji: {TARGET_NAME}";
        thumbnail: {
          url: "{TARGET_IMAGE_URL}";
        };
      },
    ];
    emojiUpdateName: [
      {
        title: "Emoji Name Change";
        description: "{EXECUTOR_MENTION} changed the name of an emoji: {TARGET_NAME}";
        thumbnail: {
          url: "{TARGET_IMAGE_URL}";
        };
      },
    ];
    emojiDelete: [
      {
        title: "Emoji Deleted";
        description: "{EXECUTOR_MENTION} deleted an emoji: {TARGET_NAME}";
        thumbnail: {
          url: "{TARGET_IMAGE_URL}";
        };
      },
    ];
  };
  bot: {
    interaction: {
      commandHandler: {
        error: {
          title: "ERROR!";
          description: "Something went wrong, please try again later.\n\nError ID: {{ERROR_ID}}";
        };
      };
      commands: {
        invite: {
          addToServer: "Add to server";
          addToServerAgain: "Add to this server again";
          definition: {
            slash: {
              description: "Provides an invite link to add the bot.";
              name: "invite";
            };
          };
          description: "Your invite link is ready:\n{{INVITE_URL}}";
          joinSupportServer: "Join support server";
        };
        config: {
          definition: {
            slash: {
              name: "config";
              description: "Configurations applied to this channel";
              "sub-commands": {
                show: {
                  name: "show";
                  description: "Shows the configurations applied to this channel";
                };
                "toggle-log": {
                  name: "toggle-log";
                  description: "Starts or stops logging the specified event";
                  options: {
                    event: {
                      name: "event";
                      description: "A specific event or all";
                      choices: {
                        all: "All";
                      };
                    };
                  };
                };
                "toggle-ignore-channel": {
                  name: "toggle-ignore-channel";
                  description: "Ignores any event coming from the specified channel";
                  options: {
                    channel: {
                      name: "channel";
                      description: "Channel to toggle the ignore status";
                    };
                  };
                };
                "toggle-watch-channel": {
                  name: "toggle-watch-channel";
                  description: "Explicitly logs events that comes from the specified channel";
                  options: {
                    channel: {
                      name: "channel";
                      description: "Channel to toggle the watch status";
                    };
                  };
                };
                "toggle-ignore-user": {
                  name: "toggle-ignore-user";
                  description: "Ignores any event related from the specified user";
                  options: {
                    user: {
                      name: "user";
                      description: "User to toggle the ignore status";
                    };
                  };
                };
                "toggle-watch-user": {
                  name: "toggle-watch-user";
                  description: "Explicitly logs events that are related to the specified user";
                  options: {
                    user: {
                      name: "user";
                      description: "User to toggle the watch status";
                    };
                  };
                };
              };
            };
          };
          "sub-commands": {
            "toggle-ignore-channel": {
              done: "Done!";
              "is-not-being-ignored-anymore": "{{CHANNEL_MENTION}} is not being ignored anymore";
              "is-now-being-ignored": "{{CHANNEL_MENTION}} is now being ignored";
            };
            show: {
              "settings-for": "Settings for #{{CHANNEL_NAME}}";
              "all-events-are-being-logged": "All events are being logged";
              "no-events-are-being-logged": "There are no events being logged";
              "no-users-are-being-ignored": "There are no users being ignored";
              "no-users-are-being-watched": "There are no users being watched";
              "no-channels-are-being-ignored": "There are no channels being ignored";
              "no-channels-are-being-watched": "There are no channels being watched";
              "ignored-users": "Ignored users";
              "watched-users": "Watched users";
              "ignored-channels": "Ignored channels";
              "watched-channels": "Watched channels";
              "events-logged": "Events logged";
            };
            "toggle-ignore-user": {
              done: "Done!";
              "is-not-being-ignored-anymore": "{{USER_MENTION}} is not being ignored anymore";
              "is-now-being-ignored": "{{USER_MENTION}} is now being ignored";
            };
            "toggle-log": {
              done: "Done!";
              "is-not-being-logged-anymore": "{{EVENT_NAME}} is not being logged anymore";
              "nothing-is-being-logged": "Nothing is being logged anymore";
              "everything-is-now-being-logged": "Everything is now being logged";
              "is-now-being-logged": "{{EVENT_NAME}} is now being logged";
            };
            "toggle-watch-channel": {
              done: "Done!";
              "is-not-being-watched-anymore": "{{CHANNEL_MENTION}} is not being watched anymore";
              "is-now-being-watched": "{{CHANNEL_MENTION}} is now being watched";
            };
            "toggle-watch-user": {
              done: "Done!";
              "is-not-being-watched-anymore": "{{USER_MENTION}} is not being watched anymore";
              "is-now-being-watched": "{{USER_MENTION}} is now being watched";
            };
          };
        };
        globalConfig: {
          definition: {
            slash: {
              name: "global-config";
              description: "Global configurations applied to all channels";
              "sub-commands": {
                show: {
                  name: "show";
                  description: "Shows the configurations applied to all the channels";
                };
                "toggle-ignore-channel": {
                  name: "toggle-ignore-channel";
                  description: "Ignores any event coming from the specified channel";
                  options: {
                    channel: {
                      name: "channel";
                      description: "Channel to toggle the ignore status";
                    };
                  };
                };
                "toggle-ignore-user": {
                  name: "toggle-ignore-user";
                  description: "Ignores any event related from the specified user";
                  options: {
                    user: {
                      name: "user";
                      description: "User to toggle the ignore status";
                    };
                  };
                };
              };
            };
          };
          "sub-commands": {
            show: {
              "global-settings": "Global settings (applied to all channels)";
              "ignored-users": "Ignored users";
              "no-ignored-users": "There are no users being ignored globally";
              "ignored-channels": "Ignored channels";
              "no-ignored-channels": "There are no channels being ignored globally";
            };
            "toggle-ignore-user": {
              done: "Done!";
              "is-not-being-ignored-anymore": "{{USER_MENTION}} is not being ignored anymore";
              "is-now-being-ignored": "{{USER_MENTION}} is now being ignored";
            };
            "toggle-ignore-channel": {
              done: "Done!";
              "is-not-being-ignored-anymore": "{{CHANNEL_MENTION}} is not being ignored anymore";
              "is-now-being-ignored": "{{CHANNEL_MENTION}} is now being ignored";
            };
          };
        };
      };
    };
    paginator: {
      page: "Page {CURRENT_PAGE}/{TOTAL_PAGES}";
    };
  };
  main: {
    eventTemplatePlaceholdersDefaults: {
      EXECUTOR_MENTION: "Unknown executor`";
      UNKNOWN_VALUE: "`Unknown`";
    };
    eventNames: {
      guildUpdateName: "server name change";
      guildUpdateDescription: "server description change";
      guildUpdateIcon: "server icon change";
      guildUpdateSplash: "server splash change";
      guildUpdateDiscoverySplash: "server discovery splash change";
      guildUpdateBanner: "server banner change";
      guildUpdateOwner: "server owner change";
      guildUpdateRegion: "server region change";
      guildUpdatePreferredLocale: "server primary language change";
      guildUpdateAfkChannel: "server afk channel change";
      guildUpdateAfkTimeout: "server afk timeout change";
      guildUpdateRulesChannel: "server rules channel change";
      guildUpdatePublicUpdatesChannel: "server public updates channel change";
      guildUpdateSafetyAlertsChannel: "server safety alerts channel change";
      guildUpdateMfaLevel: "server mfa level change";
      guildUpdateVerificationLevel: "server verification level change";
      guildUpdateExplicitContentFilter: "server explicit content filter change";
      guildUpdateDefaultMessageNotifications: "server default message notifications change";
      guildUpdateVanityUrlCode: "server vanity url change";
      guildUpdatePremiumProgressBarEnabled: "server premium/nitro progress bar change";
      guildUpdateWidgetEnabled: "server widget enabled change";
      guildUpdateWidgetChannel: "server widget channel change";
      guildUpdateSystemChannelFlags: "server system channel flags change";
      guildUpdateSystemChannel: "server system channel change";
      channelCreate: "channel create";
      channelUpdateName: "channel name change";
      channelUpdateType: "channel type change";
      channelUpdateTopic: "channel topic change";
      channelUpdateNsfw: "channel nsfw change";
      channelUpdateBitrate: "channel bitrate change";
      channelUpdateUserLimit: "channel user limit change";
      channelUpdateRateLimitPerUser: "channel rate limit per user change";
      channelUpdatePosition: "channel position change";
      channelUpdatePermissionOverwrites: "channel permission overwrites change";
      channelUpdateDefaultAutoArchiveDurations: "channel default auto archive durations change";
      channelDelete: "channel delete";
      memberKick: "member kick";
      memberPrune: "member prune";
      memberBanAdd: "member ban";
      memberBanRemove: "member unban";
      memberUpdateNick: "member nick change";
      memberUpdateDeaf: "member deaf change";
      memberUpdateMute: "member mute change";
      memberUpdateAvatar: "member avatar change";
      memberUpdateTimeout: "member timeout change";
      memberRoleUpdate: "member role change";
      memberMove: "member voice channel move";
      memberDisconnect: "member disconnect";
      botAdd: "bot add";
      roleCreate: "role create";
      roleUpdateName: "role name change";
      roleUpdateColor: "role color change";
      roleUpdateHoist: "role hoist change";
      roleUpdateMentionable: "role mentionable change";
      roleUpdatePermissions: "role permissions change";
      roleDelete: "role delete";
      inviteCreate: "invite create";
      inviteUpdateCode: "invite code change";
      inviteUpdateChannel: "invite channel change";
      inviteUpdateInviter: "invite inviter change";
      inviteUpdateMaxUses: "invite max uses change";
      inviteUpdateMaxAge: "invite max age change";
      inviteUpdateTemporary: "invite temporary change";
      inviteUpdateUses: "invite uses change";
      inviteDelete: "invite delete";
      webhookCreate: "webhook create";
      webhookUpdateName: "webhook name change";
      webhookUpdateAvatar: "webhook avatar change";
      webhookUpdateChannel: "webhook channel change";
      webhookDelete: "webhook delete";
      webhookSelfDelete: "webhook self delete";
      emojiCreate: "emoji create";
      emojiUpdateName: "emoji name change";
      emojiDelete: "emoji delete";
    };
    eventDataTransformers: {
      common: {
        true: "Enabled";
        false: "Disabled";
        none: "None";
      };
      guildUpdatePreferredLocale: {
        id: "Indonesia";
        "en-US": "English (United States)";
        "en-GB": "English (United Kingdom)";
        bg: "Bulgarian";
        "zh-CN": "Chinese (China)";
        "zh-TW": "Chinese (Taiwan)";
        hr: "Croatian";
        cs: "Czech";
        da: "Danish";
        nl: "Dutch";
        fi: "Finnish";
        fr: "French";
        de: "German";
        el: "Greek";
        hi: "Hindi";
        hu: "Hungarian";
        it: "Italian";
        ja: "Japanese";
        ko: "Korean";
        lt: "Lithuanian";
        no: "Norwegian";
        pl: "Polish";
        "pt-BR": "Portuguese (Brazil)";
        ro: "Romanian";
        ru: "Russian";
        "es-ES": "Spanish (Spain)";
        "es-419": "Spanish (Latin America)";
        "sv-SE": "Swedish";
        th: "Thai";
        tr: "Turkish";
        uk: "Ukrainian";
        vi: "Vietnamese";
      };
      guildUpdateMfaLevel: {
        "0": "None";
        "1": "Elevated";
      };
      guildUpdateVerificationLevel: {
        "0": "None: unrestricted";
        "1": "Low: must have verified email on account";
        "2": "Medium: must be registered on Discord for longer than 5 minutes";
        "3": "High: must be a member of the server for longer than 10 minutes";
        "4": "Very High: must have a verified phone number";
      };
      guildUpdateExplicitContentFilter: {
        "0": "Default";
        "1": "Explicit";
        "2": "Safe";
        "3": "Age restricted";
      };
      guildUpdatePremiumProgressBarEnabled: {
        true: "Show";
        false: "Hide";
      };
      guildUpdateDefaultMessageNotifications: {
        "0": "All messages";
        "1": "Only @mentions";
      };
      guildUpdateSystemChannelFlags: {
        flags: {
          SuppressJoinNotifications: "Random welcome message on member join";
          SuppressPremiumSubscriptions: "Server boost notifications";
          SuppressGuildReminderNotifications: "Server setup tips";
          SuppressJoinNotificationReplies: "Prompt users to send stickers to new members";
          SuppressRoleSubscriptionPurchaseNotifications: "Role subscription purchase and renewal notifications";
          SuppressRoleSubscriptionPurchaseNotificationReplies: "Role subscription sticker reply buttons";
        };
        labels: {
          Show: "Show";
          Suppress: "Hide";
        };
      };
      channelUpdateType: {
        "0": "Text";
        "1": "DM";
        "2": "Voice";
        "3": "Group DM";
        "4": "Category";
        "5": "Announcement";
        "10": "Announcement Thread";
        "11": "Public Thread";
        "12": "Private Thread";
        "13": "Stage Voice";
        "14": "Directory";
        "15": "Forum";
        "16": "Media";
      };
      memberUpdateDeaf: {
        true: "Deafened";
        false: "Undeafened";
      };
      memberUpdateMute: {
        true: "Muted";
        false: "Unmuted";
      };
      memberRoleUpdate: {
        nothingRemoved: "No roles were removed";
        nothingAdded: "No roles were added";
      };
      roleUpdateMentionable: {
        true: "Mentionable";
        false: "Not mentionable";
      };
    };
  };
}

export default Resources;
