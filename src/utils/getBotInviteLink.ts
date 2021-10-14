import { allCommandsNeededPermissions } from "../commands";
import { allEventsNeededPermissions } from "../events";
import { tokenToClientId } from "./tokenToClientId";

const { DISCORD_BOT_TOKEN } = process.env;

const clientId = tokenToClientId(DISCORD_BOT_TOKEN);

function getBotInviteLink(guildId?: string): string {
	const allNeededPermissions = [
		allCommandsNeededPermissions.bitfield,
		allEventsNeededPermissions.bitfield
	].reduce((acc, b) => acc | b, 0n);

	const inviteLink = new URL("https://discord.com/oauth2/authorize");
	inviteLink.searchParams.set("client_id", clientId);
	inviteLink.searchParams.set("permissions", allNeededPermissions.toString());
	inviteLink.searchParams.set(
		"scope",
		["bot", "applications.commands"].join(" ")
	);

	if (guildId) {
		inviteLink.searchParams.set("guild_id", guildId);
	}

	return inviteLink.toString();
}

export default getBotInviteLink;
