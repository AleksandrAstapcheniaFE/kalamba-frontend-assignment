import { useQuery } from '@tanstack/react-query';
import { articleQueryKeys } from 'entities/article';
import { useState } from 'react';
import { useAuth } from 'shared/lib/hooks/use-auth';
import { type ArticlesResult, getArticles, getFeedArticles } from '../api';
import { useToggleFavorite } from './use-toggle-favorite';

const PAGE_SIZE = 20;

/**
 * Articles list hook (home page).
 * Handles feed/global switching and favorite toggling.
 */
export const useArticleList = () => {
  const auth = useAuth();
  const [isFeed, setIsFeed] = useState(false);
  const offset = 0;

  const canUseFeed = auth.isAuthenticated && isFeed;
  const homeScope = canUseFeed ? 'feed' : 'global';

  const query = useQuery<ArticlesResult, Error>({
    queryKey: articleQueryKeys.home(homeScope, offset),
    queryFn: () =>
      canUseFeed ? getFeedArticles(PAGE_SIZE, offset) : getArticles({ limit: PAGE_SIZE, offset }),
    staleTime: 30_000,
    keepPreviousData: true,
  });

  const { toggleFavorite, pendingFavoriteSlug } = useToggleFavorite();

  return {
    isAuthenticated: auth.isAuthenticated,
    isFeed,
    setFeedTab: setIsFeed,
    articles: query.data?.articles ?? [],
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    onToggleFavorite: toggleFavorite,
    pendingFavoriteSlug,
  };
};
