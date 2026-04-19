import { BookingPage } from "../features/booking";
import { SEO, BASE_URL } from '../components/SEO';

export const Booking = () => {
    return (
      <>
        <SEO
          title="Book a Cleaning"
          description="Book professional cleaning services online with Orion Städ. Choose regular, deep, or move-in/move-out cleaning in Stockholm. Fast and easy booking."
          keywords="boka städning Stockholm, book cleaning online, hemstädning bokning, schedule cleaning Stockholm, städning offert, boka hemstädning"
          canonicalUrl={`${BASE_URL}/booking`}
          breadcrumbs={[
            { name: 'Home', url: BASE_URL },
            { name: 'Book a Cleaning', url: `${BASE_URL}/booking` },
          ]}
        />
        <BookingPage />
      </>
    );
}