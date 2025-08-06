import React from 'react';
import type { ContactSection } from '../../domain/entities/Contact';
import { FaCheckCircle } from 'react-icons/fa';

interface WhyContactUsProps {
  whyContactSection: ContactSection | null;
}

export const WhyContactUs: React.FC<WhyContactUsProps> = ({ whyContactSection }) => {
  if (!whyContactSection) {
    return null;
  }

  return (
    <div className="bg-gradient-to-br from-purple-900 to-purple-700 rounded-2xl shadow-lg p-8 text-white">
      <h3 className="text-2xl font-bold mb-4">{whyContactSection.title}</h3>
      <p className="text-purple-100 leading-relaxed mb-4">
        {whyContactSection.paragraphs?.[1]}
      </p>
      <div className="flex items-center space-x-2 text-purple-200">
        <FaCheckCircle className="w-5 h-5" />
        <span className="text-sm">We typically respond within 2 hours</span>
      </div>
    </div>
  );
};
