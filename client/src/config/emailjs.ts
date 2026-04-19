import { validateEnv } from '../validation';

const env = validateEnv();

/** Centralized EmailJS configuration validated via Zod at startup. */
export const emailjsConfig = {
  serviceId: env.VITE_EMAILJS_SERVICE_ID,
  templateId: env.VITE_EMAILJS_TEMPLATE_ID,
  templateIdHome: env.VITE_EMAILJS_TEMPLATE_IDHOME,
  publicKey: env.VITE_EMAILJS_PUBLIC_KEY,
} as const;

/** Returns true when the base EmailJS credentials (service, public key) are set. */
export function isEmailJSConfigured(): boolean {
  return !!(emailjsConfig.serviceId && emailjsConfig.publicKey);
}
