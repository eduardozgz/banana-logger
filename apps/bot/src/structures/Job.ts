import type { Client } from "discord.js";

/**
 * A periodic task run on a cron schedule (and optionally once the client becomes
 * ready). Registered and started by {@link setupJobs}.
 */
export class Job {
  /** Human-readable name, used in logs. */
  name: string;
  /** Cron expression controlling when the job runs (see the `cron` package). */
  time: string;
  /** Also run once, immediately, when the client emits `clientReady`. */
  runOnClientReady?: boolean;
  /** Skip registering this job entirely. */
  disabled?: boolean;
  execute: (client: Client<true>) => Promise<void>;

  constructor(options: Job) {
    this.name = options.name;
    this.time = options.time;
    this.runOnClientReady = options.runOnClientReady;
    this.disabled = options.disabled;
    this.execute = options.execute;
  }
}

export default Job;
