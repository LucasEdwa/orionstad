import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EN_FAQS } from './faqs';
import { Container } from '../../../../components/ui';

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { t } = useTranslation('home');

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="bg-white py-14" aria-labelledby="faq-heading">
      <Container>
        <div className="max-w-[47.5rem]">
          <div className="mb-8">
            <h2 id="faq-heading" className="text-[1.625rem] leading-[1.625rem] text-ink tracking-tight mb-4">
              {t('faq.title')}
            </h2>
            <p className="text-[0.875rem] text-muted">{t('faq.subtitle')}</p>
          </div>
  
          <div className="border-t border-line">
            {EN_FAQS.map((faq, i) => (
              <div key={i} className="border-b border-line">
                <button
                  className="w-full text-left py-[1.125rem] flex justify-between items-center text-[1rem] text-ink hover:text-olive transition-colors"
                  onClick={() => toggle(i)}
                  aria-expanded={openIndex === i}
                  aria-controls={`faq-answer-${i}`}
                >
                  <span>{faq.question}</span>
                  <span className="ml-4 text-[1.25rem] text-olive flex-shrink-0 leading-none">
                    {openIndex === i ? '−' : '+'}
                  </span>
                </button>
                {/* Kept in the DOM while collapsed so crawlers can read every answer */}
                <div
                  id={`faq-answer-${i}`}
                  hidden={openIndex !== i}
                  className="pb-[1.125rem] text-[0.875rem] leading-[1.46875rem] text-muted"
                >
                  {faq.answer}
                </div>
              </div>
            ))}
        </div>
        </div>
      </Container>
    </section>
  );
};
