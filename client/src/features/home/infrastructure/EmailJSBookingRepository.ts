import emailjs from "@emailjs/browser";
import type { BookingRepository } from '../domain/repositories/BookingRepository';
import type { BookingForm, CustomerForm } from '../domain/entities/BookingForm';
import { emailjsConfig } from '../../../config/emailjs';
import { emailjsResponseSchema } from '../../../validation';

/** Sends booking form data to the company inbox via EmailJS. */
export class EmailJSBookingRepository implements BookingRepository {
  async submitBooking(bookingData: BookingForm & CustomerForm): Promise<void> {
    const form = document.createElement('form');
    
    Object.entries(bookingData).forEach(([key, value]) => {
      if (value) {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = String(value);
        form.appendChild(input);
      }
    });

    try {
      const raw = await emailjs.sendForm(
        emailjsConfig.serviceId,
        emailjsConfig.templateIdHome,
        form,
        emailjsConfig.publicKey
      );

      const parsed = emailjsResponseSchema.safeParse(raw);
      if (!parsed.success) {
        console.warn('Unexpected EmailJS response shape:', raw);
      }
    } catch (error) {
      console.error("EmailJS error:", error);
      throw new Error("Failed to send booking request");
    }
  }
}
