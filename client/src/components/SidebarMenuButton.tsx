import type { FC } from "react";

type SidebarMenuButtonProps = {
  onClick: () => void;
  ariaLabel?: string;
};

export const SidebarMenuButton: FC<SidebarMenuButtonProps> = ({ onClick, ariaLabel }) => (
  <button
    className="flex flex-col justify-center items-center xl:hidden  bg-white z-50"
    style={{ width: 40, height: 40 }}
    onClick={onClick}
    aria-label={ariaLabel ?? "Toggle menu"}
  >
    {[...Array(3)].map((_, i) => (
      <span
        key={i}
        className={`block w-6 h-0.5 bg-black${i < 2 ? " mb-1" : ""}`}
      />
    ))}
  </button>
);
