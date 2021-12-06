import { userMention } from "@discordjs/builders";
import { LogService } from "../services/LogService";
import { Event } from "../structures";

const eventName = "guildMemberAdd";
export const guildMemberAddEvent = new Event({
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
			data.set("{MEMBER_NAME}", userMention(member.id));
			data.set("{MEMBER_AVATAR}", member.displayAvatarURL());
			log(data);
		}
	}
});
