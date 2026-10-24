import { z } from 'zod';

// --- Contact Form ---
export const contactFormSchema = z.object({
  user_name: z
    .string()
    .min(1, 'Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be under 100 characters'),
  user_email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  message: z
    .string()
    .min(1, 'Message is required')
    .min(10, 'Message must be at least 10 characters')
    .max(5000, 'Message must be under 5000 characters'),
});

export type ContactFormDataValidated = z.infer<typeof contactFormSchema>;

// --- EmailJS Response ---
export const emailjsResponseSchema = z.object({
  status: z.number(),
  text: z.string(),
});

export type EmailJSResponse = z.infer<typeof emailjsResponseSchema>;
