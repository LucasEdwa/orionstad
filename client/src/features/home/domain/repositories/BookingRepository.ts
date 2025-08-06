import type { BookingForm, CustomerForm } from '../entities/BookingForm';

export interface BookingRepository {
  submitBooking(bookingData: BookingForm & CustomerForm): Promise<void>;
}

export interface NotificationService {
  showSuccess(message: string): void;
  showError(message: string): void;
}
