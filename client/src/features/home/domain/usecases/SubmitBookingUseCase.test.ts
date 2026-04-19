import { describe, it, expect, vi } from 'vitest';
import { SubmitBookingUseCase } from './SubmitBookingUseCase';
import type { BookingRepository, NotificationService } from '../repositories/BookingRepository';
import type { BookingForm, CustomerForm } from '../entities/BookingForm';

const createMocks = () => {
  const bookingRepository: BookingRepository = {
    submitBooking: vi.fn().mockResolvedValue(undefined),
  };
  const notificationService: NotificationService = {
    showSuccess: vi.fn(),
    showError: vi.fn(),
  };
  return { bookingRepository, notificationService };
};

const bookingData: BookingForm = { serviceType: 'deep', homeSize: '3', frequency: 'weekly' };
const customerData: CustomerForm = { fullName: 'Jane', email: 'j@e.com', phone: '123', address: 'St 1' };

describe('SubmitBookingUseCase', () => {
  it('submits booking and shows success notification', async () => {
    const { bookingRepository, notificationService } = createMocks();
    const useCase = new SubmitBookingUseCase(bookingRepository, notificationService);

    await useCase.execute(bookingData, customerData);

    expect(bookingRepository.submitBooking).toHaveBeenCalledWith({
      ...bookingData,
      ...customerData,
    });
    expect(notificationService.showSuccess).toHaveBeenCalledOnce();
    expect(notificationService.showError).not.toHaveBeenCalled();
  });

  it('shows error notification and re-throws when repository fails', async () => {
    const { bookingRepository, notificationService } = createMocks();
    vi.mocked(bookingRepository.submitBooking).mockRejectedValue(new Error('network'));
    const useCase = new SubmitBookingUseCase(bookingRepository, notificationService);

    await expect(useCase.execute(bookingData, customerData)).rejects.toThrow('network');

    expect(notificationService.showError).toHaveBeenCalledOnce();
    expect(notificationService.showSuccess).not.toHaveBeenCalled();
  });
});
