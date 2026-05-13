import { useEffect, useState } from "react";
import { ParticleEffect } from "../features/hero";
import { Link } from "react-router-dom";

export default function PromoPopup() {
    const [expired, setExpired] = useState(false);
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    const formatNumber = (n: number) => String(n).padStart(2, "0");

    const calculateTimeLeft = () => {
        const targetDate = new Date("2025-11-30T23:59:59");
        const now = new Date();
        const difference = targetDate.getTime() - now.getTime();

        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((difference / (1000 * 60)) % 60);
            const seconds = Math.floor((difference / 1000) % 60);

            setTimeLeft({ days, hours, minutes, seconds });
            return false;
        } else {
            setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            setExpired(true);
            return true;
        }
    };

    useEffect(() => {
        calculateTimeLeft();
        const timer = window.setInterval(() => {
            const isExpired = calculateTimeLeft();
            if (isExpired) {
                clearInterval(timer);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    if (expired) return null;

    return (
        <div className=" inset-0 flex items-center justify-center  p-4 pointer-events-none">
            <div
                className="relative pointer-events-auto  w-full rounded-2xl overflow-hidden shadow-2xl border border-gray-800"
                role="dialog"
                aria-label="Black Week promotion — 40% off"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-black via-zinc-900 to-gray-800 opacity-95" />

                <div className="absolute inset-0 mix-blend-screen pointer-events-none">
                    <ParticleEffect />
                </div>

                <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 p-6 md:py-8 md:px-12">
                    <div className="flex-1 flex flex-col items-start">
                        <div className="flex items-center gap-4">
                            <div className="bg-orion-gradient text-black font-extrabold px-3 py-1 rounded-full transform -rotate-6 shadow-lg">
                                Black Week
                            </div>
                            <div className="text-sm text-gray-300 italic">LIMITED TIME</div>
                        </div>

                        <p className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-yellow-300">
                            40% OFF
                        </p>

                        <p className="mt-3 text-gray-300 max-w-lg">
                            Save 40% on your first 3-hour cleaning session. Hurry — slots fill up fast.
                        </p>

                        <div className="mt-6 flex items-center gap-3">
                            <Link
                                to="/booking"
                                className="inline-flex items-center gap-2 bg-orion-gradient text-black font-semibold px-5 py-3 rounded-full shadow-2xl hover:scale-[1.02] transform transition"
                                aria-label="Book now — 40% off"
                            >
                                Book now
                                <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                                    <path d="M12.293 5.293a1 1 0 011.414 1.414L10.414 10l3.293 3.293a1 1 0 01-1.414 1.414L8 10.707a1 1 0 010-1.414l4.293-4.293z" />
                                </svg>
                            </Link>

                         
                        </div>
                    </div>

                    <div className="w-full md:w-96 bg-gradient-to-tl from-white/5 to-white/3 border border-white/5 rounded-xl p-4 backdrop-blur-md">
                        <div className="flex flex-col items-center">
                            <div className="text-sm text-gray-300">Hurry up — offer ends in</div>

                            <div
                                className="mt-3 w-full grid grid-cols-4 gap-3"
                                role="timer"
                                aria-live="polite"
                                aria-atomic="true"
                            >
                                {[
                                    { label: "Days", value: formatNumber(timeLeft.days) },
                                    { label: "Hours", value: formatNumber(timeLeft.hours) },
                                    { label: "Minutes", value: formatNumber(timeLeft.minutes) },
                                    { label: "Seconds", value: formatNumber(timeLeft.seconds) },
                                ].map((block) => (
                                    <div
                                        key={block.label}
                                        className="flex flex-col items-center bg-black/40 border border-white/6 rounded-lg py-3"
                                    >
                                        <span className="font-mono text-2xl md:text-3xl font-bold text-white">
                                            {block.value}
                                        </span>
                                        <span className="text-xs text-gray-300 mt-1">{block.label}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-3 text-xs text-gray-400">
                                Expires on <time dateTime="2025-11-30T23:59:59">Nov 30, 2025 23:59</time>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="absolute top-3 right-3">
                    <div className="inline-flex items-center gap-2 bg-white/10 px-2 py-1 rounded-md text-xs text-gray-200 font-medium">
                        <svg className="w-4 h-4 text-yellow-400" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                            <path d="M12 2l2.9 6.3L21 10l-5 3.6L17.8 21 12 17.8 6.2 21 7 13.6 2 10l6.1-1.7L12 2z" />
                        </svg>
                        Hot
                    </div>
                </div>
            </div>
        </div>
    );
}
