import { useMemo, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { setBookingForm } from '../../../../store/bookingSlice';
import type { RootState } from '../../../../store';

export const useBookingFormOptions = () => {
  const { t } = useTranslation("home");
  const dispatch = useDispatch();
  const bookingForm = useSelector((state: RootState) => state.booking.bookingForm);
  const bookingFormRef = useRef(bookingForm);
  bookingFormRef.current = bookingForm;

  const serviceOptions = useMemo(
    () => t("bookingForm.serviceOptions", { returnObjects: true }) as Array<{ value: string; label: string }>,
    [t]
  );

  const allFrequencyOptions = useMemo(
    () => t("bookingForm.frequencyOptions", { returnObjects: true }) as Array<{ value: string; label: string }>,
    [t]
  );

  const frequencyOptions = useMemo(() => {
    // If service type is index 3, only show frequency options up to index 4
    const selectedServiceIndex = serviceOptions.findIndex(opt => opt.value === bookingForm.serviceType);
    if (selectedServiceIndex === 3) {
      return allFrequencyOptions.slice(0, 2); // Up to index 4 (5 items)
    }
    return allFrequencyOptions;
  }, [allFrequencyOptions, bookingForm.serviceType, serviceOptions]);

  useEffect(() => {
    // Only set initial values if both options are loaded and we don't have values yet
    const current = bookingFormRef.current;
    if (serviceOptions.length > 0 && frequencyOptions.length > 0) {
      const updates: Partial<typeof current> = {};
      
      if (!current.serviceType) {
        updates.serviceType = serviceOptions[0].value;
      }
      
      if (!current.frequency || !frequencyOptions.find(opt => opt.value === current.frequency)) {
        updates.frequency = frequencyOptions[0].value;
      }

      // Only dispatch if we need to set some initial values
      if (Object.keys(updates).length > 0) {
        dispatch(setBookingForm({
          ...current,
          ...updates
        }));
      }
    }
  }, [serviceOptions, frequencyOptions, dispatch]); // Only depend on the options loading, not on form state

  return {
    serviceOptions,
    frequencyOptions
  };
};
