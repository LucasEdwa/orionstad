import { z } from 'zod';

const envSchema = z.object({
  VITE_EMAILJS_SERVICE_ID: z.string().min(1, 'VITE_EMAILJS_SERVICE_ID is required'),
  VITE_EMAILJS_TEMPLATE_ID: z.string().min(1, 'VITE_EMAILJS_TEMPLATE_ID is required'),
  VITE_EMAILJS_TEMPLATE_IDHOME: z.string().min(1, 'VITE_EMAILJS_TEMPLATE_IDHOME is required'),
  VITE_EMAILJS_PUBLIC_KEY: z.string().min(1, 'VITE_EMAILJS_PUBLIC_KEY is required'),
});

export type EnvConfig = z.infer<typeof envSchema>;

export function validateEnv(): EnvConfig {
  const result = envSchema.safeParse({
    VITE_EMAILJS_SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID,
    VITE_EMAILJS_TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    VITE_EMAILJS_TEMPLATE_IDHOME: import.meta.env.VITE_EMAILJS_TEMPLATE_IDHOME,
    VITE_EMAILJS_PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
  });

  if (!result.success) {
    const missing = result.error.issues.map(i => i.path.join('.')).join(', ');
    console.warn(`[env] Missing environment variables: ${missing}. Email features will be disabled.`);
    return {
      VITE_EMAILJS_SERVICE_ID: '',
      VITE_EMAILJS_TEMPLATE_ID: '',
      VITE_EMAILJS_TEMPLATE_IDHOME: '',
      VITE_EMAILJS_PUBLIC_KEY: '',
    };
  }

  return result.data;
}
