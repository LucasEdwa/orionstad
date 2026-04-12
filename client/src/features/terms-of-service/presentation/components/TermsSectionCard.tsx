import { FaShieldAlt, FaInfoCircle, FaCheckCircle } from "react-icons/fa";
import type { TermsSection } from '../../domain/entities/TermsOfService';
import { useCallback } from 'react';

interface TermsSectionCardProps {
  section: TermsSection;
  colorScheme: { from: string; to: string };
}

export const TermsSectionCard = ({ section, colorScheme }: TermsSectionCardProps) => {
  const getIcon = useCallback(() => {
    switch (section.type) {
      case 'privacy':
        return <FaShieldAlt className="text-xl" />;
      case 'terms':
        return <FaInfoCircle className="text-xl" />;
      default:
        return <FaCheckCircle className="text-xl" />;
    }
  }, [section.type]);

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div className={`bg-gradient-to-r ${colorScheme.from} ${colorScheme.to} text-white p-6`}>
        <h2 className="text-2xl font-bold flex items-center gap-3">
          {getIcon()}
          {section.heading}
        </h2>
      </div>
      
      <div className="p-6">
        {section.items ? (
          <div className="grid gap-4">
            {section.items.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <FaCheckCircle className="text-[#98754C] text-lg mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed text-lg">
              {section.content}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
