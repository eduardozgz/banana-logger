import { model, Schema } from "mongoose";
import { UserEventsType } from "../Constants";
import {
	createGlobalSettingsSchemaDefinition,
	GlobalSettingsDocument
} from "./GlobalSettingsModel";

interface SettingsDocument extends GlobalSettingsDocument {
	events: UserEventsType[];
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
