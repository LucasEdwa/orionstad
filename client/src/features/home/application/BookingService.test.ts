import { describe, it, expect } from 'vitest';
import { BookingService } from './BookingService';

describe('BookingService', () => {
  const service = new BookingService();

  describe('validateBookingForm (Zod-backed)', () => {
    it('returns true when all fields are filled', () => {
      expect(
        service.validateBookingForm({ serviceType: 'deep', homeSize: '2', frequency: 'weekly' })
      ).toBe(true);
    });

    it('returns false when serviceType is missing', () => {
      expect(
        service.validateBookingForm({ homeSize: '2', frequency: 'weekly' })
      ).toBe(false);
    });

    it('returns false when homeSize is missing', () => {
      expect(
        service.validateBookingForm({ serviceType: 'deep', frequency: 'weekly' })
      ).toBe(false);
    });

    it('returns false when frequency is missing', () => {
      expect(
        service.validateBookingForm({ serviceType: 'deep', homeSize: '2' })
      ).toBe(false);
    });

    it('returns false for empty object', () => {
      expect(service.validateBookingForm({})).toBe(false);
    });

    it('returns false when homeSize is not a positive number', () => {
      expect(
        service.validateBookingForm({ serviceType: 'deep', homeSize: '0', frequency: 'weekly' })
      ).toBe(false);
    });

    it('returns false when homeSize is non-numeric', () => {
      expect(
        service.validateBookingForm({ serviceType: 'deep', homeSize: 'abc', frequency: 'weekly' })
      ).toBe(false);
    });
  });

  describe('getInitialState', () => {
    it('returns step 1 with empty forms', () => {
      const state = service.getInitialState();
      expect(state).toEqual({ step: 1, bookingForm: {}, customerForm: {} });
    });
  });

  describe('canProceedToNextStep', () => {
    it('returns true at step 1 with a valid booking form', () => {
      expect(
        service.canProceedToNextStep({
          step: 1,
          bookingForm: { serviceType: 'deep', homeSize: '2', frequency: 'weekly' },
          customerForm: {},
        })
      ).toBe(true);
    });

    it('returns false at step 1 with an incomplete booking form', () => {
      expect(
        service.canProceedToNextStep({
          step: 1,
          bookingForm: { serviceType: 'deep' },
          customerForm: {},
        })
      ).toBe(false);
    });

    it('returns false at step 2 (no forward navigation rule)', () => {
      expect(
        service.canProceedToNextStep({
          step: 2,
          bookingForm: { serviceType: 'deep', homeSize: '2', frequency: 'weekly' },
          customerForm: {},
        })
      ).toBe(false);
    });
  });
});
