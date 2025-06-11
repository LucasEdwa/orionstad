import orionLogo from '../assets/orion-logo.png';
import aboutImg from '../assets/header-cleaning.jpg';

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
          alt="Orion Städ Logo"
          className="absolute top-4 left-4 w-24 h-auto xl:w-[15rem] rounded-full z-20"
        />
      </div>
      <header className="w-full absolute z-30">
        <div className="px-4 py-6 text-white mt-24 xl:mt-0">
          <h1 className="text-3xl font-bold text-center xl:text-6xl">About Us</h1>
          <p className="text-lg text-center mt-2 font-semibold xl:text-2xl">
            Learn more about our story and mission
          </p>
        </div>
      </header>
      <main>
        <img
          src={aboutImg}
          alt="About Hero"
          className="max-w-full h-auto xl:h-[40rem] rounded-lg shadow-lg"
        />
      </main>
    </div>
    <main className="mx-auto px-4 py-8 xl:flex xl:w-full gap-5">
      <section className="mx-auto px-4 py-8 xl:w-1/3 border-r border-gray-200 transition-transform duration-300 hover:scale-105">
        <h1 className="text-2xl font-bold mb-4">Our Story</h1>
        <p className="text-gray-700 mb-4">
Founded with a passion for cleanliness, Orion Städ has grown into a trusted cleaning service provider. We pride ourselves on our attention to detail and commitment to quality.

        </p>
        <p className="text-gray-700">
          We believe in using eco-friendly products and techniques to ensure a safe and healthy environment for you and your family.
        </p>
      </section>
      <section className="w-full px-4 py-8 flex flex-col xl:w-1/3 border-r border-gray-200 transition-transform duration-300 hover:scale-105">
        <h1 className="text-2xl font-bold mb-4">Our Mission</h1>
        <p className="text-gray-700 mb-4">
Orion Städ is committed to providing top-notch cleaning services that exceed customer expectations. We aim to create cleaner, healthier, and happier living environments.        </p>
        <p className="text-gray-700">
          We are committed to continuous improvement and innovation in our cleaning methods, always seeking the best solutions for our clients.
        </p>
      </section>
      <section className="w-full px-4 py-8 flex flex-col xl:w-1/3 border-r border-gray-200 transition-transform duration-300 hover:scale-105">
        <h1 className="text-2xl font-bold mb-4">Our Team</h1>
        Our team of cleaning professionals is dedicated to delivering the highest standard of service. We are trained, experienced, and equipped with the best tools and products.
      </section>
    </main>
  </div>
);