import type { ContactFormState, EmailSubmissionResult } from '../domain/entities/ContactForm';

/** Manages contact form state transitions and submission result creation. */
export class ContactFormService {
  getInitialFormState(): ContactFormState {
    return {
      isSubmitting: false,
      isSent: false,
      error: null
    };
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
