import { publicProcedure, router } from './trpc';
import { z } from 'zod';
import { inquirySchema } from '@/lib/schemas';

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
      console.log('Application received:', input);
      return { success: true, message: 'Application submitted!' };
    }),
  submitInquiry: publicProcedure
    .input(inquirySchema)
    .mutation(async ({ input }) => {
      console.log('Inquiry received:', input);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return { success: true, message: 'Inquiry submitted successfully!' };
    }),
});

export type AppRouter = typeof appRouter;