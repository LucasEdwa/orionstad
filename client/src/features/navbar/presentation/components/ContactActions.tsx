import { FaPhone, FaWhatsapp } from "react-icons/fa";
import type { ContactInfo } from "../../domain/entities/NavLink";

interface ContactActionsProps {
  contactInfo: ContactInfo;
  isScrolled: boolean;
}

export const ContactActions: React.FC<ContactActionsProps> = ({ contactInfo, isScrolled }) => {
  return (
    <div className="flex items-center space-x-3 border-l border-purple-300 pl-6">
      <a
        href={`tel:${contactInfo.phone}`}
        className={`p-2 rounded-full transition-all duration-200 ${
          isScrolled 
            ? 'text-gray-600 hover:text-purple-600 hover:bg-purple-50' 
            : 'text-white hover:text-purple-200 hover:bg-white/10'
        }`}
        title="Call us"
      >
        <FaPhone className="w-4 h-4" />
      </a>
      <a
        href={contactInfo.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className={`p-2 rounded-full transition-all duration-200 ${
          isScrolled 
            ? 'text-gray-600 hover:text-green-600 hover:bg-green-50' 
            : 'text-white hover:text-green-200 hover:bg-white/10'
        }`}
        title="WhatsApp us"
      >
        <FaWhatsapp className="w-4 h-4" />
      </a>
      <a
        href="/#booking"
        className="bg-orion-gradient text-white px-6 py-2 rounded-full font-semibold transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
      >
        {contactInfo.bookNow}
      </a>
    </div>
  );
};
