import type { TrustIndicator } from '../../domain/entities/TermsOfService';

interface TrustIndicatorsProps {
  indicators: TrustIndicator[];
}

export const TrustIndicators = ({ indicators }: TrustIndicatorsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
      {indicators.map((indicator) => (
        <div key={indicator.id} className="text-center p-6 bg-white rounded-xl shadow-md">
          <div className="text-3xl mb-3">{indicator.icon}</div>
          <h4 className="font-semibold text-gray-800 mb-2">{indicator.title}</h4>
          <p className="text-sm text-gray-600">{indicator.description}</p>
        </div>
      ))}
    </div>
  );
};
