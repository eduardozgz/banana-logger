import { AutocompleteInteraction } from "discord.js";
import { UserEventNames } from "../../Constants";
import searchInTexts from "../../utils/search";

export const eventTypes = (autocomplete: AutocompleteInteraction) => {
	const events = Object.entries(UserEventNames).map(([k, v]) => ({
		name: v,
		value: k
	}));
	if (autocomplete.options.getSubcommand(false) !== "template") {
		events.push({ name: "all", value: "all" });
	}

	const bestResults = searchInTexts(
		events.map((e) => e.name),
		autocomplete.options.getFocused(false) as string
	);

	const results = bestResults.map((i) => events[i]).slice(0, 25);

	autocomplete.respond(results);
};
