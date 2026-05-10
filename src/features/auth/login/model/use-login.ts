import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { authStore } from 'stores/auth.store';
import { loginUser } from '../api';
import { LOGIN_GENERIC_ERROR, type LoginFormValues, loginSchema } from './schema';

/** Wires RHF + zod validation to `loginUser` mutation and auth store; navigates home on success. */
export const useLogin = () => {
  const history = useHistory();
  const setSession = authStore((s) => s.setSession);
  const [serverError, setServerError] = useState<string | null>(null);

  const { mutateAsync, isPending: isSubmitting } = useMutation({
    mutationFn: loginUser,
    onSuccess: ({ user, token }) => {
      setSession(user, token);
    },
  });

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onValidSubmit = async (data: LoginFormValues) => {
    setServerError(null);
    try {
      await mutateAsync(data);
      history.push('/');
    } catch {
      setServerError(LOGIN_GENERIC_ERROR);
    }
  };

  return {
    register: form.register,
    errors: form.formState.errors,
    onSubmit: form.handleSubmit(onValidSubmit),
    isSubmitting,
    serverError,
  };
};
