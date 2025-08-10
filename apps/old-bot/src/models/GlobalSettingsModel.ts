import { MessageEmbedOptions } from "discord.js";
import { model, Schema, Document } from "mongoose";
import { UserEventNames } from "../Constants";

interface GlobalSettingsDocument extends Document {
	id: string;
	ignoredChannels: string[];
	ignoredUsers: string[];
	templates: Map<string | keyof typeof UserEventNames, MessageEmbedOptions>;
}

const createGlobalSettingsSchemaDefinition = () => ({
	id: { type: String, require: true },
	ignoredChannels: { type: [String], default: [] },
	ignoredUsers: { type: [String], default: [] },
	templates: { type: Map, default: () => new Map() }
});

const GlobalSettingsSchema = new Schema(createGlobalSettingsSchemaDefinition());

const GlobalSettingsModel = model<GlobalSettingsDocument>(
	"globalSettings",
	GlobalSettingsSchema
);

export {
	GlobalSettingsModel,
	GlobalSettingsDocument,
	createGlobalSettingsSchemaDefinition
};
export default GlobalSettingsModel;
