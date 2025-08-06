export interface BookingForm {
  serviceType?: string;
  homeSize?: string;
  frequency?: string;
}

export interface CustomerForm {
  [key: string]: string;
}

export interface BookingState {
  step: number;
  bookingForm: BookingForm;
  customerForm: CustomerForm;
}
