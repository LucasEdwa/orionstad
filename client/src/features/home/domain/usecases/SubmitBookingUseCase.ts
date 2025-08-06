import type { BookingForm, CustomerForm } from '../entities/BookingForm';
import type { BookingRepository, NotificationService } from '../repositories/BookingRepository';

export class SubmitBookingUseCase {
  private bookingRepository: BookingRepository;
  private notificationService: NotificationService;

  constructor(
    bookingRepository: BookingRepository,
    notificationService: NotificationService
  ) {
    this.bookingRepository = bookingRepository;
    this.notificationService = notificationService;
  }

  async execute(bookingData: BookingForm, customerData: CustomerForm): Promise<void> {
    try {
      await this.bookingRepository.submitBooking({ ...bookingData, ...customerData });
      this.notificationService.showSuccess(
        "Your booking request has been sent successfully! We'll contact you soon to confirm the details."
      );
    } catch (error) {
      this.notificationService.showError(
        "Failed to send booking request. Please try again."
      );
      throw error;
    }
  }
}
