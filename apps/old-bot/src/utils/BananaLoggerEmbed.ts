import { MessageEmbed } from "discord.js";
import { Colors } from "../Constants";

class BananaLoggerEmbed extends MessageEmbed {
	constructor(options?: ConstructorParameters<typeof MessageEmbed>[0]) {
		super(options);
		if (!options?.color) {
			this.setColor(Colors.YELLOW);
		}
	}
}

export default BananaLoggerEmbed;
