import orionLogo from '../assets/orion-logo.png';
import aboutImg from '../assets/header-cleaning.jpg';
import { ABOUT_HERO, ABOUT_SECTIONS } from '../constants/about';

export const About = () => (
  <div>
    <div className="relative flex flex-col justify-center bg-gray-100">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${aboutImg})` }}
      >
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <img
          src={orionLogo}
          alt={ABOUT_HERO.logoAlt}
          className="absolute top-4 left-4 w-24 h-auto xl:w-[15rem] rounded-full z-20"
        />
      </div>
      <header className="w-full absolute z-30">
        <div className="px-4 py-6 text-white mt-24 xl:mt-0">
          <h1 className="text-3xl font-bold text-center xl:text-6xl">{ABOUT_HERO.title}</h1>
          <p className="text-lg text-center mt-2 font-semibold xl:text-2xl">
            {ABOUT_HERO.subtitle}
          </p>
        </div>
      </header>
      <main>
        <img
          src={aboutImg}
          alt={ABOUT_HERO.imgAlt}
          className="max-w-full h-auto xl:h-[40rem] rounded-lg shadow-lg"
        />
      </main>
    </div>
    <main className="mx-auto px-4 py-8 xl:flex xl:w-full gap-5">
      {ABOUT_SECTIONS.map((section, idx) => (
        <section
          key={section.title}
          className={`px-4 py-8 ${idx === 0 ? "mx-auto" : "w-full flex flex-col"} xl:w-1/3 border-r border-gray-200 transition-transform duration-300 hover:scale-105`}
        >
          <h1 className="text-2xl font-bold mb-4">{section.title}</h1>
          {section.paragraphs.map((p, i) => (
            <p className="text-gray-700 mb-4" key={i}>{p}</p>
          ))}
        </section>
      ))}
    </main>
  </div>
);