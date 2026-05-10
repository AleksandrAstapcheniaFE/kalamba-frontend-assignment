import type { BaseSyntheticEvent } from 'react';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import { Link } from 'react-router-dom';
import type { LoginFormValues } from '../model/schema';

export type LoginFormProps = {
  register: UseFormRegister<LoginFormValues>;
  errors: FieldErrors<LoginFormValues>;
  onSubmit: (e?: BaseSyntheticEvent) => Promise<void>;
  isSubmitting: boolean;
  serverError: string | null;
};

export const LoginForm = ({
  register,
  errors,
  onSubmit,
  isSubmitting,
  serverError,
}: LoginFormProps) => {
  const emailInvalid = !!errors.email;
  const passwordInvalid = !!errors.password;

  return (
    <main className="auth-page" aria-labelledby="login-title">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 id="login-title" className="text-xs-center">
              Sign in
            </h1>
            <p className="text-xs-center">
              <Link to="/register">Need an account?</Link>
            </p>

            {serverError ? (
              <ul className="error-messages" role="alert" aria-live="polite">
                <li>{serverError}</li>
              </ul>
            ) : null}

            <form onSubmit={onSubmit} noValidate aria-busy={isSubmitting}>
              <fieldset className="form-group" disabled={isSubmitting}>
                <label htmlFor="login-email">Email</label>
                <input
                  id="login-email"
                  className="form-control form-control-lg"
                  type="email"
                  autoComplete="email"
                  aria-required="true"
                  aria-invalid={emailInvalid}
                  aria-describedby={emailInvalid ? 'login-email-error' : undefined}
                  {...register('email')}
                />
                {errors.email ? (
                  <p
                    id="login-email-error"
                    role="alert"
                    style={{
                      color: 'var(--danger)',
                      fontSize: '0.875rem',
                      marginTop: '0.25rem',
                    }}
                  >
                    {errors.email.message}
                  </p>
                ) : null}
              </fieldset>

              <fieldset className="form-group" disabled={isSubmitting}>
                <label htmlFor="login-password">Password</label>
                <input
                  id="login-password"
                  className="form-control form-control-lg"
                  type="password"
                  autoComplete="current-password"
                  aria-invalid={passwordInvalid}
                  aria-describedby={passwordInvalid ? 'login-password-error' : undefined}
                  {...register('password')}
                />
                {errors.password ? (
                  <p
                    id="login-password-error"
                    role="alert"
                    style={{
                      color: 'var(--danger)',
                      fontSize: '0.875rem',
                      marginTop: '0.25rem',
                    }}
                  >
                    {errors.password.message}
                  </p>
                ) : null}
              </fieldset>

              <button
                className="btn btn-lg btn-primary pull-xs-right"
                type="submit"
                disabled={isSubmitting}
                aria-busy={isSubmitting}
              >
                {isSubmitting ? 'Signing in…' : 'Sign in'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};
