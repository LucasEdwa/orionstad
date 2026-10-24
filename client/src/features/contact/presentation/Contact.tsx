import React from 'react';
import { useContactData } from './hooks/useContactData';
import { ContactForm } from './components/ContactForm';
import { ContactInfo } from './components/ContactInfo';
import { useServicesData } from '../../services';
import { Container, PageHeader } from '../../../components/ui';

export const Contact: React.FC = () => {
  const { page, channels, form } = useContactData();
  const { services } = useServicesData();
  const serviceOptions = services.map((service) => ({ value: service.id, label: service.title }));

  return (
    <div className="bg-white">
      <PageHeader eyebrow={page.eyebrow} title={page.title} subtitle={page.subtitle} />

      <main>
        {/* Design PDF, page 4: 385px channel column, 545px form card, 32px below the header */}
        <Container className="pt-8 pb-14">
          <div className="grid grid-cols-1 lg:grid-cols-[24.0625rem_34.0625rem] lg:justify-between gap-10 items-start">
            {/* Contact channels */}
            <ContactInfo channels={channels} />

            {/* Contact Form */}
            <ContactForm copy={form} serviceOptions={serviceOptions} />
          </div>
        </Container>
      </main>
    </div>
  );
};
