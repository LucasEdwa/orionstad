import { FaInfoCircle } from "react-icons/fa";

export const QuickSummary = () => {
  return (
    <div className="bg-[#F3F5EF] border-l-4 border-[#55603A] p-6 rounded-r-xl mb-8">
      <div className="flex items-center gap-3 mb-3">
        <FaInfoCircle className="text-[#55603A] text-xl" />
        <h2 className="text-xl font-semibold text-[#163B48]">Quick Summary</h2>
      </div>
      <p className="text-[#58717A] leading-relaxed">
        We provide professional cleaning services with respect and care. You book, we clean, 
        you're happy. We're insured, professional, and committed to your satisfaction. 
        Simple as that! 😊
      </p>
    </div>
  );
};
