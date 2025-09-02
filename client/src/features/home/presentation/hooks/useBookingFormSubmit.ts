import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setBookingStep } from '../../../../store/bookingSlice';
import type { FormEvent } from 'react';

export const useBookingFormSubmit = (onNext: () => void) => {
  const dispatch = useDispatch();

  const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setBookingStep(2));
    onNext();
  }, [dispatch, onNext]);

  return {
    handleSubmit
  };
};
