import type { ContactInfo } from '../../domain/entities/NavigationItem';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

interface ContactInfoDisplayProps {
  contacts: ContactInfo[];
}

export const ContactInfoDisplay = ({ contacts }: ContactInfoDisplayProps) => {
  const { t } = useTranslation('common');
  const getHref = useCallback((contact: ContactInfo): string => {
    return contact.type === 'whatsapp' ? contact.value : `mailto:${contact.value}`;
  }, []);

  return (
    <div className="mt-8 text-center">
      <p className="text-gray-500 mb-4">{t('notFound.stillNeedHelp')}</p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
        {contacts.map((contact) => (
          <a
            key={contact.id}
            href={getHref(contact)}
            {...(contact.type === 'whatsapp' ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="text-olive hover:text-olive-dark font-medium transition-colors"
          >
            {contact.icon} {contact.displayValue}
          </a>
        ))}
      </div>
    </div>
  );
};
