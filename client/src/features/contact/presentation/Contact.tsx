import React from 'react';
import { useContactData } from './hooks/useContactData';
import { ContactDataService } from '../application/ContactDataService';
import { ContactHeroSection } from './components/ContactHeroSection';
import { QuickActions } from './components/QuickActions';
import { ContactForm } from './components/ContactForm';
import { ContactInfo } from './components/ContactInfo';
import { BusinessHoursSection } from './components/BusinessHoursSection';
import { WhyContactUs } from './components/WhyContactUs';

export const Contact: React.FC = () => {
  const contactData = useContactData();
  const contactDataService = new ContactDataService();

  const formSection = contactDataService.getContactSection(contactData.sections, 1);
  const contactSection = contactDataService.getContactInfo(contactData.sections);
  const whyContactSection = contactDataService.getWhyContactUs(contactData.sections);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <ContactHeroSection hero={contactData.hero} />

      {/* Quick Contact Actions */}
      <QuickActions quickActions={contactData.quickActions} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Form */}
          <ContactForm 
            formSection={formSection}
            whyContactSection={whyContactSection}
          />

          {/* Contact Information */}
          <div className="space-y-8">
            
            {/* Contact Details */}
            <ContactInfo contactSection={contactSection} />

            {/* Business Hours */}
            <BusinessHoursSection businessHours={contactData.businessHours} />

            {/* Why Contact Us */}
            <WhyContactUs whyContactSection={whyContactSection} />
          </div>
        </div>
      </main>
    </div>
  );
};
