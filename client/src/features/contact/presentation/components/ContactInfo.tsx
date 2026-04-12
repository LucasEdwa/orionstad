import { useTranslation } from 'react-i18next';
import type { ContactSection } from '../../domain/entities/Contact';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa';
import { memo } from 'react';
interface ContactInfoProps {
  contactSection: ContactSection | null;
}

export const ContactInfo = memo<ContactInfoProps>(({ contactSection }) => {
  const { t } = useTranslation('contact');

  if (!contactSection) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-3">
        {contactSection.title}
      </h2>
      <p className="text-gray-600 text-sm mb-4">{contactSection.intro}</p>
      
      <div className="space-y-3">
        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
          <div className="p-2 rounded-full">
            <FaEnvelope className="w-4 h-4 text-gray-400" />
          </div>
          <div>
            <p className="font-semibold text-gray-800">Email</p>
            <a 
              href={contactSection.emailHref} 
              className="text-[#CDB697] hover:underline"
            >
              {contactSection.email}
            </a>
          </div>
        </div>

        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
          <div className="p-2 rounded-full">
            <FaPhone className="w-4 h-4 text-gray-400" />
          </div>
          <div>
            <p className="font-semibold text-gray-800">Phone</p>
            <a 
              href={`tel:${contactSection.phone}`}
              className="text-[#CDB697] hover:underline"
            >
              {contactSection.phone}
            </a>
          </div>
        </div>

        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
          <div className="p-2 rounded-full">
            <FaMapMarkerAlt className="w-4 h-4 text-gray-400" />
          </div>
          <div>
            <p className="font-semibold text-gray-800">Address</p>
            <p className="text-[#CDB697]">{contactSection.address}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-xl">
          <div className="bg-green-100 p-2 rounded-full">
            <FaWhatsapp className="w-4 h-4 text-green-600" />
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
});
