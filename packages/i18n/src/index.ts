import { Locale } from "discord.js";
import { createInstance } from "i18next";

import "./@types/i18next.d.ts";

import baseTemplatesUS from "./locales/en-US/baseTemplates.json";
import botUS from "./locales/en-US/bot.json";
import mainUS from "./locales/en-US/main.json";

export type LocaleString = `${Locale}`;
export const AVAILABLE_LANGUAGES: LocaleString[] = [Locale.EnglishUS] as const;

export const DEFAULT_LANGUAGE: LocaleString = Locale.EnglishUS;

async function createI18n(locale: LocaleString) {
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
      },
    },
    interpolation: {
      escapeValue: false,
    },
  });

  await i18nextInstance.init();

  return i18nextInstance;
}

// The bot calls initI18n on every gateway event, so instances are memoized per
// locale: the resources and config are static, making the result identical for
// a given locale. Bounded by the set of Discord locales (~30 keys). Memoizing
// the promise (not the instance) also dedupes concurrent first calls.
const instances = new Map<LocaleString, ReturnType<typeof createI18n>>();

export function initI18n(locale: LocaleString) {
  let instance = instances.get(locale);
  if (!instance) {
    instance = createI18n(locale);
    instances.set(locale, instance);
  }
  return instance;
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
