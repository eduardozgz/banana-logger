import type { Client } from "discord.js";

import { guildBanAddEvent } from "./guildBanAdd";
import { guildBanRemoveEvent } from "./guildBanRemove";
import { guildMemberAddEvent } from "./guildMemberAdd";
import { guildMemberRemoveEvent } from "./guildMemberRemove";
import { guildMemberUpdateEvent } from "./guildMemberUpdate";
import { interactionCreateEvent } from "./interactionCreate";
import { messageDeleteEvent } from "./messageDelete";
import { messageReactionAddEvent } from "./messageReactionAdd";
import { messageReactionRemoveEvent } from "./messageReactionRemove";
import { messageUpdateEvent } from "./messageUpdate";
import { readyEvent } from "./ready";

const allEvents = [
  readyEvent,
  interactionCreateEvent,
  messageDeleteEvent,
  messageUpdateEvent,
  messageReactionAddEvent,
  messageReactionRemoveEvent,
  guildMemberAddEvent,
  guildMemberRemoveEvent,
  guildMemberUpdateEvent,
  guildBanAddEvent,
  guildBanRemoveEvent,
] as const;

export function setupEvents(client: Client) {
  const { logger } = client.botInstanceOptions;
  allEvents.forEach((event) => {
    client.on(event.name, (...args) => {
      void (async () => {
        try {
          const definitelyNotNeverArgs: never[] = args as never;
          await event.handler(...definitelyNotNeverArgs);
        } catch (error) {
          logger.error(error);
        }
      })();
    });
  });
}
