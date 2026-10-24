import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Container } from "../../../../components/ui";

// Design PDF, page 1: 26px heading 31px below the trust strip; four 225x111 cards (9px radius), 30px apart

interface HelpItem {
  title: string;
  text: string;
}

export const HowWeCanHelp = () => {
  const { t } = useTranslation("home");
  const items = t("help.items", { returnObjects: true }) as HelpItem[];

  return (
    <section className="pt-[1.9375rem] pb-14" aria-labelledby="help-heading">
      <Container>
        <h2 id="help-heading" className="text-[1.625rem] leading-[1.625rem] text-ink tracking-tight">
          {t("help.title")}
        </h2>
        <div className="mt-[1.0625rem] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[1.875rem]">
          {(Array.isArray(items) ? items : []).map((item) => (
            <Link
              key={item.title}
              to="/services"
              className="group block bg-white border border-line rounded-[0.5625rem] h-[6.9375rem] pt-[1.5625rem] px-[1.125rem] hover:border-olive/40 transition-colors duration-200"
            >
              <h3 className="text-[1rem] leading-[1rem] text-ink group-hover:text-olive transition-colors">{item.title}</h3>
              <p className="mt-3 text-[0.75rem] leading-[1.125rem] text-muted">{item.text}</p>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
};
