import type { BrandInfo } from "../../domain/entities/NavLink";

interface BrandLogoProps {
  brandInfo: BrandInfo;
  isScrolled: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ brandInfo, isScrolled }) => {
  return (
    <div className="flex items-center space-x-3">
      <a href="/" className="flex items-center space-x-3 group">
        <img 
          src={brandInfo.logoSrc} 
          alt={`${brandInfo.name} Logo`} 
          className="h-10 w-10 rounded-full shadow-md group-hover:scale-105 transition-transform duration-200" 
        />
        <div className="flex flex-col">
          <span className={`font-bold text-lg leading-tight transition-colors duration-300 ${
            isScrolled ? 'text-gray-800' : 'text-white'
          }`}>
            {brandInfo.name}
          </span>
          <span className={`text-xs italic transition-colors duration-300 ${
            isScrolled ? 'text-purple-600' : 'text-purple-200'
          }`}>
            {brandInfo.tagline}
          </span>
        </div>
      </a>
    </div>
  );
};
