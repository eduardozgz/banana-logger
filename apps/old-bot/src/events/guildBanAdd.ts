import { userMention } from "@discordjs/builders";
import { LogService } from "../services/LogService";
import { Event } from "../structures";

export const guildBanAddEvent = new Event({
	name: "guildBanAdd",
	handler: async (ban) => {
		// TODO get from audit logs who did this
		// Loggiging guildMemberBan
		{
			const [data, log] = LogService.setup({
				eventName: "guildBanAdd",
				relatedUsers: [ban.user.id],
				relatedChannels: [],
				guild: ban.guild
			});

			data.set("MEMBER_BANNED_MENTION", userMention(ban.user.id));
			data.set("MOD_MENTION", userMention(null));
			data.set("REASON", ban.reason ?? "Unspecified");

			log(data);
		}
	}
});
