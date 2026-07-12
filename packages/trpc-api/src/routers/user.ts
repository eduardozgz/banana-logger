import { z } from "zod/v4";

import { createTRPCRouter, protectedProcedure } from "../trpc";

/**
 * The signed-in user's own account. Everything is scoped to `ctx.session.userId`
 * (the Discord user id from the session cookie), so a user can only ever read or
 * mutate their own record — there is no id-based access.
 */
export const userRouter = createTRPCRouter({
  setPrefersAutosave: protectedProcedure
    .input(z.object({ prefersAutosave: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      const discordUserId = ctx.session.userId;

      await ctx.db.user.upsert({
        where: { discordUserId },
        create: { discordUserId, prefersAutosave: input.prefersAutosave },
        update: { prefersAutosave: input.prefersAutosave },
      });

      return { prefersAutosave: input.prefersAutosave };
    }),

  delete: protectedProcedure.mutation(async ({ ctx }) => {
    // deleteMany so it's a no-op (rather than an error) when the user never
    // saved a preference and therefore has no row.
    await ctx.db.user.deleteMany({
      where: { discordUserId: ctx.session.userId },
    });
  }),
});
