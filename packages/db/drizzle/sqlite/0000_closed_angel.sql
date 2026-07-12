CREATE TABLE `GlobalSettings` (
	`id` text PRIMARY KEY NOT NULL,
	`guildId` text NOT NULL,
	`ignoredChannels` text NOT NULL,
	`ignoredUsers` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `GlobalSettings_guildId_key` ON `GlobalSettings` (`guildId`);--> statement-breakpoint
CREATE TABLE `Settings` (
	`id` text PRIMARY KEY NOT NULL,
	`guildId` text NOT NULL,
	`channelId` text NOT NULL,
	`ignoredChannels` text NOT NULL,
	`ignoredUsers` text NOT NULL,
	`watchingEvents` text NOT NULL,
	`watchChannels` text NOT NULL,
	`watchUsers` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `Settings_guildId_channelId_key` ON `Settings` (`guildId`,`channelId`);--> statement-breakpoint
CREATE TABLE `User` (
	`id` text PRIMARY KEY NOT NULL,
	`discordUserId` text NOT NULL,
	`prefersAutosave` integer DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `User_discordUserId_key` ON `User` (`discordUserId`);