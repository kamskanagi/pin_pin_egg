import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(1, 'Subject is required').max(200),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
});

export const franchiseSchema = z.object({
  companyName: z.string().min(1, 'Company name is required').max(200),
  contactPerson: z.string().min(1, 'Contact person is required').max(100),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required').max(30),
  country: z.string().min(1, 'Country is required').max(100),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
  budget: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
export type FranchiseFormData = z.infer<typeof franchiseSchema>;
