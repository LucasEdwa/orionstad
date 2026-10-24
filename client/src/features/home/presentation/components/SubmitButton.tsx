import { useFormStatus } from "react-dom";
import { useTranslation } from "react-i18next";
import { FaCheckCircle } from "react-icons/fa";
import { buttonClass } from "../../../../components/ui/styles";

export const SubmitButton = () => {
  const { pending } = useFormStatus();
  const { t } = useTranslation("home");

  return (
    <button
      type="submit"
      disabled={pending}
      className={buttonClass('primary', 'flex-1 justify-center')}
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
