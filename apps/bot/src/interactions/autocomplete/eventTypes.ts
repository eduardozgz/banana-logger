import type { ApplicationCommandOptionChoiceData } from "discord.js";

import { EventType } from "@bl/db/client";
import { i18nDefault } from "@bl/i18n";

import type { PresetName } from "~/Constants";
import { ALL_EVENTS_CHOICE, EVENT_PRESETS, PRESET_PREFIX } from "~/Constants";
import { Autocomplete } from "~/structures/Autocomplete";
import searchInTexts from "~/utils/search";

export const eventTypes = new Autocomplete({
  name: i18nDefault.t(
    "bot:interaction.commands.config.definition.slash.sub-commands.toggle-log.options.event.name",
  ),
  handle: (autocomplete, i18n) => {
    const choices: ApplicationCommandOptionChoiceData[] = [];

    choices.push({
      name: i18n.t(
        "bot:interaction.commands.config.definition.slash.sub-commands.toggle-log.options.event.choices.all",
      ),
      value: ALL_EVENTS_CHOICE,
    });

    for (const [key, events] of Object.entries(EVENT_PRESETS) as [
      PresetName,
      EventType[],
    ][]) {
      const presetName = i18n.t(
        `bot:interaction.commands.config.definition.slash.sub-commands.toggle-log.options.event.choices.presets.${key}`,
      );
      choices.push({
        name: `📦 ${presetName} (${events.length})`,
        value: `${PRESET_PREFIX}${key}`,
      });
    }

    for (const [_key, value] of Object.entries(EventType)) {
      choices.push({
        name: i18n.t(`main:eventNames.${value}`),
        value: value,
      });
    }

    const bestResults = searchInTexts(
      choices.map((e) => e.name.split(" ")),
      autocomplete.options.getFocused(false),
    );

    const results = bestResults
      .map((i) => choices[i])
      .filter((e) => e !== undefined)
      .slice(0, 25);

    return autocomplete.respond(results);
  },
});
