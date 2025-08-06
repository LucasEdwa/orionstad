import { FaInfoCircle } from "react-icons/fa";

export const QuickSummary = () => {
  return (
    <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-r-xl mb-8">
      <div className="flex items-center gap-3 mb-3">
        <FaInfoCircle className="text-green-600 text-xl" />
        <h2 className="text-xl font-semibold text-green-800">Quick Summary</h2>
      </div>
      <p className="text-green-700 leading-relaxed">
        We provide professional cleaning services with respect and care. You book, we clean, 
        you're happy. We're insured, professional, and committed to your satisfaction. 
        Simple as that! 😊
      </p>
    </div>
  );
};
