import { eq } from "drizzle-orm";

import type { User } from "../schema/types";
import { connection } from "../connection";

const orm = connection.orm;
const { user } = connection.tables;

async function get(discordUserId: string): Promise<User | undefined> {
  const [row] = await orm
    .select()
    .from(user)
    .where(eq(user.discordUserId, discordUserId));
  return row;
}

async function patch(
  discordUserId: string,
  data: Partial<Omit<User, "id" | "discordUserId">>,
): Promise<User> {
  const [row] = await orm
    .insert(user)
    .values({ discordUserId, ...data })
    .onConflictDoUpdate({ target: user.discordUserId, set: data })
    .returning();
  if (!row) throw new Error("user.patch: no row returned");
  return row;
}

async function remove(discordUserId: string): Promise<void> {
  await orm.delete(user).where(eq(user.discordUserId, discordUserId));
}

export const userQueries = { get, patch, delete: remove };
