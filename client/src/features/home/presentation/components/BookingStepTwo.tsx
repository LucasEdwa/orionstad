import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import type { RootState } from "../../../../store";
import { setBookingStep, setCustomerForm } from "../../../../store/bookingSlice";
import { SubmitButton } from "./SubmitButton";

interface BookingStepTwoProps {
  formAction: (formData: FormData) => void;
  isPending: boolean;
}

export const BookingStepTwo: React.FC<BookingStepTwoProps> = ({ formAction, isPending }) => {
  const { t } = useTranslation("home");
  const dispatch = useDispatch();
  const bookingForm = useSelector((state: RootState) => state.booking.bookingForm);
  const customerForm = useSelector((state: RootState) => state.booking.customerForm);

  const handleCustomerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setCustomerForm({ ...customerForm, [e.target.name]: e.target.value }));
  };

  return (
    <form action={formAction} className="space-y-6">
      {/* Hidden inputs for booking step values */}
      <input type="hidden" name="serviceType" value={bookingForm.serviceType || ""} />
      <input type="hidden" name="homeSize" value={bookingForm.homeSize || ""} />
      <input type="hidden" name="frequency" value={bookingForm.frequency || ""} />

      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">{t("customerForm.title")}</h2>
        <p className="text-gray-600">{t("customerForm.intro")}</p>
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
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#CDB697] focus:border-transparent transition-all duration-200"
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
          disabled={isPending}
          className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => dispatch(setBookingStep(1))}
        >
          {t("customerForm.backLabel")}
        </button>
        <SubmitButton />
      </div>
    </form>
  );
};
