import serviceIMG from '../assets/service-1.jpg';
import orionLogo from '../assets/orion-logo.png';
import { SERVICES_HERO, SERVICES_SECTIONS } from '../constants/services';



export const Services = () => {
    return (
        <div>
            <div className="relative flex flex-col justify-center bg-gray-100">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${serviceIMG})` }}
                >
                    <div className="absolute inset-0 bg-black/40 z-10"></div>
                    <img
                        src={orionLogo}
                        alt={SERVICES_HERO.logoAlt}
                        className="absolute top-4 left-4 w-24 h-auto xl:w-[15rem] rounded-full z-20"
                    />
                </div>
                <header className="w-full absolute z-30">
                    <div className="px-4 py-6 text-white mt-24 xl:mt-0">
                        <h1 className="text-3xl font-bold text-center xl:text-6xl">{SERVICES_HERO.title}</h1>
                        <p className="text-lg text-center mt-2 font-semibold xl:text-2xl">
                            {SERVICES_HERO.subtitle}
                        </p>
                    </div>
                </header>
                <main>
                    <img
                        src={serviceIMG}
                        alt={SERVICES_HERO.imgAlt}
                        className="max-w-full h-auto xl:h-[40rem] rounded-lg shadow-lg"
                    />
                </main>
            </div>
            <main className="mx-auto px-4 py-8 xl:flex xl:w-full gap-5">
                {SERVICES_SECTIONS.map((section, idx) => (
                    <section
                        key={section.title}
                        className={`px-4 py-8 ${idx === 0 ? "mx-auto" : "w-full flex flex-col"} xl:w-1/3${idx < SERVICES_SECTIONS.length - 1 ? " border-r border-gray-200" : ""} transition-transform duration-300 hover:scale-105`}
                    >
                        <h1 className="text-2xl font-bold mb-4">{section.title}</h1>
                        {section.contents.map((content, i) =>
                            content.type === "text" ? (
                                <p className="text-gray-700 mb-4" key={i}>
                                    {"label" in content && content.label && (
                                        <span className="font-bold text-lg">{content.label} </span>
                                    )}
                                    {content.text}
                                </p>
                            ) : (
                                <ul className="list-disc pl-5 mb-4" key={i}>
                                    {content.items?.map((item, j) => (
                                        <li key={j}>{item}</li>
                                    ))}
                                </ul>
                            )
                        )}
                    </section>
                ))}
            </main>
        </div>
    );
}
