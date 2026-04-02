import type { Client } from "discord.js";

import { clientReadyEvent } from "./clientReady";
import { guildAuditLogEntryCreateEvent } from "./guildAuditLogEntryCreate";
import { interactionCreateEvent } from "./interactionCreate";
import { messageDeleteEvent } from "./messageDelete";

const allEvents = [
  clientReadyEvent,
  interactionCreateEvent,
  guildAuditLogEntryCreateEvent,
  messageDeleteEvent,
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
