import { useEffect, useState } from "react";
import { Hero } from "../../hero";
import LanguageSwitcher from "../../../components/LanguageSwitcher";

// Feature components
import { HowWeCanHelp } from "./components/HowWeCanHelp";
import { FAQSection } from "./components/FAQSection";

const Home = () => {
  const [showLang, setShowLang] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowLang(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Main Content */}
      <main>
        {/* Service overview cards */}
        <HowWeCanHelp />
      </main>

      {/* FAQ Section */}
      <FAQSection />

      {showLang && <LanguageSwitcher />}
    </>
  );
};

export { Home };
