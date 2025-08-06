import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import orionLogo from '../assets/orion-logo.png';
import contactImg from '../assets/service-2.jpg';
import { useTranslation } from "react-i18next";
import { showSuccess, showError } from '../utils/sweetAlert';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaWhatsapp, FaClock, FaCheckCircle } from 'react-icons/fa';

export const Contact = () => {
    const { t } = useTranslation('contact');
    const hero = t('hero', { returnObjects: true }) as { logoAlt: string; imgAlt: string; title: string; subtitle: string };
    const sections = t('sections', { returnObjects: true }) as Array<any>;
    const formRef = useRef<HTMLFormElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [, setSent] = useState(false);
    const [, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);
        
        if (!formRef.current) return;
        
        try {
            await emailjs.sendForm(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_IDCONTACT,
                formRef.current,
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            );
            setSent(true);
            if (formRef.current) {
                formRef.current.reset();
            }
            showSuccess("Your message has been sent successfully! We'll get back to you soon.");
        } catch (err) {
            setError("Failed to send message. Please try again.");
            showError("Failed to send message. Please try again.");
            console.error("EmailJS error:", err);
        } finally {
            setIsSubmitting(false);
        }
    };

    const businessHours = t('businessHours', { returnObjects: true }) as {
        title: string;
        weekdays: string;
        weekends: string;
        note: string;
    };

    const quickActions = t('quickActions', { returnObjects: true }) as Array<{
        title: string;
        description: string;
        icon: string;
        action: string;
        href: string;
    }>;

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Hero Section */}
            <div className="relative flex flex-col justify-center min-h-[60vh] xl:min-h-[70vh]">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${contactImg})` }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-900/70 to-purple-600/50 z-10"></div>
                    <img
                        src={orionLogo}
                        alt={hero.logoAlt}
                        className="absolute top-6 left-6 w-20 h-20 xl:w-32 xl:h-32 rounded-full shadow-lg z-20 border-4 border-white/20"
                    />
                </div>
                
                <header className="relative z-30 text-center px-6 py-12">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-4xl md:text-5xl xl:text-7xl font-bold text-white mb-6 leading-tight">
                            {hero.title}
                        </h1>
                        <p className="text-xl md:text-2xl xl:text-3xl text-white/90 font-light max-w-3xl mx-auto leading-relaxed">
                            {hero.subtitle}
                        </p>
                    </div>
                </header>
            </div>

            {/* Quick Contact Actions */}
            <div className="max-w-7xl mx-auto px-6 -mt-16 relative z-40">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {quickActions.map((action, index) => {
                        let Icon;
                        switch (action.icon) {
                            case 'FaPhone': Icon = FaPhone; break;
                            case 'FaWhatsapp': Icon = FaWhatsapp; break;
                            case 'FaEnvelope': Icon = FaEnvelope; break;
                            default: Icon = FaCheckCircle;
                        }
                        
                        return (
                            <a
                                key={index}
                                href={action.href}
                                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 group"
                            >
                                <div className="flex flex-col items-center text-center">
                                    <div className="bg-purple-100 p-4 rounded-full mb-4 group-hover:bg-purple-200 transition-colors">
                                        <Icon className="w-6 h-6 text-purple-600" />
                                    </div>
                                    <h3 className="font-semibold text-gray-800 mb-2">{action.title}</h3>
                                    <p className="text-gray-600 text-sm">{action.description}</p>
                                    <span className="mt-3 text-purple-600 font-medium group-hover:underline">
                                        {action.action}
                                    </span>
                                </div>
                            </a>
                        );
                    })}
                </div>
            </div>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    
                    {/* Contact Form */}
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-gray-800 mb-4">
                                {sections[1]?.title}
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                {sections[0]?.paragraphs?.[0]}
                            </p>
                        </div>

                        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                            {(sections[1]?.fields ?? []).map((field: any, idx: number) => (
                                <div key={idx}>
                                    <label
                                        htmlFor={field.name}
                                        className="block text-sm font-semibold text-gray-700 mb-2"
                                    >
                                        {field.placeholder}
                                    </label>
                                    {field.type === "textarea" ? (
                                        <textarea
                                            name={field.name}
                                            id={field.name}
                                            rows={5}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
                                            required
                                            placeholder={`Enter your ${field.placeholder.toLowerCase()}...`}
                                        />
                                    ) : (
                                        <input
                                            name={field.name}
                                            type={field.type}
                                            id={field.name}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                                            required
                                            placeholder={`Enter your ${field.placeholder.toLowerCase()}...`}
                                        />
                                    )}
                                </div>
                            ))}
                            
                            <button 
                                type="submit" 
                                disabled={isSubmitting}
                                className="w-full bg-gradient-to-r from-purple-600 to-purple-500 text-white py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-purple-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Sending...
                                    </span>
                                ) : (
                                    t('sections.1.submitLabel', 'Send Message')
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-8">
                        
                        {/* Contact Details */}
                        <div className="bg-white rounded-2xl shadow-lg p-8">
                            <h2 className="text-3xl font-bold text-gray-800 mb-6">
                                {sections[2]?.title}
                            </h2>
                            <p className="text-gray-600 mb-6">{sections[2]?.intro}</p>
                            
                            <div className="space-y-4">
                                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                                    <div className="bg-purple-100 p-3 rounded-full">
                                        <FaEnvelope className="w-5 h-5 text-purple-600" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-800">Email</p>
                                        <a 
                                            href={sections[2]?.emailHref} 
                                            className="text-purple-600 hover:underline"
                                        >
                                            {sections[2]?.email}
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                                    <div className="bg-purple-100 p-3 rounded-full">
                                        <FaPhone className="w-5 h-5 text-purple-600" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-800">Phone</p>
                                        <a 
                                            href={`tel:${sections[2]?.phone}`}
                                            className="text-purple-600 hover:underline"
                                        >
                                            {sections[2]?.phone}
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                                    <div className="bg-purple-100 p-3 rounded-full">
                                        <FaMapMarkerAlt className="w-5 h-5 text-purple-600" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-800">Address</p>
                                        <p className="text-gray-600">{sections[2]?.address}</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-xl">
                                    <div className="bg-green-100 p-3 rounded-full">
                                        <FaWhatsapp className="w-5 h-5 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-800">WhatsApp</p>
                                        <a 
                                            href={sections[2]?.whatsapp} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="text-green-600 hover:underline"
                                        >
                                            {t('sections.2.whatsappLabel', 'Send us a message')}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Business Hours */}
                        <div className="bg-white rounded-2xl shadow-lg p-8">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="bg-purple-100 p-3 rounded-full">
                                    <FaClock className="w-5 h-5 text-purple-600" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800">{businessHours.title}</h3>
                            </div>
                            
                            <div className="space-y-3">
                                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                    <span className="font-medium text-gray-700">Monday - Friday</span>
                                    <span className="text-gray-600">{businessHours.weekdays}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                    <span className="font-medium text-gray-700">Saturday - Sunday</span>
                                    <span className="text-gray-600">{businessHours.weekends}</span>
                                </div>
                            </div>
                            
                            <div className="mt-6 p-4 bg-purple-50 rounded-xl">
                                <p className="text-sm text-purple-700">
                                    <strong>Note:</strong> {businessHours.note}
                                </p>
                            </div>
                        </div>

                        {/* Why Contact Us */}
                        <div className="bg-gradient-to-br from-purple-900 to-purple-700 rounded-2xl shadow-lg p-8 text-white">
                            <h3 className="text-2xl font-bold mb-4">{sections[0]?.title}</h3>
                            <p className="text-purple-100 leading-relaxed mb-4">
                                {sections[0]?.paragraphs?.[1]}
                            </p>
                            <div className="flex items-center space-x-2 text-purple-200">
                                <FaCheckCircle className="w-5 h-5" />
                                <span className="text-sm">We typically respond within 2 hours</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}