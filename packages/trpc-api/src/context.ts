import type { Session } from "@bl/validators/Session";

import { db } from "@bl/db";
import { redis } from "@bl/redis";

export const createTRPCContext = async (opts: { session: Session | null }) => {
  return {
    redis,
    db,
    session: opts.session,
  };
};

export type TRPCContext = Awaited<ReturnType<typeof createTRPCContext>>;
