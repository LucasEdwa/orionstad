import { useState } from 'react';
import type { ContactFormState } from '../../domain/entities/ContactForm';
import { ContactFormService } from '../../application/ContactFormService';
import { EmailRepository } from '../../infrastructure/EmailRepository';
import { SonnerNotificationService } from '../../infrastructure/SonnerNotificationService';
import { contactFormSchema, useFormValidation } from '../../../../validation';
import type { FieldErrors } from '../../../../validation';

// Module-level singletons — stateless services reused across renders
const contactFormService = new ContactFormService();
const emailRepository = new EmailRepository();
const notificationService = new SonnerNotificationService();

/**
 * Manages contact form lifecycle: Zod validation, submission via EmailJS,
 * and user feedback through Sonner toast notifications.
 */
export const useContactForm = () => {
  
  const [formState, setFormState] = useState<ContactFormState>(
    contactFormService.getInitialFormState()
  );
  const { fieldErrors, validate, clearFieldError } = useFormValidation(contactFormSchema);

  const submitForm = async (formElement: HTMLFormElement) => {
    if (!emailRepository.isConfigured()) {
      const errorMessage = 'Email service is not configured';
      setFormState(contactFormService.getErrorState(formState, errorMessage));
      notificationService.showError(errorMessage);
      return;
    }

    // Extract and validate form data with Zod
    const formData = new FormData(formElement);
    const raw = {
      user_name: (formData.get('user_name') as string) ?? '',
      user_email: (formData.get('user_email') as string) ?? '',
      message: (formData.get('message') as string) ?? '',
    };
    const result = validate(raw);
    if (!result.success) return;

    setFormState(contactFormService.getSubmittingState(formState));

    try {
      const emailResult = await emailRepository.sendEmail(formElement);
      
      if (emailResult.success) {
        setFormState(contactFormService.getSuccessState(formState));
        formElement.reset();
        notificationService.showSuccess("Your message has been sent successfully! We'll get back to you soon.");
      } else {
        const errorMessage = emailResult.error || 'Failed to send message';
        setFormState(contactFormService.getErrorState(formState, errorMessage));
        notificationService.showError(errorMessage);
      }
    } catch {
      const errorMessage = 'An unexpected error occurred';
      setFormState(contactFormService.getErrorState(formState, errorMessage));
      notificationService.showError(errorMessage);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formElement = e.currentTarget;
    await submitForm(formElement);
  };

  return {
    formState,
    handleSubmit,
    isSubmitting: formState.isSubmitting,
    error: formState.error,
    isSent: formState.isSent,
    fieldErrors: fieldErrors as FieldErrors,
    clearFieldError,
  };
};
