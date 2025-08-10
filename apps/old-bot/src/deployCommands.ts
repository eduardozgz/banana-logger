#!/usr/bin/env node
import dotenv from "dotenv";
dotenv.config();
import { Routes } from "discord-api-types/v9";
import { allCommands } from "./interactions/commands";
import { discordRest } from "./services";

const {
	DISCORD_BOT_TOKEN,
	TEST_DEPLOY_INTERACTION_COMMAND_GUILD_ID
} = process.env;

const clientId = Buffer.from(
	DISCORD_BOT_TOKEN.split(".")[0],
	"base64"
).toString("utf-8");

(async () => {
	try {
		console.log("Started refreshing application (/) commands.");
		await discordRest.put(
			TEST_DEPLOY_INTERACTION_COMMAND_GUILD_ID?.length
				? Routes.applicationGuildCommands(
						clientId,
						TEST_DEPLOY_INTERACTION_COMMAND_GUILD_ID
				  )
				: Routes.applicationCommands(clientId),
			{
				body: allCommands.map((cmd) => cmd.definition.toJSON())
			}
		);

		console.log("Successfully reloaded application (/) commands.");
	} catch (error) {
		console.error(
			JSON.stringify(allCommands.map((cmd) => cmd.definition.toJSON())),
			JSON.stringify(error)
		);
	}
})();
