import handleInteractionCommand from "../commands";
import { Event } from "../structures";

export const interactionCreateEvent = new Event({
	name: "interactionCreate",
	handler: (interaction) => {
		if (interaction.isCommand()) {
			handleInteractionCommand(interaction);
		}
	}
});
