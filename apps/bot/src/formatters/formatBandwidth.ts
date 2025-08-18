import assert from "node:assert";

const bandwidthUnits = {
  en: ["bps", "Kbps", "Mbps", "Gbps", "Tbps"],
  ru: ["бит/с", "Кбит/с", "Мбит/с", "Гбит/с", "Тбит/с"],
  uk: ["біт/с", "кбіт/с", "Мбіт/с", "Гбіт/с", "Тбіт/с"],
  be: ["біт/с", "кбіт/с", "Мбіт/с", "Гбіт/с", "Тбіт/с"],
  bg: ["бит/с", "Кбит/с", "Мбит/с", "Гбит/с", "Тбит/с"],
  mk: ["бит/с", "кбит/с", "Мбит/с", "Гбит/с", "Тбит/с"],
  sr: ["бит/с", "Кбпс", "Мбпс", "Гбпс", "Тбпс"],
} as const;

export function formatBandwidth(
  locale = "en-US",
  bitsPerSecond: number,
): string {
  const lang = locale.split("-")[0];
  assert(lang);

  const units =
    lang in bandwidthUnits
      ? bandwidthUnits[lang as keyof typeof bandwidthUnits]
      : bandwidthUnits.en;

  let i = 0;
  let value = bitsPerSecond;
  while (value >= 1000 && i < units.length - 1) {
    value /= 1000;
    i++;
  }

  const formatter = new Intl.NumberFormat(locale, {
    maximumFractionDigits: 1,
  });

  return `${formatter.format(value)} ${units[i]}`;
}
