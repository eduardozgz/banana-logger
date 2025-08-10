import type { i18n } from "@/i18n";
import assert from "assert";
import type { CommandInteraction } from "discord.js"; 

import type { CommandHandle } from "~/structures";

export async function handleSubcommand(
  command: CommandInteraction,
  i18n: i18n,
  subcommands: Record<string, CommandHandle>,
) {
  assert(command.isChatInputCommand());

  const subcommand = command.options.getSubcommand(true);
  const handler = subcommands[subcommand];
  assert(handler);

  await handler(command, i18n);
}
