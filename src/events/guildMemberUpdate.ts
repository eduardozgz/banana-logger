import { roleMention, userMention } from "@discordjs/builders";
import _ from "lodash";
import { LogService } from "../services/LogService";
import { Event } from "../structures";

export const guildMemberUpdateEvent = new Event({
	name: "guildMemberUpdate",
	handler: async (oldMember, member) => {
		// Loggiging guildMemberRulesAccepted
		if (oldMember.pending && !member.pending) {
			const [data, log] = LogService.setup({
				eventName: "guildMemberRulesAccepted",
				relatedUsers: [member.id],
				relatedChannels: [],
				guild: member.guild
			});

			data.set("MEMBER_MENTION", userMention(member.id));

			log(data);
		}

		// TODO fix
		// Loggiging guildMemberNicknameChange
		console.log(oldMember, member);
		if (member.nickname && oldMember.nickname !== member.nickname) {
			const [data, log] = LogService.setup({
				eventName: "guildMemberNicknameChange",
				relatedUsers: [member.id],
				relatedChannels: [],
				guild: member.guild
			});

			data.set("MEMBER_MENTION", userMention(member.id));
			data.set("OLD_NICKNAME", oldMember.nickname ?? member.user.username);
			data.set("NEW_NICKNAME", member.nickname ?? member.user.username);

			log(data);
		}

		// TODO test this
		// Loggiging guildMemberAvatarChange
		if (oldMember.displayAvatarURL() !== member.displayAvatarURL()) {
			const [data, log] = LogService.setup({
				eventName: "guildMemberAvatarChange",
				relatedUsers: [member.id],
				relatedChannels: [],
				guild: member.guild
			});

			data.set("MEMBER_MENTION", userMention(member.id));
			data.set(
				"OLD_AVATAR",
				oldMember.displayAvatarURL() ?? member.user.displayAvatarURL()
			);
			data.set("NEW_AVATAR", member.displayAvatarURL());

			log(data);
		}

		// TODO fix bulk update, its being fired when something in the user that arent the roles changes
		// TODO use audit logs for related users
		const newRoles = Array.from(member.roles.cache.keys());
		const oldRoles = Array.from(oldMember.roles.cache.keys());
		if (!_.isEqual(newRoles, oldRoles)) {
			const addedRoles = _.difference(newRoles, oldRoles);
			const removedRoles = _.difference(oldRoles, newRoles);
			// Loggiging guildMemberRolesBulkUpdate
			if (addedRoles.length > 1 || removedRoles.length > 1) {
				const [data, log] = LogService.setup({
					eventName: "guildMemberRoleBulkUpdate",
					relatedUsers: [member.id],
					relatedChannels: [],
					guild: member.guild
				});

				data.set("MEMBER_MENTION", userMention(member.id));
				data.set(
					"ADDED_ROLES_MENTION",
					addedRoles.map((id) => roleMention(id)).join(", ")
				);
				data.set(
					"REMOVED_ROLES_MENTION",
					removedRoles.map((id) => roleMention(id)).join(", ")
				);

				log(data);
			} else if (addedRoles.length > removedRoles.length) {
				const [data, log] = LogService.setup({
					eventName: "guildMemberRoleAdd",
					relatedUsers: [member.id],
					relatedChannels: [],
					guild: member.guild
				});

				data.set("MEMBER_MENTION", userMention(member.id));
				data.set("ROLE_MENTION", roleMention(addedRoles[0]));

				log(data);
			} else {
				const [data, log] = LogService.setup({
					eventName: "guildMemberRoleRemove",
					relatedUsers: [member.id],
					relatedChannels: [],
					guild: member.guild
				});

				data.set("MEMBER_MENTION", userMention(member.id));
				data.set("ROLE_MENTION", roleMention(removedRoles[0]));

				log(data);
			}
		}
	}
});
