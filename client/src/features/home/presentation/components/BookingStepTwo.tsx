import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import type { RootState } from "../../../../store";
import { setBookingStep, setCustomerForm } from "../../../../store/bookingSlice";
import { SubmitButton } from "./SubmitButton";
import { FieldError } from "../../../../components/FieldError";
import type { FieldErrors } from "../../../../validation";
import { fieldClass, labelClass } from "../../../../components/ui/styles";

interface BookingStepTwoProps {
  formAction: (formData: FormData) => void;
  isPending: boolean;
  fieldErrors?: FieldErrors;
  clearFieldError?: (field: string) => void;
}

export const BookingStepTwo: React.FC<BookingStepTwoProps> = ({ formAction, isPending, fieldErrors = {}, clearFieldError }) => {
  const { t } = useTranslation("home");
  const dispatch = useDispatch();
  const bookingForm = useSelector((state: RootState) => state.booking.bookingForm);
  const customerForm = useSelector((state: RootState) => state.booking.customerForm);

  const handleCustomerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setCustomerForm({ ...customerForm, [e.target.name]: e.target.value }));
    clearFieldError?.(e.target.name);
  };

  return (
    <form action={formAction} className="space-y-5">
      {/* Hidden inputs for booking step values */}
      <input type="hidden" name="serviceType" value={bookingForm.serviceType || ""} />
      <input type="hidden" name="homeSize" value={bookingForm.homeSize || ""} />
      <input type="hidden" name="frequency" value={bookingForm.frequency || ""} />

      <div className="mb-6">
        <h2 className="text-[1.5625rem] leading-[1.5625rem] text-ink tracking-tight mb-3">{t("customerForm.title")}</h2>
        <p className="text-[0.875rem] leading-[1.46875rem] text-muted">{t("customerForm.intro")}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[1.5625rem] gap-y-5">
        {(t("customerForm.fields", { returnObjects: true }) as Array<{ name: string; type: string; placeholder: string }>).map((field, idx) => (
          <div key={idx} className={field.name === 'specialInstructions' || field.name === 'accessInstructions' || field.name === 'priorityAreas' ? 'md:col-span-2' : ''}>
            <label htmlFor={field.name} className={labelClass}>
              {field.placeholder}
            </label>
            <input
              name={field.name}
              type={field.type}
              id={field.name}
              placeholder={`Enter your ${field.placeholder.toLowerCase()}...`}
              className={fieldClass(!!fieldErrors[field.name])}
              required={['fullName', 'email', 'phone', 'address'].includes(field.name)}
              value={customerForm[field.name] || ""}
              onChange={handleCustomerChange}
            />
            <FieldError name={field.name} errors={fieldErrors} />
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          type="button"
          disabled={isPending}
          className="flex-1 h-[2.6875rem] bg-white border border-line text-ink text-[0.75rem] rounded-[0.4375rem] font-bold hover:bg-sage transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => dispatch(setBookingStep(1))}
        >
          {t("customerForm.backLabel")}
        </button>
        <SubmitButton />
      </div>
    </form>
  );
};
