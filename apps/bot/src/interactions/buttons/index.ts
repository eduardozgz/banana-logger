import type { ButtonInteraction } from "discord.js";
import type { i18n } from "i18next";

import { initI18nFromInteraction } from "~/utils/initI18nFromInteraction";

type ButtonHandler = (
  buttonInteraction: ButtonInteraction,
  i18n: i18n,
) => Promise<unknown>;

const buttons: ButtonHandler[] = [];

export default async function handleButton(
  buttonInteraction: ButtonInteraction,
): Promise<void> {
  const i18n = await initI18nFromInteraction(buttonInteraction);
  const { logger } = buttonInteraction.client.botInstanceOptions;

  buttons.forEach((handle) => {
    handle(buttonInteraction, i18n).catch(logger.error);
  });
}
