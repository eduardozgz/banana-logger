import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const sessionRouter = createTRPCRouter({
  isAuthenticated: publicProcedure.query(({ ctx }) => {
    return ctx.session != null;
  }),
  user: protectedProcedure.query(({ ctx }) => {
    return {
      userId: ctx.session.userId,
    };
  }),
});
