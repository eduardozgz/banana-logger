#!/usr/bin/env node
import dotenv from "dotenv";
dotenv.config();
import { Routes } from "discord-api-types/v9";
import { allCommands } from "./commands";
import { discordRest } from "./services";

const { DISCORD_BOT_TOKEN } = process.env;

const clientId = Buffer.from(
	DISCORD_BOT_TOKEN.split(".")[0],
	"base64"
).toString("utf-8");

(async () => {
	try {
		console.log("Started refreshing application (/) commands.");

		await discordRest.put(Routes.applicationCommands(clientId), {
			body: allCommands.map((cmd) => cmd.definition.toJSON())
		});

		console.log("Successfully reloaded application (/) commands.");
	} catch (error) {
		console.error(error);
	}
})();
