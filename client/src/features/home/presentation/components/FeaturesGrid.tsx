import { useTranslation } from "react-i18next";
import type { Feature } from "../../domain/entities/Feature";
import { memo } from "react";

interface FeaturesGridProps {
  features: Feature[];
}

export const FeaturesGrid = memo<FeaturesGridProps>(({ features }) => {
  const { t } = useTranslation("home");
  
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">{t("features.title")}</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t("features.subtitle")}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                <feature.icon className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});