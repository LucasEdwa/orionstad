
import { useTranslation } from "react-i18next";
import { SidebarMenuButton } from "./SidebarMenuButton";
import logoImg from "../assets/orion-logo.png";
import { useState, useEffect } from "react";
import { FaPhone, FaWhatsapp } from "react-icons/fa";

type NavbarProps = {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
};

export const Navbar: React.FC<NavbarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const { t } = useTranslation("navbar");
  const [isScrolled, setIsScrolled] = useState(false);

  // Get navbar links from translation file
  const links = t("links", { returnObjects: true }) as Array<{ label: string; href: string }>;
  const contactInfo = t("contactInfo", { returnObjects: true }) as { 
    phone: string; 
    whatsapp: string; 
    bookNow: string; 
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg py-3' 
          : 'bg-gradient-to-r from-purple-900/90 to-purple-700/90 backdrop-blur-sm py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <a href="/" className="flex items-center space-x-3 group">
              <img 
                src={logoImg} 
                alt="Orion Städ Logo" 
                className="h-10 w-10 rounded-full shadow-md group-hover:scale-105 transition-transform duration-200" 
              />
              <div className="flex flex-col">
                <span className={`font-bold text-lg leading-tight transition-colors duration-300 ${
                  isScrolled ? 'text-gray-800' : 'text-white'
                }`}>
                  Orion Städ
                </span>
                <span className={`text-xs italic transition-colors duration-300 ${
                  isScrolled ? 'text-purple-600' : 'text-purple-200'
                }`}>
                  Where cleaning becomes caring
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <ul className="flex space-x-6">
              {links.map((link) => (
                <li key={link.href}>
                  <a 
                    href={link.href} 
                    className={`relative px-3 py-2 rounded-lg font-medium transition-all duration-200 group ${
                      isScrolled 
                        ? 'text-gray-700 hover:text-purple-600 hover:bg-purple-50' 
                        : 'text-white hover:text-purple-200 hover:bg-white/10'
                    }`}
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500 transition-all duration-200 group-hover:w-full"></span>
                  </a>
                </li>
              ))}
            </ul>

            {/* Contact Actions */}
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
                className="bg-gradient-to-r from-purple-600 to-purple-500 text-white px-6 py-2 rounded-full font-semibold hover:from-purple-700 hover:to-purple-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {contactInfo.bookNow}
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            {!sidebarOpen && (
              <SidebarMenuButton 
                onClick={() => setSidebarOpen(true)} 
                ariaLabel="Toggle menu"
                isScrolled={isScrolled}
              />
            )}
          </div>
        </div>

        {/* Mobile Sidebar */}
        <div
          className={`fixed top-0 left-0 h-screen w-80 bg-gradient-to-br from-purple-900 to-purple-700 shadow-2xl transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-out z-[100] lg:hidden`}
        >
          {/* Sidebar Header */}
          <div className="p-6 border-b border-purple-600">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img src={logoImg} alt="Orion Städ" className="h-12 w-12 rounded-full shadow-lg" />
                <div>
                  <h2 className="text-white font-bold text-lg">Orion Städ</h2>
                  <p className="text-purple-200 text-sm italic">Where cleaning becomes caring</p>
                </div>
              </div>
              <button
                className="text-white hover:text-purple-200 transition-colors p-2"
                onClick={() => setSidebarOpen(false)}
                aria-label="Close menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Sidebar Navigation */}
          <div className="p-6">
            <ul className="space-y-4">
              {links.map(link => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="flex items-center space-x-3 text-white hover:text-purple-200 hover:bg-white/10 px-4 py-3 rounded-lg transition-all duration-200 group"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="w-2 h-2 bg-purple-400 rounded-full group-hover:bg-white transition-colors"></span>
                    <span className="font-medium">{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>

            {/* Mobile Contact Actions */}
            <div className="mt-8 pt-6 border-t border-purple-600">
              <div className="space-y-4">
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="flex items-center space-x-3 text-white hover:text-purple-200 hover:bg-white/10 px-4 py-3 rounded-lg transition-all duration-200"
                >
                  <FaPhone className="w-4 h-4" />
                  <span>Call Us</span>
                </a>
                <a
                  href={contactInfo.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-white hover:text-green-200 hover:bg-white/10 px-4 py-3 rounded-lg transition-all duration-200"
                >
                  <FaWhatsapp className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
                <a
                  href="/#booking"
                  className="block w-full bg-white text-purple-700 px-6 py-3 rounded-lg font-semibold text-center hover:bg-purple-50 transition-colors duration-200 shadow-lg"
                  onClick={() => setSidebarOpen(false)}
                >
                  {contactInfo.bookNow}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </nav>
      
      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className="h-20"></div>
    </>
  );
};