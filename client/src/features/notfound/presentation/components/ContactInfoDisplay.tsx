import type { ContactInfo } from '../../domain/entities/NavigationItem';
import { useCallback } from 'react';

interface ContactInfoDisplayProps {
  contacts: ContactInfo[];
}

export const ContactInfoDisplay = ({ contacts }: ContactInfoDisplayProps) => {
  const getHref = useCallback((contact: ContactInfo): string => {
    return contact.type === 'phone' ? `tel:${contact.value}` : `mailto:${contact.value}`;
  }, []);

  return (
    <div className="mt-8 text-center">
      <p className="text-gray-500 mb-4">Still need help finding what you're looking for?</p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
        {contacts.map((contact) => (
          <a
            key={contact.id}
            href={getHref(contact)}
            className="text-purple-600 hover:text-purple-700 font-medium transition-colors"
          >
            {contact.icon} {contact.displayValue}
          </a>
        ))}
      </div>
    </div>
  );
};
