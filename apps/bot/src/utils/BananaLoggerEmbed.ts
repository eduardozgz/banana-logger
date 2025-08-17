import { EmbedBuilder } from "discord.js";

import { Colors } from "../Constants";

class BananaLoggerEmbed extends EmbedBuilder {
  constructor(options?: ConstructorParameters<typeof EmbedBuilder>[0]) {
    super(options);
    if (!options?.color) {
      this.setColor(Colors.YELLOW);
    }
  }
}

export default BananaLoggerEmbed;
