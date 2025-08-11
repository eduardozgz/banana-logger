import { Locale } from "discord.js";
import { createInstance } from "i18next";

import "./@types/i18next.d.ts";

import baseTemplatesUS from "./locales/en-US/baseTemplates.json";
import botUS from "./locales/en-US/bot.json";
import commonUS from "./locales/en-US/common.json";
import mainUS from "./locales/en-US/main.json";

export type LocaleString = `${Locale}`;
export const AVAILABLE_LANGUAGES: LocaleString[] = [Locale.EnglishUS] as const;

export const DEFAULT_LANGUAGE: LocaleString = Locale.EnglishUS;

export async function initI18n(locale: LocaleString) {
  const i18nextInstance = createInstance({
    lng: locale,
    supportedLngs: AVAILABLE_LANGUAGES,
    fallbackLng: [locale, DEFAULT_LANGUAGE],
    defaultNS: "main",
    resources: {
      [Locale.EnglishUS]: {
        main: mainUS,
        bot: botUS,
        baseTemplates: baseTemplatesUS,
        common: commonUS,
      },
    },
    interpolation: {
      escapeValue: false,
    },
  });

  await i18nextInstance.init();

  return i18nextInstance;
}

export type i18n = Awaited<ReturnType<typeof initI18n>>;

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
