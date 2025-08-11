import type { AutocompleteInteraction } from "discord.js";

import type { Autocomplete } from "~/structures/Autocomplete";
import { initI18nFromInteraction } from "~/utils/initI18nFromInteraction";
import { eventTypes } from "./eventTypes";

const autocompletes: Autocomplete[] = [eventTypes];

export default async function handleAutocomplete(
  autocomplateInteraction: AutocompleteInteraction,
): Promise<void> {
  const autocompleteFocused = autocomplateInteraction.options.getFocused(true);

  const command = autocompletes.find((a) => {
    return a.name === autocompleteFocused.name;
  });

  if (!command) {
    throw new Error(`Autocomplete "${autocompleteFocused.name}" wasn't found`);
  }

  const i18n = await initI18nFromInteraction(autocomplateInteraction);

  await command.handle(autocomplateInteraction, i18n);
}
