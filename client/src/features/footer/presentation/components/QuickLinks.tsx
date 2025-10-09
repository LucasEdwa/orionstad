import React from 'react';
import { useTranslation } from 'react-i18next';
import type { FooterLink } from '../../domain/entities/Footer';

interface QuickLinksProps {
  links: FooterLink[];
}

export const QuickLinks: React.FC<QuickLinksProps> = ({ links }) => {
  const { t } = useTranslation('footer');

  return (
    <div>
      <h4 className="text-lg font-semibold mb-4 text-gray-800">
        {t('quickLinksTitle', 'Quick Links')}
      </h4>
      <ul className="space-y-3">
        {links.map(link => (
          <li key={link.href}>
            <a 
              href={link.href} 
              className="text-gray-800 hover:text-gray-600 hover:underline transition-colors duration-200 flex items-center group"
            >
              <span className="mr-2 group-hover:translate-x-1 transition-transform duration-200">→</span>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
