import React from 'react';
import { useFooterData } from '../hooks/useFooterData';
import { ReviewsWidget } from './ReviewsWidget';
import { CompanyInfo } from './CompanyInfo';
import { QuickLinks } from './QuickLinks';
import { SocialMedia } from './SocialMedia';
import { FooterBottom } from './FooterBottom';

export const Footer: React.FC = () => {
  const { footerData, reviewsWidget } = useFooterData();

  return (
    <footer className="bg-orion-gradient text-white">
      {/* Reviews Widget */}
      <ReviewsWidget widget={reviewsWidget} />

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <CompanyInfo 
            companyInfo={footerData.companyInfo} 
            address={footerData.address} 
          />

          {/* Quick Links */}
          <QuickLinks links={footerData.links} />

          {/* Social Media & Contact */}
          <SocialMedia social={footerData.social} />
        </div>

        {/* Bottom Bar */}
        <FooterBottom 
          copyright={footerData.copyright} 
          taglineBottom={footerData.taglineBottom} 
        />
      </div>
    </footer>
  );
};
