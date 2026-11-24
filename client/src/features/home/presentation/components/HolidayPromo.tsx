import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Container } from "../../../../components/ui";
import promoImage from "../../../../assets/living-room-sofa.jpg";

// Christmas & New Year offer: 10% off storstädning booked 2 Dec 2026 – 20 Jan 2027.
// Remove this section (and home.holidayPromo in the locales) once the offer is over.
const OFFER_ENDS = new Date("2027-01-20T23:59:59+01:00").getTime();

export const HolidayPromo = () => {
  const { t } = useTranslation("home");

  // Rendered at build time so the offer is in the static HTML; the browser
  // hides it once the offer has ended, without a hydration mismatch.
  const [active, setActive] = useState(true);
  useEffect(() => {
    setActive(Date.now() <= OFFER_ENDS);
  }, []);

  if (!active) return null;

  return (
    <Container className="pt-[1.375rem]">
      <section
        aria-labelledby="holiday-promo-heading"
        className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] overflow-hidden rounded-[0.75rem] bg-olive"
      >
        <img
          src={promoImage}
          alt=""
          width={1600}
          height={1200}
          loading="lazy"
          className="w-full h-[14rem] sm:h-[18rem] lg:h-full object-cover"
        />

        <div className="px-6 py-8 sm:px-10 sm:py-10 lg:px-12 lg:py-12">
          <p className="text-[0.75rem] font-bold uppercase tracking-[0.06em] text-[#e5d9b8]">
            {t("holidayPromo.eyebrow")}
          </p>
          <h2
            id="holiday-promo-heading"
            className="mt-4 text-white tracking-tight text-[1.75rem] leading-[2.125rem] sm:text-[2.125rem] sm:leading-[2.625rem]"
          >
            <span className="block">{t("holidayPromo.title")}</span>
            <span className="block mt-3 font-bold text-[2.125rem] leading-[2.5rem] sm:text-[2.625rem] sm:leading-[3.125rem]">
              {t("holidayPromo.offer")}
            </span>
          </h2>
          <p className="mt-4 text-[0.9375rem] leading-[1.5rem] text-white/90 max-w-[28rem]">
            {t("holidayPromo.text")}
          </p>
          <p className="mt-3 text-[0.9375rem] leading-[1.5rem] text-[#e5d9b8]">
            {t("holidayPromo.validity")}
          </p>
          <Link
            to="/contact?service=storstadning"
            className="mt-6 inline-flex items-center h-[2.6875rem] px-5 rounded-[0.4375rem] bg-[#f7f5ef] hover:bg-white text-olive text-[0.8125rem] font-bold transition-colors duration-200"
          >
            {t("holidayPromo.cta")}
          </Link>
        </div>
      </section>
    </Container>
  );
};
