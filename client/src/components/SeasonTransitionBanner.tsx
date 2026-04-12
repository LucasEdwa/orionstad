import React from "react";
import { useTranslation } from "react-i18next";
import { FaSnowflake, FaLeaf } from "react-icons/fa";
import { Link } from "react-router-dom";

export const SeasonTransitionBanner: React.FC = () => {
  const { t } = useTranslation("home");
  return (
  <section className="w-full py-8 px-2 ">
      <div className="max-w-5xl mx-auto relative animate-float">
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="w-full h-full rounded-3xl   border border-white/40 shadow-xl" />
        </div>
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 px-8 py-10">
          <div className="flex items-center gap-4">
            <div className="relative">
              <FaLeaf className="text-orange-400 text-5xl drop-shadow-lg" aria-label="autumn" />
              <FaSnowflake className="absolute -bottom-2 -right-4 text-blue-400 text-3xl opacity-80" aria-label="winter" />
            </div>
            <span className="text-xl md:text-2xl font-extrabold text-zinc-500 break-words whitespace-normal max-w-xs md:max-w-md lg:max-w-lg">
              {t('seasonBanner.title', 'Autumn is almost over, winter is near!')}
            </span>
          </div>
          <div className="flex-1 md:ml-8">
            <div className="rounded-2xl  px-6 py-5 flex flex-col  items-center justify-between gap-4">
              <span className="text-lg md:text-sm font-medium text-gray-700">
                {t('seasonBanner.description',
                  'Prepare your home for the colder months. Book a deep cleaning now and enjoy a warm, healthy space all winter long!')}
              </span>
              <Link to="/services" className="inline-block mt-4 px-4 py-2 bg-orion-gradient text-white rounded-lg shadow hover:bg-blue-600">
                {t('seasonBanner.cta')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
