import { PermissionsBitField } from "discord.js";

export const botPermissions = new PermissionsBitField().add(
  PermissionsBitField.Flags.Administrator,
);
