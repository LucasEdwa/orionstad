import React from 'react';
import { useTranslation } from 'react-i18next';
import type { ContactSection } from '../../domain/entities/Contact';
import { FaCheckCircle } from 'react-icons/fa';

interface WhyContactUsProps {
  whyContactSection: ContactSection | null;
}

export const WhyContactUs: React.FC<WhyContactUsProps> = ({ whyContactSection }) => {
  const { t } = useTranslation('contact');
  
  if (!whyContactSection) {
    return null;
  }

  return (
    <div className="bg-orion-gradient rounded-2xl shadow-lg p-8 text-white">
      <h3 className="text-2xl font-bold mb-4">{whyContactSection.title}</h3>
      <p className="text-purple-100 leading-relaxed mb-4">
        {whyContactSection.paragraphs?.[1]}
      </p>
      <div className="flex items-center space-x-2 text-purple-200">
        <FaCheckCircle className="w-5 h-5" />
        <span className="text-sm">{t('businessHours.responseTime')}</span>
      </div>
    </div>
  );
};
