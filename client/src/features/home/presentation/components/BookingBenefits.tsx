import { useTranslation } from "react-i18next";
import { FaCheckCircle } from 'react-icons/fa';

interface BookingBenefitsProps {
  benefits: string[];
}

export const BookingBenefits: React.FC<BookingBenefitsProps> = ({ benefits }) => {
  const { t } = useTranslation("home");
  
  return (
    <div className="space-y-6">
      <div className="bg-orion-gradient rounded-2xl shadow-lg p-8 text-white">
        <h3 className="text-2xl font-bold mb-6">{t("benefits.title")}</h3>
        <div className="space-y-4">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center space-x-3">
              <FaCheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
              <span className="text-purple-100">{benefit}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">{t("benefits.quickContact.title")}</h3>
        <p className="text-gray-600 mb-6">
          {t("benefits.quickContact.description")}
        </p>
        <div className="space-y-3">
          <a
            href="tel:+4670418097"
            className="flex items-center space-x-3 text-purple-600 hover:text-purple-700 transition-colors"
          >
            <div className="bg-purple-100 p-2 rounded-full">
              <FaCheckCircle className="w-4 h-4" />
            </div>
            <span className="font-medium">{t("benefits.quickContact.call")}</span>
          </a>
          <a
            href="https://wa.me/message/I6GQY6OWYB5FH1"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 text-green-600 hover:text-green-700 transition-colors"
          >
            <div className="bg-green-100 p-2 rounded-full">
              <FaCheckCircle className="w-4 h-4" />
            </div>
            <span className="font-medium">{t("benefits.quickContact.whatsapp")}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
