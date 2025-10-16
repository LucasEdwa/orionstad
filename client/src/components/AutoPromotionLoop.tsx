
import React from "react";
import { useTranslation } from "react-i18next";
import { FaRegLightbulb, FaRegStar, FaLeaf, FaBullhorn } from "react-icons/fa";

export const AutoPromotionLoop: React.FC = () => {
  const { t } = useTranslation("home");
  const messages = t("autumnPromotionMessages", { returnObjects: true }) as string[];

  // Pick first two messages for the cards (fallback to empty string if not enough)
  const card1 = messages[0] || "";
  const card2 = messages[1] || "";

  return (
    <section className="w-full py-4 bg-gradient-to-r from-orange-100/30 to-[#e2d8cc93]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full px-4">
        <div className="rounded-2xl animate-pulse max-w-sm lg:max-w-full bg-white shadow-lg border border-orange-200 flex items-center px-6 py-4 min-h-[202px] transition hover:scale-[1.03] hover:shadow-xl col-span-1 lg:col-span-2">
          <span className="text-lg font-semibold text-orange-700 flex items-center justify-start gap-2">
            <FaLeaf className="text-orange-400 text-5xl" aria-label="autumn" />
            {card1}
          </span>
        </div>
        <div className="rounded-2xl bg-gray-50 shadow-lg flex flex-col lg:max-w-full px-6 py-6 transition hover:scale-[1.03] hover:shadow-xl col-span-1 lg:col-span-8">
          <h3 className="text-xl font-bold text-[#d2b093] flex items-center gap-2 mb-2">
            <FaRegStar className="text-[#d2b093]" aria-label="sparkle" />
            {t('autumnStoryTitle', 'This Autumn, a New Story Begins')}
          </h3>
          <p className="text-base text-black mb-3">
            {card2}
          </p>
          <div className="flex flex-col gap-2 pl-2 border-l-4 border-[#d2b093]/30">
            {messages.slice(2).map((msg, i) => (
              <div key={i} className="text-base text-black flex gap-2 items-start">
                <FaRegLightbulb className="mt-0.5 text-[#d2b093] flex-shrink-0" aria-label="info" />
                <span>{msg}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl bg-gradient-to-br from-yellow-100 to-orange-200 shadow-lg flex flex-col items-center justify-center px-4 py-4 min-h-[202px] transition hover:scale-[1.03] hover:shadow-xl col-span-1 lg:col-span-2">
          <FaBullhorn className="text-3xl text-orange-500 mb-2" aria-label="marketing" />
          <span className="text-base font-semibold text-orange-700 text-center">
            {t('marketingPromo.title', '20% Off for New Customers!')}<br />
            <span className="font-normal text-orange-600">
              {t('marketingPromo.description', 'Start this autumn with a healthier, happier home. Enjoy 20% off your first cleaning and give your family the gift of well-being and peace of mind.')}
            </span>
          </span>
        </div>
      </div>
    </section>
  );
};
