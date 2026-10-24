import { useTranslation } from "react-i18next";
import { Dropdown } from './Dropdown';
import { FaHome, FaCalendar, FaArrowRight } from 'react-icons/fa';
import { memo } from "react";
import { useBookingFormOptions } from '../hooks/useBookingFormOptions';
import { useBookingFormHandlers } from '../hooks/useBookingFormHandlers';
import { useBookingFormSubmit } from '../hooks/useBookingFormSubmit';
import { FieldError } from '../../../../components/FieldError';
import { buttonClass, fieldClass, labelClass } from '../../../../components/ui/styles';
interface BookingStepOneProps {
  onNext: () => void;
  /** h1 when the form is the page's main content (/booking), h2 when embedded on the home page */
  headingLevel?: 'h1' | 'h2';
}

export const BookingStepOne: React.FC<BookingStepOneProps> = memo(({ onNext, headingLevel: Heading = 'h2' }) => {
  const { t } = useTranslation("home");
  const { serviceOptions, frequencyOptions } = useBookingFormOptions();
  const { bookingForm, handleServiceSelect, handleFrequencySelect, handleChange } = useBookingFormHandlers();
  const { handleSubmit, fieldErrors, clearFieldError } = useBookingFormSubmit(onNext);

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="mb-6">
        <Heading className="text-[1.5625rem] leading-[1.5625rem] text-ink tracking-tight mb-3">{t("bookingForm.title")}</Heading>
        <p className="text-[0.875rem] leading-[1.46875rem] text-muted">{t("bookingForm.intro")}</p>
      </div>

      <div>
        <Dropdown
          options={serviceOptions}
          value={bookingForm.serviceType}
          onChange={(val) => { handleServiceSelect(val); clearFieldError('serviceType'); }}
          label={t("bookingForm.serviceLabel")}
          icon={<FaHome className="inline w-3 h-3 mr-1.5 text-olive" />}
          id="service"
        />
        <FieldError name="serviceType" errors={fieldErrors} />
      </div>

      <div>
        <label className={labelClass}>
          <FaHome className="inline w-3 h-3 mr-1.5 text-olive" />
          {t("bookingForm.sizeLabel")}
        </label>
        <input
          name="homeSize"
          type="number"
          min="0"
          placeholder="Enter size in m²"
          className={fieldClass(!!fieldErrors.homeSize)}
          required
          value={bookingForm.homeSize || ""}
          onChange={(e) => { handleChange(e); clearFieldError('homeSize'); }}
        />
        <FieldError name="homeSize" errors={fieldErrors} />
      </div>

      <div>
        <Dropdown
          options={frequencyOptions}
          value={bookingForm.frequency}
          onChange={(val) => { handleFrequencySelect(val); clearFieldError('frequency'); }}
          label={t("bookingForm.frequencyLabel")}
          icon={<FaCalendar className="inline w-3 h-3 mr-1.5 text-olive" />}
          id="frequency"
        />
        <FieldError name="frequency" errors={fieldErrors} />
      </div>

      <button
        type="submit"
        className={buttonClass('primary', 'w-full justify-center')}
      >
        <span>{t("bookingForm.nextLabel")}</span>
        <FaArrowRight className="w-4 h-4" />
      </button>
    </form>
  );

})