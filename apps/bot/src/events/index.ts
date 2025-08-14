import type { Client } from "discord.js";

import { guildMemberUpdateEvent } from "./guildMemberUpdate";
import { interactionCreateEvent } from "./interactionCreate";
import { readyEvent } from "./ready";

const allEvents = [
  readyEvent,
  interactionCreateEvent,
  guildMemberUpdateEvent,
] as const;

export function setupEvents(client: Client) {
  const { logger } = client.botInstanceOptions;
  allEvents.forEach((event) => {
    client.on(event.name, (...args) => {
      void (async () => {
        try {
          const definitelyNotNeverArgs: never[] = args as never;
          await event.handler(
            client as Client<true>,
            ...definitelyNotNeverArgs,
          );
        } catch (error) {
          logger.error(error);
        }
      })();
    });
  });
}
