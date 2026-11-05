import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import type { RootState } from "../store";
import { setLanguage } from "../store/languageSlice";
import type { Language } from "../store/languageSlice";

const LANGUAGES: { code: Language; label: string; name: string }[] = [
  { code: "sv", label: "SV", name: "Svenska" },
  { code: "en", label: "EN", name: "English" },
];

/** Always-visible Swedish/English switch for the header and mobile menu */
export function LanguageToggle({ className = "" }: { className?: string }) {
  const dispatch = useDispatch();
  const language = useSelector((state: RootState) => state.language.language);
  const { t } = useTranslation("common");

  return (
    <div role="group" aria-label={t("language.switchTo")} className={`flex items-center gap-1 ${className}`}>
      {LANGUAGES.map(({ code, label, name }) => {
        const active = language === code;
        return (
          <button
            key={code}
            type="button"
            lang={code}
            title={name}
            aria-label={name}
            aria-pressed={active}
            onClick={() => dispatch(setLanguage(code))}
            className={`px-2 py-1 text-[0.75rem] rounded-md transition-colors duration-200 ${
              active ? "font-bold text-olive bg-sage" : "text-muted hover:text-ink"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
