// Shared building blocks for the Orion Home design (olive #55603A, ink #163B48,
// muted #58717A, line #DCE8EB, sage #F3F5EF). Sizes follow the design PDF,
// which is laid out at 1100px wide with 55px side gutters (990px content).
// Values are written in rem (px / 16) so they scale with the root size.
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { Link, type LinkProps } from 'react-router-dom';
import { buttonClass, type ButtonVariant } from './styles';

export const Container = ({ className = '', children }: { className?: string; children: ReactNode }) => (
  <div className={`max-w-[68.75rem] mx-auto px-4 sm:px-6 lg:px-[3.4375rem] ${className}`}>{children}</div>
);

/** 10px bold uppercase label above headings */
export const Eyebrow = ({ className = '', children }: { className?: string; children: ReactNode }) => (
  <p className={`eyebrow ${className}`}>{children}</p>
);

export const ButtonLink = ({
  variant = 'primary',
  className = '',
  ...props
}: LinkProps & { variant?: ButtonVariant }) => (
  <Link className={buttonClass(variant, className)} {...props} />
);

export const Button = ({
  variant = 'primary',
  className = '',
  type = 'button',
  ...props
}: ComponentPropsWithoutRef<'button'> & { variant?: ButtonVariant }) => (
  <button type={type} className={buttonClass(variant, className)} {...props} />
);

/** White card with the 1px line border; pass the radius (9–12px in the design) via className */
export const Card = ({ className = '', ...props }: ComponentPropsWithoutRef<'div'>) => (
  <div className={`bg-white border border-line ${className}`} {...props} />
);

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
}

/**
 * Sage band that opens every inner page: starts 16px below the nav rule,
 * 177px tall (27 top, 10px eyebrow, 21, 34px title, 16, 14px subtitle, 55 bottom).
 */
export const PageHeader = ({ eyebrow, title, subtitle }: PageHeaderProps) => (
  <section className="bg-sage mt-4">
    <Container className="pt-[1.6875rem] pb-[3.4375rem]">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1 className="mt-[1.3125rem] text-[1.75rem] leading-[1.2] sm:text-[2.125rem] sm:leading-[2.125rem] text-ink tracking-tight">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-4 text-[0.875rem] leading-[1.6] sm:leading-[0.875rem] text-muted max-w-[47.5rem]">{subtitle}</p>
      )}
    </Container>
  </section>
);
