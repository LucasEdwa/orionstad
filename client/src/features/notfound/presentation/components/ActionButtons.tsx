import { Link } from "react-router";
import { FaHome, FaArrowLeft } from "react-icons/fa";
import { useTranslation } from "react-i18next";

interface ActionButtonsProps {
  onGoBack: () => void;
}

export const ActionButtons = ({ onGoBack }: ActionButtonsProps) => {
  const { t } = useTranslation("common");
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
      <Link
        to="/"
        className="bg-gradient-to-r from-olive to-olive hover:from-olive-dark hover:to-olive text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
      >
        <FaHome className="text-xl" />
        {t("notFound.home")}
      </Link>
      
      <button
        onClick={onGoBack}
        className="bg-white hover:bg-gray-50 text-olive border-2 border-olive px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-3"
      >
        <FaArrowLeft className="text-lg" />
        {t("notFound.back")}
      </button>
    </div>
  );
};
