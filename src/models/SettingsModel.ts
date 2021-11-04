import { ClientEvents } from "discord.js";
import { model, Schema } from "mongoose";
import {
	createGlobalSettingsSchemaDefinition,
	GlobalSettingsDocument
} from "./GlobalSettingsModel";

interface SettingsDocument extends GlobalSettingsDocument {
	events: (keyof ClientEvents)[];
	watchChannels: string[];
	watchUsers: string[];
}

const SettingsSchema = new Schema({
	...createGlobalSettingsSchemaDefinition(),
	events: { type: [String], default: [] },
	watchChannels: { type: [String], default: [] },
	watchUsers: { type: [String], default: [] }
});

const SettingsModel = model<SettingsDocument>("settings", SettingsSchema);

export { SettingsModel, SettingsDocument };
export default SettingsModel;
