import emailjs from "@emailjs/browser";
import type { BookingRepository } from '../domain/repositories/BookingRepository';
import type { BookingForm, CustomerForm } from '../domain/entities/BookingForm';
import { emailjsConfig } from '../../../config/emailjs';

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
      await emailjs.sendForm(
        emailjsConfig.serviceId,
        emailjsConfig.templateIdHome,
        form,
        emailjsConfig.publicKey
      );
    } catch (error) {
      console.error("EmailJS error:", error);
      throw new Error("Failed to send booking request");
    }
  }
}
