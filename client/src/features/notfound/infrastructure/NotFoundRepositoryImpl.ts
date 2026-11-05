import type { NotFoundRepository } from '../domain/repositories/NotFoundRepository';
import type { NavigationItem, ContactInfo, CleaningFact } from '../domain/entities/NavigationItem';
import i18n from '../../../i18n';

const t = (key: string) => i18n.t(key, { ns: 'common' });

export class NotFoundRepositoryImpl implements NotFoundRepository {
  getNavigationItems(): NavigationItem[] {
    return [
      {
        id: 'services',
        title: t('notFound.nav.services.title'),
        description: t('notFound.nav.services.description'),
        icon: '🏠',
        path: '/services',
        order: 1
      },
      {
        id: 'about',
        title: t('notFound.nav.about.title'),
        description: t('notFound.nav.about.description'),
        icon: '👥',
        path: '/about',
        order: 2
      },
      {
        id: 'contact',
        title: t('notFound.nav.contact.title'),
        description: t('notFound.nav.contact.description'),
        icon: '📞',
        path: '/contact',
        order: 3
      }
    ];
  }

  getContactInfo(): ContactInfo[] {
    return [
      {
        id: 'whatsapp',
        type: 'whatsapp',
        value: 'https://wa.me/46763272283',
        displayValue: t('notFound.whatsapp'),
        icon: '💬'
      },
      {
        id: 'email',
        type: 'email',
        value: 'polly@orionstad.se',
        displayValue: 'polly@orionstad.se',
        icon: '✉️'
      }
    ];
  }

  getCleaningFact(): CleaningFact {
    return {
      id: 'productivity-fact',
      title: t('notFound.fact.title'),
      description: t('notFound.fact.description'),
      ctaText: t('notFound.fact.cta'),
      ctaPath: '/contact',
      icon: '✨'
    };
  }
}
