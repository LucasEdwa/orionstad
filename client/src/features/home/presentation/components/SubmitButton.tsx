import { useFormStatus } from "react-dom";
import { useTranslation } from "react-i18next";
import { FaCheckCircle } from "react-icons/fa";

export const SubmitButton = () => {
  const { pending } = useFormStatus();
  const { t } = useTranslation("home");

  return (
    <button
      type="submit"
      disabled={pending}
      className="flex-1 bg-orion-gradient text-white py-3 rounded-xl font-semibold transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
    >
      {pending ? (
        <>
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span>Sending...</span>
        </>
      ) : (
        <>
          <FaCheckCircle className="w-4 h-4" />
          <span>{t("customerForm.submitLabel")}</span>
        </>
      )}
    </button>
  );
};
