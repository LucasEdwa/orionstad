import { z } from 'zod';

// --- Booking Step 1 ---
export const bookingStepOneSchema = z.object({
  serviceType: z.string().min(1, 'Please select a service type'),
  homeSize: z
    .string()
    .min(1, 'Home size is required')
    .refine(val => !isNaN(Number(val)) && Number(val) > 0, {
      message: 'Home size must be a positive number',
    }),
  frequency: z.string().min(1, 'Please select a frequency'),
});

export type BookingStepOneData = z.infer<typeof bookingStepOneSchema>;

// --- Booking Step 2 (Customer Information) ---
export const customerFormSchema = z.object({
  fullName: z
    .string()
    .min(1, 'Full name is required')
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name must be under 100 characters'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .regex(/^[+]?[\d\s()-]{7,20}$/, 'Please enter a valid phone number'),
  address: z
    .string()
    .min(1, 'Address is required')
    .max(200, 'Address must be under 200 characters'),
  // Optional fields
  postalCode: z.string().max(20, 'Postal code must be under 20 characters').optional().default(''),
  city: z.string().max(100, 'City must be under 100 characters').optional().default(''),
  preferredDate: z.string().optional().default(''),
  preferredTime: z.string().optional().default(''),
  specialInstructions: z.string().max(1000, 'Special instructions must be under 1000 characters').optional().default(''),
  accessInstructions: z.string().max(500, 'Access instructions must be under 500 characters').optional().default(''),
  priorityAreas: z.string().max(500, 'Priority areas must be under 500 characters').optional().default(''),
});

export type CustomerFormData = z.infer<typeof customerFormSchema>;

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
