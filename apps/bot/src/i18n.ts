import type { BaseInteraction, LocaleString } from "discord.js";
import { createInstance } from "i18next";

import mainUS from "./locales/en-US/main.json";

export const AVAILABLE_LANGUAGES: LocaleString[] = ["en-US"] as const;
export const DEFAULT_LANGUAGE: LocaleString = "en-US";

export async function initI18n(interaction: LocaleString | BaseInteraction) {
  let requestedLanguage: string;

  if (typeof interaction === "string") {
    requestedLanguage = interaction;
  } else {
    requestedLanguage = interaction.locale;
  }

  const i18nextInstance = createInstance({
    lng: requestedLanguage,
    supportedLngs: AVAILABLE_LANGUAGES,
    fallbackLng: [requestedLanguage, DEFAULT_LANGUAGE],
    defaultNS: "main",
    resources: {
      "en-US": {
        main: mainUS,
      },
    },
    interpolation: {
      escapeValue: false,
    },
  });

  await i18nextInstance.init();

  return i18nextInstance;
}

export const i18nDefault = await initI18n(DEFAULT_LANGUAGE);

export type TFunction = Awaited<ReturnType<typeof initI18n>>["t"];

type Unpacked<T> = T extends (infer U)[] ? U : T;
export type TKey<K = Parameters<TFunction>[0]> = K extends
  | string
  | string[]
  | TemplateStringsArray
  ? never
  : Exclude<Unpacked<K>, TemplateStringsArray>;

export const tKey = <K extends TKey>(key: K): K => key;
