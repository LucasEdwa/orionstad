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
      <h4 className="text-lg font-semibold mb-4 text-gray-800">
        {t('connectTitle', 'Connect With Us')}
      </h4>
      <div className="space-y-3">
        {social.map(link => {
          const Icon = socialIconRepository.getIcon(link.icon);
          
          return (
            <a
              key={link.href}
              href={link.href}
              className="text-gray-800 hover:text-gray-600 transition-colors duration-200 flex items-center gap-3 group"
              target="_blank"
              rel="noopener noreferrer"
            >
              {Icon && (
                <Icon className="text-xl group-hover:scale-110 transition-transform duration-200" />
              )}
              <span className="group-hover:underline">{link.label}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
};
