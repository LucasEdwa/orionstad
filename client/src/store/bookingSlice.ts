import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type BookingForm = {
  serviceType?: string;
  homeSize?: string;
  frequency?: string;
};

type CustomerForm = {
  [key: string]: string;
};

type BookingState = {
  step: number;
  bookingForm: BookingForm;
  customerForm: CustomerForm;
};

const initialState: BookingState = {
  step: 1,
  bookingForm: {},
  customerForm: {},
};

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setBookingStep(state, action: PayloadAction<number>) {
      state.step = action.payload;
    },
    setBookingForm(state, action: PayloadAction<BookingForm>) {
      state.bookingForm = action.payload;
    },
    setCustomerForm(state, action: PayloadAction<CustomerForm>) {
      state.customerForm = action.payload;
    },
    resetBooking(state) {
      state.step = 1;
      state.bookingForm = {};
      state.customerForm = {};
    },
  },
});

export const { setBookingStep, setBookingForm, setCustomerForm, resetBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
