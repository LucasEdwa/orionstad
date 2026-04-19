import type { BookingForm, CustomerForm } from '../entities/BookingForm';

/** Abstraction for persisting booking submissions (e.g. EmailJS, REST API). */
export interface BookingRepository {
  submitBooking(bookingData: BookingForm & CustomerForm): Promise<void>;
}

/** Abstraction for displaying user-facing success/error messages. */
export interface NotificationService {
  showSuccess(message: string): void;
  showError(message: string): void;
}
