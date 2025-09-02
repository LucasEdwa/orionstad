import type { Option } from "../../domain/entities/Feature";
import { useState, useRef, useEffect, memo } from "react";

 interface DropdownProps {
  options: Option[];
  value?: string;
  onChange: (value: string) => void;
  label: string;
  icon: React.ReactNode;
  id: string;
}

export const Dropdown = memo(({ options, value, onChange, label, icon, id }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLabel = options.find(opt => opt.value === value)?.label || options[0]?.label;

  return (
    <div className="relative inline-block w-full" ref={dropdownRef}>
      <label className="block text-sm font-semibold text-gray-700 mb-3">
        {icon}
        {label}
      </label>
      <button
        type="button"
        onClick={() => setIsOpen(prev => !prev)}
        aria-expanded={isOpen}
        aria-controls={`${id}-dropdown`}
        className="w-full px-4 py-3 border text-left border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
        tabIndex={0}
      >
        {selectedLabel}
      </button>
      {isOpen && (
        <div id={`${id}-dropdown`} className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-xl shadow-lg">
          {options.map(opt => (
            <div
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
              className={`px-4 py-3 cursor-pointer hover:bg-gray-100 ${value === opt.value ? "bg-gray-100" : ""}`}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
});
