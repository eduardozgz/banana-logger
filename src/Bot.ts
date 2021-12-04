import { Client, Intents } from "discord.js";
import { allEvents, allEventsNeededIntents } from "./events";
import { allCommandsNeededIntents } from "./interactions/commands";

export default class Bot {
	client: Client;
	constructor() {
		const intents =
			allEventsNeededIntents.bitfield | allCommandsNeededIntents.bitfield;
		this.client = new Client({ intents });
		this.setupEvents();
	}

	setupEvents() {
		allEvents.forEach((event) => {
			this.client.on(event.name, event.handler);
		});
	}
}
