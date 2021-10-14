import { REST } from "@discordjs/rest";

const { DISCORD_BOT_TOKEN } = process.env;

export const discordRest = new REST({ version: "9" }).setToken(
	DISCORD_BOT_TOKEN
);

export default discordRest;
