import { Event } from "../structures";
import getBotInviteLink from "../utils/getBotInviteLink";

export const readyEvent = new Event({
	name: "ready",
	handler: (client) => {
		console.log(`Bot ready, logged in as ${client.user.tag}`);
		console.log(`Invite link: ${getBotInviteLink()}`);
		client.guilds.cache.forEach((guild) =>
			guild.members.fetch().catch((err) => {
				console.error(`Error while fetching members of guild ${guild.id}`, err);
			})
		);
	}
});
