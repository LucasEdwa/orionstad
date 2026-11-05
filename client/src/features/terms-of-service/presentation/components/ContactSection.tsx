import { FaInfoCircle } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import type { ContactAction } from '../../domain/entities/TermsOfService';

interface ContactSectionProps {
  actions: ContactAction[];
}

export const ContactSection = ({ actions }: ContactSectionProps) => {
  const { t } = useTranslation("common");
  const getHref = (action: ContactAction): string => {
    switch (action.type) {
      case 'whatsapp':
      case 'email':
        return `mailto:${action.value}`;
      default:
        return action.value;
    }
  };

  const getButtonStyles = (action: ContactAction): string => {
    if (action.primary) {
      return "bg-[#163B48] hover:bg-[#0F2C36] text-white px-8 py-3 rounded-full font-semibold transition-colors inline-flex items-center justify-center gap-2";
    }
    return "bg-white hover:bg-gray-50 text-[#163B48] border-2 border-[#163B48] px-8 py-3 rounded-full font-semibold transition-colors inline-flex items-center justify-center gap-2";
  };

  const getIcon = (action: ContactAction) => {
    if (action.icon === 'FaInfoCircle') {
      return <FaInfoCircle />;
    }
    return <span>{action.icon}</span>;
  };

  return (
    <div className="bg-gradient-to-r from-[#F3F5EF] to-[#F3F5EF] rounded-2xl p-8 text-center">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">{t("terms.questionsTitle")}</h3>
      <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
        {t("terms.questionsText")}
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        {actions.map((action) => (
          <a
            key={action.id}
            href={getHref(action)}
            {...(action.type === 'whatsapp' ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className={getButtonStyles(action)}
          >
            {getIcon(action)}
            {action.label}
          </a>
        ))}
      </div>
    </div>
  );
};
