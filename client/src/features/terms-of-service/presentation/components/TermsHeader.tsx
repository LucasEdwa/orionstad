import { FaShieldAlt, FaArrowLeft } from "react-icons/fa";

interface TermsHeaderProps {
  title: string;
  description: string;
  lastUpdated: string;
  onGoBack: () => void;
}

export const TermsHeader = ({ title, description, lastUpdated, onGoBack }: TermsHeaderProps) => {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-purple-500 text-white py-12">
      <div className="max-w-4xl mx-auto px-6">
        <button
          onClick={onGoBack}
          className="flex items-center gap-2 text-purple-200 hover:text-white transition-colors mb-6"
        >
          <FaArrowLeft className="text-sm" />
          <span>Back</span>
        </button>
        
        <div className="flex items-center gap-4 mb-4">
          <FaShieldAlt className="text-4xl text-purple-200" />
          <h1 className="text-4xl md:text-5xl font-bold">{title}</h1>
        </div>
        
        <p className="text-xl text-purple-100 max-w-2xl">
          {description}
        </p>
        
        <div className="mt-6 text-sm text-purple-200">
          <span>Last updated: {lastUpdated}</span>
        </div>
      </div>
    </div>
  );
};
