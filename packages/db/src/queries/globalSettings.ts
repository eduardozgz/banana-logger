import { eq } from "drizzle-orm";

import type { GlobalSettings } from "../schema/types";
import { connection } from "../connection";

const orm = connection.orm;
const { globalSettings } = connection.tables;

type GlobalSettingsPatch = Partial<Omit<GlobalSettings, "id" | "guildId">>;

async function get(guildId: string): Promise<GlobalSettings | undefined> {
  const [row] = await orm
    .select()
    .from(globalSettings)
    .where(eq(globalSettings.guildId, guildId));
  return row;
}

async function patch(
  guildId: string,
  data: GlobalSettingsPatch,
): Promise<GlobalSettings> {
  const [row] = await orm
    .insert(globalSettings)
    .values({ guildId, ...data })
    .onConflictDoUpdate({ target: globalSettings.guildId, set: data })
    .returning();
  if (!row) throw new Error("globalSettings.patch: no row returned");
  return row;
}

export const globalSettingsQueries = { get, patch };
