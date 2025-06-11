import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import orionLogo from '../assets/orion-logo.png';
import contactImg from '../assets/service-2.jpg';

export const Contact = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const [sent, setSent] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        if (!formRef.current) return;
        emailjs
            .sendForm(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                formRef.current,
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            )
            .then(
                () => {
                    setSent(true);
                    formRef.current?.reset();
                },
                (err) => {
                    setError("Failed to send message. Please try again.");
                }
            );
    };

    return (
        <div className="">
            <div className="relative flex flex-col justify-center bg-gray-100">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${contactImg})` }}
                >
                    <div className="absolute inset-0 bg-black/40 z-10"></div>
                    <img
                        src={orionLogo}
                        alt="Orion Städ Logo"
                        className="absolute top-4 left-4 w-24 h-auto xl:w-[15rem] rounded-full z-20"
                    />
                </div>
                <header className="w-full absolute z-30">
                    <div className="px-4 py-6 text-white mt-24 xl:mt-0">
                        <h1 className="text-3xl font-bold text-center xl:text-6xl">Contact Us</h1>
                        <p className="text-lg text-center mt-2 font-semibold xl:text-2xl">
                            We're here to help. Get in touch with Orion Städ today.

                        </p>
                    </div>
                </header>
                <main>
                    <img
                        src={contactImg}
                        alt="About Hero"
                        className="max-w-full h-auto xl:h-[40rem] rounded-lg shadow-lg"
                    />
                </main>
            </div>
          <main className="mx-auto px-4 py-8 xl:flex xl:w-full gap-5">
              <section className="mx-auto px-4 py-8 xl:w-1/3 border-r border-gray-200 transition-transform duration-300 hover:scale-105">
                <h1 className="text-3xl font-bold mb-4 text-center">Why Contact Us</h1>
                <p className="text-lg mb-6">Whether you have a question, need more information, or are ready to book a service, we're here to assist you. Our team is dedicated to providing you with the best customer service experience possible.

                </p>
                <p className="text-lg mb-6">Don't hesitate to reach out to us. We're happy to help with any inquiries you may have.</p>
            </section>
            <section className="mx-auto px-4 py-8 xl:w-1/3 border-r border-gray-200 transition-transform duration-300">

                <h1 className="text-3xl font-bold mb-4 text-center">Contact Us</h1>
                <form
                    ref={formRef}
                    className="w-full bg-white p-6 rounded shadow-md"
                    onSubmit={handleSubmit}
                >
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                        <input name="user_name" type="text" id="name" className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input name="user_email" type="email" id="email" className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                        <textarea name="message" id="message" rows={4} className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" required></textarea>
                    </div>
                    <button type="submit" className="w-full bg-[#c09cc1] text-white py-2 rounded hover:bg-[#8e77ad] transition-colors duration-200">
                        Send Message
                    </button>
                    {sent && <p className="text-green-600 mt-2 text-center">Message sent successfully!</p>}
                    {error && <p className="text-red-600 mt-2 text-center">{error}</p>}
                </form>
            </section>
            <section className="mx-auto px-4 py-8 xl:w-1/3 border-r border-gray-200 transition-transform duration-300 hover:scale-105">
                <h1 className="text-3xl font-bold mb-4 text-center">Our Contact Details</h1>
                <p className="text-lg mb-6">You can reach us through the following channels:</p>
                <ul className="list-disc pl-5">
                    <li className="mb-2">
                        <strong>Email:</strong> <a href="mailto:polly@orionstad.se" className="text-[#c09cc1] hover:underline">polly@orionstad.se</a>
                    </li>
                    <li className="mb-2">
                        <strong>Phone:</strong> +46 70 418 05 97
                    </li>
                    <li className="mb-2">
                        <strong>Address:</strong> Orion Städ, Södervägen 18A, 141 36 Stockholm, Sweden
                    </li>
                </ul>


            </section>
            </main>
        </div>
    );
}