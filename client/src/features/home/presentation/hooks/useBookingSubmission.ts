import { useActionState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../../store";
import { resetBooking } from "../../../../store/bookingSlice";
import { SubmitBookingUseCase } from "../../domain/usecases/SubmitBookingUseCase";
import { EmailJSBookingRepository } from "../../infrastructure/EmailJSBookingRepository";
import { SweetAlertNotificationService } from "../../infrastructure/SweetAlertNotificationService";

type SubmissionState = {
  error: string | null;
  success: boolean;
};

const initialState: SubmissionState = { error: null, success: false };

export const useBookingSubmission = () => {
  const dispatch = useDispatch();
  const bookingForm = useSelector((state: RootState) => state.booking.bookingForm);
  const customerForm = useSelector((state: RootState) => state.booking.customerForm);

  const [submissionState, formAction, isPending] = useActionState(
    async (
      ...[, ]: [previous: SubmissionState, formData: FormData]
    ): Promise<SubmissionState> => {
      try {
        const bookingRepository = new EmailJSBookingRepository();
        const notificationService = new SweetAlertNotificationService();
        const submitBookingUseCase = new SubmitBookingUseCase(bookingRepository, notificationService);

        await submitBookingUseCase.execute(bookingForm, customerForm);
        dispatch(resetBooking());
        return { error: null, success: true };
      } catch (error) {
        console.error("Booking submission error:", error);
        return { error: "Submission failed", success: false };
      }
    },
    initialState,
  );

  return { isPending, formAction, submissionState };
};
