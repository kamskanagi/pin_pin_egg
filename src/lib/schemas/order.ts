import { z } from 'zod';

export const checkoutSchema = z
  .object({
    name: z.string().min(1, 'name_required').max(100, 'name_required'),
    phone: z
      .string()
      .min(1, 'phone_required')
      .regex(/^09\d{8}$/, 'phone_invalid'),
    einvoiceType: z.enum(['donate', 'mobile_carrier', 'business']),
    einvoiceValue: z.string().optional(),
  })
  .refine(
    (data) => data.einvoiceType === 'donate' || !!data.einvoiceValue?.trim(),
    { message: 'einvoice_value_required', path: ['einvoiceValue'] }
  );

export type CheckoutFormData = z.infer<typeof checkoutSchema>;
