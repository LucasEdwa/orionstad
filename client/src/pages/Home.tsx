import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import { setBookingStep, setBookingForm, setCustomerForm } from "../store/bookingSlice";
import { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { showSuccess, showError } from '../utils/sweetAlert';
import { useTranslation } from "react-i18next";
import Hero from "../components/home/hero";
import LanguageSwitcher from "../components/LanguageSwitcher";
const Home = () => {
  const { t } = useTranslation("home");
  const dispatch = useDispatch();
  const step = useSelector((state: RootState) => state.booking.step);
  const bookingForm = useSelector((state: RootState) => state.booking.bookingForm);
  const customerForm = useSelector((state: RootState) => state.booking.customerForm);
  const formRef = useRef<HTMLFormElement>(null);
  const [, setSent] = useState(false);
  const [, setError] = useState<string | null>(null);
  const [showLang, setShowLang] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowLang(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  // Handlers for form changes
  const handleBookingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    dispatch(setBookingForm({ ...bookingForm, [e.target.name]: e.target.value }));
  };
  const handleCustomerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setCustomerForm({ ...customerForm, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    if (!formRef.current) return;
    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_IDHOME,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      setSent(true);
      formRef.current.reset();
      dispatch(setBookingStep(1));
      showSuccess("Your message has been sent successfully!");
    } catch (err) {
      setError("Failed to send message. Please try again.");
      showError("Failed to send message. Please try again.");
      console.error("EmailJS error:", err);
    }
  };

  return (
    <>
      <div className="flex flex-col text-gray-800 justify-center relative bg-gray-100">
        <Hero onLogoAnimationEnd={() => console.log("Logo animation ended")} />
      </div>
      <main className="mx-auto px-4 py-8 xl:flex xl:w-full">
        <section className="mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-4 ">{t("sections.0.title")}</h1>
          <p className=" mb-4">{t("sections.0.paragraphs.0")}</p>
          <p className="">{t("sections.0.paragraphs.1")}</p>
        </section>
        <section className="w-full px-4 py-8 flex flex-col " id="booking">
          {step === 1 && (
            <form
              className="w-full"
              onSubmit={e => {
                e.preventDefault();
                dispatch(setBookingStep(2));
              }}
            >
              <h2 className="text-2xl font-bold mb-4">{t("bookingForm.title")}</h2>
              <p className=" mb-4">{t("bookingForm.intro")}</p>
              <h3 className="text-xl font-semibold mb-2">{t("bookingForm.serviceLabel")}</h3>
              <select
                name="serviceType"
                className="border border-gray-300 rounded p-2 mb-4 w-full"
                required
                value={bookingForm.serviceType || ""}
                onChange={handleBookingChange}
              >
                {(t("bookingForm.serviceOptions", { returnObjects: true }) as Array<{ value: string; label: string }> ).map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <h2 className="text-xl font-semibold mb-2">{t("bookingForm.sizeLabel")}</h2>
              <input
                name="homeSize"
                type="number"
                min="0"
                placeholder={t("bookingForm.sizeLabel")}
                className="border border-gray-300 rounded p-2 mb-4 w-full"
                required
                value={bookingForm.homeSize || ""}
                onChange={handleBookingChange}
              />
              <h2 className="text-xl font-semibold mb-2">{t("bookingForm.frequencyLabel")}</h2>
              <select
                name="frequency"
                className="border border-gray-300 rounded p-2 mb-4 w-full"
                required
                value={bookingForm.frequency || ""}
                onChange={handleBookingChange}
              >
                {(t("bookingForm.frequencyOptions", { returnObjects: true }) as Array<{ value: string; label: string }> ).map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <button
                type="submit"
                className="bg-orion-gradient px-4 py-2 rounded hover:bg-[#8e77ad] transition-colors w-full"
              >
                {t("bookingForm.nextLabel")}
              </button>
            </form>
          )}
          {step === 2 && (
            <form
              ref={formRef}
              onSubmit={handleSubmit}
            >
              {/* Hidden inputs for booking step values */}
              <input type="hidden" name="serviceType" value={bookingForm.serviceType || ""} />
              <input type="hidden" name="homeSize" value={bookingForm.homeSize || ""} />
              <input type="hidden" name="frequency" value={bookingForm.frequency || ""} />

              <h2 className="text-2xl font-bold mb-4">{t("customerForm.title")}</h2>
              {(t("customerForm.fields", { returnObjects: true }) as Array<{ name: string; type: string; placeholder: string }> ).map((field, idx) => (
                <input
                  key={idx}
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  className="border border-gray-300 rounded p-2 mb-4 w-full max-w-md"
                  required
                  value={customerForm[field.name] || ""}
                  onChange={handleCustomerChange}
                />
              ))}
              <div className="flex gap-2">
                <button
                  type="button"
                  className="bg-gray-300  px-4 py-2 rounded hover:bg-gray-400 transition-colors"
                  onClick={() => dispatch(setBookingStep(1))}
                >
                  {t("customerForm.backLabel")}
                </button>
                <button
                  type="submit"
                  className="bg-orion-gradient px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                >
                  {t("customerForm.submitLabel")}
                </button>
              </div>
            </form>
          )}
        </section>
        <section className="max-w-4xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-4">{t("sections.1.title")}</h2>
          <p className="mb-4">{t("sections.1.paragraphs.0")}</p>
          <p className="mb-4">{t("sections.1.paragraphs.1")}</p>
        </section>
      </main>
      {showLang && <LanguageSwitcher />}
    </>
  );
};

export { Home };