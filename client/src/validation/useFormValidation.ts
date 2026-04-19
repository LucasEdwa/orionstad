import { useState, useCallback } from 'react';
import type { ZodSchema, ZodError } from 'zod';

export type FieldErrors = Record<string, string>;

export function useFormValidation<T>(schema: ZodSchema<T>) {
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const validate = useCallback(
    (data: unknown): { success: true; data: T } | { success: false; errors: FieldErrors } => {
      const result = schema.safeParse(data);
      if (result.success) {
        setFieldErrors({});
        return { success: true, data: result.data };
      }
      const errors = formatZodErrors(result.error);
      setFieldErrors(errors);
      return { success: false, errors };
    },
    [schema],
  );

  const clearErrors = useCallback(() => setFieldErrors({}), []);

  const clearFieldError = useCallback(
    (field: string) =>
      setFieldErrors(prev => {
        if (!prev[field]) return prev;
        const next = { ...prev };
        delete next[field];
        return next;
      }),
    [],
  );

  return { fieldErrors, validate, clearErrors, clearFieldError };
}

function formatZodErrors(error: ZodError): FieldErrors {
  const errors: FieldErrors = {};
  for (const issue of error.issues) {
    const key = issue.path.join('.');
    if (!errors[key]) {
      errors[key] = issue.message;
    }
  }
  return errors;
}
