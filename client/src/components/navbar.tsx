import { useState } from "react";
import type { FC } from "react";
import { NAVBAR_LINKS } from "../constants/navbar";
import { SidebarMenuButton } from "./SidebarMenuButton";

export const Navbar: FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md px-4 py-6 flex items-center justify-between">
      <div className="navbar-brand">
        <a href="/" className="font-bold text-xl">Orion Städ</a>
      </div>
      {/* Hamburger button for mobile */}
      {(!sidebarOpen && (
      <SidebarMenuButton onClick={() => setSidebarOpen((open) => !open)} ariaLabel="Toggle menu" />
      ))}
      {/* Desktop menu */}
      <ul className="hidden md:flex space-x-6 navbar-menu">
        {NAVBAR_LINKS.map(link => (
          <li key={link.href}>
            <a href={link.href} className="hover:text-blue-600">{link.label}</a>
          </li>
        ))}
      </ul>
      {/* Mobile sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-200 ease-in-out z-50 md:hidden`}
      >
        <button
          className="absolute top-4 right-4 text-2xl"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close menu"
        >
          &times;
        </button>
        <ul className="flex flex-col mt-16 space-y-6 px-8">
          {NAVBAR_LINKS.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                className="hover:text-blue-600"
                onClick={() => setSidebarOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </nav>
  );
}