import type { AnySelectMenuInteraction } from "discord.js";
import type { i18n } from "i18next";

import { initI18nFromInteraction } from "~/utils/initI18nFromInteraction";

type SelectMenuHandler = (
  selectMenuInteraction: AnySelectMenuInteraction,
  i18n: i18n,
) => Promise<unknown>;

const buttons: SelectMenuHandler[] = [];

export default async function handleSelectMenu(
  selectMenuInteraction: AnySelectMenuInteraction,
): Promise<void> {
  const i18n = await initI18nFromInteraction(selectMenuInteraction);
  const { logger } = selectMenuInteraction.client.botInstanceOptions;

  buttons.forEach((handle) => {
    handle(selectMenuInteraction, i18n).catch(logger.error);
  });
}
