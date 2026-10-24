import { db } from "@bl/db";
import { redis } from "@bl/redis";

import type { Session } from "@bl/validators/Session";

export const createTRPCContext = (opts: { session: Session | null }) => {
  return {
    redis,
    db,
    session: opts.session,
  };
};

export type TRPCContext = Awaited<ReturnType<typeof createTRPCContext>>;
