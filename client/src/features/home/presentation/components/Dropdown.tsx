import type { Option } from "../../domain/entities/Feature";
import { useState, useRef, useEffect, memo } from "react";
import { fieldClass, labelClass } from "../../../../components/ui/styles";

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
      <label className={labelClass}>
        {icon}
        {label}
      </label>
      <button
        type="button"
        onClick={() => setIsOpen(prev => !prev)}
        aria-expanded={isOpen}
        aria-controls={`${id}-dropdown`}
        className={`${fieldClass()} text-left`}
        tabIndex={0}
      >
        {selectedLabel}
      </button>
      {isOpen && (
        <div id={`${id}-dropdown`} className="absolute z-10 w-full mt-1 bg-white border border-line rounded-[0.375rem] shadow-lg overflow-hidden">
          {options.map(opt => (
            <div
              key={opt.value}
              data-value={opt.value}
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
              className={`px-3 py-2.5 text-[0.75rem] cursor-pointer text-ink hover:bg-sage ${value === opt.value ? "bg-sage text-olive font-semibold" : ""}`}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
});
