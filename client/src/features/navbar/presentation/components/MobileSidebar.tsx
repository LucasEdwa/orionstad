import React from "react";
import { FaPhone, FaWhatsapp } from "react-icons/fa";
import type { NavLink, ContactInfo, BrandInfo } from "../../domain/entities/NavLink";
import { memo } from "react";
import { useTranslation } from "react-i18next";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  links: NavLink[];
  contactInfo: ContactInfo;
  brandInfo: BrandInfo;
}

export const MobileSidebar = memo<MobileSidebarProps>(({
  isOpen,
  onClose,
  links,
  contactInfo,
  brandInfo
}) => {
  const { t } = useTranslation('navbar');
    // Prevent body scroll when sidebar is open
    React.useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
      return () => {
        document.body.style.overflow = '';
      };
    }, [isOpen]);
  return (
    <>
      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 w-80 bg-white shadow-2xl transform ${isOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-out z-[100] lg:hidden`}
        style={{ height: '100dvh' }}
      >
        {/* Sidebar Header */}
        <div className="p-6  bg-gray-50">
          <div className="flex items-center justify-center">
            <div className="flex flex-col items-center space-x-3 relative">
              <img src={brandInfo.logoSrc} alt={brandInfo.name} className="h-54 w-86 rounded-full object-fill" />
              <div className="w-full text-center mt-2">
                <h2 className="text-[#d2b093] font-bold text-lg">{brandInfo.name}</h2>
                <p className="text-gray-600 text-sm italic">{brandInfo.tagline}</p>
              </div>
            </div>
            <button
              className="text-gray-800 hover:text-gray-600 transition-colors p-2 absolute top-0 right-0"
              onClick={onClose}
              aria-label="Close menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Sidebar Navigation */}
        <div className="p-6 bg-gray-50">
          <ul className="space-y-4 ">
            {links.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="flex items-center space-x-3 text-gray-800 hover:text-gray-600 hover:bg-white/10 px-4 py-3 rounded-lg transition-all duration-200 group"
                  onClick={onClose}
                >
                  <span className="w-1 h-1 bg-orion-gradient rounded-full group-hover:bg-white transition-colors"></span>
                  <span className="font-medium">{link.label}</span>
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile Contact Actions */}
          <div className="mt-8 pt-6">
            <div className="space-y-4">
              <a
                href={`tel:${contactInfo.phone}`}
                className="flex items-center space-x-3 text-gray-800 hover:text-gray-600 hover:bg-white/10 px-4 py-3 rounded-lg transition-all duration-200"
              >
                <FaPhone className="w-4 h-4" />
                <span>{t("contactAction.label")}</span>
              </a>
              <a
                href={contactInfo.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-gray-800 hover:text-green-200 hover:bg-white/10 px-4 py-3 rounded-lg transition-all duration-200"
              >
                <FaWhatsapp className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
              <a
                href="/#booking"
                className="block w-full bg-orion-gradient text-gray-800 px-6 py-3 rounded-lg font-semibold text-center hover:bg-purple-50 transition-colors duration-200 shadow-lg"
                onClick={onClose}
              >
                {contactInfo.bookNow}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
    </>
  );
});
