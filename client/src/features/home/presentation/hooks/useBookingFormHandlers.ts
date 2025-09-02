import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBookingForm } from '../../../../store/bookingSlice';
import type { RootState } from '../../../../store';
import type { ChangeEvent } from 'react';

export const useBookingFormHandlers = () => {
  const dispatch = useDispatch();
  const bookingForm = useSelector((state: RootState) => state.booking.bookingForm);

  const handleServiceSelect = useCallback((value: string) => {
    dispatch(setBookingForm({ ...bookingForm, serviceType: value }));
  }, [dispatch, bookingForm]);

  const handleFrequencySelect = useCallback((value: string) => {
    dispatch(setBookingForm({ ...bookingForm, frequency: value }));
  }, [dispatch, bookingForm]);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    dispatch(setBookingForm({ ...bookingForm, [e.target.name]: e.target.value }));
  }, [bookingForm, dispatch]);

  return {
    bookingForm,
    handleServiceSelect,
    handleFrequencySelect,
    handleChange
  };
};
