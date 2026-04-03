import { discordRouter } from "./routers/discord";
import { guildRouter } from "./routers/guild";
import { sessionRouter } from "./routers/session";
import { createCallerFactory, createTRPCRouter } from "./trpc";

/**
 * This is the primary router for the tRPC API.
 *
 * All routers are aggregated here.
 */
export const appRouter = createTRPCRouter({
  session: sessionRouter,
  guild: guildRouter,
  discord: discordRouter,
});

// Export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
