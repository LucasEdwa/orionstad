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
            className="fixed bottom-5 left-25 transform -translate-x-1/2 z-100 bg-orion-gradient p-1 rounded-2xl flex flex-col items-end w-[10rem] xl:w-md"
            style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.15)" }}
        >
            <button
                onClick={() => setOpen(false)}
                className=" text-black text-xs font-bold hover:text-red-500 focus:outline-none absolute top-1 right-2"
                aria-label="Close language switcher"
            >
                ×
            </button>
            <h4 className="text-black text-sm font-bold w-full text-center p-2">Select Language</h4>
            <div className="w-full flex justify-center">
                <select
                    value={language}
                    onChange={e => dispatch(setLanguage(e.target.value as Language))}
                    className="px-3 py-2 rounded bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#c09cc1]"
                >
                    {LANGUAGES.map(lang => (
                        <option key={lang.code} value={lang.code}>{lang.label}</option>
                    ))}
                </select>
            </div>
        </div>
    );
}
