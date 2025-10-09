import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import type { ContactSection } from '../../domain/entities/Contact';
import { FaCheckCircle } from 'react-icons/fa';

interface WhyContactUsProps {
  whyContactSection: ContactSection | null;
}

export const WhyContactUs = memo<WhyContactUsProps>(({ whyContactSection }) => {
  const { t } = useTranslation('contact');
  
  if (!whyContactSection) {
    return null;
  }

  return (
    <div className=" rounded-2xl shadow-lg p-8 text-gray-800">
      <h3 className="text-2xl font-bold mb-4">{whyContactSection.title}</h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        {whyContactSection.paragraphs?.[1]}
      </p>
      <div className="flex items-center space-x-2 text-gray-700 mb-2">
        <FaCheckCircle className="w-5 h-5" />
        <span className="text-sm">{t('businessHours.responseTime')}</span>
      </div>
    </div>
  );
});
