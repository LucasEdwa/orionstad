export interface ContactFormData {
  user_name: string;
  user_email: string;
  message: string;
}

export interface ContactFormState {
  isSubmitting: boolean;
  isSent: boolean;
  error: string | null;
}

export interface EmailSubmissionResult {
  success: boolean;
  error?: string;
}
