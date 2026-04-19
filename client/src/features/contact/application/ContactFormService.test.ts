import { describe, it, expect } from 'vitest';
import { ContactFormService } from './ContactFormService';
import type { ContactFormState } from '../domain/entities/ContactForm';

describe('ContactFormService', () => {
  const service = new ContactFormService();

  describe('state transitions', () => {
    const base: ContactFormState = { isSubmitting: false, isSent: false, error: null };

    it('getInitialFormState returns idle state', () => {
      expect(service.getInitialFormState()).toEqual(base);
    });

    it('getSubmittingState sets isSubmitting true and clears error', () => {
      const state = service.getSubmittingState({ ...base, error: 'old' });
      expect(state.isSubmitting).toBe(true);
      expect(state.error).toBeNull();
    });

    it('getSuccessState marks sent and stops submitting', () => {
      const state = service.getSuccessState({ ...base, isSubmitting: true });
      expect(state.isSent).toBe(true);
      expect(state.isSubmitting).toBe(false);
    });

    it('getErrorState stores the error message', () => {
      const state = service.getErrorState(base, 'Something broke');
      expect(state.error).toBe('Something broke');
      expect(state.isSubmitting).toBe(false);
      expect(state.isSent).toBe(false);
    });
  });

  describe('createSubmissionResult', () => {
    it('creates a success result', () => {
      expect(service.createSubmissionResult(true)).toEqual({ success: true, error: undefined });
    });

    it('creates a failure result with error', () => {
      expect(service.createSubmissionResult(false, 'fail')).toEqual({ success: false, error: 'fail' });
    });
  });
});
