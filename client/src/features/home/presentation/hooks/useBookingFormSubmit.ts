import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBookingStep } from '../../../../store/bookingSlice';
import type { RootState } from '../../../../store';
import type { FormEvent } from 'react';
import { bookingStepOneSchema, useFormValidation } from '../../../../validation';
import type { FieldErrors } from '../../../../validation';

export const useBookingFormSubmit = (onNext: () => void) => {
  const dispatch = useDispatch();
  const bookingForm = useSelector((state: RootState) => state.booking.bookingForm);
  const { fieldErrors, validate, clearFieldError } = useFormValidation(bookingStepOneSchema);

  const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = validate({
      serviceType: bookingForm.serviceType ?? '',
      homeSize: bookingForm.homeSize ?? '',
      frequency: bookingForm.frequency ?? '',
    });
    if (!result.success) return;
    dispatch(setBookingStep(2));
    onNext();
  }, [dispatch, onNext, bookingForm, validate]);

  return {
    handleSubmit,
    fieldErrors: fieldErrors as FieldErrors,
    clearFieldError,
  };
};
