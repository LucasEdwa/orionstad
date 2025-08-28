import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import type { RootState } from "../../../../store";
import { setBookingStep, setBookingForm } from "../../../../store/bookingSlice";
import { FaHome, FaCalendar, FaArrowRight } from 'react-icons/fa';

interface BookingStepOneProps {
  onNext: () => void;
}

export const BookingStepOne: React.FC<BookingStepOneProps> = ({ onNext }) => {
  const { t } = useTranslation("home");
  const dispatch = useDispatch();
  const bookingForm = useSelector((state: RootState) => state.booking.bookingForm);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    dispatch(setBookingForm({ ...bookingForm, [e.target.name]: e.target.value }));
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setBookingStep(2));
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">{t("bookingForm.title")}</h2>
        <p className="text-gray-600 leading-relaxed">{t("bookingForm.intro")}</p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          <FaHome className="inline w-4 h-4 mr-2" />
          {t("bookingForm.serviceLabel")}
        </label>
        <select
          name="serviceType"
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
          required
          value={bookingForm.serviceType || ""}
          onChange={handleChange}
        >
          {(t("bookingForm.serviceOptions", { returnObjects: true }) as Array<{ value: string; label: string }>).map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
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
        <select
          name="frequency"
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
          required
          value={bookingForm.frequency || ""}
          onChange={handleChange}
        >
          {(t("bookingForm.frequencyOptions", { returnObjects: true }) as Array<{ value: string; label: string }>).map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
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
