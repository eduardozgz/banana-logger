import handleAutocomplete from "../interactions/autocompletes";
import handleInteractionCommand from "../interactions/commands";
import { Event } from "../structures";

export const interactionCreateEvent = new Event({
	name: "interactionCreate",
	handler: (interaction) => {
		if (interaction.isCommand()) {
			handleInteractionCommand(interaction);
		} else if (interaction.isAutocomplete()) {
			handleAutocomplete(interaction);
		}
	}
});
