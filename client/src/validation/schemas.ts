import { z } from 'zod';

// --- Contact Form ---
// Messages are translation keys (common namespace); FieldError renders them in the active language
export const contactFormSchema = z.object({
  user_name: z
    .string()
    .min(1, 'validation.nameRequired')
    .min(2, 'validation.nameMin')
    .max(100, 'validation.nameMax'),
  user_email: z
    .string()
    .min(1, 'validation.emailRequired')
    .email('validation.emailInvalid'),
  message: z
    .string()
    .min(1, 'validation.messageRequired')
    .min(10, 'validation.messageMin')
    .max(5000, 'validation.messageMax'),
});

export type ContactFormDataValidated = z.infer<typeof contactFormSchema>;

// --- EmailJS Response ---
export const emailjsResponseSchema = z.object({
  status: z.number(),
  text: z.string(),
});

export type EmailJSResponse = z.infer<typeof emailjsResponseSchema>;
