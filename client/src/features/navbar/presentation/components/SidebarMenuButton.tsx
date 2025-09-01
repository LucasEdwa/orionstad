import { memo } from "react";

type SidebarMenuButtonProps = {
  onClick: () => void;
  ariaLabel?: string;
  isScrolled?: boolean;
};

export const SidebarMenuButton = memo<SidebarMenuButtonProps>(({ 
  onClick, 
  ariaLabel, 
  isScrolled = false 
}) => (
  <button
    className="flex flex-col justify-center items-center xl:hidden z-50 p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
    style={{ width: 40, height: 40 }}
    onClick={onClick}
    aria-label={ariaLabel ?? "Toggle menu"}
  >
    {[...Array(3)].map((_, i) => (
      <span
        key={i}
        className={`block w-6 h-0.5 transition-colors duration-300 ${
          isScrolled ? 'bg-gray-800' : 'bg-white'
        }${i < 2 ? " mb-1" : ""}`}
      />
    ))}
  </button>
))