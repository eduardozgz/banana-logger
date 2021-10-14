import { Client } from "discord.js";
import { allEvents, allEventsNeededIntents } from "./events";

export default class Bot {
	client: Client;
	constructor() {
		this.client = new Client({ intents: allEventsNeededIntents });
		this.setupEvents();
	}

	setupEvents() {
		allEvents.forEach((event) => {
			this.client.on(event.name, event.handler);
		});
	}
}
