import { IntentsBitField } from "discord.js";

const AllIntents = Object.values(IntentsBitField.Flags)
  .filter((flag) => typeof flag === "number")
  .reduce((acc, flag) => acc | flag, 0);

export const botIntents = new IntentsBitField(AllIntents);
