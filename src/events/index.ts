import { Intents, Permissions } from "discord.js";
import type { Event } from "../structures";
import { interactionCreateEvent } from "./interactionCreate";
import { readyEvent } from "./ready";

const allEvents: Event<any>[] = [interactionCreateEvent, readyEvent];

const allEventsNeededPermissions: Permissions = new Permissions(
	allEvents.reduce((acc, e) => acc | e.neededPermissions.bitfield, 0n)
);

const allEventsNeededIntents: Intents = new Intents(
	allEvents.reduce((acc, e) => acc | e.neededIntents.bitfield, 0)
);

export { allEvents, allEventsNeededPermissions, allEventsNeededIntents };
