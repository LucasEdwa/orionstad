import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import type { RootState } from "../../../../store";
import { setBookingStep, setCustomerForm } from "../../../../store/bookingSlice";
import { FaCheckCircle } from 'react-icons/fa';

interface BookingStepTwoProps {
  onSubmit: (formRef: HTMLFormElement) => Promise<void>;
  isSubmitting: boolean;
}

export const BookingStepTwo: React.FC<BookingStepTwoProps> = ({ onSubmit, isSubmitting }) => {
  const { t } = useTranslation("home");
  const dispatch = useDispatch();
  const bookingForm = useSelector((state: RootState) => state.booking.bookingForm);
  const customerForm = useSelector((state: RootState) => state.booking.customerForm);
  const formRef = useRef<HTMLFormElement>(null);

  const handleCustomerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setCustomerForm({ ...customerForm, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formRef.current) {
      await onSubmit(formRef.current);
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
      {/* Hidden inputs for booking step values */}
      <input type="hidden" name="serviceType" value={bookingForm.serviceType || ""} />
      <input type="hidden" name="homeSize" value={bookingForm.homeSize || ""} />
      <input type="hidden" name="frequency" value={bookingForm.frequency || ""} />

      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">{t("customerForm.title")}</h2>
        <p className="text-gray-600">Please provide your contact information to complete the booking.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {(t("customerForm.fields", { returnObjects: true }) as Array<{ name: string; type: string; placeholder: string }>).map((field, idx) => (
          <div key={idx} className={field.name === 'specialInstructions' || field.name === 'accessInstructions' || field.name === 'priorityAreas' ? 'md:col-span-2' : ''}>
            <label htmlFor={field.name} className="block text-sm font-semibold text-gray-700 mb-2">
              {field.placeholder}
            </label>
            <input
              name={field.name}
              type={field.type}
              id={field.name}
              placeholder={`Enter your ${field.placeholder.toLowerCase()}...`}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              required={['fullName', 'email', 'phone', 'address'].includes(field.name)}
              value={customerForm[field.name] || ""}
              onChange={handleCustomerChange}
            />
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          type="button"
          className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-colors duration-200"
          onClick={() => dispatch(setBookingStep(1))}
        >
          {t("customerForm.backLabel")}
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-gradient-to-r from-purple-600 to-purple-500 text-white py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-purple-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Sending...</span>
            </>
          ) : (
            <>
              <FaCheckCircle className="w-4 h-4" />
              <span>{t("customerForm.submitLabel")}</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};
