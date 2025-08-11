import { roleMention, userMention } from "@discordjs/builders";
import _ from "lodash";

import { LogService } from "~/services/LogService";
import { EventHandler } from "~/structures";

export const guildMemberUpdateEvent = new EventHandler({
  name: "guildMemberUpdate",
  handler: async (oldMember, member) => {
    // Loggiging guildMemberRulesAccepted
    if (oldMember.pending && !member.pending) {
      await LogService.log({
        eventName: "guildMemberRulesAccepted",
        relatedUsers: [member.id],
        relatedChannels: [],
        guild: member.guild,
        data: {
          MEMBER_MENTION: userMention(member.id),
        },
      });
    }

    // TODO get from audit logs who did this
    // Loggiging guildMemberNicknameChange
    if (oldMember.nickname !== member.nickname) {
      await LogService.log({
        eventName: "guildMemberNicknameChange",
        relatedUsers: [member.id],
        relatedChannels: [],
        guild: member.guild,
        data: {
          MEMBER_MENTION: userMention(member.id),
          OLD_NICKNAME: oldMember.nickname ?? member.user.username,
          NEW_NICKNAME: member.nickname ?? member.user.username,
        },
      });
    }

    // TODO test this
    // Loggiging guildMemberAvatarChange
    if (oldMember.displayAvatarURL() !== member.displayAvatarURL()) {
      await LogService.log({
        eventName: "guildMemberAvatarChange",
        relatedUsers: [member.id],
        relatedChannels: [],
        guild: member.guild,
        data: {
          MEMBER_MENTION: userMention(member.id),
          OLD_AVATAR:
            oldMember.displayAvatarURL() ?? member.user.displayAvatarURL(),
          NEW_AVATAR:
            member.displayAvatarURL() ?? member.user.displayAvatarURL(),
        },
      });
    }

    // TODO get from audit logs who did this
    const newRoles = Array.from(member.roles.cache.keys());
    const oldRoles = Array.from(oldMember.roles.cache.keys());
    if (!_.isEqual(newRoles, oldRoles)) {
      const addedRoles = _.difference(newRoles, oldRoles);
      const removedRoles = _.difference(oldRoles, newRoles);
      if (addedRoles.length > 1 || removedRoles.length > 1) {
        // Loggiging guildMemberRolesBulkUpdate
        await LogService.log({
          eventName: "guildMemberRoleBulkUpdate",
          relatedUsers: [member.id],
          relatedChannels: [],
          guild: member.guild,
          data: {
            MEMBER_MENTION: userMention(member.id),
            ADDED_ROLES_MENTION: addedRoles
              .map((id) => roleMention(id))
              .join(", "),
            REMOVED_ROLES_MENTION: removedRoles
              .map((id) => roleMention(id))
              .join(", "),
          },
        });
      } else if (addedRoles.length > removedRoles.length) {
        // Loggiging guildMemberRoleAdd
        await LogService.log({
          eventName: "guildMemberRoleAdd",
          relatedUsers: [member.id],
          relatedChannels: [],
          guild: member.guild,
          data: {
            MEMBER_MENTION: userMention(member.id),
            ROLE_MENTION: roleMention(addedRoles[0]),
          },
        });
      } else {
        // Loggiging guildMemberRoleRemove
        await LogService.log({
          eventName: "guildMemberRoleRemove",
          relatedUsers: [member.id],
          relatedChannels: [],
          guild: member.guild,
          data: {
            MEMBER_MENTION: userMention(member.id),
            ROLE_MENTION: roleMention(removedRoles[0]),
          },
        });
      }
    }
  },
});
