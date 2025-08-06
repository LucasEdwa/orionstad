import React from 'react';
import { useTranslation } from 'react-i18next';
import type { ContactSection } from '../../domain/entities/Contact';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa';

interface ContactInfoProps {
  contactSection: ContactSection | null;
}

export const ContactInfo: React.FC<ContactInfoProps> = ({ contactSection }) => {
  const { t } = useTranslation('contact');

  if (!contactSection) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        {contactSection.title}
      </h2>
      <p className="text-gray-600 mb-6">{contactSection.intro}</p>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
          <div className="bg-purple-100 p-3 rounded-full">
            <FaEnvelope className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <p className="font-semibold text-gray-800">Email</p>
            <a 
              href={contactSection.emailHref} 
              className="text-purple-600 hover:underline"
            >
              {contactSection.email}
            </a>
          </div>
        </div>

        <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
          <div className="bg-purple-100 p-3 rounded-full">
            <FaPhone className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <p className="font-semibold text-gray-800">Phone</p>
            <a 
              href={`tel:${contactSection.phone}`}
              className="text-purple-600 hover:underline"
            >
              {contactSection.phone}
            </a>
          </div>
        </div>

        <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
          <div className="bg-purple-100 p-3 rounded-full">
            <FaMapMarkerAlt className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <p className="font-semibold text-gray-800">Address</p>
            <p className="text-gray-600">{contactSection.address}</p>
          </div>
        </div>

        <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-xl">
          <div className="bg-green-100 p-3 rounded-full">
            <FaWhatsapp className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="font-semibold text-gray-800">WhatsApp</p>
            <a 
              href={contactSection.whatsapp} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-green-600 hover:underline"
            >
              {contactSection.whatsappLabel || t('sections.2.whatsappLabel', 'Send us a message')}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
