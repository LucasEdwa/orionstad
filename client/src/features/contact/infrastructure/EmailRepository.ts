import emailjs from '@emailjs/browser';
import type { EmailSubmissionResult } from '../domain/entities/ContactForm';
import { emailjsConfig } from '../../../config/emailjs';
import { emailjsResponseSchema } from '../../../validation';

/** Sends contact form data to the company inbox via EmailJS. */
export class EmailRepository {
  async sendEmail(formElement: HTMLFormElement): Promise<EmailSubmissionResult> {
    try {
      const raw = await emailjs.sendForm(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        formElement,
        emailjsConfig.publicKey
      );

      const parsed = emailjsResponseSchema.safeParse(raw);
      if (!parsed.success) {
        console.warn('Unexpected EmailJS response shape:', raw);
      }
      
      return { success: true };
    } catch (error) {
      console.error('EmailJS error:', error);
      
      // The caller shows a translated fallback message
      return { success: false };
    }
  }

  isConfigured(): boolean {
    return !!(emailjsConfig.serviceId && emailjsConfig.templateId && emailjsConfig.publicKey);
  }
}
