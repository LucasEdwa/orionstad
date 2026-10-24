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
      <h4 className="eyebrow mb-4">
        {t('quickLinksTitle', 'Quick Links')}
      </h4>
      <ul className="space-y-3">
        {links.map(link => (
          <li key={link.href}>
            <a 
              href={link.href} 
              className="text-[0.8125rem] text-muted hover:text-olive transition-colors duration-200"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
