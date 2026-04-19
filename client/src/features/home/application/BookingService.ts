import type { BookingForm, BookingState } from '../domain/entities/BookingForm';
import { bookingStepOneSchema } from '../../../validation';

/** Validates booking form data via Zod and manages the multi-step form state. */
export class BookingService {
  validateBookingForm(form: BookingForm): boolean {
    return bookingStepOneSchema.safeParse({
      serviceType: form.serviceType ?? '',
      homeSize: form.homeSize ?? '',
      frequency: form.frequency ?? '',
    }).success;
  }

  getInitialState(): BookingState {
    return {
      step: 1,
      bookingForm: {},
      customerForm: {},
    };
  }

  canProceedToNextStep(state: BookingState): boolean {
    if (state.step === 1) {
      return this.validateBookingForm(state.bookingForm);
    }
    return false;
  }
}
