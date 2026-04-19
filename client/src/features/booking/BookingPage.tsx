import { BookingStepOne, BookingStepTwo, BookingBenefits, useBookingSubmission, useFeatures } from "../home";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";


export const BookingPage = () => {
    const step = useSelector((state: RootState) => state.booking.step);
    const { isPending, formAction, fieldErrors, clearFieldError } = useBookingSubmission();
    const { benefits } = useFeatures();
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">

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
      </div>
    );
}