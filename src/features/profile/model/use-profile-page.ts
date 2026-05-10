import { useToggleFavorite } from 'features/article/list/model/use-toggle-favorite';
import { useMemo } from 'react';
import { DEFAULT_AVATAR } from 'shared/config/avatar';
import { useAuth } from 'shared/lib/hooks/use-auth';

import type { ProfileViewProps } from './profile-view-model';
import { useProfile } from './use-profile';
import { useProfileArticles } from './use-profile-articles';
import { useProfileArticlesTab } from './use-profile-articles-tab';

/** Profile page state and actions */
export const useProfilePage = (): ProfileViewProps => {
  const { routeUsername, articlesTab } = useProfileArticlesTab();
  const auth = useAuth();
  const { profileQuery, followMutation, requestFollow } = useProfile(routeUsername);
  const {
    articles,
    isLoading: articlesLoading,
    isFetching: articlesFetching,
    isError: articlesError,
  } = useProfileArticles(routeUsername, articlesTab);
  const { toggleFavorite, pendingFavoriteSlug } = useToggleFavorite();

  const profile = profileQuery.data;
  const authedUsername = auth.user?.username;

  return useMemo((): ProfileViewProps => {
    if (profileQuery.isLoading) return { status: 'loading' };
    if (profileQuery.isError || !profile) {
      return {
        status: 'error',
        message: 'Unable to load profile. Please try again.',
      };
    }

    const isOwnProfile =
      auth.isAuthenticated && Boolean(authedUsername) && authedUsername === routeUsername;
    const followLoading = followMutation.isPending;

    return {
      status: 'ready',
      routeUsername,
      displayUsername: profile.username,
      bio: profile.bio,
      imageSrc: profile.image || DEFAULT_AVATAR,
      following: profile.following,
      articlesTab,
      isOwnProfile,
      followDisabled: !auth.isAuthenticated || followLoading || isOwnProfile,
      followLoading,
      articles,
      articlesLoading,
      articlesFetching,
      articlesError,
      pendingFavoriteSlug,
      onFollow: () => requestFollow(profile.following),
      onToggleFavorite: toggleFavorite,
    };
  }, [
    profileQuery.isLoading,
    profileQuery.isError,
    profile,
    routeUsername,
    articlesTab,
    auth.isAuthenticated,
    authedUsername,
    followMutation.isPending,
    articles,
    articlesLoading,
    articlesFetching,
    articlesError,
    pendingFavoriteSlug,
    requestFollow,
    toggleFavorite,
  ]);
};
