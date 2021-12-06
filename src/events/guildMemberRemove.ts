import { userMention } from "@discordjs/builders";
import { LogService } from "../services/LogService";
import { Event } from "../structures";

export const guildMemberRemoveEvent = new Event({
	name: "guildMemberRemove",
	handler: async (member) => {
		// Loggiging guildMemberRemove
		{
			// TODO get what invite was used
			const [data, log] = await LogService.setup({
				eventName: "guildMemberRemove",
				relatedUsers: [member.id],
				relatedChannels: [],
				guild: member.guild
			});
			data.set("{AUTHOR_MENTION}", userMention(member.id));
			data.set("{MEMBER_AVATAR}", member.displayAvatarURL());
			log(data);
		}
	}
});
