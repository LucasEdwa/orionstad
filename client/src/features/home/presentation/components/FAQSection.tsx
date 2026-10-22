import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EN_FAQS } from './faqs';

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { t } = useTranslation('home');

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="bg-gray-50 py-16" aria-labelledby="faq-heading">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 id="faq-heading" className="text-3xl font-bold text-gray-800 mb-3">
            {t('faq.title')}
          </h2>
          <p className="text-gray-500 text-lg">{t('faq.subtitle')}</p>
        </div>

        <div className="space-y-3">
          {EN_FAQS.map((faq, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <button
                className="w-full text-left px-6 py-4 flex justify-between items-center font-semibold text-gray-800 hover:bg-gray-50 transition-colors"
                onClick={() => toggle(i)}
                aria-expanded={openIndex === i}
                aria-controls={`faq-answer-${i}`}
              >
                <span>{faq.question}</span>
                <span className="ml-4 text-xl text-gray-400 flex-shrink-0 leading-none">
                  {openIndex === i ? '−' : '+'}
                </span>
              </button>
              {/* Kept in the DOM while collapsed so crawlers can read every answer */}
              <div
                id={`faq-answer-${i}`}
                hidden={openIndex !== i}
                className="px-6 pb-5 text-gray-600 leading-relaxed border-t border-gray-100 pt-4"
              >
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
