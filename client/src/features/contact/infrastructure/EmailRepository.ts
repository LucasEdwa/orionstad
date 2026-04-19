import emailjs from '@emailjs/browser';
import type { EmailSubmissionResult } from '../domain/entities/ContactForm';
import { emailjsConfig } from '../../../config/emailjs';

/** Sends contact form data to the company inbox via EmailJS. */
export class EmailRepository {
  async sendEmail(formElement: HTMLFormElement): Promise<EmailSubmissionResult> {
    try {
      await emailjs.sendForm(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        formElement,
        emailjsConfig.publicKey
      );
      
      return { success: true };
    } catch (error) {
      console.error('EmailJS error:', error);
      
      return {
        success: false,
        error: 'Failed to send message. Please try again.'
      };
    }
  }

  isConfigured(): boolean {
    return !!(emailjsConfig.serviceId && emailjsConfig.templateId && emailjsConfig.publicKey);
  }
}
