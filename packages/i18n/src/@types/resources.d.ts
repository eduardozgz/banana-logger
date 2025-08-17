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
            name: "Old Name";
            value: "{OLD_VALUE}";
          },
          {
            name: "New Name";
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
            name: "Old Description";
            value: "{OLD_VALUE}";
          },
          {
            name: "New Description";
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
          url: "https://cdn.discordapp.com/icons/{GUILD_ID}/{OLD_VALUE}.png?size=1024";
        };
        fields: [
          {
            name: "Old Icon Hash";
            value: "`{OLD_VALUE}`";
          },
          {
            name: "New Icon Hash";
            value: "`{NEW_VALUE}`";
          },
        ];
      },
      {
        image: {
          url: "https://cdn.discordapp.com/icons/{GUILD_ID}/{NEW_VALUE}.png?size=1024";
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
          url: "https://cdn.discordapp.com/splashes/{GUILD_ID}/{OLD_VALUE}.png?size=1024";
        };
        fields: [
          {
            name: "Old Splash Hash";
            value: "`{OLD_VALUE}`";
          },
          {
            name: "New Splash Hash";
            value: "`{NEW_VALUE}`";
          },
        ];
      },
      {
        image: {
          url: "https://cdn.discordapp.com/splashes/{GUILD_ID}/{NEW_VALUE}.png?size=1024";
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
          url: "https://cdn.discordapp.com/discovery-splashes/{GUILD_ID}/{OLD_VALUE}.png?size=1024";
        };
        fields: [
          {
            name: "Old Discovery Splash Hash";
            value: "`{OLD_VALUE}`";
          },
          {
            name: "New Discovery Splash Hash";
            value: "`{NEW_VALUE}`";
          },
        ];
      },
      {
        image: {
          url: "https://cdn.discordapp.com/discovery-splashes/{GUILD_ID}/{NEW_VALUE}.png?size=1024";
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
          url: "https://cdn.discordapp.com/banners/{GUILD_ID}/{OLD_VALUE}.png?size=1024";
        };
        fields: [
          {
            name: "Old Banner Hash";
            value: "`{OLD_VALUE}`";
          },
          {
            name: "New Banner Hash";
            value: "`{NEW_VALUE}`";
          },
        ];
      },
      {
        image: {
          url: "https://cdn.discordapp.com/banners/{GUILD_ID}/{NEW_VALUE}.png?size=1024";
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
            name: "Old Owner";
            value: "{OLD_VALUE}";
          },
          {
            name: "New Owner";
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
            name: "Old Region";
            value: "`{OLD_VALUE}`";
          },
          {
            name: "New Region";
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
            name: "Old primary language";
            value: "{OLD_VALUE}";
          },
          {
            name: "New primary language";
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
            name: "Old AFK Channel";
            value: "{OLD_VALUE}";
          },
          {
            name: "New AFK Channel";
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
            name: "Old AFK Timeout";
            value: "{OLD_VALUE} seconds";
          },
          {
            name: "New AFK Timeout";
            value: "{NEW_VALUE} seconds";
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
            name: "Old Rules Channel";
            value: "{OLD_VALUE}";
          },
          {
            name: "New Rules Channel";
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
            name: "Old Public Updates Channel";
            value: "{OLD_VALUE}";
          },
          {
            name: "New Public Updates Channel";
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
            name: "Old Safety Alerts Channel";
            value: "{OLD_VALUE}";
          },
          {
            name: "New Safety Alerts Channel";
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
            name: "Old MFA Level";
            value: "{OLD_VALUE}";
          },
          {
            name: "New MFA Level";
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
            name: "Old Verification Level";
            value: "{OLD_VALUE}";
          },
          {
            name: "New Verification Level";
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
            name: "Old Filter";
            value: "{OLD_VALUE}";
          },
          {
            name: "New Filter";
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
            name: "Old Setting";
            value: "{OLD_VALUE}";
          },
          {
            name: "New Setting";
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
            name: "Old Vanity URL Code";
            value: "{OLD_VALUE}";
          },
          {
            name: "New Vanity URL Code";
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
            name: "Old Status";
            value: "{OLD_VALUE}";
          },
          {
            name: "New Status";
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
            name: "Old Status";
            value: "{OLD_VALUE}";
          },
          {
            name: "New Status";
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
            name: "Old Channel";
            value: "{OLD_VALUE}";
          },
          {
            name: "New Channel";
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
            name: "Old Flags";
            value: "{OLD_VALUE}";
          },
          {
            name: "New Flags";
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
            name: "Old Channel";
            value: "{OLD_VALUE}";
          },
          {
            name: "New Channel";
            value: "{NEW_VALUE}";
          },
        ];
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
              "everything-event-name": "Everything";
              "is-not-being-logged-anymore": "{{EVENT_NAME}} is not being logged anymore";
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
      EXECUTOR_MENTION: "Unknown executor";
      UNKNOWN_VALUE: "Unknown";
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
    };
    eventDataTransformers: {
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
      guildUpdateWidgetEnabled: {
        true: "Enabled";
        false: "Disabled";
      };
      guildUpdateSystemChannelFlags: {
        flags: {
          SuppressJoinNotifications: "Member join notifications";
          SuppressPremiumSubscriptions: "Server boost notifications";
          SuppressGuildReminderNotifications: "Server setup tips";
          SuppressJoinNotificationReplies: "Member join sticker reply buttons";
          SuppressRoleSubscriptionPurchaseNotifications: "Role subscription purchase and renewal notifications";
          SuppressRoleSubscriptionPurchaseNotificationReplies: "Role subscription sticker reply buttons";
        };
        labels: {
          Show: "Show";
          Suppress: "Suppress";
        };
      };
    };
  };
}

export default Resources;
