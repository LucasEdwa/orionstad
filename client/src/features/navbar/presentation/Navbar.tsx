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
    <header className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${
      isScrolled ? 'shadow-[0_1px_12px_rgba(22,59,72,0.08)]' : ''
    }`}>
      {/* Rule spans 1010px of the 1100px artboard (45px inset); logo sits 8px inside it */}
      <nav className="max-w-[68.75rem] mx-auto px-4 sm:px-6 lg:px-[2.8125rem]">
        <div className="flex items-center justify-between h-[4.5rem] lg:h-[5.9375rem] border-b border-line">

          {/* Logo and Brand */}
          <BrandLogo brandInfo={brandInfo} />

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-[3.3125rem]">
            <DesktopNavigation links={links} />
            <ContactActions contactInfo={contactInfo} />
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            {!sidebarOpen && (
              <SidebarMenuButton
                onClick={() => setSidebarOpen(true)}
                ariaLabel="Toggle menu"
              />
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <MobileSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        links={links}
        contactInfo={contactInfo}
        brandInfo={brandInfo}
      />
    </header>
  );
};
