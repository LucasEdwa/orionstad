import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import { setLanguage } from "../store/languageSlice";
import type { Language } from "../store/languageSlice";
import { useState, useEffect } from "react";
import { FaGlobe, FaTimes, FaCheck } from "react-icons/fa";

const LANGUAGES: { code: Language; label: string; flag: string; nativeName: string }[] = [
    { code: "en", label: "English", flag: "🇬🇧", nativeName: "English" },
    { code: "es", label: "Español", flag: "🇪🇸", nativeName: "Español" },
    { code: "sv", label: "Svenska", flag: "🇸🇪", nativeName: "Svenska" },
];

export default function LanguageSwitcher() {
    const dispatch = useDispatch();
    const language = useSelector((state: RootState) => state.language.language);
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [hasInteracted, setHasInteracted] = useState(false);

    // Auto-hide after 10 seconds if user hasn't interacted
    useEffect(() => {
        if (!hasInteracted) {
            const timer = setTimeout(() => {
                setIsVisible(false);
            }, 10000);
            return () => clearTimeout(timer);
        }
    }, [hasInteracted]);

    const handleLanguageChange = (newLanguage: Language) => {
        dispatch(setLanguage(newLanguage));
        setIsOpen(false);
        setHasInteracted(true);
    };

    const handleToggle = () => {
        setIsOpen(!isOpen);
        setHasInteracted(true);
    };

    const handleClose = () => {
        setIsVisible(false);
        setHasInteracted(true);
    };

    if (!isVisible) return null;

    const currentLanguage = LANGUAGES.find(lang => lang.code === language);

    return (
        <>
            {/* Mobile-first floating button */}
            <div className="fixed bottom-4 left-4 z-50 md:bottom-6 md:left-6">
                {!isOpen ? (
                    <button
                        onClick={handleToggle}
                        className="bg-orion-gradient hover:from-[#CDB697] text-white p-3 md:p-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 flex items-center gap-2 group"
                        aria-label="Change language"
                    >
                        <span className="text-xl md:text-2xl">{currentLanguage?.flag}</span>
                        <FaGlobe className="text-lg md:text-xl group-hover:rotate-12 transition-transform duration-300" />
                    </button>
                ) : (
                    <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-fadeInUp">
                        {/* Header */}
                        <div className="bg-orion-gradient text-white p-4 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <FaGlobe className="text-lg" />
                                <span className="font-semibold text-sm md:text-base">Choose Language</span>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-white hover:text-purple-200 transition-colors p-1"
                                aria-label="Close language selector"
                            >
                                <FaTimes className="text-sm" />
                            </button>
                        </div>

                        {/* Language options */}
                        <div className="p-2">
                            {LANGUAGES.map((lang) => (
                                <button
                                    key={lang.code}
                                    onClick={() => handleLanguageChange(lang.code)}
                                    className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
                                        language === lang.code
                                            ? 'bg-gray-50 text-[#CDB697] border-2 border-gray-200'
                                            : 'hover:bg-gray-50 text-gray-700'
                                    }`}
                                >
                                    <span className="text-2xl">{lang.flag}</span>
                                    <div className="flex-1 text-left">
                                        <div className="font-medium text-sm">{lang.nativeName}</div>
                                        <div className="text-xs text-gray-500">{lang.label}</div>
                                    </div>
                                    {language === lang.code && (
                                        <FaCheck className="text-[#CDB697] text-sm" />
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Footer */}
                        <div className="border-t border-gray-100 px-4 py-2">
                            <button
                                onClick={handleClose}
                                className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
                            >
                                Don't show again
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Desktop enhancement: Top-right compact switcher */}
            <div className="hidden lg:block fixed top-4 right-4 z-40">
                <div className="bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-gray-200 overflow-hidden">
                    <div className="flex">
                        {LANGUAGES.map((lang, index) => (
                            <button
                                key={lang.code}
                                onClick={() => handleLanguageChange(lang.code)}
                                className={`px-3 py-2 text-sm font-medium transition-all duration-200 ${
                                    language === lang.code
                                        ? 'bg-orion-gradient text-white'
                                        : 'text-gray-600 hover:text-[#CDB697] hover:bg-[#CDB697]/10'
                                } ${index === 0 ? 'rounded-l-full' : ''} ${
                                    index === LANGUAGES.length - 1 ? 'rounded-r-full' : ''
                                }`}
                                title={lang.nativeName}
                            >
                                <span className="mr-1">{lang.flag}</span>
                                <span className="hidden xl:inline">{lang.code.toUpperCase()}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Backdrop for mobile when open */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
}
