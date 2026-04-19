import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../../store";
import { setBookingStep } from "../../../../store/bookingSlice";
import { SubmitBookingUseCase } from "../../domain/usecases/SubmitBookingUseCase";
import { EmailJSBookingRepository } from "../../infrastructure/EmailJSBookingRepository";
import { SweetAlertNotificationService } from "../../infrastructure/SweetAlertNotificationService";

export const useBookingSubmission = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const bookingForm = useSelector((state: RootState) => state.booking.bookingForm);
  const customerForm = useSelector((state: RootState) => state.booking.customerForm);

  const submitBooking = async (formRef: HTMLFormElement) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    
    try {
      const bookingRepository = new EmailJSBookingRepository();
      const notificationService = new SweetAlertNotificationService();
      const submitBookingUseCase = new SubmitBookingUseCase(bookingRepository, notificationService);
      
      await submitBookingUseCase.execute(bookingForm, customerForm);
      
      formRef.reset();
      dispatch(setBookingStep(1));
    } catch (error) {
      console.error("Booking submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    submitBooking,
  };
};
