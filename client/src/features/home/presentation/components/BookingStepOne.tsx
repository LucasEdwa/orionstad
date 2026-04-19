import { useTranslation } from "react-i18next";
import { Dropdown } from './Dropdown';
import { FaHome, FaCalendar, FaArrowRight } from 'react-icons/fa';
import { memo } from "react";
import { useBookingFormOptions } from '../hooks/useBookingFormOptions';
import { useBookingFormHandlers } from '../hooks/useBookingFormHandlers';
import { useBookingFormSubmit } from '../hooks/useBookingFormSubmit';
import { FieldError } from '../../../../components/FieldError';
interface BookingStepOneProps {
  onNext: () => void;
}

export const BookingStepOne: React.FC<BookingStepOneProps> = memo(({ onNext }) => {
  const { t } = useTranslation("home");
  const { serviceOptions, frequencyOptions } = useBookingFormOptions();
  const { bookingForm, handleServiceSelect, handleFrequencySelect, handleChange } = useBookingFormHandlers();
  const { handleSubmit, fieldErrors, clearFieldError } = useBookingFormSubmit(onNext);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">{t("bookingForm.title")}</h2>
        <p className="text-gray-600 leading-relaxed">{t("bookingForm.intro")}</p>
      </div>

      <div>
        <Dropdown
          options={serviceOptions}
          value={bookingForm.serviceType}
          onChange={(val) => { handleServiceSelect(val); clearFieldError('serviceType'); }}
          label={t("bookingForm.serviceLabel")}
          icon={<FaHome className="inline w-4 h-4 mr-2" />}
          id="service"
        />
        <FieldError name="serviceType" errors={fieldErrors} />
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
          className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#CDB697] focus:border-transparent transition-all duration-200 ${fieldErrors.homeSize ? 'border-red-500' : 'border-gray-300'}`}
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
          icon={<FaCalendar className="inline w-4 h-4 mr-2" />}
          id="frequency"
        />
        <FieldError name="frequency" errors={fieldErrors} />
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

})