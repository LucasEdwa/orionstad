import { FaInfoCircle } from "react-icons/fa";

export const QuickSummary = () => {
  return (
    <div className="bg-[#f9f5f0] border-l-4 border-[#CDB697] p-6 rounded-r-xl mb-8">
      <div className="flex items-center gap-3 mb-3">
        <FaInfoCircle className="text-[#98754C] text-xl" />
        <h2 className="text-xl font-semibold text-[#3C0C0C]">Quick Summary</h2>
      </div>
      <p className="text-[#5a3a2a] leading-relaxed">
        We provide professional cleaning services with respect and care. You book, we clean, 
        you're happy. We're insured, professional, and committed to your satisfaction. 
        Simple as that! 😊
      </p>
    </div>
  );
};
