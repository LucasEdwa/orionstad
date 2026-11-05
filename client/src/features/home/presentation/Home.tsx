import { Hero } from "../../hero";

// Feature components
import { HowWeCanHelp } from "./components/HowWeCanHelp";
import { FAQSection } from "./components/FAQSection";

const Home = () => {
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
    </>
  );
};

export { Home };
