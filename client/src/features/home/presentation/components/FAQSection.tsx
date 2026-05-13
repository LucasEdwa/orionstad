import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface FAQItem {
  question: string;
  answer: string;
}

const EN_FAQS: FAQItem[] = [
  {
    question: 'What cleaning services do you offer in Stockholm?',
    answer:
      'We offer a full range of professional cleaning services in Stockholm and the surrounding area: regular home cleaning, deep cleaning, move-in/move-out cleaning, and office cleaning. All services can be scheduled as a one-time visit or on a recurring basis — weekly, bi-weekly, or monthly.',
  },
  {
    question: 'Are your cleaning products eco-friendly?',
    answer:
      'Yes. We use only eco-friendly, non-toxic products that are safe for children, pets, and people with allergies. Our commitment to sustainable cleaning means a healthier home for your family and a smaller environmental footprint.',
  },
  {
    question: 'How do I book a cleaning service?',
    answer:
      'Booking is easy. Use the online form on this page, call us at +46 70 418 05 97, or reach us on WhatsApp. We will confirm your appointment and answer any questions about your specific cleaning needs.',
  },
  {
    question: 'Are your cleaners insured and background-checked?',
    answer:
      'Absolutely. Every Orion Home cleaner is fully insured and has passed a thorough background check. We are a licensed, responsible cleaning company and take your trust and safety seriously on every visit.',
  },
  {
    question: 'What is the difference between regular cleaning and deep cleaning?',
    answer:
      'Regular cleaning covers routine maintenance — dusting, vacuuming, mopping, and cleaning bathrooms and kitchens. Deep cleaning goes further, targeting hard-to-reach areas, the inside of appliances, behind furniture, and built-up grime that regular cleaning does not address. We recommend a deep clean before starting a regular schedule or after long periods without cleaning.',
  },
  {
    question: 'Do you offer a satisfaction guarantee?',
    answer:
      'Yes. We stand behind our work with a 100% satisfaction guarantee. If you are not happy with any part of the cleaning, contact us within 24 hours and we will return to re-clean at no extra charge.',
  },
];

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
              >
                <span>{faq.question}</span>
                <span className="ml-4 text-xl text-gray-400 flex-shrink-0 leading-none">
                  {openIndex === i ? '−' : '+'}
                </span>
              </button>
              {openIndex === i && (
                <div className="px-6 pb-5 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
