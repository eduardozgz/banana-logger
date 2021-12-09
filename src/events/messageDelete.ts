import { channelMention, userMention } from "@discordjs/builders";
import { LogService } from "../services/LogService";
import { Event } from "../structures";

export const messageDeleteEvent = new Event({
	name: "messageDelete",
	neededPermissions: ["VIEW_CHANNEL", "READ_MESSAGE_HISTORY"],
	handler: async (message) => {
		if (!message) return;
		// Loggiging messageDelete
		{
			const [data, log] = LogService.setup({
				eventName: "messageDelete",
				relatedUsers: [message.author.id],
				relatedChannels: [],
				guild: message.guild
			});

			data.set("OLD_CONTENT", message.content);
			data.set("MESSAGE_URL", message.url);
			data.set("CHANNEL_MENTION", channelMention(message.channel.id));
			data.set("AUTHOR_MENTION", userMention(message.author.id));
			data.set("AUTHOR_AVATAR", message.author.displayAvatarURL());

			log(data);
		}
	}
});
