import type { ApplicationCommandOptionChoiceData } from "discord.js";

import { EventType } from "@/db/client";
import { i18nDefault } from "@/i18n";

import { Autocomplete } from "~/structures/Autocomplete";
import searchInTexts from "~/utils/search";
import { ALL_EVENTS_CHOICE } from "../commands/config/toggle-log";

export const eventTypes = new Autocomplete({
  name: i18nDefault.t(
    "bot:interaction.commands.config.definition.slash.sub-commands.toggle-log.options.event.name",
  ),
  handle: (autocomplete, i18n) => {
    const events: ApplicationCommandOptionChoiceData[] = Object.entries(
      EventType,
    ).map(([_key, value]) => ({
      name: i18n.t(`common:eventNames.${value}`),
      value: value,
    }));

    events.push({
      name: i18n.t(
        "bot:interaction.commands.config.definition.slash.sub-commands.toggle-log.options.event.choices.all",
      ),
      value: ALL_EVENTS_CHOICE,
    });

    const bestResults = searchInTexts(
      events.map((e) => e.name.split(" ")),
      autocomplete.options.getFocused(false),
    );

    const results = bestResults
      .map((i) => events[i])
      .filter((e) => e !== undefined)
      .slice(0, 25);

    return autocomplete.respond(results);
  },
});
