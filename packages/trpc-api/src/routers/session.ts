import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const sessionRouter = createTRPCRouter({
  isAuthenticated: publicProcedure.query(({ ctx }) => {
    return ctx.session != null;
  }),
  user: protectedProcedure.query(async ({ ctx }) => {
    // Read-only: the user row is created lazily on first save (see the user
    // router), so simply visiting the dashboard never writes.
    const user = await ctx.db.user.findUnique({
      where: { discordUserId: ctx.session.userId },
    });

    return {
      userId: ctx.session.userId,
      prefersAutosave: user?.prefersAutosave ?? false,
    };
  }),
});
