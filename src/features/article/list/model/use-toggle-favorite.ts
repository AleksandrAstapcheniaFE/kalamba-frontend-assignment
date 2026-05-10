import { useMutation, useQueryClient } from '@tanstack/react-query';
import { articleQueryKeys } from 'entities/article';
import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from 'shared/lib/hooks/use-auth';
import { toggleFavorite } from '../api';
import { applyFavoriteServerResult } from './apply-favorite-to-cache';

/** Favorite toggle input */
export type ToggleFavoriteVariables = {
  slug: string;
  currentlyFavorited: boolean;
};

/** Toggle favorite and sync cache */
export const useToggleFavoriteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['article', 'favorite', 'toggle'] as const,
    mutationFn: ({ slug, currentlyFavorited }: ToggleFavoriteVariables) =>
      toggleFavorite(slug, currentlyFavorited),

    onSuccess: (serverArticle, variables) => {
      applyFavoriteServerResult(queryClient, variables.slug, serverArticle);
    },

    onError: (_err, variables) => {
      if (!variables) return;
      void queryClient.invalidateQueries({
        queryKey: articleQueryKeys.detail(variables.slug),
      });
      void queryClient.invalidateQueries({
        queryKey: articleQueryKeys.homeListsPrefix,
      });
      void queryClient.invalidateQueries({
        queryKey: articleQueryKeys.profileListsPrefix,
      });
    },
  });
};

/** Favorite toggle with auth check */
export const useToggleFavorite = () => {
  const mutation = useToggleFavoriteMutation();
  const { mutate, isPending, variables } = mutation;
  const auth = useAuth();
  const history = useHistory();

  const toggleFavoriteAction = useCallback(
    (slug: string, currentlyFavorited: boolean) => {
      if (!auth.isAuthenticated) {
        history.push('/login');
        return;
      }
      mutate({ slug, currentlyFavorited });
    },
    [auth.isAuthenticated, history, mutate],
  );

  const pendingFavoriteSlug = isPending ? (variables?.slug ?? null) : null;

  return {
    toggleFavorite: toggleFavoriteAction,
    isLoading: isPending,
    pendingFavoriteSlug,
  };
};
