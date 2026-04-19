import { describe, it, expect } from 'vitest';
import { ContactFormService } from './ContactFormService';
import type { ContactFormState } from '../domain/entities/ContactForm';

describe('ContactFormService', () => {
  const service = new ContactFormService();

  describe('validateFormData', () => {
    const validData = { user_name: 'Jane', user_email: 'jane@example.com', message: 'Hello' };

    it('passes with valid data', () => {
      const result = service.validateFormData(validData);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('fails when name is empty', () => {
      const result = service.validateFormData({ ...validData, user_name: '  ' });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Name is required');
    });

    it('fails when email is empty', () => {
      const result = service.validateFormData({ ...validData, user_email: '' });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Email is required');
    });

    it('fails when email format is invalid', () => {
      const result = service.validateFormData({ ...validData, user_email: 'not-an-email' });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Please enter a valid email address');
    });

    it('fails when message is empty', () => {
      const result = service.validateFormData({ ...validData, message: '' });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Message is required');
    });

    it('accumulates multiple errors', () => {
      const result = service.validateFormData({ user_name: '', user_email: '', message: '' });
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThanOrEqual(3);
    });
  });

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
