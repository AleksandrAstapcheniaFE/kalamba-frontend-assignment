import type { ArticleDetail, ArticlePreview } from './model';

/** Article list shape used in React Query cache. */
export type ArticleListQueryData = {
  articles: ArticlePreview[];
  articlesCount: number;
};

/** Checks if value is article list cache data. */
export const isArticleListQueryData = (x: unknown): x is ArticleListQueryData => {
  if (typeof x !== 'object' || x === null) return false;
  const o = x as Record<string, unknown>;
  return Array.isArray(o.articles) && typeof o.articlesCount === 'number';
};

/** Checks if value is article detail shape. */
export const isArticleDetailQueryData = (x: unknown): x is ArticleDetail => {
  if (typeof x !== 'object' || x === null) return false;
  const o = x as Record<string, unknown>;
  return typeof o.slug === 'string' && typeof o.body === 'string';
};
