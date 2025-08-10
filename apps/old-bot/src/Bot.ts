import { Client, Intents } from "discord.js";
import { allEvents, allEventsNeededIntents } from "./events";
import { allCommandsNeededIntents } from "./interactions/commands";

export default class Bot {
	client: Client;
	constructor() {
		const intents =
			allEventsNeededIntents.bitfield | allCommandsNeededIntents.bitfield;
		this.client = new Client({
			intents,
			partials: ["CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION", "USER"]
		});
		this.setupEvents();
	}

	setupEvents() {
		allEvents.forEach((event) => {
			this.client.on(event.name, event.handler);
		});
	}
}
