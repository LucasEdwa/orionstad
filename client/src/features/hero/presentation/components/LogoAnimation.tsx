import type { BrandAssets } from "../../domain/entities/Hero";

interface LogoAnimationProps {
  brandAssets: BrandAssets;
  logoVisible: boolean;
}

export const LogoAnimation: React.FC<LogoAnimationProps> = ({ brandAssets, logoVisible }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      <div className={`relative transition-all duration-1000 ease-out ${logoVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 -translate-y-20'}`}>
        <img
          src={brandAssets.logoSrc}
          alt={`${brandAssets.brandName} Logo`}
          className="rounded-full w-32 h-32 md:w-48 md:h-48 object-cover shadow-2xl border-4 border-white/30"
          style={{ 
            filter: 'drop-shadow(0 0 60px rgba(192, 156, 193, 0.8)) drop-shadow(0 0 30px rgba(255, 255, 255, 0.3))'
          }}
        />
        <div className="absolute inset-0 rounded-full bg-gradient-to-t from-purple-900/20 to-transparent"></div>
      </div>
      
      <div className={`text-center transition-all duration-1000 delay-300 ${logoVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h1 className="text-2xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">
          {brandAssets.brandName}
        </h1>
        <p className="text-lg md:text-xl text-white/90 font-light drop-shadow-md">
          {brandAssets.tagline}
        </p>
      </div>
    </div>
  );
};
