interface Resources {
  baseTemplates: {
    autoModBlockMessage: [
      {
        description: "A message was blocked by auto-moderation rule **{AUTO_MOD_RULE_NAME}** in {CHANNEL_MENTION}";
        fields: [
          {
            name: "__Rule Type__";
            value: "{AUTO_MOD_RULE_TRIGGER_TYPE}";
          },
        ];
        title: "Auto-Moderation: Message Blocked";
      },
    ];
    autoModFlagToChannel: [
      {
        description: "A message was flagged by auto-moderation rule **{AUTO_MOD_RULE_NAME}** in {CHANNEL_MENTION}";
        fields: [
          {
            name: "__Rule Type__";
            value: "{AUTO_MOD_RULE_TRIGGER_TYPE}";
          },
        ];
        title: "Auto-Moderation: Flagged to Channel";
      },
    ];
    autoModQuarantine: [
      {
        description: "{TARGET_MENTION} was quarantined by auto-moderation rule **{AUTO_MOD_RULE_NAME}**";
        fields: [
          {
            name: "__Rule Type__";
            value: "{AUTO_MOD_RULE_TRIGGER_TYPE}";
          },
        ];
        title: "Auto-Moderation: Quarantine Applied";
      },
    ];
    autoModRuleCreate: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} created an auto-moderation rule: **{TARGET_NAME}**";
        title: "Auto-Moderation Rule Created";
      },
    ];
    autoModRuleDelete: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} deleted an auto-moderation rule: **{TARGET_NAME}**";
        title: "Auto-Moderation Rule Deleted";
      },
    ];
    autoModRuleUpdateActions: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} changed the actions of auto-moderation rule **{TARGET_NAME}**";
        fields: [
          {
            name: "__Old Actions__";
            value: "`{OLD_VALUE_RAW}`";
          },
          {
            name: "__New Actions__";
            value: "`{NEW_VALUE_RAW}`";
          },
        ];
        title: "Auto-Moderation Rule Actions Change";
      },
    ];
    autoModRuleUpdateEnabled: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} changed the enabled status of auto-moderation rule **{TARGET_NAME}**";
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
        title: "Auto-Moderation Rule Enabled Status Change";
      },
    ];
    autoModRuleUpdateEventType: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} changed the event type of auto-moderation rule **{TARGET_NAME}**";
        fields: [
          {
            name: "__Old Event Type__";
            value: "{OLD_VALUE}";
          },
          {
            name: "__New Event Type__";
            value: "{NEW_VALUE}";
          },
        ];
        title: "Auto-Moderation Rule Event Type Change";
      },
    ];
    autoModRuleUpdateExemptChannels: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} changed the exempt channels of auto-moderation rule **{TARGET_NAME}**";
        fields: [
          {
            name: "__Old Value__";
            value: "`{OLD_VALUE_RAW}`";
          },
          {
            name: "__New Value__";
            value: "`{NEW_VALUE_RAW}`";
          },
        ];
        title: "Auto-Moderation Rule Exempt Channels Change";
      },
    ];
    autoModRuleUpdateExemptRoles: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} changed the exempt roles of auto-moderation rule **{TARGET_NAME}**";
        fields: [
          {
            name: "__Old Value__";
            value: "`{OLD_VALUE_RAW}`";
          },
          {
            name: "__New Value__";
            value: "`{NEW_VALUE_RAW}`";
          },
        ];
        title: "Auto-Moderation Rule Exempt Roles Change";
      },
    ];
    autoModRuleUpdateName: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} changed the name of an auto-moderation rule";
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
        title: "Auto-Moderation Rule Name Change";
      },
    ];
    autoModRuleUpdateTriggerMetadata: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} changed the trigger metadata of auto-moderation rule **{TARGET_NAME}**";
        fields: [
          {
            name: "__Old Value__";
            value: "`{OLD_VALUE_RAW}`";
          },
          {
            name: "__New Value__";
            value: "`{NEW_VALUE_RAW}`";
          },
        ];
        title: "Auto-Moderation Rule Trigger Metadata Change";
      },
    ];
    autoModRuleUpdateTriggerType: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} changed the trigger type of auto-moderation rule **{TARGET_NAME}**";
        fields: [
          {
            name: "__Old Trigger Type__";
            value: "{OLD_VALUE}";
          },
          {
            name: "__New Trigger Type__";
            value: "{NEW_VALUE}";
          },
        ];
        title: "Auto-Moderation Rule Trigger Type Change";
      },
    ];
    autoModTimeout: [
      {
        description: "{TARGET_MENTION} was timed out by auto-moderation rule **{AUTO_MOD_RULE_NAME}** in {CHANNEL_MENTION}";
        fields: [
          {
            name: "__Rule Type__";
            value: "{AUTO_MOD_RULE_TRIGGER_TYPE}";
          },
        ];
        title: "Auto-Moderation: Timeout Applied";
      },
    ];
    botAdd: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} added {TARGET_MENTION} to the server";
        thumbnail: {
          url: "{TARGET_IMAGE_URL}";
        };
        title: "Bot Added";
      },
    ];
    channelCreate: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} created {TARGET_MENTION}";
        title: "Channel Created";
      },
    ];
    channelDelete: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: '{EXECUTOR_MENTION} deleted {TARGET_MENTION} (previously known as "{TARGET_NAME}")';
        title: "Channel Deleted";
      },
    ];
    channelOverwriteCreate: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} created a permission overwrite in {TARGET_MENTION}";
        fields: [
          {
            name: "__Type__";
            value: "{OVERWRITE_TYPE}";
          },
          {
            name: "__Name__";
            value: "{OVERWRITE_NAME}";
          },
          {
            name: "__ID__";
            value: "`{OVERWRITE_ID}`";
          },
        ];
        title: "Channel Overwrite Created";
      },
    ];
    channelOverwriteDelete: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} deleted a permission overwrite in {TARGET_MENTION}";
        fields: [
          {
            name: "__Type__";
            value: "{OVERWRITE_TYPE}";
          },
          {
            name: "__Name__";
            value: "{OVERWRITE_NAME}";
          },
          {
            name: "__ID__";
            value: "`{OVERWRITE_ID}`";
          },
        ];
        title: "Channel Overwrite Deleted";
      },
    ];
    channelOverwriteUpdate: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} updated a permission overwrite in {TARGET_MENTION}";
        fields: [
          {
            name: "__Type__";
            value: "{OVERWRITE_TYPE}";
          },
          {
            name: "__Name__";
            value: "{OVERWRITE_NAME}";
          },
          {
            name: "__ID__";
            value: "`{OVERWRITE_ID}`";
          },
          {
            name: "__Changes__";
            value: "{PERMISSIONS_CHANGED}";
          },
        ];
        title: "Channel Overwrite Updated";
      },
    ];
    channelUpdateAvailableTags: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} changed the available tags of {TARGET_MENTION}";
        fields: [
          {
            name: "__Old Tags__";
            value: "`{OLD_VALUE_RAW}`";
          },
          {
            name: "__New Tags__";
            value: "`{NEW_VALUE_RAW}`";
          },
        ];
        title: "Channel Available Tags Change";
      },
    ];
    channelUpdateBitrate: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} changed the bitrate of {TARGET_MENTION}";
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
        title: "Channel Bitrate Change";
      },
    ];
    channelUpdateDefaultAutoArchiveDurations: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} changed the default auto archive duration of {TARGET_MENTION}";
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
        title: "Channel Default Auto Archive Durations Change";
      },
    ];
    channelUpdateDefaultReactionEmoji: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} changed the default reaction emoji of {TARGET_MENTION}";
        fields: [
          {
            name: "__Old Emoji__";
            value: "{OLD_VALUE}";
          },
          {
            name: "__New Emoji__";
            value: "{NEW_VALUE}";
          },
        ];
        title: "Channel Default Reaction Emoji Change";
      },
    ];
    channelUpdateDefaultThreadRateLimitPerUser: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} changed the default thread slowmode of {TARGET_MENTION}";
        fields: [
          {
            name: "__Old Rate Limit__";
            value: "{OLD_VALUE}";
          },
          {
            name: "__New Rate Limit__";
            value: "{NEW_VALUE}";
          },
        ];
        title: "Channel Default Thread Rate Limit Change";
      },
    ];
    channelUpdateFlags: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} changed the flags of {TARGET_MENTION}";
        fields: [
          {
            name: "__Old Flags__";
            value: "`{OLD_VALUE_RAW}`";
          },
          {
            name: "__New Flags__";
            value: "`{NEW_VALUE_RAW}`";
          },
        ];
        title: "Channel Flags Change";
      },
    ];
    channelUpdateName: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} changed the name of {TARGET_MENTION}";
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
        title: "Channel Name Change";
      },
    ];
    channelUpdateNsfw: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} changed the NSFW status of {TARGET_MENTION}";
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
        title: "Channel NSFW Change";
      },
    ];
    channelUpdatePermissionOverwrites: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} changed the permission overwrites of {TARGET_MENTION}";
        title: "Channel Permission Overwrites Change";
      },
    ];
    channelUpdatePosition: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} changed the position of {TARGET_MENTION}";
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
        title: "Channel Position Change";
      },
    ];
    channelUpdateRateLimitPerUser: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} changed the rate limit per user of {TARGET_MENTION}";
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
        title: "Channel Rate Limit Per User Change";
      },
    ];
    channelUpdateRtcRegion: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} changed the voice region of {TARGET_MENTION}";
        fields: [
          {
            name: "__Old Region__";
            value: "{OLD_VALUE}";
          },
          {
            name: "__New Region__";
            value: "{NEW_VALUE}";
          },
        ];
        title: "Channel Voice Region Change";
      },
    ];
    channelUpdateTopic: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} changed the topic of {TARGET_MENTION}";
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
        title: "Channel Topic Change";
      },
    ];
    channelUpdateType: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} changed the channel type of {TARGET_MENTION}";
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
        title: "Channel Type Change";
      },
    ];
    channelUpdateUserLimit: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} changed the user limit of {TARGET_MENTION}";
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
        title: "Channel User Limit Change";
      },
    ];
    channelUpdateVideoQualityMode: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} changed the video quality mode of {TARGET_MENTION}";
        fields: [
          {
            name: "__Old Video Quality Mode__";
            value: "{OLD_VALUE}";
          },
          {
            name: "__New Video Quality Mode__";
            value: "{NEW_VALUE}";
          },
        ];
        title: "Channel Video Quality Mode Change";
      },
    ];
    creatorMonetizationRequestCreated: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} created a creator monetization request";
        title: "Creator Monetization Request Created";
      },
    ];
    creatorMonetizationTermsAccepted: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} accepted creator monetization terms";
        title: "Creator Monetization Terms Accepted";
      },
    ];
    emojiCreate: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} created an emoji: `{TARGET_NAME}`";
        thumbnail: {
          url: "{TARGET_IMAGE_URL}";
        };
        title: "Emoji Created";
      },
    ];
    emojiDelete: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} deleted an emoji: `{TARGET_NAME}`";
        title: "Emoji Deleted";
      },
    ];
    emojiUpdateName: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} changed the name of an emoji: `{TARGET_NAME}`";
        fields: [
          {
            inline: true;
            name: "__Old Name__";
            value: "`{OLD_VALUE}`";
          },
          {
            inline: true;
            name: "__New Name__";
            value: "`{NEW_VALUE}`";
          },
        ];
        thumbnail: {
          url: "{TARGET_IMAGE_URL}";
        };
        title: "Emoji Name Change";
      },
    ];
    guildUpdateAfkChannel: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} changed the AFK channel";
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
        title: "AFK Channel Change";
      },
    ];
    guildUpdateAfkTimeout: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} changed the AFK timeout";
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
        title: "AFK Timeout Change";
      },
    ];
    guildUpdateBanner: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} changed the server banner";
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
        image: {
          url: "{OLD_VALUE}";
        };
        title: "Server Banner Change";
      },
      {
        image: {
          url: "{NEW_VALUE}";
        };
      },
    ];
    guildUpdateDefaultMessageNotifications: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} changed the default message notifications";
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
        title: "Default Message Notifications Change";
      },
    ];
    guildUpdateDescription: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} changed the server description";
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
        title: "Server Description Change";
      },
    ];
    guildUpdateDiscoverySplash: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} changed the server discovery splash";
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
        image: {
          url: "{OLD_VALUE}";
        };
        title: "Server Discovery Splash Change";
      },
      {
        image: {
          url: "{NEW_VALUE}";
        };
      },
    ];
    guildUpdateExplicitContentFilter: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} changed the explicit content filter";
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
        title: "Server Explicit Content Filter Change";
      },
    ];
    guildUpdateIcon: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} changed the server icon";
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
        image: {
          url: "{OLD_VALUE}";
        };
        title: "Server Icon Change";
      },
      {
        image: {
          url: "{NEW_VALUE}";
        };
      },
    ];
    guildUpdateMfaLevel: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} changed the server MFA level";
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
        title: "Server MFA Level Change";
      },
    ];
    guildUpdateName: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} changed the server name";
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
        title: "Server Name Change";
      },
    ];
    guildUpdateOwner: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} changed the server owner";
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
        title: "Server Owner Change";
      },
    ];
    guildUpdatePreferredLocale: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} changed the server primary language";
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
        title: "Server Primary Language Change";
      },
    ];
    guildUpdatePremiumProgressBarEnabled: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} changed the premium/nitro progress bar visibility";
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
        title: "Premium Progress Bar Change";
      },
    ];
    guildUpdatePublicUpdatesChannel: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} changed the public updates channel";
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
        title: "Public Updates Channel Change";
      },
    ];
    guildUpdateRegion: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} changed the server region";
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
        title: "Server Region Change";
      },
    ];
    guildUpdateRulesChannel: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} changed the rules channel";
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
        title: "Rules Channel Change";
      },
    ];
    guildUpdateSafetyAlertsChannel: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} changed the safety alerts channel";
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
        title: "Safety Alerts Channel Change";
      },
    ];
    guildUpdateSplash: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} changed the server splash";
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
        image: {
          url: "{OLD_VALUE}";
        };
        title: "Server Splash Change";
      },
      {
        image: {
          url: "{NEW_VALUE}";
        };
      },
    ];
    guildUpdateSystemChannel: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} changed the server system channel";
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
        title: "Server System Channel Change";
      },
    ];
    guildUpdateSystemChannelFlags: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} changed the server system channel flags";
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
        title: "Server System Channel Flags Change";
      },
    ];
    guildUpdateVanityUrlCode: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} changed the server vanity URL";
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
        title: "Server Vanity URL Change";
      },
    ];
    guildUpdateVerificationLevel: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} changed the server verification level";
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
        title: "Server Verification Level Change";
      },
    ];
    guildUpdateWidgetChannel: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} changed the server widget channel";
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
        title: "Server Widget Channel Change";
      },
    ];
    guildUpdateWidgetEnabled: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} changed the server widget enabled state";
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
        title: "Server Widget Enabled State Change";
      },
    ];
    homeSettingsCreate: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} set up the server guide";
        title: "Server Guide Created";
      },
    ];
    homeSettingsUpdate: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} updated the server guide";
        fields: [
          {
            name: "__Old Value__";
            value: "`{OLD_VALUE_RAW}`";
          },
          {
            name: "__New Value__";
            value: "`{NEW_VALUE_RAW}`";
          },
        ];
        title: "Server Guide Updated";
      },
    ];
    inviteCreate: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} created an invite: {INVITE_URL}";
        fields: [
          {
            inline: true;
            name: "__Code__";
            value: "`{INVITE_CODE}`";
          },
          {
            inline: true;
            name: "__Channel__";
            value: "{INVITE_CHANNEL_MENTION}";
          },
          {
            inline: true;
            name: "__Expire after__";
            value: "{INVITE_MAX_AGE}";
          },
          {
            inline: true;
            name: "__Max Uses__";
            value: "{INVITE_MAX_USES}";
          },
          {
            inline: true;
            name: "__Temporary membership__";
            value: "{INVITE_TEMPORARY}";
          },
        ];
        title: "Invite Created";
      },
    ];
    inviteDelete: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} deleted {INVITE_URL}";
        title: "Invite Deleted";
      },
    ];
    inviteUpdateChannel: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
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
        title: "Invite Channel Change";
      },
    ];
    inviteUpdateCode: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
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
        title: "Invite Code Change";
      },
    ];
    inviteUpdateInviter: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
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
        title: "Invite Inviter Change";
      },
    ];
    inviteUpdateMaxAge: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
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
        title: "Invite Max Age Change";
      },
    ];
    inviteUpdateMaxUses: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
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
        title: "Invite Max Uses Change";
      },
    ];
    inviteUpdateTemporary: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
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
        title: "Invite Temporary Change";
      },
    ];
    inviteUpdateUses: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
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
        title: "Invite Uses Change";
      },
    ];
    memberBanAdd: [
      {
        description: '{EXECUTOR_MENTION} banned {TARGET_MENTION} (previously known as "{TARGET_NAME}")\n\n**Reason:** {REASON}';
        thumbnail: {
          url: "{TARGET_IMAGE_URL}";
        };
        title: "Member Banned";
      },
    ];
    memberBanRemove: [
      {
        description: '{EXECUTOR_MENTION} unbanned {TARGET_MENTION} (previously known as "{TARGET_NAME}")\n\n**Reason:** {REASON}';
        thumbnail: {
          url: "{TARGET_IMAGE_URL}";
        };
        title: "Member Unbanned";
      },
    ];
    memberDisconnect: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} disconnected someone from a voice channel";
        title: "Member Disconnected";
      },
    ];
    memberKick: [
      {
        description: '{EXECUTOR_MENTION} kicked {TARGET_MENTION} (previously known as "{TARGET_NAME}")\n\n**Reason:** {REASON}';
        thumbnail: {
          url: "{TARGET_IMAGE_URL}";
        };
        title: "Member Kicked";
      },
    ];
    memberLeave: [
      {
        description: "{USER_MENTION} (**{USER_NAME}**) left the server";
        thumbnail: {
          url: "{USER_AVATAR}";
        };
        title: "Member Left";
      },
    ];
    memberMove: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} moved {COUNT} member(s) to {CHANNEL_MENTION}";
        title: "Member Voice Channel Move";
      },
    ];
    memberPrune: [
      {
        description: "{EXECUTOR_MENTION} pruned {MEMBERS_REMOVED} members that were inactive in the last {DELETE_MEMBER_DAYS} days\n**Reason:** {REASON}";
        title: "Member Pruned";
      },
    ];
    memberRoleUpdate: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} changed the roles of {TARGET_MENTION}";
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
        thumbnail: {
          url: "{TARGET_IMAGE_URL}";
        };
        title: "Member Role Change";
      },
    ];
    memberUpdateAvatar: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} changed the avatar of {TARGET_MENTION}";
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
        image: {
          url: "{OLD_VALUE}";
        };
        thumbnail: {
          url: "{TARGET_IMAGE_URL}";
        };
        title: "Member Avatar Change";
      },
      {
        image: {
          url: "{NEW_VALUE}";
        };
      },
    ];
    memberUpdateDeaf: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} changed the deaf status of {TARGET_MENTION}";
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
        thumbnail: {
          url: "{TARGET_IMAGE_URL}";
        };
        title: "Member Deaf Change";
      },
    ];
    memberUpdateMute: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} changed the mute status of {TARGET_MENTION}";
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
        thumbnail: {
          url: "{TARGET_IMAGE_URL}";
        };
        title: "Member Mute Change";
      },
    ];
    memberUpdateNick: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} changed the nickname of {TARGET_MENTION}  ";
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
        thumbnail: {
          url: "{TARGET_IMAGE_URL}";
        };
        title: "Member Nickname Change";
      },
    ];
    memberUpdateTimeout: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} changed the timeout of {TARGET_MENTION}\n\n**Reason:** {REASON}";
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
        thumbnail: {
          url: "{TARGET_IMAGE_URL}";
        };
        title: "Member Timeout Change";
      },
    ];
    messageBulkDelete: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} bulk deleted {COUNT} messages in {TARGET_MENTION}";
        title: "Message Bulk Deleted";
      },
    ];
    messageDelete: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "A message by {AUTHOR_MENTION} was deleted in {CHANNEL_MENTION} by {EXECUTOR_MENTION}";
        fields: [
          {
            name: "__Message Content__";
            value: "{OLD_CONTENT}";
          },
          {
            inline: true;
            name: "__Channel__";
            value: "{CHANNEL_MENTION}";
          },
          {
            inline: true;
            name: "__Message Link__";
            value: "[Jump to Message]({MESSAGE_URL})";
          },
        ];
        thumbnail: {
          url: "{AUTHOR_AVATAR}";
        };
        title: "Message Deleted";
      },
    ];
    messagePin: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} pinned {MESSAGE_URL}";
        title: "Message Pinned";
      },
    ];
    messageReactionAdd: [
      {
        description: "{REACTOR_MENTION} reacted with {REACTION_EMOJI} to a message by {AUTHOR_MENTION} in {CHANNEL_MENTION}";
        fields: [
          {
            name: "__Message Link__";
            value: "[Jump to Message]({MESSAGE_URL})";
          },
        ];
        thumbnail: {
          url: "{REACTION_IMAGE_URL}";
        };
        title: "Reaction Added";
      },
    ];
    messageReactionRemove: [
      {
        description: "{REACTOR_MENTION} removed their {REACTION_EMOJI} reaction from a message by {AUTHOR_MENTION} in {CHANNEL_MENTION}";
        fields: [
          {
            name: "__Message Link__";
            value: "[Jump to Message]({MESSAGE_URL})";
          },
        ];
        thumbnail: {
          url: "{REACTION_IMAGE_URL}";
        };
        title: "Reaction Removed";
      },
    ];
    messageUnpin: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} unpinned {MESSAGE_URL}";
        title: "Message Unpinned";
      },
    ];
    messageUpdate: [
      {
        description: "A message by {AUTHOR_MENTION} was edited in {CHANNEL_MENTION}";
        fields: [
          {
            name: "__Old Content__";
            value: "{OLD_CONTENT}";
          },
          {
            name: "__New Content__";
            value: "{NEW_CONTENT}";
          },
          {
            name: "__Message Link__";
            value: "[Jump to Message]({MESSAGE_URL})";
          },
        ];
        thumbnail: {
          url: "{AUTHOR_AVATAR}";
        };
        title: "Message Updated";
      },
    ];
    onboardingCreate: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} set up server onboarding";
        title: "Onboarding Created";
      },
    ];
    onboardingPromptCreate: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} created an onboarding prompt: **{TARGET_NAME}**";
        title: "Onboarding Prompt Created";
      },
    ];
    onboardingPromptDelete: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} deleted an onboarding prompt: **{TARGET_NAME}**";
        title: "Onboarding Prompt Deleted";
      },
    ];
    onboardingPromptUpdate: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} updated an onboarding prompt: **{TARGET_NAME}**";
        fields: [
          {
            name: "__Old Value__";
            value: "`{OLD_VALUE_RAW}`";
          },
          {
            name: "__New Value__";
            value: "`{NEW_VALUE_RAW}`";
          },
        ];
        title: "Onboarding Prompt Updated";
      },
    ];
    onboardingUpdate: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} updated server onboarding";
        fields: [
          {
            name: "__Old Value__";
            value: "`{OLD_VALUE_RAW}`";
          },
          {
            name: "__New Value__";
            value: "`{NEW_VALUE_RAW}`";
          },
        ];
        title: "Onboarding Updated";
      },
    ];
    roleCreate: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} created {TARGET_MENTION}";
        title: "Role Created";
      },
    ];
    roleDelete: [
      {
        description: '{EXECUTOR_MENTION} deleted {TARGET_MENTION} (previously known as "{TARGET_NAME}")';
        title: "Role Deleted";
      },
    ];
    roleUpdateColor: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} changed the color of {TARGET_MENTION}";
        fields: [
          {
            inline: true;
            name: "__Old Color__";
            value: "`{OLD_VALUE}`";
          },
          {
            inline: true;
            name: "__New Color__";
            value: "`{NEW_VALUE}`";
          },
        ];
        image: {
          url: "{IMG_PUBLIC_URL}/color/{OLD_VALUE_RAW}";
        };
        title: "Role Color Change";
      },
      {
        image: {
          url: "{IMG_PUBLIC_URL}/color/{NEW_VALUE_RAW}";
        };
      },
    ];
    roleUpdateHoist: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} changed the hoist (display above members) status of {TARGET_MENTION}";
        fields: [
          {
            inline: true;
            name: "__Old Hoist Status__";
            value: "{OLD_VALUE}";
          },
          {
            inline: true;
            name: "__New Hoist Status__";
            value: "{NEW_VALUE}";
          },
        ];
        title: "Role Hoist Change";
      },
    ];
    roleUpdateIcon: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} changed the icon of {TARGET_MENTION}";
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
        image: {
          url: "{OLD_VALUE}";
        };
        title: "Role Icon Change";
      },
      {
        image: {
          url: "{NEW_VALUE}";
        };
      },
    ];
    roleUpdateMentionable: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} changed the mentionable status of {TARGET_MENTION}";
        fields: [
          {
            inline: true;
            name: "__Old Mentionable Status__";
            value: "{OLD_VALUE}";
          },
          {
            inline: true;
            name: "__New Mentionable Status__";
            value: "{NEW_VALUE}";
          },
        ];
        title: "Role Mentionable Change";
      },
    ];
    roleUpdateName: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} changed the name of {TARGET_MENTION}";
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
        title: "Role Name Change";
      },
    ];
    roleUpdatePermissions: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} changed the permissions of {TARGET_MENTION}";
        fields: [
          {
            inline: true;
            name: "__Old Permissions__";
            value: "`{OLD_VALUE_RAW}`";
          },
          {
            inline: true;
            name: "__New Permissions__";
            value: "`{NEW_VALUE_RAW}`";
          },
        ];
        title: "Role Permissions Change";
      },
    ];
    scheduledEventCreate: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} created a scheduled event: **{TARGET_NAME}**";
        fields: [
          {
            name: "__Description__";
            value: "{DESCRIPTION}";
          },
          {
            name: "__Location__";
            value: "{LOCATION}";
          },
          {
            name: "__Start Time__";
            value: "{START_TIME}";
          },
          {
            name: "__End Time__";
            value: "{END_TIME}";
          },
        ];
        title: "Scheduled Event Created";
      },
    ];
    scheduledEventDelete: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} deleted a scheduled event: **{TARGET_NAME}**";
        title: "Scheduled Event Deleted";
      },
    ];
    scheduledEventUpdateChannelId: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} changed the channel of **{TARGET_NAME}**";
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
        title: "Scheduled Event Channel Change";
      },
    ];
    scheduledEventUpdateDescription: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} changed the description of **{TARGET_NAME}**";
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
        title: "Scheduled Event Description Change";
      },
    ];
    scheduledEventUpdateEntityType: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} changed the entity type of **{TARGET_NAME}**";
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
        title: "Scheduled Event Entity Type Change";
      },
    ];
    scheduledEventUpdateImageHash: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} changed the image of **{TARGET_NAME}**";
        fields: [
          {
            name: "__Old Image Hash__";
            value: "`{OLD_VALUE_RAW}`";
          },
          {
            name: "__New Image Hash__";
            value: "`{NEW_VALUE_RAW}`";
          },
        ];
        image: {
          url: "{OLD_VALUE}";
        };
        title: "Scheduled Event Image Change";
      },
      {
        image: {
          url: "{NEW_VALUE}";
        };
      },
    ];
    scheduledEventUpdateLocation: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} changed the location of **{TARGET_NAME}**";
        fields: [
          {
            name: "__Old Location__";
            value: "{OLD_VALUE}";
          },
          {
            name: "__New Location__";
            value: "{NEW_VALUE}";
          },
        ];
        title: "Scheduled Event Location Change";
      },
    ];
    scheduledEventUpdateName: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} changed the name of a scheduled event";
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
        title: "Scheduled Event Name Change";
      },
    ];
    scheduledEventUpdatePrivacyLevel: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} changed the privacy level of **{TARGET_NAME}**";
        fields: [
          {
            name: "__Old Privacy Level__";
            value: "{OLD_VALUE}";
          },
          {
            name: "__New Privacy Level__";
            value: "{NEW_VALUE}";
          },
        ];
        title: "Scheduled Event Privacy Level Change";
      },
    ];
    scheduledEventUpdateRecurrenceRule: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} changed the recurrence rule of **{TARGET_NAME}**";
        fields: [
          {
            name: "__Old Rule__";
            value: "`{OLD_VALUE_RAW}`";
          },
          {
            name: "__New Rule__";
            value: "`{NEW_VALUE_RAW}`";
          },
        ];
        title: "Scheduled Event Recurrence Rule Change";
      },
    ];
    scheduledEventUpdateStatus: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} changed the status of **{TARGET_NAME}**";
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
        title: "Scheduled Event Status Change";
      },
    ];
    soundboardSoundCreate: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} created a soundboard sound: **{TARGET_NAME}**";
        title: "Soundboard Sound Created";
      },
    ];
    soundboardSoundDelete: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} deleted a soundboard sound: **{TARGET_NAME}**";
        title: "Soundboard Sound Deleted";
      },
    ];
    soundboardSoundUpdateEmojiId: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} changed the emoji of soundboard sound **{TARGET_NAME}**";
        fields: [
          {
            name: "__Old Emoji ID__";
            value: "`{OLD_VALUE_RAW}`";
          },
          {
            name: "__New Emoji ID__";
            value: "`{NEW_VALUE_RAW}`";
          },
        ];
        title: "Soundboard Sound Emoji Change";
      },
    ];
    soundboardSoundUpdateEmojiName: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} changed the emoji name of soundboard sound **{TARGET_NAME}**";
        fields: [
          {
            name: "__Old Emoji__";
            value: "{OLD_VALUE}";
          },
          {
            name: "__New Emoji__";
            value: "{NEW_VALUE}";
          },
        ];
        title: "Soundboard Sound Emoji Name Change";
      },
    ];
    soundboardSoundUpdateName: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} changed the name of a soundboard sound";
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
        title: "Soundboard Sound Name Change";
      },
    ];
    soundboardSoundUpdateVolume: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} changed the volume of soundboard sound **{TARGET_NAME}**";
        fields: [
          {
            name: "__Old Volume__";
            value: "{OLD_VALUE}";
          },
          {
            name: "__New Volume__";
            value: "{NEW_VALUE}";
          },
        ];
        title: "Soundboard Sound Volume Change";
      },
    ];
    stageInstanceCreate: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} created a stage instance in {TARGET_MENTION}";
        fields: [
          {
            name: "__Topic__";
            value: "{TOPIC}";
          },
        ];
        title: "Stage Instance Created";
      },
    ];
    stageInstanceDelete: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} deleted a stage instance in {TARGET_MENTION}";
        title: "Stage Instance Deleted";
      },
    ];
    stageInstanceUpdatePrivacyLevel: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} changed the privacy level of a stage instance in {TARGET_MENTION}";
        fields: [
          {
            name: "__Old Privacy Level__";
            value: "{OLD_VALUE}";
          },
          {
            name: "__New Privacy Level__";
            value: "{NEW_VALUE}";
          },
        ];
        title: "Stage Instance Privacy Level Change";
      },
    ];
    stageInstanceUpdateTopic: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} changed the topic of a stage instance in {TARGET_MENTION}";
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
        title: "Stage Instance Topic Change";
      },
    ];
    stickerCreate: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} created a sticker: `{TARGET_NAME}`";
        fields: [
          {
            name: "__Description__";
            value: "{DESCRIPTION}";
          },
          {
            name: "__Tags__";
            value: "{TAGS}";
          },
        ];
        thumbnail: {
          url: "{TARGET_IMAGE_URL}";
        };
        title: "Sticker Created";
      },
    ];
    stickerDelete: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} deleted a sticker: `{TARGET_NAME}`";
        title: "Sticker Deleted";
      },
    ];
    stickerUpdateDescription: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} changed the description of a sticker: `{TARGET_NAME}`";
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
        thumbnail: {
          url: "{TARGET_IMAGE_URL}";
        };
        title: "Sticker Description Change";
      },
    ];
    stickerUpdateName: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} changed the name of a sticker";
        fields: [
          {
            name: "__Old Name__";
            value: "`{OLD_VALUE}`";
          },
          {
            name: "__New Name__";
            value: "`{NEW_VALUE}`";
          },
        ];
        thumbnail: {
          url: "{TARGET_IMAGE_URL}";
        };
        title: "Sticker Name Change";
      },
    ];
    stickerUpdateTags: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} changed the tags of a sticker: `{TARGET_NAME}`";
        fields: [
          {
            name: "__Old Tags__";
            value: "{OLD_VALUE}";
          },
          {
            name: "__New Tags__";
            value: "{NEW_VALUE}";
          },
        ];
        thumbnail: {
          url: "{TARGET_IMAGE_URL}";
        };
        title: "Sticker Tags Change";
      },
    ];
    threadCreate: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} created thread {TARGET_MENTION}";
        title: "Thread Created";
      },
    ];
    threadDelete: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} deleted thread **{TARGET_NAME}**";
        title: "Thread Deleted";
      },
    ];
    threadUpdateArchived: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} changed the archived status of {TARGET_MENTION}";
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
        title: "Thread Archived Status Change";
      },
    ];
    threadUpdateAutoArchiveDuration: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} changed the auto archive duration of {TARGET_MENTION}";
        fields: [
          {
            name: "__Old Duration__";
            value: "{OLD_VALUE}";
          },
          {
            name: "__New Duration__";
            value: "{NEW_VALUE}";
          },
        ];
        title: "Thread Auto Archive Duration Change";
      },
    ];
    threadUpdateFlags: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} changed the flags of {TARGET_MENTION}";
        fields: [
          {
            name: "__Old Flags__";
            value: "`{OLD_VALUE_RAW}`";
          },
          {
            name: "__New Flags__";
            value: "`{NEW_VALUE_RAW}`";
          },
        ];
        title: "Thread Flags Change";
      },
    ];
    threadUpdateLocked: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} changed the locked status of {TARGET_MENTION}";
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
        title: "Thread Locked Status Change";
      },
    ];
    threadUpdateName: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} changed the name of {TARGET_MENTION}";
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
        title: "Thread Name Change";
      },
    ];
    threadUpdateRateLimitPerUser: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} changed the slowmode of {TARGET_MENTION}";
        fields: [
          {
            name: "__Old Rate Limit__";
            value: "{OLD_VALUE}";
          },
          {
            name: "__New Rate Limit__";
            value: "{NEW_VALUE}";
          },
        ];
        title: "Thread Rate Limit Per User Change";
      },
    ];
    voiceJoin: [
      {
        description: "{USER_MENTION} joined {CHANNEL_MENTION}";
        thumbnail: {
          url: "{USER_AVATAR}";
        };
        title: "Voice Channel Join";
      },
    ];
    voiceLeave: [
      {
        description: "{USER_MENTION} left {CHANNEL_MENTION}";
        thumbnail: {
          url: "{USER_AVATAR}";
        };
        title: "Voice Channel Leave";
      },
    ];
    voiceMove: [
      {
        description: "{USER_MENTION} moved from {OLD_CHANNEL_MENTION} to {NEW_CHANNEL_MENTION}";
        thumbnail: {
          url: "{USER_AVATAR}";
        };
        title: "Voice Channel Move";
      },
    ];
    voiceSelfDeaf: [
      {
        description: "{USER_MENTION} {DEAF_STATUS} themselves in {CHANNEL_MENTION}";
        thumbnail: {
          url: "{USER_AVATAR}";
        };
        title: "Voice Self Deafen Change";
      },
    ];
    voiceSelfMute: [
      {
        description: "{USER_MENTION} {MUTE_STATUS} themselves in {CHANNEL_MENTION}";
        thumbnail: {
          url: "{USER_AVATAR}";
        };
        title: "Voice Self Mute Change";
      },
    ];
    voiceServerDeaf: [
      {
        description: "{USER_MENTION} was server {DEAF_STATUS} in {CHANNEL_MENTION}";
        thumbnail: {
          url: "{USER_AVATAR}";
        };
        title: "Voice Server Deafen Change";
      },
    ];
    voiceServerMute: [
      {
        description: "{USER_MENTION} was server {MUTE_STATUS} in {CHANNEL_MENTION}";
        thumbnail: {
          url: "{USER_AVATAR}";
        };
        title: "Voice Server Mute Change";
      },
    ];
    voiceStartStream: [
      {
        description: "{USER_MENTION} started streaming in {CHANNEL_MENTION}";
        thumbnail: {
          url: "{USER_AVATAR}";
        };
        title: "Voice Stream Start";
      },
    ];
    voiceStartVideo: [
      {
        description: "{USER_MENTION} turned on video in {CHANNEL_MENTION}";
        thumbnail: {
          url: "{USER_AVATAR}";
        };
        title: "Voice Video Start";
      },
    ];
    voiceStopStream: [
      {
        description: "{USER_MENTION} stopped streaming in {CHANNEL_MENTION}";
        thumbnail: {
          url: "{USER_AVATAR}";
        };
        title: "Voice Stream Stop";
      },
    ];
    voiceStopVideo: [
      {
        description: "{USER_MENTION} turned off video in {CHANNEL_MENTION}";
        thumbnail: {
          url: "{USER_AVATAR}";
        };
        title: "Voice Video Stop";
      },
    ];
    webhookCreate: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
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
        title: "Webhook Created";
      },
    ];
    webhookDelete: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} deleted a webhook: {TARGET_NAME}";
        title: "Webhook Deleted";
      },
    ];
    webhookSelfDelete: [
      {
        description: "Webhook deleted itself: {TARGET_NAME}";
        title: "Webhook Self Deleted";
      },
    ];
    webhookUpdateAvatar: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} changed the avatar of a webhook: {TARGET_NAME}";
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
        title: "Webhook Avatar Change";
      },
      {
        image: {
          url: "{NEW_VALUE}";
        };
      },
    ];
    webhookUpdateChannel: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} changed the channel of a webhook: {TARGET_NAME}";
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
        title: "Webhook Channel Change";
      },
    ];
    webhookUpdateName: [
      {
        author: {
          icon_url: "{EXECUTOR_AVATAR}";
          name: "{EXECUTOR_NAME}";
        };
        description: "{EXECUTOR_MENTION} changed the name of a webhook: {TARGET_NAME}";
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
        title: "Webhook Name Change";
      },
    ];
  };
  bot: {
    interaction: {
      commandHandler: {
        error: {
          description: "Something went wrong, please try again later.\n\nError ID: {{ERROR_ID}}";
          title: "ERROR!";
        };
      };
      commands: {
        config: {
          definition: {
            slash: {
              description: "Configurations applied to this channel";
              name: "config";
              "sub-commands": {
                show: {
                  description: "Shows the configurations applied to this channel";
                  name: "show";
                };
                "toggle-ignore-channel": {
                  description: "Ignores any event coming from the specified channel";
                  name: "toggle-ignore-channel";
                  options: {
                    channel: {
                      description: "Channel to toggle the ignore status";
                      name: "channel";
                    };
                  };
                };
                "toggle-ignore-user": {
                  description: "Ignores any event related from the specified user";
                  name: "toggle-ignore-user";
                  options: {
                    user: {
                      description: "User to toggle the ignore status";
                      name: "user";
                    };
                  };
                };
                "toggle-log": {
                  description: "Starts or stops logging the specified event";
                  name: "toggle-log";
                  options: {
                    event: {
                      choices: {
                        all: "All";
                      };
                      description: "A specific event or all";
                      name: "event";
                    };
                  };
                };
                "toggle-watch-channel": {
                  description: "Explicitly logs events that comes from the specified channel";
                  name: "toggle-watch-channel";
                  options: {
                    channel: {
                      description: "Channel to toggle the watch status";
                      name: "channel";
                    };
                  };
                };
                "toggle-watch-user": {
                  description: "Explicitly logs events that are related to the specified user";
                  name: "toggle-watch-user";
                  options: {
                    user: {
                      description: "User to toggle the watch status";
                      name: "user";
                    };
                  };
                };
              };
            };
          };
          "sub-commands": {
            show: {
              "all-events-are-being-logged": "All events are being logged";
              "events-logged": "Events logged";
              "ignored-channels": "Ignored channels";
              "ignored-users": "Ignored users";
              "no-channels-are-being-ignored": "There are no channels being ignored";
              "no-channels-are-being-watched": "There are no channels being watched";
              "no-events-are-being-logged": "There are no events being logged";
              "no-users-are-being-ignored": "There are no users being ignored";
              "no-users-are-being-watched": "There are no users being watched";
              "settings-for": "Settings for #{{CHANNEL_NAME}}";
              "watched-channels": "Watched channels";
              "watched-users": "Watched users";
            };
            "toggle-ignore-channel": {
              done: "Done!";
              "is-not-being-ignored-anymore": "{{CHANNEL_MENTION}} is not being ignored anymore";
              "is-now-being-ignored": "{{CHANNEL_MENTION}} is now being ignored";
            };
            "toggle-ignore-user": {
              done: "Done!";
              "is-not-being-ignored-anymore": "{{USER_MENTION}} is not being ignored anymore";
              "is-now-being-ignored": "{{USER_MENTION}} is now being ignored";
            };
            "toggle-log": {
              done: "Done!";
              "everything-is-now-being-logged": "Everything is now being logged";
              "is-not-being-logged-anymore": "{{EVENT_NAME}} is not being logged anymore";
              "is-now-being-logged": "{{EVENT_NAME}} is now being logged";
              "nothing-is-being-logged": "Nothing is being logged anymore";
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
              description: "Global configurations applied to all channels";
              name: "global-config";
              "sub-commands": {
                show: {
                  description: "Shows the configurations applied to all the channels";
                  name: "show";
                };
                "toggle-ignore-channel": {
                  description: "Ignores any event coming from the specified channel";
                  name: "toggle-ignore-channel";
                  options: {
                    channel: {
                      description: "Channel to toggle the ignore status";
                      name: "channel";
                    };
                  };
                };
                "toggle-ignore-user": {
                  description: "Ignores any event related from the specified user";
                  name: "toggle-ignore-user";
                  options: {
                    user: {
                      description: "User to toggle the ignore status";
                      name: "user";
                    };
                  };
                };
              };
            };
          };
          "sub-commands": {
            show: {
              "global-settings": "Global settings (applied to all channels)";
              "ignored-channels": "Ignored channels";
              "ignored-users": "Ignored users";
              "no-ignored-channels": "There are no channels being ignored globally";
              "no-ignored-users": "There are no users being ignored globally";
            };
            "toggle-ignore-channel": {
              done: "Done!";
              "is-not-being-ignored-anymore": "{{CHANNEL_MENTION}} is not being ignored anymore";
              "is-now-being-ignored": "{{CHANNEL_MENTION}} is now being ignored";
            };
            "toggle-ignore-user": {
              done: "Done!";
              "is-not-being-ignored-anymore": "{{USER_MENTION}} is not being ignored anymore";
              "is-now-being-ignored": "{{USER_MENTION}} is now being ignored";
            };
          };
        };
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
      };
    };
    paginator: {
      page: "Page {CURRENT_PAGE}/{TOTAL_PAGES}";
    };
  };
  main: {
    eventDataTransformers: {
      autoModRuleEventType: {
        "1": "Message Send";
        "2": "Member Update";
      };
      autoModRuleTriggerType: {
        "1": "Keyword";
        "3": "Spam";
        "4": "Keyword Preset";
        "5": "Mention Spam";
        "6": "Member Profile";
      };
      channelOverwriteType: {
        "0": "Role";
        "1": "Member";
      };
      channelUpdateType: {
        "0": "Text";
        "1": "DM";
        "10": "Announcement Thread";
        "11": "Public Thread";
        "12": "Private Thread";
        "13": "Stage Voice";
        "14": "Directory";
        "15": "Forum";
        "16": "Media";
        "2": "Voice";
        "3": "Group DM";
        "4": "Category";
        "5": "Announcement";
      };
      channelUpdateVideoQualityMode: {
        "1": "Auto";
        "2": "720p";
      };
      common: {
        false: "Disabled";
        none: "None";
        true: "Enabled";
      };
      guildUpdateDefaultMessageNotifications: {
        "0": "All messages";
        "1": "Only @mentions";
      };
      guildUpdateExplicitContentFilter: {
        "0": "Default";
        "1": "Explicit";
        "2": "Safe";
        "3": "Age restricted";
      };
      guildUpdateMfaLevel: {
        "0": "None";
        "1": "Elevated";
      };
      guildUpdatePreferredLocale: {
        bg: "Bulgarian";
        cs: "Czech";
        da: "Danish";
        de: "German";
        el: "Greek";
        "en-GB": "English (United Kingdom)";
        "en-US": "English (United States)";
        "es-419": "Spanish (Latin America)";
        "es-ES": "Spanish (Spain)";
        fi: "Finnish";
        fr: "French";
        hi: "Hindi";
        hr: "Croatian";
        hu: "Hungarian";
        id: "Indonesia";
        it: "Italian";
        ja: "Japanese";
        ko: "Korean";
        lt: "Lithuanian";
        nl: "Dutch";
        no: "Norwegian";
        pl: "Polish";
        "pt-BR": "Portuguese (Brazil)";
        ro: "Romanian";
        ru: "Russian";
        "sv-SE": "Swedish";
        th: "Thai";
        tr: "Turkish";
        uk: "Ukrainian";
        vi: "Vietnamese";
        "zh-CN": "Chinese (China)";
        "zh-TW": "Chinese (Taiwan)";
      };
      guildUpdatePremiumProgressBarEnabled: {
        false: "Hide";
        true: "Show";
      };
      guildUpdateSystemChannelFlags: {
        flags: {
          SuppressGuildReminderNotifications: "Server setup tips";
          SuppressJoinNotificationReplies: "Prompt users to send stickers to new members";
          SuppressJoinNotifications: "Random welcome message on member join";
          SuppressPremiumSubscriptions: "Server boost notifications";
          SuppressRoleSubscriptionPurchaseNotificationReplies: "Role subscription sticker reply buttons";
          SuppressRoleSubscriptionPurchaseNotifications: "Role subscription purchase and renewal notifications";
        };
        labels: {
          Show: "Show";
          Suppress: "Hide";
        };
      };
      guildUpdateVerificationLevel: {
        "0": "None: unrestricted";
        "1": "Low: must have verified email on account";
        "2": "Medium: must be registered on Discord for longer than 5 minutes";
        "3": "High: must be a member of the server for longer than 10 minutes";
        "4": "Highest: must have a verified phone number";
      };
      memberRoleUpdate: {
        nothingAdded: "No roles were added";
        nothingRemoved: "No roles were removed";
      };
      memberUpdateDeaf: {
        false: "Undeafened";
        true: "Deafened";
      };
      memberUpdateMute: {
        false: "Unmuted";
        true: "Muted";
      };
      roleUpdateMentionable: {
        false: "Not mentionable";
        true: "Mentionable";
      };
      scheduledEventUpdateEntityType: {
        "1": "Stage Instance";
        "2": "Voice";
        "3": "External";
      };
      scheduledEventUpdatePrivacyLevel: {
        "2": "Guild Only";
      };
      scheduledEventUpdateStatus: {
        "1": "Scheduled";
        "2": "Active";
        "3": "Completed";
        "4": "Canceled";
      };
      stageInstanceUpdatePrivacyLevel: {
        "1": "Public";
        "2": "Guild Only";
      };
      threadUpdateArchived: {
        false: "Unarchived";
        true: "Archived";
      };
      threadUpdateLocked: {
        false: "Unlocked";
        true: "Locked";
      };
      voiceDeafStatus: {
        false: "Undeafened";
        true: "Deafened";
      };
      voiceMuteStatus: {
        false: "Unmuted";
        true: "Muted";
      };
    };
    eventNames: {
      autoModBlockMessage: "auto-moderation message blocked";
      autoModFlagToChannel: "auto-moderation flag to channel";
      autoModQuarantine: "auto-moderation quarantine applied";
      autoModRuleCreate: "auto-moderation rule create";
      autoModRuleDelete: "auto-moderation rule delete";
      autoModRuleUpdateActions: "auto-moderation rule actions change";
      autoModRuleUpdateEnabled: "auto-moderation rule enabled status change";
      autoModRuleUpdateEventType: "auto-moderation rule event type change";
      autoModRuleUpdateExemptChannels: "auto-moderation rule exempt channels change";
      autoModRuleUpdateExemptRoles: "auto-moderation rule exempt roles change";
      autoModRuleUpdateName: "auto-moderation rule name change";
      autoModRuleUpdateTriggerMetadata: "auto-moderation rule trigger metadata change";
      autoModRuleUpdateTriggerType: "auto-moderation rule trigger type change";
      autoModTimeout: "auto-moderation timeout applied";
      botAdd: "bot add";
      channelCreate: "channel create";
      channelDelete: "channel delete";
      channelOverwriteCreate: "channel overwrite create";
      channelOverwriteDelete: "channel overwrite delete";
      channelOverwriteUpdate: "channel overwrite update";
      channelUpdateAvailableTags: "channel available tags change";
      channelUpdateBitrate: "channel bitrate change";
      channelUpdateDefaultAutoArchiveDurations: "channel default auto archive durations change";
      channelUpdateDefaultReactionEmoji: "channel default reaction emoji change";
      channelUpdateDefaultThreadRateLimitPerUser: "channel default thread rate limit change";
      channelUpdateFlags: "channel flags change";
      channelUpdateName: "channel name change";
      channelUpdateNsfw: "channel nsfw change";
      channelUpdatePermissionOverwrites: "channel permission overwrites change";
      channelUpdatePosition: "channel position change";
      channelUpdateRateLimitPerUser: "channel rate limit per user change";
      channelUpdateRtcRegion: "channel voice region change";
      channelUpdateTopic: "channel topic change";
      channelUpdateType: "channel type change";
      channelUpdateUserLimit: "channel user limit change";
      channelUpdateVideoQualityMode: "channel video quality mode change";
      creatorMonetizationRequestCreated: "creator monetization request created";
      creatorMonetizationTermsAccepted: "creator monetization terms accepted";
      emojiCreate: "emoji create";
      emojiDelete: "emoji delete";
      emojiUpdateName: "emoji name change";
      guildUpdateAfkChannel: "server afk channel change";
      guildUpdateAfkTimeout: "server afk timeout change";
      guildUpdateBanner: "server banner change";
      guildUpdateDefaultMessageNotifications: "server default message notifications change";
      guildUpdateDescription: "server description change";
      guildUpdateDiscoverySplash: "server discovery splash change";
      guildUpdateExplicitContentFilter: "server explicit content filter change";
      guildUpdateIcon: "server icon change";
      guildUpdateMfaLevel: "server mfa level change";
      guildUpdateName: "server name change";
      guildUpdateOwner: "server owner change";
      guildUpdatePreferredLocale: "server primary language change";
      guildUpdatePremiumProgressBarEnabled: "server premium/nitro progress bar change";
      guildUpdatePublicUpdatesChannel: "server public updates channel change";
      guildUpdateRegion: "server region change";
      guildUpdateRulesChannel: "server rules channel change";
      guildUpdateSafetyAlertsChannel: "server safety alerts channel change";
      guildUpdateSplash: "server splash change";
      guildUpdateSystemChannel: "server system channel change";
      guildUpdateSystemChannelFlags: "server system channel flags change";
      guildUpdateVanityUrlCode: "server vanity url change";
      guildUpdateVerificationLevel: "server verification level change";
      guildUpdateWidgetChannel: "server widget channel change";
      guildUpdateWidgetEnabled: "server widget enabled change";
      homeSettingsCreate: "server guide create";
      homeSettingsUpdate: "server guide update";
      inviteCreate: "invite create";
      inviteDelete: "invite delete";
      inviteUpdateChannel: "invite channel change";
      inviteUpdateCode: "invite code change";
      inviteUpdateInviter: "invite inviter change";
      inviteUpdateMaxAge: "invite max age change";
      inviteUpdateMaxUses: "invite max uses change";
      inviteUpdateTemporary: "invite temporary change";
      inviteUpdateUses: "invite uses change";
      memberBanAdd: "member ban";
      memberBanRemove: "member unban";
      memberDisconnect: "member disconnect";
      memberKick: "member kick";
      memberLeave: "member leave";
      memberMove: "member voice channel move";
      memberPrune: "member prune";
      memberRoleUpdate: "member role change";
      memberUpdateAvatar: "member avatar change";
      memberUpdateDeaf: "member deaf change";
      memberUpdateMute: "member mute change";
      memberUpdateNick: "member nick change";
      memberUpdateTimeout: "member timeout change";
      messageBulkDelete: "message bulk delete";
      messageDelete: "message delete";
      messagePin: "message pin";
      messageReactionAdd: "message reaction add";
      messageReactionRemove: "message reaction remove";
      messageUnpin: "message unpin";
      messageUpdate: "message update";
      onboardingCreate: "onboarding create";
      onboardingPromptCreate: "onboarding prompt create";
      onboardingPromptDelete: "onboarding prompt delete";
      onboardingPromptUpdate: "onboarding prompt update";
      onboardingUpdate: "onboarding update";
      roleCreate: "role create";
      roleDelete: "role delete";
      roleUpdateColor: "role color change";
      roleUpdateHoist: "role hoist change";
      roleUpdateIcon: "role icon change";
      roleUpdateMentionable: "role mentionable change";
      roleUpdateName: "role name change";
      roleUpdatePermissions: "role permissions change";
      scheduledEventCreate: "scheduled event create";
      scheduledEventDelete: "scheduled event delete";
      scheduledEventUpdateChannelId: "scheduled event channel change";
      scheduledEventUpdateDescription: "scheduled event description change";
      scheduledEventUpdateEntityType: "scheduled event entity type change";
      scheduledEventUpdateImageHash: "scheduled event image change";
      scheduledEventUpdateLocation: "scheduled event location change";
      scheduledEventUpdateName: "scheduled event name change";
      scheduledEventUpdatePrivacyLevel: "scheduled event privacy level change";
      scheduledEventUpdateRecurrenceRule: "scheduled event recurrence rule change";
      scheduledEventUpdateStatus: "scheduled event status change";
      soundboardSoundCreate: "soundboard sound create";
      soundboardSoundDelete: "soundboard sound delete";
      soundboardSoundUpdateEmojiId: "soundboard sound emoji change";
      soundboardSoundUpdateEmojiName: "soundboard sound emoji name change";
      soundboardSoundUpdateName: "soundboard sound name change";
      soundboardSoundUpdateVolume: "soundboard sound volume change";
      stageInstanceCreate: "stage instance create";
      stageInstanceDelete: "stage instance delete";
      stageInstanceUpdatePrivacyLevel: "stage instance privacy level change";
      stageInstanceUpdateTopic: "stage instance topic change";
      stickerCreate: "sticker create";
      stickerDelete: "sticker delete";
      stickerUpdateDescription: "sticker description change";
      stickerUpdateName: "sticker name change";
      stickerUpdateTags: "sticker tags change";
      threadCreate: "thread create";
      threadDelete: "thread delete";
      threadUpdateArchived: "thread archived status change";
      threadUpdateAutoArchiveDuration: "thread auto archive duration change";
      threadUpdateFlags: "thread flags change";
      threadUpdateLocked: "thread locked status change";
      threadUpdateName: "thread name change";
      threadUpdateRateLimitPerUser: "thread rate limit per user change";
      voiceJoin: "voice channel join";
      voiceLeave: "voice channel leave";
      voiceMove: "voice channel move";
      voiceSelfDeaf: "voice self deafen change";
      voiceSelfMute: "voice self mute change";
      voiceServerDeaf: "voice server deafen change";
      voiceServerMute: "voice server mute change";
      voiceStartStream: "voice stream start";
      voiceStartVideo: "voice video start";
      voiceStopStream: "voice stream stop";
      voiceStopVideo: "voice video stop";
      webhookCreate: "webhook create";
      webhookDelete: "webhook delete";
      webhookSelfDelete: "webhook self delete";
      webhookUpdateAvatar: "webhook avatar change";
      webhookUpdateChannel: "webhook channel change";
      webhookUpdateName: "webhook name change";
    };
    eventTemplatePlaceholdersDefaults: {
      EXECUTOR_MENTION: "Unknown executor`";
      UNKNOWN_VALUE: "`Unknown`";
    };
  };
}

export default Resources;
