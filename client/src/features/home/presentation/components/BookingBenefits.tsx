import { useTranslation } from "react-i18next";
import { FaCheck, FaPhone, FaWhatsapp } from 'react-icons/fa';
import { Card } from "../../../../components/ui";

interface BookingBenefitsProps {
  benefits: string[];
}

export const BookingBenefits = ({ benefits }: BookingBenefitsProps) => {
  const { t } = useTranslation("home");

  return (
    <div className="space-y-6">
      {/** Benefits Section */}
      <Card className="rounded-[0.75rem] p-[1.5625rem]">
        <h3 className="text-[1.5625rem] leading-[1.5625rem] text-ink tracking-tight mb-6">{t("benefits.title")}</h3>
        <ul className="space-y-3">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex items-start gap-3">
              <FaCheck className="w-3 h-3 mt-1 text-olive flex-shrink-0" />
              <span className="text-[0.8125rem] leading-[1.375rem] text-muted">{benefit}</span>
            </li>
          ))}
        </ul>
      </Card>
      {/** Quick Contact Section */}
      <Card className="rounded-[0.75rem] p-[1.5625rem]">
        <h3 className="text-[1.5625rem] leading-[1.5625rem] text-ink tracking-tight mb-3">{t("benefits.quickContact.title")}</h3>
        <p className="text-[0.875rem] leading-[1.46875rem] text-muted mb-4">
          {t("benefits.quickContact.description")}
        </p>
        <div className="divide-y divide-line border-t border-line">
          <a
            href="tel:+46763272283"
            className="flex items-center gap-3 py-[0.875rem] text-[0.875rem] text-olive hover:text-olive-dark transition-colors"
          >
            <FaPhone className="w-3.5 h-3.5" />
            <span>{t("benefits.quickContact.call")}</span>
          </a>
          <a
            href="https://wa.me/46763272283"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 py-[0.875rem] text-[0.875rem] text-olive hover:text-olive-dark transition-colors"
          >
            <FaWhatsapp className="w-3.5 h-3.5" />
            <span>{t("benefits.quickContact.whatsapp")}</span>
          </a>
        </div>
      </Card>
    </div>
  );
}
