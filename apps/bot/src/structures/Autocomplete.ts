import type { AutocompleteInteraction } from "discord.js";

import type { i18n } from "@/i18n";

export type AutocompleteHandle = (
  autocomplete: AutocompleteInteraction,
  i18n: i18n,
) => void | Promise<void>;

export class Autocomplete {
  name?: string;
  handle: AutocompleteHandle;

  constructor(options: Autocomplete) {
    this.name = options.name;
    this.handle = options.handle;
  }
}
