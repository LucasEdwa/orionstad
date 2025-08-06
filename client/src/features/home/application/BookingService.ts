import type { BookingForm, CustomerForm, BookingState } from '../domain/entities/BookingForm';

export class BookingService {
  validateBookingForm(form: BookingForm): boolean {
    return !!(form.serviceType && form.homeSize && form.frequency);
  }

  validateCustomerForm(form: CustomerForm): boolean {
    const requiredFields = ['fullName', 'email', 'phone', 'address'];
    return requiredFields.every(field => form[field]?.trim());
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
