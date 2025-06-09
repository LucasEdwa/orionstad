import { useState } from "react";
import hero from '../assets/header-cleaning.jpg';
import orionLogo from '../assets/orion-logo.png';

export const Home = () => {
    const [step, setStep] = useState(1);

    return (
        <>
            <div className="flex flex-col justify-center relative bg-gray-100">
                <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${hero})` }}>
                    {/* Pelicule overlay */}
                    <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-10"></div>
                    <img src={orionLogo} alt="Orion Städ Logo" className="absolute top-4 left-4 w-24 h-auto xl:w-[15rem] rounded-full z-20" />
                </div>
                <header className="w-full absolute z-30">
                    <div className="px-4 py-6 text-white mt-24 xl:mt-0">
                        <h1 className="text-3xl font-bold text-center xl:text-6xl">Welcome to Orion Städ</h1>
                        <p className="text-lg text-center mt-2 font-semibold xl:text-2xl">Your trusted partner for professional cleaning services</p>
                    </div>
                </header>
                <main className="">
                    <img src={hero} alt="Cleaning Service" className="max-w-full h-auto xl:h-[40rem] rounded-lg shadow-lg" />
                </main>
            </div>
            <main className="mx-auto px-4 py-8 xl:flex xl:w-full">
                <section className="mx-auto px-4 py-8">
                    <h1 className="text-2xl font-bold mb-4 ">About Orion Städ</h1>
                    <p className="text-gray-700 mb-4">
                        At Orion Städ, we believe in delivering excellence with every clean. Our team of dedicated professionals is committed to ensuring your home is spotless and sparkling, giving you more time to enjoy the things that matter most.
                    </p>
                    <p className="text-gray-700">
                        We offer a range of customizable cleaning services tailored to meet your specific needs. From regular home cleaning to deep cleaning, our goal is to provide a stress-free experience with results you can trust.
                    </p>
                </section>
                <section className=" w-full px-4 py-8 flex flex-col ">
                    {step === 1 && (
                        <form
                            className="w-full"
                            onSubmit={e => {
                                e.preventDefault();
                                setStep(2);
                            }}
                        >
                            <h2 className="text-2xl font-bold mb-4">Book a Cleaning Service</h2>
                            <p className="text-gray-700 mb-4">
                                Ready to experience the Orion Städ difference? Booking a cleaning service is easy! Simply click the button below to get started.
                            </p>
                            <h3 className="text-xl font-semibold mb-2">Select Service Type and Enter Home Size</h3>
                            <select className="border border-gray-300 rounded p-2 mb-4 w-full" required>
                                <option value="">Select Service Type</option>
                                <option value="regular">Regular Cleaning</option>
                                <option value="deep">Deep Cleaning</option>
                                <option value="move-in-out">Move In/Out Cleaning</option>
                            </select>
                            <h2 className="text-xl font-semibold mb-2">Enter Home Size (m²):</h2>
                            <input
                                type="number"
                                min="0"
                                placeholder="Enter home size in m²"
                                className="border border-gray-300 rounded p-2 mb-4 w-full"
                                required
                            />
                            <h2 className="text-xl font-semibold mb-2">Select Cleaning Frequency:</h2>
                            <select className="border border-gray-300 rounded p-2 mb-4 w-full" required>
                                <option value="">Select Frequency</option>
                                <option value="one-time">One-Time Cleaning</option>
                                <option value="weekly">Weekly Cleaning</option>
                                <option value="bi-weekly">Bi-Weekly Cleaning</option>
                                <option value="monthly">Monthly Cleaning</option>
                            </select>
                            <button
                                type="submit"
                                className="bg-[#c09cc1] text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors w-full"
                            >
                                Next
                            </button>
                        </form>
                    )}
                    {step === 2 && (
                        <form
                            onSubmit={e => {
                                e.preventDefault();
                                // handle submit here
                            }}
                        >
                            <h2 className="text-2xl font-bold mb-4">Customer Information</h2>
                            <input
                                type="text"
                                placeholder="Full Name"
                                className="border border-gray-300 rounded p-2 mb-4 w-full max-w-md"
                                required
                            />
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="border border-gray-300 rounded p-2 mb-4 w-full max-w-md"
                                required
                            />
                            <input
                                type="tel"
                                placeholder="Phone Number"
                                className="border border-gray-300 rounded p-2 mb-4 w-full max-w-md"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Address"
                                className="border border-gray-300 rounded p-2 mb-4 w-full max-w-md"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Number of Rooms"
                                className="border border-gray-300 rounded p-2 mb-4 w-full max-w-md"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Number of Bathrooms"
                                className="border border-gray-300 rounded p-2 mb-4 w-full max-w-md"
                                required
                            />
                            <input
                                type="text"
                                placeholder="How to Access Your Home"
                                className="border border-gray-300 rounded p-2 mb-4 w-full max-w-md"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Priority Areas to Clean"
                                className="border border-gray-300 rounded p-2 mb-4 w-full max-w-md"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Any Special Instructions"
                                className="border border-gray-300 rounded p-2 mb-4 w-full max-w-md"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Sensitive Materials or Allergies"
                                className="border border-gray-300 rounded p-2 mb-4 w-full max-w-md"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Pets in the Home"
                                className="border border-gray-300 rounded p-2 mb-4 w-full max-w-md"
                                required
                            />
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 transition-colors"
                                    onClick={() => setStep(1)}
                                >
                                    Back
                                </button>
                                <button
                                    type="submit"
                                    className="bg-[#c09cc1] text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    )}
                </section>
                <section className="max-w-4xl mx-auto px-4 py-8">
                    <h2 className="text-2xl font-bold mb-4">Why Choose Us?</h2>
                    <p className="text-gray-700 mb-4">
                        Orion Städ stands out for its commitment to quality and customer satisfaction. We use eco-friendly products and the latest cleaning techniques to ensure your home is not only clean but also safe for you and your loved ones.
                    </p>
                    <p className="text-gray-700 mb-4">
                        Our services are flexible and affordable, making it easy to keep your home in top shape without breaking the bank. Join the many satisfied customers who trust Orion Städ for their home cleaning needs.
                    </p>
                </section>
            </main>
        </>
    );
}