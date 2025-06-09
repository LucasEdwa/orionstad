import { useState } from "react";
import hero from '../assets/header-cleaning.jpg';
import orionLogo from '../assets/orion-logo.png';
import {
  HOME_HERO,
  HOME_SECTIONS,
  BOOKING_FORM_CONTENT,
  CUSTOMER_FORM_CONTENT,
} from "../constants/home";

export const Home = () => {
    const [step, setStep] = useState(1);

    return (
        <>
            <div className="flex flex-col justify-center relative bg-gray-100">
                <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${hero})` }}>
                    <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-10"></div>
                    <img src={orionLogo} alt={HOME_HERO.logoImgAlt} className="absolute top-4 left-4 w-24 h-auto xl:w-[15rem] rounded-full z-20" />
                </div>
                <header className="w-full absolute z-30">
                    <div className="px-4 py-6 text-white mt-24 xl:mt-0">
                        <h1 className="text-3xl font-bold text-center xl:text-6xl">{HOME_HERO.welcome}</h1>
                        <p className="text-lg text-center mt-2 font-semibold xl:text-2xl">{HOME_HERO.subtitle}</p>
                    </div>
                </header>
                <main className="">
                    <img src={hero} alt={HOME_HERO.heroImgAlt} className="max-w-full h-auto xl:h-[40rem] rounded-lg shadow-lg" />
                </main>
            </div>
            <main className="mx-auto px-4 py-8 xl:flex xl:w-full">
                <section className="mx-auto px-4 py-8">
                    <h1 className="text-2xl font-bold mb-4 ">{HOME_SECTIONS[0].title}</h1>
                    <p className="text-gray-700 mb-4">
                        {HOME_SECTIONS[0].paragraphs[0]}
                    </p>
                    <p className="text-gray-700">
                        {HOME_SECTIONS[0].paragraphs[1]}
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
                            <h2 className="text-2xl font-bold mb-4">{BOOKING_FORM_CONTENT.title}</h2>
                            <p className="text-gray-700 mb-4">
                                {BOOKING_FORM_CONTENT.intro}
                            </p>
                            <h3 className="text-xl font-semibold mb-2">{BOOKING_FORM_CONTENT.serviceLabel}</h3>
                            <select className="border border-gray-300 rounded p-2 mb-4 w-full" required>
                                {BOOKING_FORM_CONTENT.serviceOptions.map(opt => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </select>
                            <h2 className="text-xl font-semibold mb-2">{BOOKING_FORM_CONTENT.sizeLabel}</h2>
                            <input
                                type="number"
                                min="0"
                                placeholder="Enter home size in m²"
                                className="border border-gray-300 rounded p-2 mb-4 w-full"
                                required
                            />
                            <h2 className="text-xl font-semibold mb-2">{BOOKING_FORM_CONTENT.frequencyLabel}</h2>
                            <select className="border border-gray-300 rounded p-2 mb-4 w-full" required>
                                {BOOKING_FORM_CONTENT.frequencyOptions.map(opt => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </select>
                            <button
                                type="submit"
                                className="bg-[#c09cc1] text-white px-4 py-2 rounded hover:bg-[#8e77ad] transition-colors w-full"
                            >
                                {BOOKING_FORM_CONTENT.nextLabel}
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
                            <h2 className="text-2xl font-bold mb-4">{CUSTOMER_FORM_CONTENT.title}</h2>
                            {CUSTOMER_FORM_CONTENT.fields.map((field, idx) => (
                                <input
                                    key={idx}
                                    type={field.type}
                                    placeholder={field.placeholder}
                                    className="border border-gray-300 rounded p-2 mb-4 w-full max-w-md"
                                    required
                                />
                            ))}
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 transition-colors"
                                    onClick={() => setStep(1)}
                                >
                                    {CUSTOMER_FORM_CONTENT.backLabel}
                                </button>
                                <button
                                    type="submit"
                                    className="bg-[#c09cc1] text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                                >
                                    {CUSTOMER_FORM_CONTENT.submitLabel}
                                </button>
                            </div>
                        </form>
                    )}
                </section>
                <section className="max-w-4xl mx-auto px-4 py-8">
                    <h2 className="text-2xl font-bold mb-4">{HOME_SECTIONS[1].title}</h2>
                    <p className="text-gray-700 mb-4">
                        {HOME_SECTIONS[1].paragraphs[0]}
                    </p>
                    <p className="text-gray-700 mb-4">
                        {HOME_SECTIONS[1].paragraphs[1]}
                    </p>
                </section>
            </main>
        </>
    );
}