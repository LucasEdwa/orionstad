/** Centralized EmailJS configuration sourced from environment variables. */
export const emailjsConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID as string,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string,
  templateIdHome: import.meta.env.VITE_EMAILJS_TEMPLATE_IDHOME as string,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string,
} as const;

/** Returns true when the base EmailJS credentials (service, public key) are set. */
export function isEmailJSConfigured(): boolean {
  return !!(emailjsConfig.serviceId && emailjsConfig.publicKey);
}
