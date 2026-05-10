import type { User } from 'entities/user';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type AuthState = {
  user?: User;
  token?: string;
  setSession: (user: User, token: string) => void;
  updateUser: (user: Partial<User>) => void;
  logout: () => void;
};

export const authStore = create<AuthState>()(
  persist(
    (set) => ({
      user: undefined,
      token: undefined,

      setSession: (user, token) => set({ user, token }),

      updateUser: (patch) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...patch } : undefined,
        })),

      logout: () => set({ user: undefined, token: undefined }),
    }),
    {
      name: 'auth-storage',
      version: 1,
    },
  ),
);
