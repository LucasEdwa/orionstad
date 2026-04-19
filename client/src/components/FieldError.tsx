import type { FieldErrors } from '../validation';

interface FieldErrorProps {
  name: string;
  errors: FieldErrors;
}

export const FieldError: React.FC<FieldErrorProps> = ({ name, errors }) => {
  const error = errors[name];
  if (!error) return null;
  return (
    <p className="mt-1 text-sm text-red-600" role="alert">
      {error}
    </p>
  );
};
