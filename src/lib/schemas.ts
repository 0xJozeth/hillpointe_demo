import { z } from 'zod';

export const inquirySchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  phone: z.string().optional(),
  inquiry: z.string().min(1, { message: 'Inquiry is required' }),
});

export type InquiryFormValues = z.infer<typeof inquirySchema>;

export const loanProductSchema = z.object({
  id: z.number(),
  title: z.string(),
  propertyType: z.string(),
  loanAmount: z.object({
    min: z.string(),
    max: z.string(),
  }),
  maxLtv: z.number(),
  termLength: z.string(),
  additionalInfo: z.string(),
});

export type LoanProduct = z.infer<typeof loanProductSchema>;

export const loanProducts: LoanProduct[] = [
  {
    id: 1,
    title: "Full Doc",
    propertyType: "Residential",
    loanAmount: { min: "100k", max: "3M" },
    maxLtv: 0.8,
    termLength: "30 Years",
    additionalInfo: "Standard income verification",
  },
  {
    id: 2,
    title: "Bank Statement",
    propertyType: "Commercial",
    loanAmount: { min: "500k", max: "10M" },
    maxLtv: 0.75,
    termLength: "10 Years",
    additionalInfo: "For self-employed borrowers",
  },
  {
    id: 3,
    title: "DSCR",
    propertyType: "Investment",
    loanAmount: { min: "250k", max: "5M" },
    maxLtv: 0.7,
    termLength: "30 Years",
    additionalInfo: "Based on property cash flow",
  },
    {
    id: 4,
    title: "Hard Money",
    propertyType: "Fix & Flip",
    loanAmount: { min: "50k", max: "2M" },
    maxLtv: 0.9,
    termLength: "12-24 Months",
    additionalInfo: "Short-term financing",
  },
];
