import { model, Schema } from "mongoose";
import { UserEventsType } from "../Constants";
import {
	createGlobalSettingsSchemaDefinition,
	GlobalSettingsDocument
} from "./GlobalSettingsModel";

interface SettingsDocument extends GlobalSettingsDocument {
	guildId: string;
	events: UserEventsType[];
	watchChannels: string[];
	watchUsers: string[];
}

const SettingsSchema = new Schema({
	...createGlobalSettingsSchemaDefinition(),
	guildId: { type: String, required: true },
	events: { type: [String], default: [] },
	watchChannels: { type: [String], default: [] },
	watchUsers: { type: [String], default: [] }
});

const SettingsModel = model<SettingsDocument>("settings", SettingsSchema);

export { SettingsModel, SettingsDocument };
export default SettingsModel;
