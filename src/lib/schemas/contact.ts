import { z } from 'zod';

// Messages are i18n keys under the `contact.errors` namespace — forms render
// them through `t()` so validation errors follow the active locale.
export const contactSchema = z.object({
  name: z.string().min(1, 'name_required').max(100, 'too_long'),
  email: z.string().email('email_invalid'),
  subject: z.string().min(1, 'subject_required').max(200, 'too_long'),
  message: z.string().min(10, 'message_min').max(2000, 'too_long'),
});

export const franchiseSchema = z.object({
  companyName: z.string().min(1, 'company_required').max(200, 'too_long'),
  contactPerson: z.string().min(1, 'contact_required').max(100, 'too_long'),
  email: z.string().email('email_invalid'),
  phone: z.string().min(1, 'phone_required').max(30, 'too_long'),
  country: z.string().min(1, 'country_required').max(100, 'too_long'),
  message: z.string().min(10, 'message_min').max(2000, 'too_long'),
  budget: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
export type FranchiseFormData = z.infer<typeof franchiseSchema>;
