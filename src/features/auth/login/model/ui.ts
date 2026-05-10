import type { FieldErrors } from 'react-hook-form';

type LoginFormValues = {
  email: string;
  password: string;
};

export const getLoginFormUiState = (errors: FieldErrors<LoginFormValues>) => ({
  emailInvalid: Boolean(errors.email),
  passwordInvalid: Boolean(errors.password),
});
