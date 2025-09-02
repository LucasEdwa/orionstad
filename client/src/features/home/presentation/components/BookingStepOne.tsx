import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import type { RootState } from "../../../../store";
import { setBookingStep, setBookingForm } from "../../../../store/bookingSlice";
import { FaHome, FaCalendar, FaArrowRight } from 'react-icons/fa';
import { useState, useEffect, useRef, useMemo, useCallback } from "react";

interface BookingStepOneProps {
  onNext: () => void;
}

export const BookingStepOne: React.FC<BookingStepOneProps> = ({ onNext }) => {
  const { t } = useTranslation("home");
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

const [isOpen2, setIsOpen2] = useState(false);
const dropdownRef2 = useRef<HTMLDivElement>(null);
  const bookingForm = useSelector((state: RootState) => state.booking.bookingForm);

  // Memoize service and frequency options
  const serviceOptions = useMemo(
    () => t("bookingForm.serviceOptions", { returnObjects: true }) as Array<{ value: string; label: string }>,
    [t]
  );
  
  const frequencyOptions = useMemo(
    () => t("bookingForm.frequencyOptions", { returnObjects: true }) as Array<{ value: string; label: string }>,
    [t]
  );

  // Handlers for dropdowns
  const handleServiceSelect = useCallback((value: string) => {
    dispatch(setBookingForm({ ...bookingForm, serviceType: value }));
    setIsOpen(false);
  }, [bookingForm, dispatch]);

  const handleFrequencySelect = useCallback((value: string) => {
    dispatch(setBookingForm({ ...bookingForm, frequency: value }));
    setIsOpen2(false);
  }, [bookingForm, dispatch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    dispatch(setBookingForm({ ...bookingForm, [e.target.name]: e.target.value }));
  }, [bookingForm, dispatch]);

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setBookingStep(2));
    onNext();
  }, [dispatch, onNext]);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">{t("bookingForm.title")}</h2>
        <p className="text-gray-600 leading-relaxed">{t("bookingForm.intro")}</p>
      </div>

      <div className="relative inline-block w-full" ref={dropdownRef}>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          <FaHome className="inline w-4 h-4 mr-2" />
          {t("bookingForm.serviceLabel")}

        </label>
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-controls="service-dropdown"
          className="w-full px-4 py-3 border text-left border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
          tabIndex={0}
        >
          {serviceOptions.find((opt: { value: string; label: string }) => opt.value === bookingForm.serviceType)?.label ?? serviceOptions[0].label }
        </button>

        {isOpen && (
          <div id="service-dropdown" className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-xl shadow-lg">
            {serviceOptions.map((opt: { value: string; label: string }) => (
              <div
                key={opt.value}
                onClick={() => handleServiceSelect(opt.value)}
                className={`px-4 py-3 cursor-pointer hover:bg-gray-100 ${bookingForm.serviceType === opt.value ? "bg-gray-100" : ""}`}
              >
                {opt.label}
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          <FaHome className="inline w-4 h-4 mr-2" />
          {t("bookingForm.sizeLabel")}
        </label>
        <input
          name="homeSize"
          type="number"
          min="0"
          placeholder="Enter size in m²"
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
          required
          value={bookingForm.homeSize || ""}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          <FaCalendar className="inline w-4 h-4 mr-2" />
          {t("bookingForm.frequencyLabel")}
        </label>
        <div className="relative inline-block w-full" ref={dropdownRef2}>
          <button
            type="button"
            onClick={() => setIsOpen2((prev) => !prev)}
            aria-expanded={isOpen2}
            aria-controls="frequency-dropdown"
            className="w-full px-4 py-3 border text-left border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            tabIndex={0}
          >
            {frequencyOptions.find((opt: { value: string; label: string }) => opt.value === bookingForm.frequency)?.label ?? frequencyOptions[0].label}
          </button>

          {isOpen2 && (
            <div id="frequency-dropdown" className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-xl shadow-lg">
              {frequencyOptions.map((opt: { value: string; label: string }) => (
                <div
                  key={opt.value}
                  onClick={() => handleFrequencySelect(opt.value)}
                  className={`px-4 py-3 cursor-pointer hover:bg-gray-100 ${bookingForm.frequency === opt.value ? "bg-gray-100" : ""}`}
                >
                  {opt.label}
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      <button
        type="submit"
        className="w-full bg-orion-gradient text-white py-4 rounded-xl font-semibold  transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
      >
        <span>{t("bookingForm.nextLabel")}</span>
        <FaArrowRight className="w-4 h-4" />
      </button>
    </form>
  );
};