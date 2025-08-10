import { BaseCommand } from "./BaseCommand";

export class Command extends BaseCommand {
	isGuildCommand(): false {
		return false;
	}
}
