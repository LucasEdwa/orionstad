import { memo } from "react";
import { Link } from "react-router-dom";
import type { BrandInfo } from "../../domain/entities/NavLink";

interface BrandLogoProps {
  brandInfo: BrandInfo;
}

export const BrandLogo = memo<BrandLogoProps>(({ brandInfo }) => {
  return (
    <Link to="/" className="flex items-center shrink-0 lg:ml-2" aria-label={brandInfo.name}>
      <img
        src={brandInfo.logoSrc}
        alt={`${brandInfo.name} Logo`}
        width={314}
        height={235}
        className="h-[3rem] lg:h-[4.125rem] w-auto"
      />
    </Link>
  );
});
