import type { AutocompleteInteraction } from "discord.js";

import type { initI18n } from "~/i18n";

export type AutocompleteHandle = (
  autocomplete: AutocompleteInteraction,
  i18n: Awaited<ReturnType<typeof initI18n>>,
) => void | Promise<void>;

export class Autocomplete {
  name?: string;
  handle: AutocompleteHandle;

  constructor(options: Autocomplete) {
    this.name = options.name;
    this.handle = options.handle;
  }
}
