import { Intents, Permissions } from "discord.js";
import type { Event } from "../structures";
import { guildMemberAddEvent } from "./guildMemberAdd";
import { guildMemberRemoveEvent } from "./guildMemberRemove";
import { interactionCreateEvent } from "./interactionCreate";
import { messageDeleteEvent } from "./messageDelete";
import { messageUpdateEvent } from "./messageUpdate";
import { readyEvent } from "./ready";

const allEvents: Event<any>[] = [
	interactionCreateEvent,
	readyEvent,
	guildMemberAddEvent,
	guildMemberRemoveEvent,
	messageDeleteEvent,
	messageUpdateEvent
];

const allEventsNeededPermissions: Permissions = new Permissions(
	allEvents.reduce((acc, e) => acc | e.neededPermissions.bitfield, 0n)
);

const allEventsNeededIntents: Intents = new Intents(
	allEvents.reduce((acc, e) => acc | e.neededIntents.bitfield, 0)
);

export { allEvents, allEventsNeededPermissions, allEventsNeededIntents };
