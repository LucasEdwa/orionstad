import { describe, it, expect } from 'vitest';
import {
  contactFormSchema,
  emailjsResponseSchema,
} from './schemas';

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
