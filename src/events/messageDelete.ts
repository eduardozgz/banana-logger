import { channelMention, userMention } from "@discordjs/builders";
import { LogService } from "../services/LogService";
import { Event } from "../structures";

const eventName = "messageDelete";
export const messageDeleteEvent = new Event({
	name: eventName,
	neededPermissions: ["VIEW_CHANNEL", "READ_MESSAGE_HISTORY"],
	handler: async (message) => {
		// Loggiging
		// TODO fix: not loggiging when not cached
		{
			const [data, log] = await LogService.setup({
				eventName,
				relatedUsers: [message.author.id],
				relatedChannels: [],
				guild: message.guild
			});

			data.set("{OLD_CONTENT}", message.content);
			data.set("{MESSAGE_URL}", message.url);
			data.set("{CHANNEL_MENTION}", channelMention(message.channel.id));
			data.set("{AUTHOR_MENTION}", userMention(message.author.id));
			data.set("{AUTHOR_AVATAR}", message.author.displayAvatarURL());

			log(data);
		}
	}
});
