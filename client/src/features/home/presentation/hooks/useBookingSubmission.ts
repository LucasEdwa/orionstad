import { useActionState, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../../store";
import { resetBooking } from "../../../../store/bookingSlice";
import { SubmitBookingUseCase } from "../../domain/usecases/SubmitBookingUseCase";
import { EmailJSBookingRepository } from "../../infrastructure/EmailJSBookingRepository";
import { SonnerNotificationService } from "../../infrastructure/SweetAlertNotificationService";
import { customerFormSchema } from "../../../../validation";
import type { FieldErrors } from "../../../../validation";

type SubmissionState = {
  error: string | null;
  success: boolean;
};

const initialState: SubmissionState = { error: null, success: false };

// Module-level singletons — stateless services reused across renders
const bookingRepository = new EmailJSBookingRepository();
const notificationService = new SonnerNotificationService();
const submitBookingUseCase = new SubmitBookingUseCase(bookingRepository, notificationService);

/**
 * Handles async booking form submission via React 19 `useActionState`.
 * Validates customer form data with Zod before submitting.
 */
export const useBookingSubmission = () => {
  const dispatch = useDispatch();
  const bookingForm = useSelector((state: RootState) => state.booking.bookingForm);
  const customerForm = useSelector((state: RootState) => state.booking.customerForm);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const clearFieldError = useCallback(
    (field: string) =>
      setFieldErrors(prev => {
        if (!prev[field]) return prev;
        const next = { ...prev };
        delete next[field];
        return next;
      }),
    [],
  );

  const [submissionState, formAction, isPending] = useActionState(
    async (
      ...[, ]: [previous: SubmissionState, formData: FormData]
    ): Promise<SubmissionState> => {
      const result = customerFormSchema.safeParse(customerForm);
      if (!result.success) {
        const errors: FieldErrors = {};
        for (const issue of result.error.issues) {
          const key = issue.path.join('.');
          if (!errors[key]) errors[key] = issue.message;
        }
        setFieldErrors(errors);
        return { error: "Please fix the form errors", success: false };
      }
      setFieldErrors({});

      try {
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

  return { isPending, formAction, submissionState, fieldErrors, clearFieldError };
};
