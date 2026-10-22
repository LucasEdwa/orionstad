export interface FAQItem {
  question: string;
  answer: string;
}

// Also feeds the FAQPage structured data in pages/Home.tsx, so schema and visible text stay identical
export const EN_FAQS: FAQItem[] = [
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
      'Booking is easy. Use the online form on this page, call us at +46 76 327 22 83, or reach us on WhatsApp. We will confirm your appointment and answer any questions about your specific cleaning needs.',
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
