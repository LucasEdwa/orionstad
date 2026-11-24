import { Hero } from "../../hero";

// Feature components
import { HowWeCanHelp } from "./components/HowWeCanHelp";
import { FAQSection } from "./components/FAQSection";
import { HolidayPromo } from "./components/HolidayPromo";

const Home = () => {
  return (
    <>
      {/* Christmas & New Year offer (until 20 Jan 2027) */}
      <HolidayPromo />

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
