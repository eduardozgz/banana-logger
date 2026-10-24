import type { Client } from "discord.js";
import { CronJob } from "cron";

import type { Job } from "~/structures/Job";
import { setBotStatus } from "./setBotStatus";

const jobs: Job[] = [setBotStatus];

export function setupJobs(client: Client) {
  const { logger } = client.botInstanceOptions;

  jobs.forEach((job) => {
    if (job.disabled) return;

    // Guard against overlapping runs of the same job (a slow run still going when
    // the next tick fires).
    let isLocked = false;

    const run = async () => {
      if (isLocked || !client.isReady()) return;
      isLocked = true;

      logger.debug(`Running job: ${job.name}`);
      await job
        .execute(client)
        .catch((error: unknown) => logger.error("A job failed", error, job));
      logger.debug(`Job finished: ${job.name}`);

      isLocked = false;
    };

    if (job.runOnClientReady) {
      client.on("clientReady", () => void run());
    }

    new CronJob(job.time, () => void run(), null, true);
  });
}
