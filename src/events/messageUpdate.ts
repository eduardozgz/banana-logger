import { channelMention, userMention } from "@discordjs/builders";
import { LogService } from "../services/LogService";
import { Event } from "../structures";

export const messageUpdateEvent = new Event({
	name: "messageUpdate",
	neededPermissions: ["VIEW_CHANNEL", "READ_MESSAGE_HISTORY"],
	handler: async (oldMessage, newMessage) => {
		if (oldMessage.partial) await oldMessage.fetch();
		if (newMessage.partial) await newMessage.fetch();

		// TODO attachments
		// Loggiging messageUpdate
		{
			const [data, log] = LogService.setup({
				eventName: "messageUpdate",
				relatedUsers: [oldMessage.author.id],
				relatedChannels: [],
				guild: oldMessage.guild
			});

			data.set("OLD_CONTENT", oldMessage.content);
			data.set("NEW_CONTENT", newMessage.content);
			data.set("MESSAGE_URL", oldMessage.url);
			data.set("CHANNEL_MENTION", channelMention(oldMessage.channel.id));
			data.set("AUTHOR_MENTION", userMention(oldMessage.author.id));
			data.set("AUTHOR_AVATAR", oldMessage.author.displayAvatarURL());

			log(data);
		}
	}
});
