import { ClientEvents, MessageEmbedOptions } from "discord.js";
import { model, Schema, Document } from "mongoose";

interface GlobalSettingsDocument extends Document {
	id: string;
	ignoredChannels: string[];
	ignoredUsers: string[];
	templates: Map<keyof ClientEvents, MessageEmbedOptions>;
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
