import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import type { RootState } from "../../../store";
import { Hero } from "../../hero";
import LanguageSwitcher from "../../../components/LanguageSwitcher";
import { Card, Container } from "../../../components/ui";

// Feature components
import { HowWeCanHelp } from "./components/HowWeCanHelp";
import { BookingStepOne } from "./components/BookingStepOne";
import { BookingStepTwo } from "./components/BookingStepTwo";
import { BookingBenefits } from "./components/BookingBenefits";
import { FAQSection } from "./components/FAQSection";

// Hooks
import { useBookingSubmission } from "./hooks/useBookingSubmission";
import { useFeatures } from "./hooks/useFeatures";

const Home = () => {
  const step = useSelector((state: RootState) => state.booking.step);
  const [showLang, setShowLang] = useState(false);

  const { isPending, formAction, fieldErrors, clearFieldError } = useBookingSubmission();
  const { benefits } = useFeatures();

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

        {/* Booking Section */}
        <section className="bg-sage scroll-mt-24" id="booking">
          <Container className="py-14">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[1.875rem]">

              {/* Booking Form */}
              <Card className="rounded-[0.75rem] p-[1.5625rem]">
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
              </Card>

              {/* Booking Benefits */}
              <BookingBenefits benefits={benefits ?? []} />
            </div>
          </Container>
        </section>
      </main>

      {/* FAQ Section */}
      <FAQSection />

      {showLang && <LanguageSwitcher />}
    </>
  );
};

export { Home };
