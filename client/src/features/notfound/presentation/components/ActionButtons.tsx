import { Link } from "react-router";
import { FaHome, FaArrowLeft } from "react-icons/fa";

interface ActionButtonsProps {
  onGoBack: () => void;
}

export const ActionButtons = ({ onGoBack }: ActionButtonsProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
      <Link
        to="/"
        className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
      >
        <FaHome className="text-xl" />
        Take Me Home
      </Link>
      
      <button
        onClick={onGoBack}
        className="bg-white hover:bg-gray-50 text-purple-600 border-2 border-purple-600 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-3"
      >
        <FaArrowLeft className="text-lg" />
        Go Back
      </button>
    </div>
  );
};
