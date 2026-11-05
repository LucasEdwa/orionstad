import { FaInfoCircle } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export const QuickSummary = () => {
  const { t } = useTranslation("common");

  return (
    <div className="bg-[#F3F5EF] border-l-4 border-[#55603A] p-6 rounded-r-xl mb-8">
      <div className="flex items-center gap-3 mb-3">
        <FaInfoCircle className="text-[#55603A] text-xl" />
        <h2 className="text-xl font-semibold text-[#163B48]">{t("terms.summaryTitle")}</h2>
      </div>
      <p className="text-[#58717A] leading-relaxed">
        {t("terms.summary")}
      </p>
    </div>
  );
};
