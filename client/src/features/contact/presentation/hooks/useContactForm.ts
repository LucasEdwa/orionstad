import { useState } from 'react';
import type { ContactFormState } from '../../domain/entities/ContactForm';
import { ContactFormService } from '../../application/ContactFormService';
import { EmailRepository } from '../../infrastructure/EmailRepository';
import { showSuccess, showError } from '../../../../utils/sweetAlert';

export const useContactForm = () => {
  const contactFormService = new ContactFormService();
  const emailRepository = new EmailRepository();
  
  const [formState, setFormState] = useState<ContactFormState>(
    contactFormService.getInitialFormState()
  );

  const submitForm = async (formElement: HTMLFormElement) => {
    if (!emailRepository.isConfigured()) {
      const errorMessage = 'Email service is not configured';
      setFormState(contactFormService.getErrorState(formState, errorMessage));
      showError(errorMessage);
      return;
    }

    setFormState(contactFormService.getSubmittingState(formState));

    try {
      const result = await emailRepository.sendEmail(formElement);
      
      if (result.success) {
        setFormState(contactFormService.getSuccessState(formState));
        formElement.reset();
        showSuccess("Your message has been sent successfully! We'll get back to you soon.");
      } else {
        const errorMessage = result.error || 'Failed to send message';
        setFormState(contactFormService.getErrorState(formState, errorMessage));
        showError(errorMessage);
      }
    } catch (error) {
      const errorMessage = 'An unexpected error occurred';
      setFormState(contactFormService.getErrorState(formState, errorMessage));
      showError(errorMessage);
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
    isSent: formState.isSent
  };
};
