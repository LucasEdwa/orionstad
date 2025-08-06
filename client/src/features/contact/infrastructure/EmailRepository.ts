import emailjs from '@emailjs/browser';
import type { EmailSubmissionResult } from '../domain/entities/ContactForm';

export class EmailRepository {
  private serviceId: string;
  private templateId: string;
  private publicKey: string;

  constructor() {
    this.serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    this.templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_IDCONTACT;
    this.publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  }

  async sendEmail(formElement: HTMLFormElement): Promise<EmailSubmissionResult> {
    try {
      await emailjs.sendForm(
        this.serviceId,
        this.templateId,
        formElement,
        this.publicKey
      );
      
      return {
        success: true
      };
    } catch (error) {
      console.error('EmailJS error:', error);
      
      return {
        success: false,
        error: 'Failed to send message. Please try again.'
      };
    }
  }

  isConfigured(): boolean {
    return !!(this.serviceId && this.templateId && this.publicKey);
  }
}
