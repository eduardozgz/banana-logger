#!/usr/bin/env node
import dotenv from "dotenv";
dotenv.config();
import Bot from "./Bot";
import mongoose from "mongoose";

const { DISCORD_BOT_TOKEN, DB_URI, NODE_ENV } = process.env;

// Bot
const bot = new Bot();
bot.client.login(DISCORD_BOT_TOKEN);

// Database
mongoose
	.connect(DB_URI)
	.then(() => {
		console.log("Database connection ready");
	})
	.catch(console.error);

if (NODE_ENV === "production") {
	process
		.on("unhandledRejection", (reason, p) => {
			console.error("Unhandled Rejection at: Promise ", p, " reason: ", reason);
		})
		.on("uncaughtException", (exception) => {
			console.error("Uncaught Exception ", exception);
		})
		.on("SIGTERM", async () => {
			bot.client.destroy();
			await mongoose.disconnect();
			process.exit(0);
		});
}
