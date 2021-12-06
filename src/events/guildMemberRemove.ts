import { userMention } from "@discordjs/builders";
import { LogService } from "../services/LogService";
import { Event } from "../structures";

const eventName = "guildMemberRemove";
export const guildMemberRemoveEvent = new Event({
	name: eventName,
	handler: async (member) => {
		// Loggiging
		// TODO get what invite was used
		{
			const [data, log] = await LogService.setup({
				eventName,
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
