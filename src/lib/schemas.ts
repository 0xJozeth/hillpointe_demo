import { z } from 'zod';

export const inquirySchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  phone: z.string().optional(),
  inquiry: z.string().min(1, { message: 'Inquiry is required' }),
});

export type InquiryFormValues = z.infer<typeof inquirySchema>;
