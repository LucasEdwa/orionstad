import { useTranslation } from "react-i18next";
import { FaHeart, FaMagic } from 'react-icons/fa';

export const AboutSection =() => {
  const { t } = useTranslation("home");

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* First Story Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 transform hover:scale-105 transition-all duration-300">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-purple-100 p-3 rounded-full">
              <FaHeart className="w-6 h-6 text-purple-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">{t("sections.0.title")}</h2>
          </div>
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>{t("sections.0.paragraphs.0")}</p>
            <p>{t("sections.0.paragraphs.1")}</p>
          </div>
        </div>

        {/* Second Story Card */}
        <div className="bg-orion-gradient rounded-2xl shadow-lg p-8 text-white transform hover:scale-105 transition-all duration-300">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-white/20 p-3 rounded-full">
              <FaMagic className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold">{t("sections.1.title")}</h2>
          </div>
          <div className="space-y-4 text-purple-100 leading-relaxed">
            <p>{t("sections.1.paragraphs.0")}</p>
            <p>{t("sections.1.paragraphs.1")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}