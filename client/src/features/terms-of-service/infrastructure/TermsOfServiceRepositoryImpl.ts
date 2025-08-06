import type { TermsOfServiceRepository } from '../domain/repositories/TermsOfServiceRepository';
import type { TermsOfService, TrustIndicator, ContactAction } from '../domain/entities/TermsOfService';
import { TERMS_OF_SERVICE } from '../../../constants/termsOfService';

export class TermsOfServiceRepositoryImpl implements TermsOfServiceRepository {
  getTermsOfService(): TermsOfService {
    return {
      id: 'terms-of-service-v1',
      title: TERMS_OF_SERVICE.title,
      lastUpdated: 'August 2025',
      description: 'We believe in transparency. Here are the terms that govern our cleaning services, written in clear, understandable language.',
      sections: [
        {
          id: 'privacy-policy',
          heading: TERMS_OF_SERVICE.sections[0].heading,
          items: TERMS_OF_SERVICE.sections[0].items,
          order: 1,
          type: 'privacy'
        },
        {
          id: 'terms-conditions',
          heading: TERMS_OF_SERVICE.sections[1].heading,
          content: TERMS_OF_SERVICE.sections[1].content,
          order: 2,
          type: 'terms'
        }
      ]
    };
  }

  getTrustIndicators(): TrustIndicator[] {
    return [
      {
        id: 'fully-insured',
        icon: '🔒',
        title: 'Fully Insured',
        description: 'Complete protection for your peace of mind',
        order: 1
      },
      {
        id: 'five-star-service',
        icon: '⭐',
        title: '5-Star Service',
        description: 'Consistently rated excellent by our clients',
        order: 2
      },
      {
        id: 'transparent',
        icon: '🤝',
        title: 'Transparent',
        description: 'Clear terms, honest pricing, no surprises',
        order: 3
      }
    ];
  }

  getContactActions(): ContactAction[] {
    return [
      {
        id: 'contact-us',
        type: 'link',
        label: 'Contact Us',
        value: '/contact',
        icon: 'FaInfoCircle',
        primary: true
      },
      {
        id: 'call-now',
        type: 'phone',
        label: 'Call Now',
        value: '+4670418097',
        icon: '📞',
        primary: false
      }
    ];
  }
}
