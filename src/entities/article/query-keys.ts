/**
 * TanStack Query keys for articles.
 * Separate roots for list views and article details.
 *
 * homeListsPrefix / profileListsPrefix are used for targeted invalidation
 * after follow or favorite updates.
 */
const articlesRoot = ['articles'] as const;
const articleDetailRoot = ['article'] as const;

export const articleQueryKeys = {
  allArticles: articlesRoot,
  homeListsPrefix: [...articlesRoot, 'home'] as const,
  profileListsPrefix: [...articlesRoot, 'profile'] as const,

  home: (scope: 'feed' | 'global', offset: number) =>
    [...articlesRoot, 'home', scope, offset] as const,

  profileArticles: (username: string, tab: 'author' | 'favorites', offset: number) =>
    [...articlesRoot, 'profile', username, tab, offset] as const,

  profileAuthor: (username: string, offset: number) =>
    articleQueryKeys.profileArticles(username, 'author', offset),

  profileFavorites: (username: string, offset: number) =>
    articleQueryKeys.profileArticles(username, 'favorites', offset),

  allDetails: articleDetailRoot,

  detail: (slug: string) => [...articleDetailRoot, slug] as const,
} as const;

/**
 * Checks if query key belongs to profile favorites list.
 */
export const isProfileFavoritesListKey = (key: readonly unknown[]): boolean =>
  key.length >= 5 && key[0] === 'articles' && key[1] === 'profile' && key[3] === 'favorites';
