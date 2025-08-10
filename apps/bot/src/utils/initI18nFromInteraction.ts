import type { BaseInteraction, Locale } from "discord.js";

import { initI18n } from "@/i18n";

export function initI18nFromInteraction(interaction: Locale | BaseInteraction) {
  let requestedLanguage: Locale;

  if (typeof interaction === "string") {
    requestedLanguage = interaction;
  } else {
    requestedLanguage = interaction.locale;
  }

  return initI18n(requestedLanguage);
}
