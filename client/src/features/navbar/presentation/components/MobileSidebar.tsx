import React from "react";
import { FaPhone, FaWhatsapp } from "react-icons/fa";
import { NavLink as RouterNavLink } from "react-router-dom";
import { ButtonLink } from "../../../../components/ui";
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
        className={`fixed top-0 left-0 w-80 max-w-[85vw] bg-white shadow-2xl transform ${isOpen ? "translate-x-0 visible" : "-translate-x-full invisible"
          } transition-[transform,visibility] duration-300 ease-out z-[100] lg:hidden flex flex-col`}
        style={{ height: '100dvh' }}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-line">
          <img src={brandInfo.logoSrc} alt={brandInfo.name} className="h-12 w-auto" />
          <button
            className="text-ink hover:text-olive transition-colors p-2"
            onClick={onClose}
            aria-label="Close menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Sidebar Navigation */}
        <div className="p-6 flex-1 overflow-y-auto">
          <ul className="space-y-1">
            {links.map(link => (
              <li key={link.href}>
                <RouterNavLink
                  to={link.href}
                  end={link.href === "/"}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-lg transition-colors duration-200 ${
                      isActive ? 'bg-sage font-bold text-olive' : 'text-ink hover:bg-sage'
                    }`
                  }
                  onClick={onClose}
                >
                  {link.label}
                </RouterNavLink>
              </li>
            ))}
          </ul>

          {/* Mobile Contact Actions */}
          <div className="mt-6 pt-6 border-t border-line space-y-1">
            <a
              href={`tel:${contactInfo.phone}`}
              className="flex items-center gap-3 text-ink hover:bg-sage px-4 py-3 rounded-lg transition-colors duration-200"
            >
              <FaPhone className="w-4 h-4 text-olive" />
              <span>{t("contactAction.label")}</span>
            </a>
            <a
              href={contactInfo.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-ink hover:bg-sage px-4 py-3 rounded-lg transition-colors duration-200"
            >
              <FaWhatsapp className="w-4 h-4 text-olive" />
              <span>WhatsApp</span>
            </a>
          </div>

          <ButtonLink to="/contact" className="mt-6 w-full" onClick={onClose}>
            {contactInfo.getQuote}
          </ButtonLink>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-ink/30 lg:hidden"
          onClick={onClose}
        />
      )}
    </>
  );
});
