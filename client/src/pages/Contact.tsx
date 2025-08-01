import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import orionLogo from '../assets/orion-logo.png';
import contactImg from '../assets/service-2.jpg';
import { useTranslation } from "react-i18next";
import { showSuccess, showError } from '../utils/sweetAlert';

export const Contact = () => {
    const { t } = useTranslation('contact');
    const hero = t('hero', { returnObjects: true }) as { logoAlt: string; imgAlt: string; title: string; subtitle: string };
    const sections = t('sections', { returnObjects: true }) as Array<any>;
    const formRef = useRef<HTMLFormElement>(null);
    const [, setSent] = useState(false);
    const [, setError] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        if (!formRef.current) return;
        emailjs.sendForm(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_TEMPLATE_IDCONTACT,
            formRef.current,
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        ).then(() => {
            setSent(true);
            if (formRef.current) {
                formRef.current.reset();
            }
            showSuccess("Your message has been sent successfully!");
        }).catch((err) => {
            setError("Failed to send message. Please try again.");
            showError("Failed to send message. Please try again.");
            console.error("EmailJS error:", err);
        });
    };

    return (
        <div className="bg-gray-100">
            <div className="relative flex flex-col justify-center ">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${contactImg})` }}
                >
                    <div className="absolute inset-0 bg-black/40 z-10"></div>
                    <img
                        src={orionLogo}
                        alt={hero.logoAlt}
                        className="absolute top-4 left-4 w-24 h-auto xl:w-[15rem] rounded-full z-20"
                    />
                </div>
                    <div className="absolute inset-0 bg-white/40 z-10"></div>
                <header className="w-full absolute z-30">

                    <div className="px-4 py-6 text-gray-800 mt-24 xl:mt-0">
                        <h1 className="text-3xl font-bold text-center xl:text-6xl">{hero.title}</h1>
                        <p className="text-lg text-center mt-2 font-semibold xl:text-2xl">
                            {hero.subtitle}
                        </p>
                    </div>
                </header>
                <main>
                    <img
                        src={contactImg}
                        alt={hero.imgAlt}
                        className="max-w-full h-auto xl:h-[40rem] rounded-lg shadow-lg"
                    />
                </main>
            </div>
            <main className="mx-auto px-4 py-8 xl:flex xl:w-full gap-5">
                <section className="mx-auto px-4 py-8 xl:w-1/3 border-r border-gray-200 transition-transform duration-300 hover:scale-105">
                    <h1 className="text-3xl font-bold mb-4 text-center">{sections[0]?.title}</h1>
                    {sections[0]?.paragraphs?.map((p: string, i: number) => (
                        <p className="text-lg mb-6" key={i}>{p}</p>
                    ))}
                </section>
                <section className="mx-auto px-4 py-8 xl:w-1/3 border-r border-gray-200 transition-transform duration-300">
                    <h1 className="text-3xl font-bold mb-4 text-center">{sections[1]?.title}</h1>
                    <form
                        ref={formRef}
                        className="w-full bg-white p-6 rounded shadow-md"
                        onSubmit={handleSubmit}
                    >
                        {(sections[1]?.fields ?? []).map((field: any, idx: number) => (
                            <div className="mb-4" key={idx}>
                                <label
                                    htmlFor={field.name}
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    {field.placeholder}
                                </label>
                                {field.type === "textarea" ? (
                                    <textarea
                                        name={field.name}
                                        id={field.name}
                                        rows={4}
                                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                        placeholder={field.placeholder}
                                    />
                                ) : (
                                    <input
                                        name={field.name}
                                        type={field.type}
                                        id={field.name}
                                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                        placeholder={field.placeholder}
                                    />
                                )}
                            </div>
                        ))}
                        <button type="submit" className="w-full bg-[#c09cc1] text-white py-2 rounded hover:bg-[#8e77ad] transition-colors duration-200">
                            {t('sections.1.submitLabel', 'Send Message')}
                        </button>
                    </form>
                </section>
                <section className="mx-auto px-4 py-8 xl:w-1/3 border-r border-gray-200 transition-transform duration-300 hover:scale-105">
                    <h1 className="text-3xl font-bold mb-4 text-center">{sections[2]?.title}</h1>
                    <p className="text-lg mb-6">{sections[2]?.intro}</p>
                    <ul className="list-disc pl-5">
                        <li className="mb-2">
                            <strong>Email:</strong> <a href={sections[2]?.emailHref} className="text-[#c09cc1] hover:underline">{sections[2]?.email}</a>
                        </li>
                        <li className="mb-2">
                            <strong>Phone:</strong> {sections[2]?.phone}
                        </li>
                        <li className="mb-2">
                            <strong>Address:</strong> {sections[2]?.address}
                        </li>
                        <li className="mb-2">
                            <strong>WhatsApp:</strong> <a href={sections[2]?.whatsapp} className="text-[#c09cc1] hover:underline">{t('sections.2.whatsappLabel', 'Send us a message')}</a>
                        </li>
                    </ul>
                </section>
            </main>
        </div>
    );
}