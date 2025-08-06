import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import { setBookingStep, setBookingForm, setCustomerForm } from "../store/bookingSlice";
import { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { showSuccess, showError } from '../utils/sweetAlert';
import { useTranslation } from "react-i18next";
import Hero from "../components/home/hero";
import LanguageSwitcher from "../components/LanguageSwitcher";
import { FaCheckCircle, FaArrowRight, FaHome, FaCalendar, FaMagic, FaStar, FaShieldAlt, FaHeart } from 'react-icons/fa';

const Home = () => {
  const { t } = useTranslation("home");
  const dispatch = useDispatch();
  const step = useSelector((state: RootState) => state.booking.step);
  const bookingForm = useSelector((state: RootState) => state.booking.bookingForm);
  const customerForm = useSelector((state: RootState) => state.booking.customerForm);
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    setIsSubmitting(true);
    
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
      showSuccess("Your booking request has been sent successfully! We'll contact you soon to confirm the details.");
    } catch (err) {
      setError("Failed to send booking request. Please try again.");
      showError("Failed to send booking request. Please try again.");
      console.error("EmailJS error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const features = [
    { icon: FaMagic, title: "Premium Quality", description: "Professional cleaning with attention to every detail" },
    { icon: FaShieldAlt, title: "Trusted & Insured", description: "Fully insured service with background-checked cleaners" },
    { icon: FaHeart, title: "Caring Approach", description: "We treat your home with respect and presence" },
    { icon: FaStar, title: "5-Star Service", description: "Consistently rated excellent by our satisfied clients" }
  ];

  return (
    <>
      {/* Hero Section */}
      <div className="relative bg-gray-50">
        <Hero onLogoAnimationEnd={() => console.log("Logo animation ended")} />
      </div>

      {/* Main Content */}
      <main className="bg-gray-50">
        
        {/* About Section with Modern Cards */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* First Story Card */}
            <div className="bg-white rounded-2xl shadow-lg p-8 transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-purple-100 p-3 rounded-full">
                  <FaHeart className="w-6 h-6 text-purple-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800">{t("sections.0.title")}</h2>
              </div>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>{t("sections.0.paragraphs.0")}</p>
                <p>{t("sections.0.paragraphs.1")}</p>
              </div>
            </div>

            {/* Second Story Card */}
            <div className="bg-gradient-to-br from-purple-900 to-purple-700 rounded-2xl shadow-lg p-8 text-white transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-white/20 p-3 rounded-full">
                  <FaMagic className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold">{t("sections.1.title")}</h2>
              </div>
              <div className="space-y-4 text-purple-100 leading-relaxed">
                <p>{t("sections.1.paragraphs.0")}</p>
                <p>{t("sections.1.paragraphs.1")}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose Orion Städ?</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Experience the difference of our unique cleaning method that transforms homes and lives.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="text-center group">
                  <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                    <feature.icon className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Booking Section */}
        <section className="max-w-7xl mx-auto px-6 py-16" id="booking">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Booking Form */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              {step === 1 && (
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    dispatch(setBookingStep(2));
                  }}
                  className="space-y-6"
                >
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">{t("bookingForm.title")}</h2>
                    <p className="text-gray-600 leading-relaxed">{t("bookingForm.intro")}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      <FaHome className="inline w-4 h-4 mr-2" />
                      {t("bookingForm.serviceLabel")}
                    </label>
                    <select
                      name="serviceType"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      required
                      value={bookingForm.serviceType || ""}
                      onChange={handleBookingChange}
                    >
                      {(t("bookingForm.serviceOptions", { returnObjects: true }) as Array<{ value: string; label: string }> ).map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      <FaHome className="inline w-4 h-4 mr-2" />
                      {t("bookingForm.sizeLabel")}
                    </label>
                    <input
                      name="homeSize"
                      type="number"
                      min="0"
                      placeholder="Enter size in m²"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      required
                      value={bookingForm.homeSize || ""}
                      onChange={handleBookingChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      <FaCalendar className="inline w-4 h-4 mr-2" />
                      {t("bookingForm.frequencyLabel")}
                    </label>
                    <select
                      name="frequency"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      required
                      value={bookingForm.frequency || ""}
                      onChange={handleBookingChange}
                    >
                      {(t("bookingForm.frequencyOptions", { returnObjects: true }) as Array<{ value: string; label: string }> ).map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-purple-500 text-white py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-purple-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                  >
                    <span>{t("bookingForm.nextLabel")}</span>
                    <FaArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}

              {step === 2 && (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  {/* Hidden inputs for booking step values */}
                  <input type="hidden" name="serviceType" value={bookingForm.serviceType || ""} />
                  <input type="hidden" name="homeSize" value={bookingForm.homeSize || ""} />
                  <input type="hidden" name="frequency" value={bookingForm.frequency || ""} />

                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">{t("customerForm.title")}</h2>
                    <p className="text-gray-600">Please provide your contact information to complete the booking.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(t("customerForm.fields", { returnObjects: true }) as Array<{ name: string; type: string; placeholder: string }> ).map((field, idx) => (
                      <div key={idx} className={field.name === 'specialInstructions' || field.name === 'accessInstructions' || field.name === 'priorityAreas' ? 'md:col-span-2' : ''}>
                        <label htmlFor={field.name} className="block text-sm font-semibold text-gray-700 mb-2">
                          {field.placeholder}
                        </label>
                        <input
                          name={field.name}
                          type={field.type}
                          id={field.name}
                          placeholder={`Enter your ${field.placeholder.toLowerCase()}...`}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                          required={['fullName', 'email', 'phone', 'address'].includes(field.name)}
                          value={customerForm[field.name] || ""}
                          onChange={handleCustomerChange}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      type="button"
                      className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-colors duration-200"
                      onClick={() => dispatch(setBookingStep(1))}
                    >
                      {t("customerForm.backLabel")}
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-gradient-to-r from-purple-600 to-purple-500 text-white py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-purple-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <FaCheckCircle className="w-4 h-4" />
                          <span>{t("customerForm.submitLabel")}</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Booking Benefits */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-purple-900 to-purple-700 rounded-2xl shadow-lg p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">What You Get</h3>
                <div className="space-y-4">
                  {[
                    "Free consultation and customized cleaning plan",
                    "Professional, trained, and trusted cleaners",
                    "Eco-friendly products safe for family and pets",
                    "Flexible scheduling that works with your life",
                    "100% satisfaction guarantee",
                    "Same cleaner for consistency and trust"
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <FaCheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-purple-100">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Quick Contact</h3>
                <p className="text-gray-600 mb-6">
                  Have questions? Need to discuss special requirements? We're here to help!
                </p>
                <div className="space-y-3">
                  <a
                    href="tel:+4670418097"
                    className="flex items-center space-x-3 text-purple-600 hover:text-purple-700 transition-colors"
                  >
                    <div className="bg-purple-100 p-2 rounded-full">
                      <FaCheckCircle className="w-4 h-4" />
                    </div>
                    <span className="font-medium">Call us: +46 70 418 05 97</span>
                  </a>
                  <a
                    href="https://wa.me/message/I6GQY6OWYB5FH1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 text-green-600 hover:text-green-700 transition-colors"
                  >
                    <div className="bg-green-100 p-2 rounded-full">
                      <FaCheckCircle className="w-4 h-4" />
                    </div>
                    <span className="font-medium">WhatsApp us instantly</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {showLang && <LanguageSwitcher />}
    </>
  );
};

export { Home };