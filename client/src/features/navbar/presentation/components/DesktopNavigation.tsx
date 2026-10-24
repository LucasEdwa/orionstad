import { memo } from "react";
import { NavLink as RouterNavLink } from "react-router-dom";
import type { NavLink } from "../../domain/entities/NavLink";

interface DesktopNavigationProps {
  links: NavLink[];
}

export const DesktopNavigation = memo<DesktopNavigationProps>(({ links }) => {
  return (
    <ul className="flex items-center gap-[3.125rem]">
      {links.map((link) => (
        <li key={link.href}>
          <RouterNavLink
            to={link.href}
            end={link.href === "/"}
            className={({ isActive }) =>
              `text-[0.75rem] transition-colors duration-200 ${
                isActive ? 'font-bold text-olive' : 'text-muted hover:text-ink'
              }`
            }
          >
            {link.label}
          </RouterNavLink>
        </li>
      ))}
    </ul>
  );
});
