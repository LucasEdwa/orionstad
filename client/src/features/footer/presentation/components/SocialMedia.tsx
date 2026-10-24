import React from 'react';
import { useTranslation } from 'react-i18next';
import { SocialIconRepository } from '../../infrastructure/SocialIconRepository';
import type { SocialLink } from '../../domain/entities/Footer';

interface SocialMediaProps {
  social: SocialLink[];
}

export const SocialMedia: React.FC<SocialMediaProps> = ({ social }) => {
  const { t } = useTranslation('footer');
  const socialIconRepository = new SocialIconRepository();

  return (
    <div>
      <h4 className="eyebrow mb-4">
        {t('connectTitle', 'Connect With Us')}
      </h4>
      <div className="space-y-3">
        {social.map(link => {
          const Icon = socialIconRepository.getIcon(link.icon);
          
          return (
            <a
              key={link.href}
              href={link.href}
              className="text-[0.8125rem] text-muted hover:text-olive transition-colors duration-200 flex items-center gap-3 group"
              target="_blank"
              rel="noopener noreferrer"
            >
              {Icon && (
                <Icon className="text-[0.9375rem] text-olive" />
              )}
              <span>{link.label}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
};
