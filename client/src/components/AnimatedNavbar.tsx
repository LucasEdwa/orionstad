import React, { useEffect, useRef, useState } from "react";
import { Navbar } from "../features/navbar";

export const AnimatedNavbar: React.FC = () => {
  const [visible, setVisible] = useState(false); // Start hidden
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY < 80) {
        setVisible(false); // Hide at top/hero
      } else {
        setVisible(true); // Show after scrolling down
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-500 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <Navbar />
    </div>
  );
};
