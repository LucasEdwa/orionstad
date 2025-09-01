import { BrandLogo } from "./components/BrandLogo";
import { DesktopNavigation } from "./components/DesktopNavigation";
import { ContactActions } from "./components/ContactActions";
import { SidebarMenuButton } from "./components/SidebarMenuButton";
import { MobileSidebar } from "./components/MobileSidebar";

// Hooks
import { useNavigation } from "./hooks/useNavigation";
import { useNavbarState } from "./hooks/useNavbarState";
import { useBrand } from "./hooks/useBrand";

export const Navbar: React.FC = () => {
  const { links, contactInfo } = useNavigation();
  const { isScrolled, sidebarOpen, setSidebarOpen } = useNavbarState();
  const { brandInfo } = useBrand();

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300  ${
        sidebarOpen
          ? ' '
          : isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-lg py-3' 
            : 'bg-orion-gradient backdrop-blur-sm py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          
          {/* Logo and Brand */}
          <BrandLogo brandInfo={brandInfo} isScrolled={isScrolled} />

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <DesktopNavigation links={links} isScrolled={isScrolled} />
            <ContactActions contactInfo={contactInfo} isScrolled={isScrolled} />
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
          <MobileSidebar
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            links={links}
            contactInfo={contactInfo}
            brandInfo={brandInfo}
          />
      </nav>
      
      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className="h-20"></div>
    </>
  );
};
