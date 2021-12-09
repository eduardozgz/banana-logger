import { userMention } from "@discordjs/builders";
import { LogService } from "../services/LogService";
import { Event } from "../structures";

export const guildMemberAddEvent = new Event({
	name: "guildMemberAdd",
	handler: async (member) => {
		// Loggiging guildMemberAdd
		{
			// TODO get what invite was used
			const [data, log] = LogService.setup({
				eventName: "guildMemberAdd",
				relatedUsers: [member.id],
				relatedChannels: [],
				guild: member.guild
			});

			data.set("AUTHOR_MENTION", userMention(member.id));
			data.set("MEMBER_AVATAR", member.displayAvatarURL());

			log(data);
		}
	}
});
