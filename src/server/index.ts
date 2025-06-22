import { publicProcedure, router } from './trpc';
import { loanProducts } from '@/lib/mock-data';
import {
  loanApplicationSchema,
  loanProductSchema,
} from '@/lib/schemas';

export const appRouter = router({
  getLoanProducts: publicProcedure
    .output(loanProductSchema.array())
    .query(() => {
      return loanProducts;
    }),
  submitApplication: publicProcedure
    .input(loanApplicationSchema)
    .output(loanApplicationSchema)
    .mutation(({ input }) => {
      const newApplication = {
        ...input,
      };
      console.log('New application received:', newApplication);
      return newApplication;
    }),
});

export type AppRouter = typeof appRouter;