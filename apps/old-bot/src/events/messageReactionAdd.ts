import { channelMention, formatEmoji, userMention } from "@discordjs/builders";
import { LogService } from "../services/LogService";
import { Event } from "../structures";
import { twemojiURL } from "../utils/twemojiURL";

export const messageReactionAddEvent = new Event({
	name: "messageReactionAdd",
	handler: async (reaction, user) => {
		if (reaction.message.inGuild()) {
			if (reaction.partial) await reaction.message.fetch();
			// Loggiging messageReactionAdd
			{
				const { message, emoji } = reaction;
				const [data, log] = LogService.setup({
					eventName: "messageReactionAdd",
					relatedUsers: [user.id, message.author.id],
					relatedChannels: [message.channelId],
					guild: message.guild
				});

				data.set("REACTOR_MENTION", userMention(user.id));
				//@ts-ignore
				data.set(
					"REACTION_EMOJI",
					emoji.id ? formatEmoji(emoji.id, emoji.animated) : emoji.name
				);
				data.set("AUTHOR_MENTION", userMention(message.author.id));
				data.set("MESSAGE_URL", message.url);
				data.set("CHANNEL_MENTION", channelMention(message.channelId));
				data.set("REACTION_IMAGE_URL", emoji.url ?? twemojiURL(emoji.name));

				log(data);
			}
		}
	}
});
