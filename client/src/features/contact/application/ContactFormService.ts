import type { ContactFormData, ContactFormState, EmailSubmissionResult } from '../domain/entities/ContactForm';

export class ContactFormService {
  getInitialFormState(): ContactFormState {
    return {
      isSubmitting: false,
      isSent: false,
      error: null
    };
  }

  validateFormData(formData: ContactFormData): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!formData.user_name.trim()) {
      errors.push('Name is required');
    }

    if (!formData.user_email.trim()) {
      errors.push('Email is required');
    } else if (!this.isValidEmail(formData.user_email)) {
      errors.push('Please enter a valid email address');
    }

    if (!formData.message.trim()) {
      errors.push('Message is required');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  createSubmissionResult(success: boolean, error?: string): EmailSubmissionResult {
    return {
      success,
      error
    };
  }

  getSubmittingState(currentState: ContactFormState): ContactFormState {
    return {
      ...currentState,
      isSubmitting: true,
      error: null
    };
  }

  getSuccessState(currentState: ContactFormState): ContactFormState {
    return {
      ...currentState,
      isSubmitting: false,
      isSent: true,
      error: null
    };
  }

  getErrorState(currentState: ContactFormState, error: string): ContactFormState {
    return {
      ...currentState,
      isSubmitting: false,
      isSent: false,
      error
    };
  }
}
