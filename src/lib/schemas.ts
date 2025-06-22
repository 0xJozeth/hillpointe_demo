import { z } from 'zod';

export const loanProductSchema = z.object({
  id: z.number(),
  title: z.string(),
  propertyType: z.string(),
  loanAmount: z.object({
    min: z.number(),
    max: z.number(),
  }),
  maxLtv: z.number(),
  termLength: z.string(),
  additionalInfo: z.string(),
});

export const loanApplicationSchema = z.object({
  applicantName: z.string(),
  email: z.string().email(),
  loanType: z.string(),
});

export type LoanProduct = z.infer<typeof loanProductSchema>;
export type LoanApplication = z.infer<typeof loanApplicationSchema>;