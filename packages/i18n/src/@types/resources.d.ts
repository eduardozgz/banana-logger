interface Resources {
  baseTemplates: {
    guildMemberAdd: {
      title: "A member joined the server";
      description: "{MEMBER_MENTION} joined the server.";
      thumbnail: {
        url: "{MEMBER_AVATAR}";
      };
    };
    guildMemberRemove: {
      title: "A member left the server";
      description: "{MEMBER_MENTION} left the server.";
      thumbnail: {
        url: "{MEMBER_AVATAR}";
      };
    };
    messageDelete: {
      title: "A message has been deleted";
      description: "{AUTHOR_MENTION} deleted a [message]({MESSAGE_URL}) in {CHANNEL_MENTION}\n\n__**Content:**__\n{OLD_CONTENT}";
    };
    messageBulkDelete: {};
    messageUpdate: {
      title: "A message has been edited";
      description: "{AUTHOR_MENTION} edited this [message]({MESSAGE_URL}) in {CHANNEL_MENTION}\n\n__**Old content:**__\n{OLD_CONTENT}\n\n__**New content:**__\n{NEW_CONTENT}";
    };
    messageReactionAdd: {
      title: "A reaction has been added";
      description: '{REACTOR_MENTION} has reacted with "{REACTION_EMOJI}" to {AUTHOR_MENTION}\'s [message]({MESSAGE_URL}) in {CHANNEL_MENTION}';
      thumbnail: {
        url: "{REACTION_IMAGE_URL}";
      };
    };
    messageReactionRemove: {
      title: "A reaction has been removed";
      description: '{REACTOR_MENTION} removed their reaction "{REACTION_EMOJI}" from {AUTHOR_MENTION}\'s [message]({MESSAGE_URL}) in {CHANNEL_MENTION}';
      thumbnail: {
        url: "{REACTION_IMAGE_URL}";
      };
    };
    guildMemberNicknameChange: {
      title: "A member changed their nickname";
      description: "{MEMBER_MENTION} changed their nickname from {OLD_NICKNAME} to {NEW_NICKNAME}";
    };
    guildMemberAvatarChange: {
      title: "A member changed their nickname";
      description: "{MEMBER_MENTION} changed their server avatar";
      thumbnail: {
        url: "{OLD_AVATAR}";
      };
    };
    guildMemberRoleAdd: {
      title: "Member roles updated";
      description: "{MEMBER_MENTION} got a new role: {ROLE_MENTION}";
    };
    guildMemberRoleRemove: {
      title: "Member roles updated";
      description: "{MEMBER_MENTION} got a role removed: {ROLE_MENTION}";
    };
    guildMemberRoleBulkUpdate: {
      title: "Member roles updated";
      description: "{MEMBER_MENTION} got some roles updated:\n\nAdded roles:\n{ADDED_ROLES_MENTION}\n\nRemoved roles:\n{REMOVED_ROLES_MENTION}";
    };
    guildBanAdd: {
      title: "Member banned";
      description: "{MEMBER_BANNED_MENTION} has been banned. Banned by: {MOD_MENTION}. Ban reason: {REASON}";
    };
    guildBanRemove: {
      title: "Member unbanned";
      description: "{MEMBER_BANNED_MENTION} has been unbanned. Banned by: {MOD_MENTION}. Unbanned by: {UNBAN_MOD_MENTION}. Ban reason: {REASON}";
    };
    guildMemberKick: {};
    guildMemberRulesAccepted: {
      title: "A member accepted the rules";
      description: "{MEMBER_MENTION} accepted the rules";
    };
    roleCreate: {};
    roleUpdate: {};
    roleDelete: {};
    invitePosted: {};
    inviteCreate: {};
    inviteDelete: {};
    channelCreate: {};
    channelUpdate: {};
    channelDelete: {};
    channelPermissionUpdate: {};
    voiceChannelJoin: {};
    voiceChannelMove: {};
    voiceChannelLeave: {};
    voiceChannelMemberMute: {};
    voiceChannelMemberDeafened: {};
    emojiAdd: {};
    emojiUpdate: {};
    emojiDelete: {};
    stickerAdd: {};
    stickerUpdate: {};
    stickerDelete: {};
    botAdd: {};
    guildUpdate: {};
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
  common: {
    eventNames: {
      guildMemberAdd: "member join";
      guildMemberRemove: "member leave";
      messageBulkDelete: "bulk delete message";
      messageDelete: "delete message";
      messageUpdate: "edit message";
      messageReactionAdd: "reaction add";
      messageReactionRemove: "reaction remove";
      guildMemberNicknameChange: "member nickname change";
      guildMemberAvatarChange: "member avatar change";
      guildMemberRoleAdd: "member role add";
      guildMemberRoleRemove: "member role remove";
      guildMemberRoleBulkUpdate: "member role bulk update";
      guildBanAdd: "member ban";
      guildBanRemove: "member unban";
      guildMemberKick: "member kick";
      guildMemberRulesAccepted: "rules agreed";
      roleCreate: "role create";
      roleUpdate: "role update";
      roleDelete: "reole delete";
      invitePosted: "invite sent";
      inviteCreate: "invite create";
      inviteDelete: "invite delete";
      channelCreate: "channel create";
      channelUpdate: "channel update";
      channelDelete: "channel delete";
      channelPermissionUpdate: "channel permissions update";
      voiceChannelJoin: "voice channel join";
      voiceChannelMove: "voice channel move";
      voiceChannelLeave: "voice channel leave";
      voiceChannelMemberMute: "member mute";
      voiceChannelMemberDeafened: "member deafen";
      emojiAdd: "emoji create";
      emojiUpdate: "emoji update";
      emojiDelete: "emoji delete";
      stickerAdd: "sticker create";
      stickerUpdate: "sticker update";
      stickerDelete: "sticker delete";
      botAdd: "bot add";
      guildUpdate: "server update";
    };
  };
  main: {};
}

export default Resources;
