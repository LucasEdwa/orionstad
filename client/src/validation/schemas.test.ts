import { describe, it, expect } from 'vitest';
import {
  bookingStepOneSchema,
  customerFormSchema,
  contactFormSchema,
  emailjsResponseSchema,
} from './schemas';

describe('bookingStepOneSchema', () => {
  it('passes with valid data', () => {
    const result = bookingStepOneSchema.safeParse({
      serviceType: 'home_cleaning',
      homeSize: '120',
      frequency: 'weekly',
    });
    expect(result.success).toBe(true);
  });

  it('fails when serviceType is empty', () => {
    const result = bookingStepOneSchema.safeParse({
      serviceType: '',
      homeSize: '120',
      frequency: 'weekly',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('serviceType');
    }
  });

  it('fails when homeSize is zero', () => {
    const result = bookingStepOneSchema.safeParse({
      serviceType: 'home_cleaning',
      homeSize: '0',
      frequency: 'weekly',
    });
    expect(result.success).toBe(false);
  });

  it('fails when homeSize is not a number', () => {
    const result = bookingStepOneSchema.safeParse({
      serviceType: 'home_cleaning',
      homeSize: 'abc',
      frequency: 'weekly',
    });
    expect(result.success).toBe(false);
  });

  it('fails when frequency is missing', () => {
    const result = bookingStepOneSchema.safeParse({
      serviceType: 'home_cleaning',
      homeSize: '120',
      frequency: '',
    });
    expect(result.success).toBe(false);
  });
});

describe('customerFormSchema', () => {
  const valid = {
    fullName: 'John Doe',
    email: 'john@example.com',
    phone: '+46 70 123 4567',
    address: '123 Main St',
  };

  it('passes with required fields only', () => {
    const result = customerFormSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  it('passes with all fields', () => {
    const result = customerFormSchema.safeParse({
      ...valid,
      postalCode: '12345',
      city: 'Stockholm',
      preferredDate: '2026-05-01',
      preferredTime: '10:00',
      specialInstructions: 'Ring the doorbell',
      accessInstructions: 'Code 1234',
      priorityAreas: 'Kitchen and bathroom',
    });
    expect(result.success).toBe(true);
  });

  it('fails with invalid email', () => {
    const result = customerFormSchema.safeParse({ ...valid, email: 'notanemail' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('email');
      expect(result.error.issues[0].message).toContain('valid email');
    }
  });

  it('fails with invalid phone', () => {
    const result = customerFormSchema.safeParse({ ...valid, phone: 'abc' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('phone');
    }
  });

  it('fails when fullName is too short', () => {
    const result = customerFormSchema.safeParse({ ...valid, fullName: 'J' });
    expect(result.success).toBe(false);
  });

  it('fails when address is empty', () => {
    const result = customerFormSchema.safeParse({ ...valid, address: '' });
    expect(result.success).toBe(false);
  });

  it('rejects special instructions over 1000 chars', () => {
    const result = customerFormSchema.safeParse({
      ...valid,
      specialInstructions: 'x'.repeat(1001),
    });
    expect(result.success).toBe(false);
  });
});

describe('contactFormSchema', () => {
  const valid = {
    user_name: 'Jane Doe',
    user_email: 'jane@example.com',
    message: 'Hello, I need help with cleaning.',
  };

  it('passes with valid data', () => {
    const result = contactFormSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  it('fails when name is empty', () => {
    const result = contactFormSchema.safeParse({ ...valid, user_name: '' });
    expect(result.success).toBe(false);
  });

  it('fails with invalid email', () => {
    const result = contactFormSchema.safeParse({ ...valid, user_email: 'bad' });
    expect(result.success).toBe(false);
  });

  it('fails when message is too short', () => {
    const result = contactFormSchema.safeParse({ ...valid, message: 'Hi' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain('at least 10');
    }
  });

  it('fails when message exceeds 5000 chars', () => {
    const result = contactFormSchema.safeParse({ ...valid, message: 'x'.repeat(5001) });
    expect(result.success).toBe(false);
  });

  it('provides per-field error paths', () => {
    const result = contactFormSchema.safeParse({
      user_name: '',
      user_email: '',
      message: '',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const paths = result.error.issues.map(i => i.path[0]);
      expect(paths).toContain('user_name');
      expect(paths).toContain('user_email');
      expect(paths).toContain('message');
    }
  });
});

describe('emailjsResponseSchema', () => {
  it('passes with valid response', () => {
    const result = emailjsResponseSchema.safeParse({ status: 200, text: 'OK' });
    expect(result.success).toBe(true);
  });

  it('fails with missing status', () => {
    const result = emailjsResponseSchema.safeParse({ text: 'OK' });
    expect(result.success).toBe(false);
  });

  it('fails with wrong types', () => {
    const result = emailjsResponseSchema.safeParse({ status: '200', text: 'OK' });
    expect(result.success).toBe(false);
  });
});
