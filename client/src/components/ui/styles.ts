// Class helpers shared by the Orion Home UI components and forms.
// Values are the design PDF's px sizes in rem (px / 16), so they scale with
// the root font size on wide screens (see index.css).
export type ButtonVariant = 'primary' | 'text';

const BUTTON_STYLES: Record<ButtonVariant, string> = {
  // 43px tall, 7px radius, 12px bold label left-aligned with a 16px inset
  primary:
    'inline-flex items-center justify-start gap-2 h-[2.6875rem] px-4 bg-olive hover:bg-olive-dark text-white text-[0.75rem] font-bold rounded-[0.4375rem] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
  text: 'inline-flex items-center gap-2 h-[2.6875rem] text-[0.75rem] text-olive hover:text-olive-dark hover:underline underline-offset-4 transition-colors duration-200',
};

export const buttonClass = (variant: ButtonVariant = 'primary', className = '') =>
  `${BUTTON_STYLES[variant]} ${className}`;

/** Inputs/selects are 41px tall, textareas 80px; 6px radius, 12px text */
export const fieldClass = (hasError = false, kind: 'input' | 'textarea' = 'input') =>
  `block w-full ${kind === 'textarea' ? 'h-[5rem] py-3 resize-none' : 'h-[2.5625rem]'} px-3 bg-white border rounded-[0.375rem] text-[0.75rem] text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-olive/30 focus:border-olive transition-colors duration-200 ${
    hasError ? 'border-red-500' : 'border-line'
  }`;

/** Field labels: 11px ink, 8px above the field */
export const labelClass = 'block text-[0.6875rem] leading-[0.6875rem] text-ink mb-2';
