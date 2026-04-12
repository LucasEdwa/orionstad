import { Outlet } from "react-router";
import { Footer } from "../features/footer";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import  { AnimatedNavbar } from "../components/AnimatedNav";

export const Layout = () => {
  const location = useLocation();

  // Track page views on route change (GA loaded in index.html)
  useEffect(() => {
    if (typeof window.gtag === "function") {
      window.gtag("config", "G-GYYZN093DW", {
        page_path: location.pathname,
      });
      window.gtag("event", "page_visited", {
        event_category: "engagement",
        event_label: location.pathname,
      });
    }
  }, [location]);

  return (
    <div className="bg-gray-100 ">
      <AnimatedNavbar />
      <Outlet />
      <Footer />
    </div>
  );
};