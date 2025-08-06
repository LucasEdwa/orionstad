import { Outlet } from "react-router";
import { AnimatedNavbar } from "../components/AnimatedNavbar";
import { Footer } from "../features/footer";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";



const WHATSAPP_LINK = import.meta.env.VITE_WHATSAPP_LINK;
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

export const Layout = () => {
  const location = useLocation();


  // Send page_visited event on route change
  useEffect(() => {
    if (typeof window.gtag === "function") {
      window.gtag("event", "page_visited", {
        event_category: "engagement",
        event_label: location.pathname
      });
    }
  }, [location]);

  return (
    <div className="bg-gray-100 ">
      {/* Google Analytics */}
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      ></script>
      <script
        dangerouslySetInnerHTML={{
          __html: ` 
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `,
        }}
      />
      <AnimatedNavbar />
      <Outlet />
      <Footer />
      
    </div>
  );
};