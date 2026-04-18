import { memo } from "react";
import type { BrandAssets } from "../../domain/entities/Hero";

interface LogoAnimationProps {
  brandAssets: BrandAssets;
  logoVisible: boolean;
}

export const LogoAnimation = memo(function LogoAnimation({ brandAssets, logoVisible }: LogoAnimationProps) {
  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      <div className={`text-center transition-all duration-1000 ease-out ${logoVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">
          {brandAssets.brandName}
        </h1>
        <p className="text-xl md:text-2xl lg:text-3xl text-white/90 font-light drop-shadow-md">
          {brandAssets.tagline}
        </p>
      </div>
    </div>
  );
});
