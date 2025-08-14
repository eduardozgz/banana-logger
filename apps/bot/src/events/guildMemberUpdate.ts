import { userMention } from "@discordjs/builders";
import { AuditLogEvent } from "discord.js";
import _ from "lodash";

import { initI18n } from "@/i18n";

import { AuditLogCollector } from "~/services/AuditLogCollector";
import { LogService } from "~/services/LogService";
import { EventHandler } from "~/structures";

export const guildMemberUpdateEvent = new EventHandler({
  name: "guildMemberUpdate",
  handler: async (client, oldMember, member) => {
    const i18n = await initI18n(member.guild.preferredLocale);

    // Loggiging guildMemberRulesAccepted
    // if (oldMember.pending && !member.pending) {
    //   await LogService.log({
    //     eventName: "guildMemberRulesAccepted",
    //     relatedUsers: [member.id],
    //     relatedChannels: [],
    //     guild: member.guild,
    //     data: {
    //       MEMBER_MENTION: userMention(member.id),
    //     },
    //   });
    // }

    // Loggiging guildMemberNicknameChange
    if (oldMember.nickname !== member.nickname) {
      const auditLogEntry = await AuditLogCollector.get({
        guild: member.guild,
        type: AuditLogEvent.MemberUpdate,
        targetId: member.id,
      });

      await LogService.log({
        eventName: "guildMemberNicknameChange",
        relatedUsers: [member.id, auditLogEntry?.executorId],
        guild: member.guild,
        i18n,
        data: {
          MEMBER_AVATAR: member.displayAvatarURL(),
          MEMBER_MENTION: userMention(member.id),
          MEMBER_ID: member.id,
          OLD_NICKNAME: oldMember.nickname ?? member.user.username,
          NEW_NICKNAME: member.nickname ?? member.user.username,
          EXECUTOR_MENTION: auditLogEntry?.executorId
            ? userMention(auditLogEntry.executorId)
            : i18n.t("log.unknown.executor"),
          EXECUTOR_ID: auditLogEntry?.executorId ?? "",
          EXECUTOR_AVATAR: auditLogEntry?.executor?.displayAvatarURL() ?? "",
        },
      });
    }

    // // TODO test this
    // // Loggiging guildMemberAvatarChange
    // if (oldMember.displayAvatarURL() !== member.displayAvatarURL()) {
    //   await LogService.log({
    //     eventName: "guildMemberAvatarChange",
    //     relatedUsers: [member.id],
    //     relatedChannels: [],
    //     guild: member.guild,
    //     data: {
    //       MEMBER_MENTION: userMention(member.id),
    //       OLD_AVATAR:
    //         oldMember.displayAvatarURL() ?? member.user.displayAvatarURL(),
    //       NEW_AVATAR:
    //         member.displayAvatarURL() ?? member.user.displayAvatarURL(),
    //     },
    //   });
    // }

    // // TODO get from audit logs who did this
    // const newRoles = Array.from(member.roles.cache.keys());
    // const oldRoles = Array.from(oldMember.roles.cache.keys());
    // if (!_.isEqual(newRoles, oldRoles)) {
    //   const addedRoles = _.difference(newRoles, oldRoles);
    //   const removedRoles = _.difference(oldRoles, newRoles);
    //   if (addedRoles.length > 1 || removedRoles.length > 1) {
    //     // Loggiging guildMemberRolesBulkUpdate
    //     await LogService.log({
    //       eventName: "guildMemberRoleBulkUpdate",
    //       relatedUsers: [member.id],
    //       relatedChannels: [],
    //       guild: member.guild,
    //       data: {
    //         MEMBER_MENTION: userMention(member.id),
    //         ADDED_ROLES_MENTION: addedRoles
    //           .map((id) => roleMention(id))
    //           .join(", "),
    //         REMOVED_ROLES_MENTION: removedRoles
    //           .map((id) => roleMention(id))
    //           .join(", "),
    //       },
    //     });
    //   } else if (addedRoles.length > removedRoles.length) {
    //     // Loggiging guildMemberRoleAdd
    //     await LogService.log({
    //       eventName: "guildMemberRoleAdd",
    //       relatedUsers: [member.id],
    //       relatedChannels: [],
    //       guild: member.guild,
    //       data: {
    //         MEMBER_MENTION: userMention(member.id),
    //         ROLE_MENTION: roleMention(addedRoles[0]),
    //       },
    //     });
    //   } else {
    //     // Loggiging guildMemberRoleRemove
    //     await LogService.log({
    //       eventName: "guildMemberRoleRemove",
    //       relatedUsers: [member.id],
    //       relatedChannels: [],
    //       guild: member.guild,
    //       data: {
    //         MEMBER_MENTION: userMention(member.id),
    //         ROLE_MENTION: roleMention(removedRoles[0]),
    //       },
    //     });
    //   }
    // }
  },
});
