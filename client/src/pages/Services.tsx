import serviceIMG from '../assets/service-1.jpg';
import orionLogo from '../assets/orion-logo.png';



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
                        alt="services-img"
                        className="absolute top-4 left-4 w-24 h-auto xl:w-[15rem] rounded-full z-20"
                    />
                </div>
                <header className="w-full absolute z-30">
                    <div className="px-4 py-6 text-white mt-24 xl:mt-0">
                        <h1 className="text-3xl font-bold text-center xl:text-6xl">Our Services</h1>
                        <p className="text-lg text-center mt-2 font-semibold xl:text-2xl">
                            Discover our range of professional cleaning services
                        </p>
                    </div>
                </header>
                <main>
                    <img
                        src={serviceIMG}
                        alt="Service-hero"
                        className="max-w-full h-auto xl:h-[40rem] rounded-lg shadow-lg"
                    />
                </main>
            </div>
            <main className="mx-auto px-4 py-8 xl:flex xl:w-full gap-5">
                <section className="mx-auto px-4 py-8 xl:w-1/3 border-r border-gray-200 transition-transform duration-300 hover:scale-105">
                    <h1 className="text-2xl font-bold mb-4">Home Cleaning (Hemstädning)</h1>
                    <div className="text-gray-700 mb-4">
                        <span className="font-bold text-lg">Regular Cleaning:</span> Available on a weekly, biweekly, or monthly basis. Includes:
                        <ul className="list-disc pl-5">
                            <li>Dusting all surfaces</li>
                            <li>Vacuuming and mopping floors</li>
                            <li>Cleaning bathrooms: toilets, showers, sinks</li>
                            <li>Kitchen cleaning: wiping down surfaces, cleaning exterior of appliances</li>
                            <li>Emptying trash bins</li>
                        </ul>
                    </div>
                    <div className="text-gray-700">
                        <span className="font-bold text-lg">Deep Cleaning:</span> A more thorough version of regular cleaning. Includes:
                        <ul className="list-disc pl-5">
                            <li>All tasks from regular cleaning</li>
                            <li>Detailed cleaning of hard-to-reach areas</li>
                            <li>Cleaning behind and under furniture</li>
                            <li>Oven and refrigerator interior cleaning</li>
                        </ul>
                    </div>
                    <div className="text-gray-700 mt-4">
                        <span className="font-bold text-lg">Move-In/Move-Out Cleaning:</span> Comprehensive cleaning for moving in or out. Includes:
                        <ul className="list-disc pl-5">
                            <li>All tasks from deep cleaning</li>
                            <li>Cleaning inside cabinets and closets</li>
                            <li>Cleaning windows and window sills</li>
                            <li>Removing any remaining dust or debris</li>
                        </ul>
                    </div>
                </section>
                <section className="w-full px-4 py-8 flex flex-col xl:w-1/3 border-r border-gray-200 transition-transform duration-300 hover:scale-105">
                    <h2 className="text-2xl font-bold mb-4">Office Cleaning</h2>

                    <p className="text-gray-700 mb-4">
                        Tailored cleaning services for office environments. Includes:
                    </p>
                    <ul className="list-disc pl-5 mb-4">
                        <li>Custom cleaning plans to meet the needs of your office</li>
                        <li>Vacuuming and mopping of office floors</li>
                        <li>Cleaning and disinfecting workspaces, including desks, chairs, and common areas</li>
                        <li>Restroom cleaning and restocking of supplies</li>
                        <li>Kitchen area cleaning, including appliances and surfaces</li>
                        <li>Flexible scheduling to minimize disruption to your workday</li>
                    </ul>

                </section>
                <section className="w-full px-4 py-8 flex flex-col xl:w-1/3 transition-transform duration-300 hover:scale-105">
                    <h2 className="text-2xl font-bold mb-4">Specialized Services</h2>

                    <p className="text-gray-700 mb-4">
                        <span className="font-bold text-lg">Fridge Cleaning:</span> Includes:
                    </p>
                    <ul className="list-disc pl-5 mb-4">
                        <li>Removing all items from the fridge</li>
                        <li>Thorough cleaning of all shelves, drawers, and surfaces</li>
                        <li>Replacing items in the fridge</li>
                    </ul>
                    <p className="text-gray-700 mb-4">
                        <span className="font-bold text-lg">Oven Cleaning:</span> Includes:
                    </p>
                    <ul className="list-disc pl-5 mb-4">
                        <li>Cleaning the inside of the oven</li>
                        <li>Cleaning oven racks and door</li>
                    </ul>
                    <p className="text-gray-700 mb-4">
                        <span className="font-bold text-lg">Extra Requests: </span>
                        We also offer customized cleaning services based on specific needs.
                    </p>

                </section>
            </main>
        </div>
    );
}
