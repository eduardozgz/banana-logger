import type { SweeperOptions } from "discord.js";
import { Options } from "discord.js";

export const sweepers: SweeperOptions = {
  ...Options.DefaultSweeperSettings,
  // Bound the message cache by age too (on top of the per-channel size cap), so
  // a busy logger doesn't retain messages indefinitely. Edits/deletes within
  // this window still have their cached "before" content.
  messages: {
    interval: 3600, // sweep hourly
    lifetime: 10800, // drop messages cached longer than 3h
  },
};
