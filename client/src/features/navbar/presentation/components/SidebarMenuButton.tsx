import { memo } from "react";

type SidebarMenuButtonProps = {
  onClick: () => void;
  ariaLabel?: string;
};

export const SidebarMenuButton = memo<SidebarMenuButtonProps>(({
  onClick,
  ariaLabel,
}) => (
  <button
    className="flex flex-col justify-center items-center z-50 p-2 rounded-lg hover:bg-sage transition-colors duration-200"
    style={{ width: 40, height: 40 }}
    onClick={onClick}
    aria-label={ariaLabel ?? "Toggle menu"}
  >
    {[...Array(3)].map((_, i) => (
      <span
        key={i}
        className={`block w-6 h-0.5 bg-ink ${i < 2 ? "mb-1" : ""}`}
      />
    ))}
  </button>
))
