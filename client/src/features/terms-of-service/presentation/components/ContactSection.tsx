import { FaInfoCircle } from "react-icons/fa";
import type { ContactAction } from '../../domain/entities/TermsOfService';

interface ContactSectionProps {
  actions: ContactAction[];
}

export const ContactSection = ({ actions }: ContactSectionProps) => {
  const getHref = (action: ContactAction): string => {
    switch (action.type) {
      case 'phone':
        return `tel:${action.value}`;
      case 'email':
        return `mailto:${action.value}`;
      default:
        return action.value;
    }
  };

  const getButtonStyles = (action: ContactAction): string => {
    if (action.primary) {
      return "bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full font-semibold transition-colors inline-flex items-center justify-center gap-2";
    }
    return "bg-white hover:bg-gray-50 text-purple-600 border-2 border-purple-600 px-8 py-3 rounded-full font-semibold transition-colors inline-flex items-center justify-center gap-2";
  };

  const getIcon = (action: ContactAction) => {
    if (action.icon === 'FaInfoCircle') {
      return <FaInfoCircle />;
    }
    return <span>{action.icon}</span>;
  };

  return (
    <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl p-8 text-center">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Questions About Our Terms?</h3>
      <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
        We're always happy to clarify anything! Feel free to reach out if you have 
        questions about our terms or policies.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        {actions.map((action) => (
          <a
            key={action.id}
            href={getHref(action)}
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
