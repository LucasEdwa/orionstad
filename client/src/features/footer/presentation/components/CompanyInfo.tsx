import React from 'react';
import type { CompanyInfo as CompanyInfoType } from '../../domain/entities/Footer';

interface CompanyInfoProps {
  companyInfo: CompanyInfoType;
  address: string;
}

export const CompanyInfo: React.FC<CompanyInfoProps> = ({ companyInfo, address }) => {
  return (
    <div className="lg:col-span-2">
      <h3 className="text-2xl font-bold mb-3">{companyInfo.name}</h3>
      <p className="text-purple-200 text-lg mb-4 italic">{companyInfo.tagline}</p>
      <p className="text-purple-100 leading-relaxed mb-6">{companyInfo.description}</p>
      <div className="text-sm text-purple-200 leading-relaxed">
        {address}
      </div>
    </div>
  );
};
