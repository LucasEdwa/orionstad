import emailjs from "@emailjs/browser";
import type { BookingRepository } from '../domain/repositories/BookingRepository';
import type { BookingForm, CustomerForm } from '../domain/entities/BookingForm';

export class EmailJSBookingRepository implements BookingRepository {
  async submitBooking(bookingData: BookingForm & CustomerForm): Promise<void> {
    const form = document.createElement('form');
    
    // Add all booking data as hidden inputs
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
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_IDHOME,
        form,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
    } catch (error) {
      console.error("EmailJS error:", error);
      throw new Error("Failed to send booking request");
    }
  }
}
