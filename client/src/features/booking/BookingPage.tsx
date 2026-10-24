import { BookingStepOne, BookingStepTwo, BookingBenefits, useBookingSubmission, useFeatures } from "../home";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import { Card, Container } from "../../components/ui";


export const BookingPage = () => {
    const step = useSelector((state: RootState) => state.booking.step);
    const { isPending, formAction, fieldErrors, clearFieldError } = useBookingSubmission();
    const { benefits } = useFeatures();
    return (
        <div className="min-h-screen bg-sage">

        {/* Booking Section */}
        <section id="booking">
          <Container className="pt-8 pb-14">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[1.875rem]">

              {/* Booking Form */}
              <Card className="rounded-[0.75rem] p-[1.5625rem]">
                {step === 1 && (
                  <BookingStepOne onNext={() => {}} headingLevel="h1" />
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
      </div>
    );
}
