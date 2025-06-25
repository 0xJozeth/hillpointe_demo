import { publicProcedure, router } from './trpc';
import { z } from 'zod';

export const appRouter = router({
  getLoanProducts: publicProcedure.query(async () => {
    return [
      { id: 1, name: '30-Year Fixed' },
      { id: 2, name: '15-Year Fixed' },
      { id: 3, name: '5/1 ARM' },
    ];
  }),
  submitApplication: publicProcedure
    .input(
      z.object({
        applicantName: z.string(),
        email: z.string().email(),
        loanType: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      // In a real app, you'd save this to a database
      console.log('Application received:', input);
      return { success: true, message: 'Application submitted!' };
    }),
});

export type AppRouter = typeof appRouter;