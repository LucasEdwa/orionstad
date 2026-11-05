import type { TermsOfServiceRepository } from '../domain/repositories/TermsOfServiceRepository';
import type { TermsOfService, TrustIndicator, ContactAction } from '../domain/entities/TermsOfService';
import i18n from '../../../i18n';

const t = (key: string) => i18n.t(key, { ns: 'common' });

export class TermsOfServiceRepositoryImpl implements TermsOfServiceRepository {
  getTermsOfService(): TermsOfService {
    return {
      id: 'terms-of-service-v1',
      title: t('terms.title'),
      lastUpdated: t('terms.lastUpdated'),
      description: t('terms.description'),
      sections: [
        {
          id: 'privacy-policy',
          heading: t('terms.safetyHeading'),
          items: i18n.t('terms.safetyItems', { ns: 'common', returnObjects: true }) as unknown as string[],
          order: 1,
          type: 'privacy'
        },
        {
          id: 'terms-conditions',
          heading: t('terms.privacyHeading'),
          content: t('terms.privacyContent'),
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
        title: t('terms.trust.insured.title'),
        description: t('terms.trust.insured.description'),
        order: 1
      },
      {
        id: 'five-star-service',
        icon: '⭐',
        title: t('terms.trust.service.title'),
        description: t('terms.trust.service.description'),
        order: 2
      },
      {
        id: 'transparent',
        icon: '🤝',
        title: t('terms.trust.transparent.title'),
        description: t('terms.trust.transparent.description'),
        order: 3
      }
    ];
  }

  getContactActions(): ContactAction[] {
    return [
      {
        id: 'contact-us',
        type: 'link',
        label: t('terms.contactUs'),
        value: '/contact',
        icon: 'FaInfoCircle',
        primary: true
      },
      {
        id: 'whatsapp',
        type: 'whatsapp',
        label: t('terms.whatsapp'),
        value: 'https://wa.me/46763272283',
        icon: '💬',
        primary: false
      }
    ];
  }
}
