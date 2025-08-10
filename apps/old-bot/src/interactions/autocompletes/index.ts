import { AutocompleteInteraction } from "discord.js";
import { eventTypes } from "./eventTypes";

export const allAutocompletes: ((
	autocomplete: AutocompleteInteraction
) => Promise<void> | void)[] = [eventTypes];

export default async function handleAutocomplete(
	autocompleteInteraction: AutocompleteInteraction
): Promise<void> {
	allAutocompletes.forEach((autocomplete) => {
		try {
			autocomplete(autocompleteInteraction);
		} catch (error) {
			console.error("Something went wrong while autocompleting:", error);
		}
	});
}
