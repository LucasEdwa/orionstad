import { useTranslation } from "react-i18next";
import { FaCheckCircle } from 'react-icons/fa';

interface BookingBenefitsProps {
  benefits: string[];
}

export const BookingBenefits = ({ benefits }: BookingBenefitsProps) => {
  const { t } = useTranslation("home");
  
  return (
    <div className="space-y-6">
      {/** Benefits Section */}
      <div className="bg-white rounded-2xl shadow-lg p-8 text-gray-800">
        <h3 className="text-2xl font-bold mb-6">{t("benefits.title")}</h3>
        <div className="space-y-4">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center space-x-3">
              <FaCheckCircle className="w-5 h-5 text-gray-800 flex-shrink-0"  />
              <span className="text-gray-800">{benefit}</span>
            </div>
          ))}
        </div>
      </div>
      {/** Quick Contact Section */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">{t("benefits.quickContact.title")}</h3>
        <p className="text-gray-600 mb-6">
          {t("benefits.quickContact.description")}
        </p>
        <div className="space-y-3">
          <a
            href="tel:+4670418097"
            className="flex items-center space-x-3 text-gray-800 hover:text-gray-700 transition-colors"
          >
            <div className=" p-2 rounded-full">
              <FaCheckCircle className="w-4 h-4" />
            </div>
            <span className="font-medium text-gray-800">{t("benefits.quickContact.call")}</span>
          </a>
          <a
            href="https://wa.me/message/I6GQY6OWYB5FH1"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 text-gray-800 hover:text-green-700 transition-colors"
          >
            <div className="p-2 rounded-full">
              <FaCheckCircle className="w-4 h-4" />
            </div>
            <span className="font-medium text-gray-800">{t("benefits.quickContact.whatsapp")}</span>
          </a>
        </div>
      </div>
    </div>
  );
}