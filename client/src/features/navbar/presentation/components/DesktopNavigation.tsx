import type { NavLink } from "../../domain/entities/NavLink";

interface DesktopNavigationProps {
  links: NavLink[];
  isScrolled: boolean;
}

export const DesktopNavigation: React.FC<DesktopNavigationProps> = ({ links, isScrolled }) => {
  return (
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
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orion-gradient transition-all duration-200 group-hover:w-full"></span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
