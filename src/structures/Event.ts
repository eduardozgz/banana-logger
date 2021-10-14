import {
	Permissions,
	Intents,
	IntentsString,
	WSEventType,
	ClientEvents,
	Constants,
	PermissionResolvable
} from "discord.js";
import { IntentsEventMap } from "../Constants";

interface EventOptions<E extends keyof ClientEvents> {
	name: E;
	handler: (...args: ClientEvents[E]) => void | Promise<void>;
	neededPermissions?: PermissionResolvable[];
}

export class Event<E extends keyof ClientEvents> {
	name: E;
	handler: (...args: ClientEvents[E]) => void | Promise<void>;
	neededPermissions: Permissions;

	constructor(options: EventOptions<E>) {
		this.name = options.name;
		this.handler = options.handler;

		const neededPermissions = new Permissions();
		(options.neededPermissions ?? []).forEach((permission) => {
			neededPermissions.add(permission);
		});
		this.neededPermissions = neededPermissions;
	}

	get neededIntent(): Intents {
		for (const [intent, events] of Object.entries(IntentsEventMap) as [
			IntentsString,
			WSEventType[]
		][]) {
			for (const event of events) {
				if (this.name.includes(Constants.Events[event])) {
					return new Intents(intent);
				}
			}
		}

		return new Intents();
	}
}

export default Event;
