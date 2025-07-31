import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import { setLanguage } from "../store/languageSlice";
import type { Language } from "../store/languageSlice";
import { useState } from "react";

const LANGUAGES: { code: Language; label: string }[] = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "sv", label: "Svenska" },
];

export default function LanguageSwitcher() {
  const dispatch = useDispatch();
  const language = useSelector((state: RootState) => state.language.language);
  const [open, setOpen] = useState(true);

  if (!open) return null;

  return (
    <div
      className="fixed bottom-0 z-100 bg-orion-gradient p-6 rounded-t-2xl flex flex-col items-end w-full "
      style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.15)" }}
    >
      <button
        onClick={() => setOpen(false)}
        className="mb-2 text-black text-xl font-bold hover:text-red-500 focus:outline-none"
        aria-label="Close language switcher"
      >
        ×
      </button>
<h4 className="text-black text-lg font-bold w-full text-center p-3">Select Language</h4>
      <div className="flex gap-2 items-center w-full justify-center">
        {LANGUAGES.map((lang) => (
          <button
            key={lang.code}
            onClick={() => dispatch(setLanguage(lang.code))}
            className={`px-2 py-1 rounded transition-colors duration-150 ${language === lang.code ? "bg-[#c09cc1] text-white" : "bg-gray-200"}`}
          >
            {lang.label}
          </button>
        ))}
      </div>
    </div>
  );
}
