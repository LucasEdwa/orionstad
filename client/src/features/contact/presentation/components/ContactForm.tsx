import { memo, useEffect, useRef } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { useSearchParams } from 'react-router-dom';
import type { ContactFormCopy } from '../../domain/entities/Contact';
import { ContactDataService } from '../../application/ContactDataService';
import { useContactForm } from '../hooks/useContactForm';
import { FieldError } from '../../../../components/FieldError';
import { Card } from '../../../../components/ui';
import { buttonClass, fieldClass, labelClass } from '../../../../components/ui/styles';

// Module-level singleton — pure helpers, no state
const contactDataService = new ContactDataService();

export interface ServiceOption {
  value: string;
  label: string;
}

interface ContactFormProps {
  copy: ContactFormCopy;
  serviceOptions: ServiceOption[];
}

export const ContactForm = memo<ContactFormProps>(({ copy, serviceOptions }) => {
  const { handleSubmit, isSubmitting, fieldErrors, clearFieldError } = useContactForm();
  const [searchParams] = useSearchParams();

  const serviceRef = useRef<HTMLSelectElement>(null);

  const options = [...serviceOptions, { value: 'other', label: copy.serviceOther }];
  const optionValues = options.map((option) => option.value).join('|');

  // Preselect from /contact?service=<id>. Done after mount because the page is
  // prerendered without query params, and kept uncontrolled so form.reset() clears it.
  const requestedService = searchParams.get('service');
  useEffect(() => {
    if (!serviceRef.current) return;
    serviceRef.current.value = contactDataService.getInitialService(requestedService, optionValues.split('|'));
  }, [requestedService, optionValues]);

  return (
    <Card className="rounded-[0.75rem] px-[1.5625rem] py-7">
      <h2 className="text-[1.5625rem] leading-[1.5625rem] text-ink tracking-tight">{copy.title}</h2>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-[14.375rem_minmax(0,1fr)] gap-x-[1.5625rem] gap-y-5">
          <div>
            <label htmlFor="user_name" className={labelClass}>{copy.nameLabel}</label>
            <input
              name="user_name"
              type="text"
              id="user_name"
              autoComplete="name"
              className={fieldClass(!!fieldErrors.user_name)}
              required
              placeholder={copy.namePlaceholder}
              onChange={() => clearFieldError('user_name')}
            />
            <FieldError name="user_name" errors={fieldErrors} />
          </div>
          <div>
            <label htmlFor="user_email" className={labelClass}>{copy.emailLabel}</label>
            <input
              name="user_email"
              type="email"
              id="user_email"
              autoComplete="email"
              className={fieldClass(!!fieldErrors.user_email)}
              required
              placeholder={copy.emailPlaceholder}
              onChange={() => clearFieldError('user_email')}
            />
            <FieldError name="user_email" errors={fieldErrors} />
          </div>
        </div>

        <div>
          <label htmlFor="service" className={labelClass}>{copy.serviceLabel}</label>
          <div className="relative">
            <select
              ref={serviceRef}
              name="service"
              id="service"
              defaultValue=""
              className={`${fieldClass()} appearance-none pr-10`}
            >
              <option value="">{copy.servicePlaceholder}</option>
              {options.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
            <FaChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-2.5 h-2.5 text-muted" aria-hidden />
          </div>
        </div>

        <div>
          <label htmlFor="message" className={labelClass}>{copy.messageLabel}</label>
          <textarea
            name="message"
            id="message"
            rows={4}
            className={fieldClass(!!fieldErrors.message, 'textarea')}
            required
            placeholder={copy.messagePlaceholder}
            onChange={() => clearFieldError('message')}
          />
          <FieldError name="message" errors={fieldErrors} />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={buttonClass('primary', 'w-[12rem]')}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {copy.sending}
            </>
          ) : (
            copy.submit
          )}
        </button>
      </form>
    </Card>
  );
});
