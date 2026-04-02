import type { Client } from "discord.js";

import { clientReadyEvent } from "./clientReady";
import { guildAuditLogEntryCreateEvent } from "./guildAuditLogEntryCreate";
import { guildMemberRemoveEvent } from "./guildMemberRemove";
import { interactionCreateEvent } from "./interactionCreate";
import { messageDeleteEvent } from "./messageDelete";
import { messageReactionAddEvent } from "./messageReactionAdd";
import { messageReactionRemoveEvent } from "./messageReactionRemove";
import { messageUpdateEvent } from "./messageUpdate";
import { voiceStateUpdateEvent } from "./voiceStateUpdate";

const allEvents = [
  clientReadyEvent,
  interactionCreateEvent,
  guildAuditLogEntryCreateEvent,
  messageDeleteEvent,
  messageUpdateEvent,
  messageReactionAddEvent,
  messageReactionRemoveEvent,
  voiceStateUpdateEvent,
  guildMemberRemoveEvent,
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
