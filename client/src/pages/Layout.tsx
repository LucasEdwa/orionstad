import { Outlet } from "react-router";
import { AnimatedNavbar } from "../components/AnimatedNavbar";
import { Footer } from "../components/footer";
import { FaWhatsapp } from "react-icons/fa";
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
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed z-50 bottom-6 right-6 bg-orion-gradient hover:bg-green-600 text-white rounded-full shadow-lg p-4 flex items-center justify-center transition-colors"
        aria-label="Chat with us on WhatsApp"
      >
        <FaWhatsapp size={32} />
      </a>
    </div>
  );
};