import React from 'react';
import { useTranslation } from 'react-i18next';
import type { ContactSection } from '../../domain/entities/Contact';
import { useContactForm } from '../hooks/useContactForm';

interface ContactFormProps {
  formSection: ContactSection | null;
  whyContactSection: ContactSection | null;
}

export const ContactForm: React.FC<ContactFormProps> = ({ 
  formSection, 
  whyContactSection 
}) => {
  const { t } = useTranslation('contact');
  const { handleSubmit, isSubmitting } = useContactForm();

  // Helper function to get the correct placeholder
  const getPlaceholder = (fieldName: string, fieldPlaceholder: string) => {
    // Try to get specific translation first
    const translationKey = `form.placeholders.${fieldName}`;
    const translation = t(translationKey, '');
    
    // If translation exists, use it; otherwise fall back to field placeholder
    return translation || fieldPlaceholder;
  };

  if (!formSection) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          {formSection.title}
        </h2>
        <p className="text-gray-600 leading-relaxed">
          {whyContactSection?.paragraphs?.[0]}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {(formSection.fields ?? []).map((field, idx) => (
          <div key={idx}>
            <label
              htmlFor={field.name}
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              {field.placeholder}
            </label>
            {field.type === "textarea" ? (
              <textarea
                name={field.name}
                id={field.name}
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
                required
                placeholder={getPlaceholder(field.name, field.placeholder)}
              />
            ) : (
              <input
                name={field.name}
                type={field.type}
                id={field.name}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                required
                placeholder={getPlaceholder(field.name, field.placeholder)}
              />
            )}
          </div>
        ))}
        
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-orion-gradient text-white py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-purple-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {t('form.sending')}
            </span>
          ) : (
            formSection.submitLabel || t('sections.1.submitLabel', 'Send Message')
          )}
        </button>
      </form>
    </div>
  );
};
