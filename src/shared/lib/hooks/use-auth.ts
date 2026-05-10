import type { User } from 'entities/user';
import { authStore } from 'stores/auth.store';

export type AuthSession =
  | { isAuthenticated: true; user: User; token: string }
  | { isAuthenticated: false; user: undefined; token: undefined };

export const useAuth = (): AuthSession => {
  const user = authStore((s) => s.user);
  const token = authStore((s) => s.token);

  if (user && token) {
    return { isAuthenticated: true, user, token };
  }

  return { isAuthenticated: false, user: undefined, token: undefined };
};
