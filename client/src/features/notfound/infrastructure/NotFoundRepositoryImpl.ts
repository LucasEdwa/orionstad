import type { NotFoundRepository } from '../domain/repositories/NotFoundRepository';
import type { NavigationItem, ContactInfo, CleaningFact } from '../domain/entities/NavigationItem';

export class NotFoundRepositoryImpl implements NotFoundRepository {
  getNavigationItems(): NavigationItem[] {
    return [
      {
        id: 'services',
        title: 'Our Services',
        description: 'Explore our cleaning services',
        icon: '🏠',
        path: '/services',
        order: 1
      },
      {
        id: 'about',
        title: 'About Us',
        description: 'Learn about our story',
        icon: '👥',
        path: '/about',
        order: 2
      },
      {
        id: 'contact',
        title: 'Contact',
        description: 'Get in touch with us',
        icon: '📞',
        path: '/contact',
        order: 3
      }
    ];
  }

  getContactInfo(): ContactInfo[] {
    return [
      {
        id: 'phone',
        type: 'phone',
        value: '+4670418097',
        displayValue: '+46 70 418 05 97',
        icon: '📞'
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
      title: 'Did you know?',
      description: 'A clean and organized space can improve productivity by up to 76%! While you\'re here, why not book a cleaning service? 😊',
      ctaText: 'Book a cleaning',
      ctaPath: '/#booking',
      icon: '✨'
    };
  }
}
