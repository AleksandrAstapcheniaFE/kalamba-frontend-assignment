import { useQuery } from '@tanstack/react-query';
import { articleQueryKeys } from 'entities/article';
import {
  getArticlesByAuthor,
  getArticlesFavoritedBy,
  type ProfileArticlesResult,
} from 'features/profile-articles/api';
import type { ProfileArticlesTab } from './profile-view-model';

const PAGE_SIZE = 20;

/** Profile articles list (author or favorites tab) */
export const useProfileArticles = (username: string, tab: ProfileArticlesTab) => {
  const offset = 0;
  const isFavorites = tab === 'favorites';

  const queryKey = isFavorites
    ? articleQueryKeys.profileFavorites(username, offset)
    : articleQueryKeys.profileAuthor(username, offset);

  const query = useQuery<ProfileArticlesResult, Error>({
    queryKey,
    queryFn: () =>
      isFavorites
        ? getArticlesFavoritedBy(username, PAGE_SIZE, offset)
        : getArticlesByAuthor(username, PAGE_SIZE, offset),
    enabled: Boolean(username),
    staleTime: 30_000,
    keepPreviousData: true,
  });

  return {
    articles: query.data?.articles ?? [],
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
  };
};
