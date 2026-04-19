import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import type { RootState } from "../../../store";
import { Hero } from "../../hero";
import LanguageSwitcher from "../../../components/LanguageSwitcher";

// Feature components
import { AboutSection } from "./components/AboutSection";
import { FeaturesGrid } from "./components/FeaturesGrid";
import { BookingStepOne } from "./components/BookingStepOne";
import { BookingStepTwo } from "./components/BookingStepTwo";
import { BookingBenefits } from "./components/BookingBenefits";

// Hooks
import { useBookingSubmission } from "./hooks/useBookingSubmission";
import { useFeatures } from "./hooks/useFeatures";
import WinterPromotion from "../../../components/WinterPromotion";

const Home = () => {
  const step = useSelector((state: RootState) => state.booking.step);
  const [showLang, setShowLang] = useState(false);
  
  const { isPending, formAction, fieldErrors, clearFieldError } = useBookingSubmission();
  const { features, benefits } = useFeatures();

  useEffect(() => {
    const timer = setTimeout(() => setShowLang(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  

  return (
    <>
      {/* Hero Section */}
      <div className="relative bg-gray-50">
        <Hero />
      </div>


      {/* Main Content */}
      <main className="bg-gray-50">
            <WinterPromotion />

        {/* About Section with Modern Cards */}
        <AboutSection />

        {/* Features Section */}
        <FeaturesGrid features={features??[]} />

        {/* Booking Section */}
        <section className="max-w-7xl mx-auto px-6 py-16" id="booking">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Booking Form */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              {step === 1 && (
                <BookingStepOne onNext={() => {}} />
              )}

              {step === 2 && (
                <BookingStepTwo 
                  formAction={formAction}
                  isPending={isPending}
                  fieldErrors={fieldErrors}
                  clearFieldError={clearFieldError}
                />
              )}
            </div>

            {/* Booking Benefits */}
            <BookingBenefits benefits={benefits ?? []} />
          </div>
        </section>
      </main>

      {showLang && <LanguageSwitcher />}
    </>
  );
};

export { Home };
