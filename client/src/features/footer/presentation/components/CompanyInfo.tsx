import React from 'react';
import type { CompanyInfo as CompanyInfoType } from '../../domain/entities/Footer';
import logoImg from '../../../../assets/orion-home-logo.png';

interface CompanyInfoProps {
  companyInfo: CompanyInfoType;
  address: string;
}

export const CompanyInfo: React.FC<CompanyInfoProps> = ({ companyInfo, address }) => {
  return (
    <div className="lg:col-span-2">
      <img src={logoImg} alt={companyInfo.name} width={314} height={235} loading="lazy" className="h-[4.125rem] w-auto mb-5" />
      <p className="text-[0.875rem] text-olive mb-3">{companyInfo.tagline}</p>
      <p className="text-[0.8125rem] leading-[1.375rem] text-muted mb-5 max-w-[26rem]">{companyInfo.description}</p>
      <div className="text-[0.75rem] leading-[1.25rem] text-muted">
        {address}
      </div>
    </div>
  );
};
