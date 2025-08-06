import { FaBroom } from "react-icons/fa";

interface CleaningFactCardProps {
  title: string;
  description: string;
  ctaText: string;
  ctaPath: string;
  icon: string;
}

export const CleaningFactCard = ({ title, description, ctaText, ctaPath, icon }: CleaningFactCardProps) => {
  return (
    <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl p-6">
      <div className="flex items-center justify-center gap-3 mb-3">
        <FaBroom className="text-purple-600 text-xl" />
        <span className="text-lg font-semibold text-gray-800">{title}</span>
      </div>
      <p className="text-gray-700 mb-4">
        {description}
      </p>
      
      <a
        href={ctaPath}
        className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold transition-colors"
      >
        <span>{ctaText}</span>
        <span className="text-lg">{icon}</span>
      </a>
    </div>
  );
};
