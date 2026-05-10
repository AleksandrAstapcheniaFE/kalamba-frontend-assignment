import type { QueryClient } from '@tanstack/react-query';
import {
  type ArticleDetail,
  type ArticleListQueryData,
  type ArticlePreview,
  articleQueryKeys,
  isArticleDetailQueryData,
  isArticleListQueryData,
  isProfileFavoritesListKey,
} from 'entities/article';

/**
 * Sync favorite mutation result into React Query cache.
 * Updates article detail and all cached lists.
 */
export const applyFavoriteServerResult = (
  queryClient: QueryClient,
  slug: string,
  article: ArticlePreview,
): void => {
  queryClient.setQueryData<ArticleDetail | undefined>(articleQueryKeys.detail(slug), (old) => {
    if (!old || !isArticleDetailQueryData(old) || old.slug !== slug) return old;
    return {
      ...old,
      ...article,
      body: old.body,
    };
  });

  const queries = queryClient.getQueryCache().findAll({ queryKey: articleQueryKeys.allArticles });
  for (const q of queries) {
    const key = q.queryKey;
    const data = q.state.data;
    if (!isArticleListQueryData(data)) continue;

    if (isProfileFavoritesListKey(key) && !article.favorited) {
      if (!data.articles.some((a) => a.slug === slug)) continue;
      const articles = data.articles.filter((a) => a.slug !== slug);
      const removed = data.articles.length - articles.length;
      queryClient.setQueryData<ArticleListQueryData>(key, {
        ...data,
        articles,
        articlesCount: Math.max(0, data.articlesCount - removed),
      });
      continue;
    }

    if (!data.articles.some((a) => a.slug === slug)) continue;

    queryClient.setQueryData<ArticleListQueryData>(key, {
      ...data,
      articles: data.articles.map((a) => (a.slug === slug ? { ...a, ...article } : a)),
    });
  }
};
