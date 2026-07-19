import { ActivityType } from "discord.js";

import { Job } from "~/structures/Job";

/**
 * Keeps the bot's presence set to a simple "watching" activity. Refreshed on a
 * schedule (and on ready) because Discord drops the presence on gateway resumes
 * and reconnects.
 */
export const setBotStatus = new Job({
  name: "Set bot status",
  time: "0 */5 * * * *",
  runOnClientReady: true,
  execute: (client) => {
    client.user.setPresence({
      status: "online",
      activities: [{ name: "the server logs", type: ActivityType.Watching }],
    });

    return Promise.resolve();
  },
});
